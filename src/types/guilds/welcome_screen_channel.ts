import { SnakeCaseProps } from "../util.ts";
import { WelcomeScreen } from "./welcome_screen.ts";

export interface WelcomeScreenChannel {
  /** The channel's id */
  channelId: string;
  /** The descriptino schown for the channel */
  description: string;
  /** The emoji id, if the emoji is custom */
  emojiId: string | null;
  /** The emoji name if custom, the unicode character if standard, or `null` if no emoji is set */
  emojiName: string | null;
}

/** https://discord.com/developers/docs/resources/guild#welcome-screen-object-welcome-screen-channel-structure */
export type DiscordWelcomeScreen = SnakeCaseProps<WelcomeScreen>;
