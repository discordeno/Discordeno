import { eventHandlers } from "../../bot.ts";
import type { DiscordGatewayPayload } from "../../types/gateway/gateway_payload.ts";
import type {
  ApplicationCommandCreateUpdateDelete,
} from "../../types/interactions/application_command_create_update_delete.ts";

export function handleApplicationCommandCreate(
  data: DiscordGatewayPayload,
) {
  eventHandlers.applicationCommandCreate?.(
    data.d as ApplicationCommandCreateUpdateDelete,
  );
}
