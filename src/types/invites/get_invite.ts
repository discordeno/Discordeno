import { SnakeCaseProps } from "../util.ts";

export interface GetInvite {
  /** Whether the invite should contain approximate member counts */
  with_counts?: boolean;
}

/** https://discord.com/developers/docs/resources/invite#get-invite */
export type DiscordGetInvite = SnakeCaseProps<GetInvite>;
