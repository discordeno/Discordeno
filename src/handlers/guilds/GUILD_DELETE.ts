import { eventHandlers } from "../../bot.ts";
import { cacheHandlers } from "../../cache.ts";
import { DiscordGatewayPayload } from "../../types/gateway/gateway_payload.ts";
import { DiscordUnavailableGuild } from "../../types/guilds/unavailable_guild.ts";
import { ws } from "../../ws/ws.ts";

export async function handleGuildDelete(
  data: DiscordGatewayPayload,
  shardId: number,
) {
  const payload = data.d as DiscordUnavailableGuild;

  const guild = await cacheHandlers.get("guilds", payload.id);
  if (!guild) return;

  await cacheHandlers.delete("guilds", payload.id);

  if (payload.unavailable) {
    const shard = ws.shards.get(shardId);
    if (shard) shard.unavailableGuildIds.add(payload.id);

    await cacheHandlers.set("unavailableGuilds", payload.id, Date.now());

    eventHandlers.guildUnavailable?.(guild);
  } else {
    eventHandlers.guildDelete?.(guild);
  }

  cacheHandlers.forEach("messages", (message) => {
    if (message.guildId === payload.id) {
      cacheHandlers.delete("messages", message.id);
    }
  });

  cacheHandlers.forEach("channels", (channel) => {
    if (channel.guildId === payload.id) {
      cacheHandlers.delete("channels", channel.id);
    }
  });

  cacheHandlers.forEach("members", (member) => {
    if (!member.guilds.has(payload.id)) return;

    member.guilds.delete(payload.id);

    if (!member.guilds.size) {
      return cacheHandlers.delete("members", member.id);
    }

    cacheHandlers.set("members", member.id, member);
  });
}
