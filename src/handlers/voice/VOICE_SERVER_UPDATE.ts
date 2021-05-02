import { eventHandlers } from "../../bot.ts";
import { cacheHandlers } from "../../cache.ts";
import { DiscordGatewayPayload } from "../../types/gateway/gateway_payload.ts";
import { VoiceServerUpdate } from "../../types/voice/voice_server_update.ts";
import { snowflakeToBigint } from "../../util/bigint.ts";

export async function handleVoiceServerUpdate(data: DiscordGatewayPayload) {
  const payload = data.d as VoiceServerUpdate;

  const guild = await cacheHandlers.get(
    "guilds",
    snowflakeToBigint(payload.guildId),
  );
  if (!guild) return;

  eventHandlers.voiceServerUpdate?.(payload, guild);
}
