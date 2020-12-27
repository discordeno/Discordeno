/** https://discord.com/developers/docs/resources/channel#channel-object-channel-structure */
export interface ChannelPayload {
  /** the id of this channel */
  id: string;
  /** the type of channel */
  type: ChannelTypes;
  /** the id of the guild */
  guild_id?: string;
  /** sorting position of the channel */
  position?: number;
  /** explicit permission overwrites for members and roles */
  permission_overwrites?: OverwritePayload[];
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
  recipients?: UserPayload[];
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

/** https://discord.com/developers/docs/resources/channel#channel-object-channel-types */
export enum ChannelTypes {
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

/** https://discord.com/developers/docs/resources/channel#message-object-message-structure */
export interface MessagePayload {
  /** id of the message */
  id: string;
  /** id of the channel the message was sent in */
  channel_id: string;
  /** id of the guild the message was sent in */
  guild_id?: string;
  /** the author of this message (not guaranteed to be a valid user) */
  author: UserPayload;
  /** member properties for this message's author */
  member?: Partial<GuildMemberPayload>;
  /** contents of the message */
  content: string;
  /** when this message was sent */
  timestamp: string;
  /** when this message was edited (or null if never) */
  edited_timestamp: string | null;
  /** whether this was a TTS message */
  tts: boolean;
  /** whether this message mentions everyone */
  mention_everyone: boolean;
  /** users specifically mentioned in the message */
  mentions: (UserPayload & Partial<GuildMemberPayload>)[];
  /** roles specifically mentioned in this message */
  mention_roles: string[];
  /** channels specifically mentioned in this message */
  mention_channels?: ChannelMentionPayload[];
  /** any attached files */
  attachments: AttachmentPayload[];
  /** any embedded content */
  embeds: EmbedPayload[];
  /** reactions to the message */
  reactions?: ReactionPayload[];
  /** used for validating a message was sent */
  nonce?: number | string;
  /** whether this message is pinned */
  pinned: boolean;
  /** if the message is generated by a webhook, this is the webhook's id */
  webhook_id?: string;
  /** type of message */
  type: MessageTypes;
  /** sent with Rich Presence-related chat embeds */
  activity?: MessageActivitypayload;
  /** sent with Rich Presence-related chat embeds */
  application?: MessageApplicationPayload;
  /** reference data sent with crossposted messages and replies */
  message_reference?: MessageReferencePayload;
  /** message flags combined as a bitfield */
  flags?: MessageFlags;
  /** the stickers sent with the message (bots currently can only receive messages with stickers, not send) */
  stickers?: MessageStickerPayload[];
  /** the message associated with the `message_reference` */
  referenced_message?: MessagePayload | null;
}

/** https://discord.com/developers/docs/resources/channel#message-object-message-types */
export enum MessageTypes {
  DEFAULT,
  RECIPIENT_ADD,
  RECIPIENT_REMOVE,
  CALL,
  CHANNEL_NAME_CHANGE,
  CHANNEL_ICON_CHANGE,
  CHANNEL_PINNED_MESSAGE,
  GUILD_MEMBER_JOIN,
  USER_PREMIUM_GUILD_SUBSCRIPTION,
  USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_1,
  USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_2,
  USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_3,
  CHANNEL_FOLLOW_ADD,
  GUILD_DISCOVERY_DISQUALIFIED = 14,
  GUILD_DISCOVERY_REQUALIFIED,
  REPLY = 19,
  APPLICATION_COMMAND,
}

/** https://discord.com/developers/docs/resources/channel#message-object-message-activity-structure */
export interface MessageActivityPayload {
  /** type of message activity */
  type: MessageActivityTypes;
  /** party_id from a Rich Presence event */
  party_id?: string;
}

/** https://discord.com/developers/docs/resources/channel#message-object-message-application-structure */
export interface MessageApplicationPayload {
  /** id of the application */
  id: string;
  /** id of the embed's image asset */
  cover_image?: string;
  /** application's description */
  description: string;
  /** id of the application's icon */
  icon: string | null;
  /** name of the application */
  name: string;
}

/** https://discord.com/developers/docs/resources/channel#message-object-message-reference-structure */
export interface MessageReferencePayload {
  /** id of the originating message */
  message_id?: string;
  /** id of the originating message's channel */
  channel_id?: string;
  /** id of the originating message's guild */
  guild_id?: string;
}

/** https://discord.com/developers/docs/resources/channel#message-object-message-activity-types */
export enum MessageActivityTypes {
  JOIN = 1,
  SPECTATE,
  LISTEN,
  JOIN_REQUEST = 5,
}

/** https://discord.com/developers/docs/resources/channel#message-object-message-flags */
export enum MessageFlags {
  /** this message has been published to subscribed channels (via Channel Following) */
  CROSSPOSTED = 1 << 0,
  /** this message originated from a message in another channel (via Channel Following) */
  IS_CROSSPOST = 1 << 1,
  /** do not include any embeds when serializing this message */
  SUPPRESS_EMBEDS = 1 << 2,
  /** the source message for this crosspost has been deleted (via Channel Following) */
  SOURCE_MESSAGE_DELETED = 1 << 3,
  /** this message came from the urgent message system */
  URGENT = 1 << 4,
}

/** https://discord.com/developers/docs/resources/channel#message-object-message-sticker-structure */
export interface MessageStickerPayload {
  /** id of the sticker */
  id: string;
  /** id of the pack the sticker is from */
  pack_id: string;
  /** name of the sticker */
  name: string;
  /** description of the sticker */
  description: string;
  /** a comma-separated list of tags for the sticker */
  tags?: string;
  /** sticker asset hash */
  asset: string;
  /** sticker preview asset hash */
  preview_asset: string | null;
  /** type of sticker format */
  format_type: number;
}

/** https://discord.com/developers/docs/resources/channel#message-object-message-sticker-format-types */
export enum MessageStickerFormatTypes {
  PNG = 1,
  APNG,
  LOTTIE,
}

/** https://discord.com/developers/docs/resources/channel#followed-channel-object-followed-channel-structure */
export interface FollowedChannelPayload {
  /** source channel id */
  channel_id: string;
  /** created target webhook id */
  webhook_id: string;
}

/** https://discord.com/developers/docs/resources/channel#reaction-object-reaction-structure */
export interface ReactionPayload {
  /** times this emoji has been used to react */
  count: number;
  /** whether the current user reacted using this emoji */
  me: boolean;
  /** emoji information */
  emoji: Partial<EmojiPayload>;
}

export interface OverwritePayload {
  /** role or user id */
  id: string;
  /** either 0 (role) or 1 (member) */
  type: number;
  /** permission bit set */
  allow: string;
  /** permission bit set */
  deny: string;
}

/** https://discord.com/developers/docs/resources/channel#embed-object-embed-structure */
export interface EmbedPayload {
  /** title of embed */
  title?: string;
  /** type of embed (always "rich" for webhook embeds) */
  type?: string;
  /** description of embed */
  description?: string;
  /** url of embed */
  url?: string;
  /** timestamp of embed content */
  timestamp?: string;
  /** color code of the embed */
  color?: number;
  /** footer information */
  footer?: EmbedFooterPayload;
  /** image information */
  image?: EmbedImagePayload;
  /** thumbnail information */
  thumbnail?: EmbedThumbnailPayload;
  /** video information */
  video?: EmbedVideoPayload;
  /** provider information */
  provider?: EmbedProviderPayload;
  /** author information */
  author?: EmbedAuthorPayload;
  /** fields information */
  fields?: EmbedFieldPayload[];
}

/** https://discord.com/developers/docs/resources/channel#embed-object-embed-types */
export type EmbedTypes =
  | "rich"
  | "image"
  | "video"
  | "gifv"
  | "article"
  | "link";

/** https://discord.com/developers/docs/resources/channel#embed-object-embed-thumbnail-structure */
export interface EmbedThumbnailPayload {
  /** source url of thumbnail (only supports http(s) and attachments) */
  url?: string;
  /** a proxied url of the thumbnail */
  proxy_url?: string;
  /** height of thumbnail */
  height?: number;
  /** width of thumbnail */
  width?: number;
}

/** https://discord.com/developers/docs/resources/channel#embed-object-embed-video-structure */
export interface EmbedVideoPayload {
  /** source url of video */
  url?: string;
  /** height of video */
  height?: number;
  /** width of video */
  width?: number;
}

/** https://discord.com/developers/docs/resources/channel#embed-object-embed-image-structure */
export interface EmbedImagePayload {
  /** source url of image (only supports http(s) and attachments) */
  url?: string;
  /** a proxied url of the image */
  proxy_url?: string;
  /** height of image */
  height?: number;
  /** width of image */
  width?: number;
}

/** https://discord.com/developers/docs/resources/channel#embed-object-embed-provider-structure */
export interface EmbedProviderPayload {
  /** name of provider */
  name?: string;
  /** url of provider */
  url?: string;
}

/** https://discord.com/developers/docs/resources/channel#embed-object-embed-author-structure */
export interface EmbedAuthorPayload {
  /** name of author */
  name?: string;
  /** url of author */
  url?: string;
  /** url of author icon (only supports http(s) and attachments) */
  icon_url?: string;
  /** a proxied url of author icon */
  proxy_icon_url?: string;
}

/** https://discord.com/developers/docs/resources/channel#embed-object-embed-footer-structure */
export interface EmbedFooterPayload {
  /** footer text */
  text: string;
  /** url of footer icon (only supports http(s) and attachments) */
  icon_url?: string;
  /** a proxied url of footer icon */
  proxy_icon_url?: string;
}

/** https://discord.com/developers/docs/resources/channel#embed-object-embed-field-structure */
export interface EmbedFieldPayload {
  /** name of the field */
  name: string;
  /** value of the field */
  value: string;
  /** whether or not this field should display inline */
  inline?: boolean;
}

/** https://discord.com/developers/docs/resources/channel#attachment-object-attachment-structure */
export interface AttachmentPayload {
  /** attachment id */
  id: string;
  /** name of file attached */
  filename: string;
  /** size of file in bytes */
  size: number;
  /** source url of file */
  url: string;
  /** a proxied url of file */
  proxy_url: string;
  /** height of file (if image) */
  height: number | null;
  /** width of file (if image) */
  width: number | null;
}

/** https://discord.com/developers/docs/resources/channel#channel-mention-object-channel-mention-structure */
export interface ChannelMentionPayload {
  /** id of the channel */
  id: string;
  /** id of the guild containing the channel */
  guild_id: string;
  /** the type of channel */
  type: ChannelTypes;
  /** the name of the channel */
  name: string;
}

/** https://discord.com/developers/docs/resources/channel#allowed-mentions-object-allowed-mention-types */
export enum AllowedMentionTypes {
  /** Controls role mentions */
  RoleMentions = "roles",
  /** Controls user mentions */
  UserMentions = "users",
  /** Controls `@everyone` and `@here` mentions */
  EveryoneMentions = "everyone",
}

/** https://discord.com/developers/docs/resources/channel#allowed-mentions-object-allowed-mentions-structure */
export interface AllowedMentionsPayload {
  /** An array of allowed mention types to parse from the content. */
  parse: AllowedMentionTypes[];
  /** Array of role_ids to mention (Max size of 100) */
  roles: string[];
  /** Array of user_ids to mention (Max size of 100) */
  users: string[];
  /** For replies, whether to mention the author of the message being replied to (default false) */
  replied_user: boolean;
}

/** https://discord.com/developers/docs/resources/channel#modify-channel-json-params */
export interface ModifyChannelParams {
  /** 2-100 character channel name */
  name: string;
  /** the type of channel; only conversion between text and news is supported and only in guilds with the "NEWS" feature */
  type: ChannelTypes;
  /** the position of the channel in the left-hand listing */
  position: number | null;
  /** 0-1024 character channel topic */
  topic: string | null;
  /** whether the channel is nsfw */
  nsfw: boolean | null;
  /** amount of seconds a user has to wait before sending another message (0-21600); bots, as well as users with the permission `MANAGE_MESSAGES` or `MANAGE_CHANNELS`, are unaffected */
  rate_limit_per_user: number | null;
  /** the bitrate (in bits) of the voice channel; 8000 to 96000 (128000 for VIP servers) */
  bitrate: number | null;
  /** the user limit of the voice channel; 0 refers to no limit, 1 to 99 refers to a user limit */
  user_limit: number | null;
  /** channel or category-specific permissions */
  permission_overwrites: OverwritePayload[] | null;
  /** id of the new parent category for a channel */
  parent_id: string | null;
}

/** https://discord.com/developers/docs/resources/channel#get-channel-messages-query-string-params */
export interface GetChannelMessagesParams {
  /** get messages around this message ID */
  around?: string;
  /** get messages before this message ID */
  before?: string;
  /** get messages after this message ID */
  after?: string;
  /** max number of messages to return (1-100) */
  limit?: number;
}

// TODO: add/update appropriate undefined and null fields
/** https://discord.com/developers/docs/resources/channel#create-message-params */
export interface CreateMessageParams {
  /** the message contents (up to 2000 characters) */
  content: string;
  /** a nonce that can be used for optimistic message sending */
  nonce: number | string;
  /** `true` if this is a TTS message */
  tts: boolean;
  /** the contents of the file being sent */
  file: unknown;
  /** embedded rich content */
  embed: EmbedPayload;
  /** JSON encoded body of any additional request fields. */
  payload_json: string;
  /** allowed mentions for a message */
  allowed_mentions: AllowedMentionsPayload;
  /** include to make your message a reply */
  message_reference: MessageReferencePayload;
}

/** https://discord.com/developers/docs/resources/channel#get-reactions-query-string-params */
export interface GetReactionsParams {
  /** get users before this user ID */
  before?: string;
  /** get users after this user ID */
  after?: string;
  /** max number of users to return (1-100) */
  limit?: number;
}

/** https://discord.com/developers/docs/resources/channel#edit-message-json-params */
export interface EditMessageParams {
  /** the new message contents (up to 2000 characters) */
  content?: string | null;
  /** embedded rich content */
  embed?: EmbedPayload | null;
  /** edit the flags of a message (only SUPPRESS_EMBEDS can currently be set/unset) */
  flags?: MessageFlags | null;
  /** allowed mentions for the message */
  allowed_mentions?: AllowedMentionsPayload | null;
}

/** https://discord.com/developers/docs/resources/channel#bulk-delete-messages-json-params */
export interface BulkDeleteMessagesParams {
  /** an array of message ids to delete (2-100) */
  messages: string[];
}

/** https://discord.com/developers/docs/resources/channel#edit-channel-permissions-json-params */
export interface EditChannelPermissions {
  /** the bitwise value of all allowed permissions */
  allow: string;
  /** the bitwise value of all disallowed permissions */
  deny: string;
  /** 0 for a role or 1 for a member */
  type: number;
}

/** https://discord.com/developers/docs/resources/channel#create-channel-invite-json-params */
export interface CreateChannelInviteParams {
  /** duration of invite in seconds before expiry, or 0 for never */
  max_age?: number;
  /** max number of uses or 0 for unlimited */
  max_uses?: number;
  /** whether this invite only grants temporary membership */
  temporary?: boolean;
  /** if true, don't try to reuse a similar invite (useful for creating many unique one time use invites) */
  unique?: boolean;
  /** the target user id for this invite */
  target_user?: string;
  /** the type of target user for this invite */
  target_user_type?: number;
}

/** https://discord.com/developers/docs/resources/channel#follow-news-channel-json-params */
export interface FollowNewsChannelParams {
  /** id of target channel */
  webhook_channel_id: string;
}

/** https://discord.com/developers/docs/resources/channel#group-dm-add-recipient-json-params */
export interface GroupDMAddRecipientParams {
  /** access token of a user that has granted your app the gdm.join scope */
  access_token: string;
  /** nickname of the user being added */
  nick: string;
}
