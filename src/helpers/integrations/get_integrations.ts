import { rest } from "../../rest/rest.ts";
import type { Integration } from "../../types/integration/integration.ts";
import { endpoints } from "../../util/constants.ts";
import { requireBotGuildPermissions } from "../../util/permissions.ts";

/** Returns a list of integrations for the guild. Requires the MANAGE_GUILD permission. */
export async function getIntegrations(guildId: bigint) {
  await requireBotGuildPermissions(guildId, ["MANAGE_GUILD"]);

  return await rest.runMethod<Integration>(
    "get",
    endpoints.GUILD_INTEGRATIONS(guildId),
  );
}
