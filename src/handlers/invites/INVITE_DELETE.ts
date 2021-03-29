import { eventHandlers } from "../../bot.ts";
import {
  DiscordGatewayPayload,
  DiscordInviteDelete,
} from "../../types/gateway.ts";

export function handleInviteDelete(payload: DiscordGatewayPayload) {
  const {
    channel_id: channelId,
    guild_id: guildId,
    ...rest
  } = payload.d as DiscordInviteDelete;

  eventHandlers.inviteDelete?.({
    ...rest,
    channelId,
    guildId,
  });
}
