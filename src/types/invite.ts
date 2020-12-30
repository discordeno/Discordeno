import { ChannelPayload } from "./channel.ts";
import { GuildPayload } from "./guild.ts";
import { UserPayload } from "./user.ts";

/** https://discord.com/developers/docs/resources/invite#invite-object */
export interface InvitePayload {
  /** the invite code (unique ID) */
  code: string;
  /** the guild this invite is for */
  guild?: Partial<GuildPayload>;
  /** the channel this invite is for */
  channel: Partial<ChannelPayload>;
  /** the user who created the invite */
  inviter?: UserPayload;
  /** the target user for this invite */
  target_user?: Partial<UserPayload>;
  /** the type of user target for this invite */
  target_user_type?: InviteTargetUserTypes;
  /** approximate count of online members (only present when target_user is set) */
  approximate_presence_count?: number;
  /** approximate count of total members */
  approximate_member_count: number;
}

/** https://discord.com/developers/docs/resources/invite#invite-resource */
export enum InviteTargetUserTypes {
  STREAM = 1,
}

/** https://discord.com/developers/docs/resources/invite#invite-resource */
export interface InviteMetadataPayload extends InvitePayload {
  /** number of times this invite has been used */
  uses: number;
  /** max number of times this invite can be used */
  max_uses: number;
  /** duration (in seconds) after which the invite expires */
  max_age: number;
  /** whether this invite only grants temporary membership */
  temporary: boolean;
  /** when this invite was created */
  created_at: string;
}

/** https://discord.com/developers/docs/resources/invite#get-invite */
export interface GetInviteURLParams {
  /** whether the invite should contain approximate member counts */
  with_counts?: boolean;
}
