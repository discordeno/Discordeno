import { DiscordMember } from "./member.ts";
import { DiscordBaseMember, DiscordChannelTypes, DiscordUser, DiscordEmoji, DiscordEmbed } from "./mod.ts";

/** https://discord.com/developers/docs/resources/channel#message-object-message-structure */
export interface DiscordMessage {
  /** id of the message */
  id: string;
  /** id of the channel the message was sent in */
  channel_id: string;
  /** id of the guild the message was sent in */
  guild_id?: string;
  /** the author of this message (not guaranteed to be a valid user) */
  author: DiscordUser;
  /** member properties for this message's author */
  member?: DiscordBaseMember;
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
  mentions: (DiscordUser & Partial<DiscordMember>)[];
  /** roles specifically mentioned in this message */
  mention_roles: string[];
  /** channels specifically mentioned in this message */
  mention_channels?: DiscordChannelMention[];
  /** any attached files */
  attachments: DiscordAttachment[];
  /** any embedded content */
  embeds: DiscordEmbed[];
  /** reactions to the message */
  reactions?: DiscordReaction[];
  /** used for validating a message was sent */
  nonce?: number | string;
  /** whether this message is pinned */
  pinned: boolean;
  /** if the message is generated by a webhook, this is the webhook's id */
  webhook_id?: string;
  /** type of message */
  type: DiscordMessageTypes;
  /** sent with Rich Presence-related chat embeds */
  activity?: DiscordMessageActivity;
  /** sent with Rich Presence-related chat embeds */
  application?: DiscordMessageApplication;
  /** reference data sent with crossposted messages and replies */
  message_reference?: DiscordMessageReference;
  /** message flags combined as a bitfield */
  flags?: DiscordMessageFlags;
  /** the stickers sent with the message (bots currently can only receive messages with stickers, not send) */
  stickers?: DiscordMessageSticker[];
  /** the message associated with the `message_reference` */
  referenced_message?: DiscordMessage | null;
}

/** https://discord.com/developers/docs/resources/channel#message-object-message-types */
export enum DiscordMessageTypes {
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
  GUILD_DISCOVERY_GRACE_PERIOD_INITIAL_WARNING,
  GUILD_DISCOVERY_GRACE_PERIOD_FINAL_WARNING,
  REPLY = 19,
  APPLICATION_COMMAND,
}

/** https://discord.com/developers/docs/resources/channel#message-object-message-activity-structure */
export interface DiscordMessageActivity {
  /** type of message activity */
  type: DiscordMessageActivityTypes;
  /** party_id from a Rich Presence event */
  party_id?: string;
}

/** https://discord.com/developers/docs/resources/channel#message-object-message-application-structure */
export interface DiscordMessageApplication {
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
export interface DiscordMessageReference {
  /** id of the originating message */
  message_id?: string;
  /** id of the originating message's channel */
  channel_id?: string;
  /** id of the originating message's guild */
  guild_id?: string;
}

/** https://discord.com/developers/docs/resources/channel#message-object-message-activity-types */
export enum DiscordMessageActivityTypes {
  JOIN = 1,
  SPECTATE,
  LISTEN,
  JOIN_REQUEST = 5,
}

/** https://discord.com/developers/docs/resources/channel#message-object-message-flags */
export enum DiscordMessageFlags {
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
export interface DiscordMessageSticker {
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
  format_type: DiscordMessageStickerFormatTypes;
}

/** https://discord.com/developers/docs/resources/channel#message-object-message-sticker-format-types */
export enum DiscordMessageStickerFormatTypes {
  PNG = 1,
  APNG,
  LOTTIE,
}

/** https://discord.com/developers/docs/resources/channel#reaction-object-reaction-structure */
export interface DiscordReaction {
  /** times this emoji has been used to react */
  count: number;
  /** whether the current user reacted using this emoji */
  me: boolean;
  /** emoji information */
  emoji: Partial<DiscordEmoji>;
}

/** https://discord.com/developers/docs/resources/channel#attachment-object-attachment-structure */
export interface DiscordAttachment {
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
  height?: number | null;
  /** width of file (if image) */
  width?: number | null;
}

/** https://discord.com/developers/docs/resources/channel#channel-mention-object-channel-mention-structure */
export interface DiscordChannelMention {
  /** id of the channel */
  id: string;
  /** id of the guild containing the channel */
  guild_id: string;
  /** the type of channel */
  type: DiscordChannelTypes;
  /** the name of the channel */
  name: string;
}

/** https://discord.com/developers/docs/resources/channel#allowed-mentions-object-allowed-mention-types */
export enum AllowedMentionTypes {
  /** Controls role mentions */
  ROLES = "roles",
  /** Controls user mentions */
  USERS = "users",
  /** Controls `@everyone` and `@here` mentions */
  EVERYONE = "everyone",
}

/** https://discord.com/developers/docs/resources/channel#allowed-mentions-object-allowed-mentions-structure */
export interface DiscordAllowedMentions {
  /** An array of allowed mention types to parse from the content. */
  parse: AllowedMentionTypes[];
  /** Array of role_ids to mention (Max size of 100) */
  roles: string[];
  /** Array of user_ids to mention (Max size of 100) */
  users: string[];
  /** For replies, whether to mention the author of the message being replied to (default false) */
  replied_user: boolean;
}

/** https://discord.com/developers/docs/resources/channel#get-channel-messages-query-string-params */
export interface DiscordGetChannelMessagesParams {
  /** get messages around this message ID */
  around?: string;
  /** get messages before this message ID */
  before?: string;
  /** get messages after this message ID */
  after?: string;
  /** max number of messages to return (1-100) */
  limit?: number;
}

/** https://discord.com/developers/docs/resources/channel#create-message-params */
export interface DiscordCreateMessageParams {
  /** the message contents (up to 2000 characters) */
  content?: string;
  /** a nonce that can be used for optimistic message sending */
  nonce?: number | string;
  /** `true` if this is a TTS message */
  tts: boolean;
  /** the contents of the file being sent */
  file?: { blob: unknown; name: string };
  /** embedded rich content */
  embed?: DiscordEmbed;
  /** JSON encoded body of any additional request fields. */
  payload_json?: string;
  /** allowed mentions for a message */
  allowed_mentions?: DiscordAllowedMentions;
  /** include to make your message a reply */
  message_reference?: DiscordMessageReference;
}

/** https://discord.com/developers/docs/resources/channel#get-reactions-query-string-params */
export interface DiscordGetReactionsParams {
  /** get users before this user ID */
  before?: string;
  /** get users after this user ID */
  after?: string;
  /** max number of users to return (1-100) */
  limit?: number;
}

/** https://discord.com/developers/docs/resources/channel#edit-message-json-params */
export interface DiscordEditMessageParams {
  /** the new message contents (up to 2000 characters) */
  content?: string | null;
  /** embedded rich content */
  embed?: DiscordEmbed | null;
  /** edit the flags of a message (only SUPPRESS_EMBEDS can currently be set/unset) */
  flags?: DiscordMessageFlags | null;
  /** allowed mentions for the message */
  allowed_mentions?: DiscordAllowedMentions | null;
}

/** https://discord.com/developers/docs/resources/channel#bulk-delete-messages-json-params */
export interface DiscordBulkDeleteMessagesParams {
  /** an array of message ids to delete (2-100) */
  messages: string[];
}