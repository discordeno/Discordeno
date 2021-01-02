import { eventHandlers } from "../../bot.ts";
import {
  CreateGuildPayload,
  DiscordPayload,
  GuildDeletePayload,
  GuildEmojisUpdatePayload,
  GuildUpdateChange,
  UpdateGuildPayload,
} from "../../types/mod.ts";
import { cache } from "../../util/cache.ts";
import { structures } from "../structures/mod.ts";
import { cacheHandlers } from "./cache.ts";

export async function handleInternalGuildCreate(
  data: DiscordPayload,
  shardID: number,
) {
  if (data.t !== "GUILD_CREATE") return;

  const payload = data.d as CreateGuildPayload;
  // When shards resume they emit GUILD_CREATE again.
  if (await cacheHandlers.has("guilds", payload.id)) return;

  const guild = await structures.createGuild(
    data.d as CreateGuildPayload,
    shardID,
  );

  await cacheHandlers.set("guilds", guild.id, guild);

  if (await cacheHandlers.has("unavailableGuilds", payload.id)) {
    await cacheHandlers.delete("unavailableGuilds", payload.id);
  }

  if (!cache.isReady) return eventHandlers.guildLoaded?.(guild);
  return eventHandlers.guildCreate?.(guild);
}

export async function handleInternalGuildDelete(data: DiscordPayload) {
  if (data.t !== "GUILD_DELETE") return;

  const payload = data.d as GuildDeletePayload;
  cacheHandlers.forEach("messages", (message) => {
    if (message.guildID === payload.id) {
      cacheHandlers.delete("messages", message.id);
    }
  });

  cacheHandlers.forEach("channels", (channel) => {
    if (channel.guildID === payload.id) {
      cacheHandlers.delete("channels", channel.id);
    }
  });

  await cacheHandlers.delete("guilds", payload.id);

  if (payload.unavailable) {
    return cacheHandlers.set("unavailableGuilds", payload.id, Date.now());
  }

  const guild = await cacheHandlers.get("guilds", payload.id);
  if (!guild) return;

  return eventHandlers.guildDelete?.(guild);
}

export async function handleInternalGuildUpdate(data: DiscordPayload) {
  if (data.t !== "GUILD_CREATE") return;

  const payload = data.d as UpdateGuildPayload;
  const cachedGuild = await cacheHandlers.get("guilds", payload.id);
  if (!cachedGuild) return;

  const keysToSkip = [
    "roles",
    "guild_hashes",
    "guild_id",
    "max_members",
    "emojis",
  ];

  const changes = Object.entries(payload)
    .map(([key, value]) => {
      if (keysToSkip.includes(key)) return;

      // deno-lint-ignore ban-ts-comment
      // @ts-ignore
      const cachedValue = cachedGuild[key];
      if (cachedValue !== value) {
        // Guild create sends undefined and update sends false.
        if (!cachedValue && !value) return;

        if (Array.isArray(cachedValue) && Array.isArray(value)) {
          const different = (cachedValue.length !== value.length) ||
            cachedValue.find((val) => !value.includes(val)) ||
            value.find((val) => !cachedValue.includes(val));
          if (!different) return;
        }

        // This will update the cached guild with the new values
        // deno-lint-ignore ban-ts-comment
        // @ts-ignore
        cachedGuild[key] = value;
        return { key, oldValue: cachedValue, value };
      }
    }).filter((change) => change) as GuildUpdateChange[];

  return eventHandlers.guildUpdate?.(cachedGuild, changes);
}

export async function handleInternalGuildEmojisUpdate(data: DiscordPayload) {
  if (data.t !== "GUILD_EMOJIS_UPDATE") return;

  const payload = data.d as GuildEmojisUpdatePayload;
  const guild = await cacheHandlers.get("guilds", payload.guild_id);
  if (!guild) return;

  const cachedEmojis = guild.emojis;
  guild.emojis = payload.emojis;

  return eventHandlers.guildEmojisUpdate?.(
    guild,
    payload.emojis,
    cachedEmojis,
  );
}
