import { SnakeCaseProps } from "../util.ts";
import { ApplicationCommandOption } from "./application_command_option.ts";

export interface EditGuildApplicationCommand {
  /** 1-31 character name matching `^[\w-]{1,32}$` */
  name?: string;
  /** 1-100 character description */
  description?: string;
  /** The parameters for the command */
  options?: ApplicationCommandOption[] | null;
}

/** https://discord.com/developers/docs/interactions/slash-commands#edit-guild-application-command-json-params */
export type DiscordEditGuildApplicationCommand = SnakeCaseProps<
  EditGuildApplicationCommand
>;
