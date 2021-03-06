import { eventHandlers } from "../../bot.ts";
import type { DiscordGatewayPayload } from "../../types/gateway/gateway_payload.ts";
import type { WebhookUpdate } from "../../types/webhooks/webhooks_update.ts";
import { snowflakeToBigint } from "../../util/bigint.ts";

export function handleWebhooksUpdate(data: DiscordGatewayPayload) {
  const options = data.d as WebhookUpdate;
  eventHandlers.webhooksUpdate?.(snowflakeToBigint(options.channelId), snowflakeToBigint(options.guildId));
}
