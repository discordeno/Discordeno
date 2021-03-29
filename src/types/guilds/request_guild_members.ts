import { SnakeCaseProps } from "../util.ts";

export interface RequestGuildMembers {
  /** id of the guild to get members for */
  guild_id: string;
  /** String that username starts with, or an empty string to return all members */
  query?: string;
  /** Maximum number of members to send matching the query; a limit of 0 can be used with an empty string query to return all members */
  limit: number;
  /** Used to specify if we want the presences of the matched members */
  presences?: boolean;
  /** Used to specify which users you wish to fetch */
  userIds?: string[];
  /** Nonce to identify the Guild Members Chunk response */
  nonce?: string;
}

/** https://discord.com/developers/docs/topics/gateway#request-guild-members */
export type DiscordRequestGuildMembers = SnakeCaseProps<RequestGuildMembers>;
