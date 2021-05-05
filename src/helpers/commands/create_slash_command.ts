import { applicationId } from "../../bot.ts";
import { rest } from "../../rest/rest.ts";
import type { ApplicationCommand } from "../../types/interactions/application_command.ts";
import type { CreateGlobalApplicationCommand } from "../../types/interactions/create_global_application_command.ts";
import { endpoints } from "../../util/constants.ts";
import {
  camelKeysToSnakeCase,
  validateSlashCommands,
} from "../../util/utils.ts";

/**
 * There are two kinds of Slash Commands: global commands and guild commands. Global commands are available for every guild that adds your app; guild commands are specific to the guild you specify when making them. Command names are unique per application within each scope (global and guild). That means:
 *
 * - Your app **cannot** have two global commands with the same name
 * - Your app **cannot** have two guild commands within the same name **on the same guild**
 * - Your app **can** have a global and guild command with the same name
 * - Multiple apps **can** have commands with the same names
 *
 * Global commands are cached for **1 hour**. That means that new global commands will fan out slowly across all guilds, and will be guaranteed to be updated in an hour.
 * Guild commands update **instantly**. We recommend you use guild commands for quick testing, and global commands when they're ready for public use.
 */
export async function createSlashCommand(
  options: CreateGlobalApplicationCommand,
  guildId?: bigint,
) {
  validateSlashCommands([options], true);

  return await rest.runMethod<ApplicationCommand>(
    "post",
    guildId
      ? endpoints.COMMANDS_GUILD(applicationId, guildId)
      : endpoints.COMMANDS(applicationId),
    camelKeysToSnakeCase(options),
  );
}
