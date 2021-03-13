import { DiscordOverwrite, DiscordUser } from "./mod.ts";

/** https://discord.com/developers/docs/resources/channel#channel-object-channel-types */
export enum DiscordChannelTypes {
  /** a text channel within a server */
  GUILD_TEXT,
  /** a direct message between users */
  DM,
  /** a voice channel within a server */
  GUILD_VOICE,
  /** a direct message between multiple users */
  GROUP_DM,
  /** an organizational category that contains up to 50 channels */
  GUILD_CATEGORY,
  /** a channel that users can follow and crosspost into their own server */
  GUILD_NEWS,
  /** a channel in which game developers can sell their game on Discord */
  GUILD_STORE,
}

/** https://discord.com/developers/docs/resources/channel#channel-object-channel-structure */
export interface DiscordChannel {
  /** the id of this channel */
  id: string;
  /** the type of channel */
  type: DiscordChannelTypes;
  /** the id of the guild */
  guild_id?: string;
  /** sorting position of the channel */
  position?: number;
  /** explicit permission overwrites for members and roles */
  permission_overwrites?: DiscordOverwrite[];
  /** the name of the channel (2-100 characters) */
  name?: string;
  /** the channel topic (0-1024 characters) */
  topic?: string | null;
  /** whether the channel is nsfw */
  nsfw?: boolean;
  /** the id of the last message sent in this channel (may not point to an existing or valid message) */
  last_message_id?: string | null;
  /** the bitrate (in bits) of the voice channel */
  bitrate?: number;
  /** the user limit of the voice channel */
  user_limit?: number;
  /** amount of seconds a user has to wait before sending another message (0-21600); bots, as well as users with the permission manage_messages or manage_channel, are unaffected */
  rate_limit_per_user?: number;
  /** the recipients of the DM */
  recipients?: DiscordUser[];
  /** icon hash */
  icon?: string | null;
  /** id of the DM creator */
  owner_id?: string;
  /** application id of the group DM creator if it is bot-created */
  application_id?: string;
  /** id of the parent category for a channel (each parent category can contain up to 50 channels) */
  parent_id?: string | null;
  /** when the last pinned message was pinned. This may be null in events such as GUILD_CREATE when a message is not pinned. */
  last_pin_timestamp?: string | null;
}

/** https://discord.com/developers/docs/resources/channel#followed-channel-object-followed-channel-structure */
export interface DiscordFollowedChannel {
  /** source channel id */
  channel_id: string;
  /** created target webhook id */
  webhook_id: string;
}

/** https://discord.com/developers/docs/resources/channel#modify-channel-json-params */
export interface DiscordModifyChannelParams {
  /** 2-100 character channel name */
  name?: string;
  /** the type of channel; only conversion between text and news is supported and only in guilds with the "NEWS" feature */
  type?: DiscordChannelTypes;
  /** the position of the channel in the left-hand listing */
  position?: number | null;
  /** 0-1024 character channel topic */
  topic?: string | null;
  /** whether the channel is nsfw */
  nsfw?: boolean | null;
  /** amount of seconds a user has to wait before sending another message (0-21600); bots, as well as users with the permission `MANAGE_MESSAGES` or `MANAGE_CHANNELS`, are unaffected */
  rate_limit_per_user?: number | null;
  /** the bitrate (in bits) of the voice channel; 8000 to 96000 (128000 for VIP servers) */
  bitrate?: number | null;
  /** the user limit of the voice channel; 0 refers to no limit, 1 to 99 refers to a user limit */
  user_limit?: number | null;
  /** channel or category-specific permissions */
  permission_overwrites?: DiscordOverwrite[] | null;
  /** id of the new parent category for a channel */
  parent_id?: string | null;
}

/** https://discord.com/developers/docs/resources/channel#edit-channel-permissions-json-params */
export interface DiscordEditChannelPermissions {
  /** the bitwise value of all allowed permissions */
  allow: string;
  /** the bitwise value of all disallowed permissions */
  deny: string;
  /** 0 for a role or 1 for a member */
  type: number;
}

/** https://discord.com/developers/docs/resources/channel#follow-news-channel-json-params */
export interface DiscordFollowNewsChannelParams {
  /** id of target channel */
  webhook_channel_id: string;
}
