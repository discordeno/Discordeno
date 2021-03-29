import { eventHandlers } from "../../bot.ts";
import { cacheHandlers } from "../../cache.ts";

export async function handleVoiceServerUpdate(data: DiscordPayload) {
  const payload = data.d as DiscordVoiceServerUpdate;

  const guild = await cacheHandlers.get("guilds", payload.guild_id);
  if (!guild) return;

  eventHandlers.voiceServerUpdate?.(payload.token, guild, payload.endpoint);
}
