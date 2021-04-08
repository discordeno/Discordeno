import { User } from "../users/user.ts";
import { SnakeCasedPropertiesDeep } from "../util.ts";

export interface GuildMemberUpdate {
  /** The id of the guild */
  guildId: string;
  /** User role ids */
  roles: string[];
  /** The user */
  user: User;
  /** Nickname of the user in the guild */
  nick?: string | null;
  /** When the user joined the guild */
  joinedAt: string;
  /** When the user starting boosting the guild */
  premiumSince?: string | null;
  /** Whether the user has not yet passed the guild's Membership Screening requirements */
  pending?: boolean;
}

/** https://discord.com/developers/docs/topics/gateway#guild-member-update */
export type DiscordGuildMemberUpdate = SnakeCasedPropertiesDeep<GuildMemberUpdate>;
