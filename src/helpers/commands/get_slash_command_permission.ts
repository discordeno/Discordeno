import { applicationId } from "../../bot.ts";
import { rest } from "../../rest/rest.ts";
import type { GuildApplicationCommandPermissions } from "../../types/interactions/guild_application_command_permissions.ts";
import { endpoints } from "../../util/constants.ts";

/** Fetches command permissions for a specific command for your application in a guild. Returns a GuildApplicationCommandPermissions object. */
export async function getSlashCommandPermission(
  guildId: bigint,
  commandId: bigint,
) {
  return await rest.runMethod<GuildApplicationCommandPermissions>(
    "get",
    endpoints.COMMANDS_PERMISSION(applicationId, guildId, commandId),
  );
}
