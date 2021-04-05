import { eventHandlers } from "../../bot.ts";
import { cacheHandlers } from "../../cache.ts";
import { structures } from "../../structures/mod.ts";
import { DiscordChannel } from "../../types/channels/channel.ts";
import { DiscordGatewayPayload } from "../../types/gateway/gateway_payload.ts";

export async function handleChannelCreate(data: DiscordGatewayPayload) {
  const payload = data.d as DiscordChannel;

  const channelStruct = await structures.createChannelStruct(payload);
  await cacheHandlers.set("channels", channelStruct.id, channelStruct);

  eventHandlers.channelCreate?.(channelStruct);
}
