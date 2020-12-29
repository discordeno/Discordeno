import { Embed } from "./embed.ts";
import { MemberCreatePayload } from "./member.ts";
import { AllowedMentions } from "./misc.ts";

export interface Interaction {
  /** The id of the interaction */
  id: string;
  /** The type of interaction */
  type: InteractionType;
  /** The command data payload */
  data?: SlashCommandInteractionData;
  /** The id of the guild it was sent from */
  guild_id: string;
  /** The id of the channel it was sent from */
  channel_id: string;
  /** The Payload of the member it was sent from */
  member: MemberCreatePayload;
  /** The token for this interaction */
  token: string;
}

export interface SlashCommandInteractionData {
  /** The id of the command */
  id: string;
  /** The name of the command */
  name: string;
  /** the params and values from the user */
  options: SlashCommandInteractionDataOption[];
}

export interface SlashCommandInteractionDataOption {
  /** The name of the parameter */
  name: string;
  /** The value of the pair */
  value?: any;
  /** Present if this option is a group or subcommand */
  options?: SlashCommandInteractionDataOption[];
}

export interface InteractionResponse {
  /** The type of response */
  type: InteractionResponseType;
  /** The optional response message */
  data?: SlashCommandCallbackData;
}

export interface SlashCommandCallbackData {
  /** is the response TTS  */
  tts?: boolean;
  /** message content */
  content: string;
  /** supports up to 10 embeds */
  embeds?: Embed[];
  /** allowed mentions for the message */
  allowed_mentions?: AllowedMentions;
  /** acceptable values are message flags */
  flags?: number;
}

export enum InteractionType {
  PING = 1,
  APPLICATION_COMMAND = 2,
}

export enum InteractionResponseType {
  /** ACK a `Ping` */
  PONG = 1,
  /** ACK a command without sending a message, eating the user's input */
  ACKNOWLEDGE = 2,
  /** respond with a message, eating the user's input */
  CHANNEL_MESSAGE = 3,
  /** respond with a message, showing the user's input */
  CHANNEL_MESSAGE_WITH_SOURCE = 4,
  /** ACK a command without sending a message, showing the user's input */
  ACK_WITH_SOURCE = 5,
}
