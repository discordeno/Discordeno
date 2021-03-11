import { eventHandlers } from "../../bot.ts";
import { DiscordPayload, MessageCreateOptions } from "../../types/mod.ts";
import { structures } from "../../structures/mod.ts";
import { cacheHandlers } from "../../cache.ts";

export async function handleMessageCreate(data: DiscordPayload) {
  const payload = data.d as MessageCreateOptions;
  const channel = await cacheHandlers.get("channels", payload.channel_id);
  if (channel) channel.lastMessageID = payload.id;

  const guild = payload.guild_id
    ? await cacheHandlers.get("guilds", payload.guild_id)
    : undefined;

  if (payload.member && guild) {
    // If in a guild cache the author as a member
    const memberStruct = await structures.createMemberStruct(
      { ...payload.member, user: payload.author },
      guild.id,
    );
    await cacheHandlers.set("members", memberStruct.id, memberStruct);
  }

  await Promise.all(payload.mentions.map(async (mention) => {
    // Cache the member if its a valid member
    if (mention.member && guild) {
      const memberStruct = await structures.createMemberStruct(
        { ...mention.member, user: mention },
        guild.id,
      );

      return cacheHandlers.set("members", memberStruct.id, memberStruct);
    }
  }));

  const message = await structures.createMessageStruct(payload);
  // Cache the message
  await cacheHandlers.set("messages", payload.id, message);

  eventHandlers.messageCreate?.(message);
}
