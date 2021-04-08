import { User } from "../users/user.ts";
import { SnakeCasedPropertiesDeep } from "../util.ts";

export interface Emoji {
  /** Emoji id */
  id: string | null;
  /** Emoji name (can only be null in reaction emoji objects) */
  name: string | null;
  /** Roles this emoji is whitelisted to */
  roles?: string[];
  /** User that created this emoji */
  user?: User;
  /** Whether this emoji must be wrapped in colons */
  requireColons?: boolean;
  /** Whether this emoji is managed */
  managed?: boolean;
  /** Whether this emoji is animated */
  animated?: boolean;
  /** Whether this emoji can be used, may be false due to loss of Server Boosts */
  available?: boolean;
}

/** https://discord.com/developers/docs/resources/emoji#emoji-object-emoji-structure */
export type DiscordEmoji = SnakeCasedPropertiesDeep<Emoji>;
