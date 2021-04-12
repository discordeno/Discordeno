import { DiscordenoChannel } from "../../structures/channel.ts";
import { DiscordenoGuild } from "../../structures/guild.ts";
import { DiscordenoMember } from "../../structures/member.ts";
import { DiscordenoMessage } from "../../structures/message.ts";
import { DiscordenoRole } from "../../structures/role.ts";
import { Collection } from "../../util/collection.ts";
import { IntegrationCreateUpdate } from "../integration/integration_create_update.ts";
import { ApplicationCommandCreateUpdateDelete } from "../interactions/application_command_create_update_delete.ts";
import {
  Channel,
  DiscordGatewayPayload,
  DiscordMessageReactionRemoveAll,
  Emoji,
  GatewayPayload,
  IntegrationDelete,
  Interaction,
  InviteCreate,
  InviteDelete,
  MessageReactionAdd,
  MessageReactionRemove,
  PresenceUpdate,
  TypingStart,
  User,
  VoiceState,
} from "../mod.ts";
import { VoiceServerUpdate } from "../voice/voice_server_update.ts";
import { DebugArg } from "./debug_arg.ts";
import { GuildUpdateChange } from "./guild_update_change.ts";

export interface EventHandlers {
  /** Sent when a new Slash Command is created, relevant to the current user. */
  applicationCommandCreate?: (
    data: ApplicationCommandCreateUpdateDelete
  ) => unknown;
  /** Sent when a Slash Command relevant to the current user is updated. */
  applicationCommandUpdate?: (
    data: ApplicationCommandCreateUpdateDelete
  ) => unknown;
  /** Sent when a Slash Command relevant to the current user is deleted. */
  applicationCommandDelete?: (
    data: ApplicationCommandCreateUpdateDelete
  ) => unknown;
  /** Sent when properties about the user change. */
  botUpdate?: (user: User) => unknown;
  /** Sent when a new guild channel is created, relevant to the current user. */
  channelCreate?: (channel: Channel) => unknown;
  /** Sent when a channel is updated. This is not sent when the field `last_message_id` is altered. To keep track of the `last_message_id` changes, you must listen for `MESSAGE_CREATE` events. */
  channelUpdate?: (channel: Channel, oldChannel: Channel) => unknown;
  /** Sent when a channel relevant to the current user is deleted. */
  channelDelete?: (channel: Channel) => unknown;
  debug?: (args: string | DebugArg, data?: string) => unknown;
  /** Sent before every event. Discordeno awaits the execution of this event before main event gets sent. */
  dispatchRequirements?: (
    data: DiscordGatewayPayload,
    shardId: number
  ) => unknown;
  /** Sent when a user is banned from a guild. */
  guildBanAdd?: (
    guild: DiscordenoGuild,
    user: User,
    member?: DiscordenoMember
  ) => unknown;
  /** Sent when a user is unbanned from a guild. */
  guildBanRemove?: (
    guild: DiscordenoGuild,
    user: User,
    member?: DiscordenoMember
  ) => unknown;
  /**
   * This event can be sent in three different scenarios:
   * 1. When a user is initially connecting, to lazily load and backfill information for all unavailable guilds sent in the `READY` event. Guilds that are unavailable due to an outage will send a `GUILD_DELETE` event.
   * 2. When a Guild becomes available again to the client.
   * 3. When the current user joins a new Guild.
   *
   * This event does not get sent on startup
   */
  guildCreate?: (guild: DiscordenoGuild) => unknown;
  /** This event does get sent on start when shards are loading the guilds */
  guildLoaded?: (guild: DiscordenoGuild) => unknown;
  /** When a guild goes unavailable this event will be ran. */
  guildAvailable?: (guild: DiscordenoGuild) => unknown;
  /** Sent when a guild is updated. */
  guildUpdate?: (
    guild: DiscordenoGuild,
    changes: GuildUpdateChange[]
  ) => unknown;
  /** Sent when a guild becomes or was already unavailable due to an outage, or when the user leaves or is removed from a guild. If the `unavailable` field is not set, the user was removed from the guild. */
  guildDelete?: (guild: DiscordenoGuild) => unknown;
  /** Sent when a guild's emojis have been updated. */
  guildEmojisUpdate?: (
    guild: DiscordenoGuild,
    emojis: Collection<string, Emoji>,
    oldEmojis: Collection<string, Emoji>
  ) => unknown;
  /** Sent when a new user joins a guild. */
  guildMemberAdd?: (
    guild: DiscordenoGuild,
    member: DiscordenoMember
  ) => unknown;
  /** Sent when a user is removed from a guild (leave/kick/ban). */
  guildMemberRemove?: (
    guild: DiscordenoGuild,
    user: User,
    member?: DiscordenoMember
  ) => unknown;
  /** Sent when a guild member is updated. This will also fire when the user object of a guild member changes. */
  guildMemberUpdate?: (
    guild: DiscordenoGuild,
    member: DiscordenoMember,
    oldMember?: DiscordenoMember
  ) => unknown;
  // TODO: remove this?
  //heartbeat?: () => unknown;
  /** Sent when a user in a guild uses a Slash Command. */
  interactionCreate?: (
    data: Omit<Interaction, "member"> & { member: DiscordenoMember }
  ) => unknown;
  /** Sent when a message is created. */
  messageCreate?: (message: DiscordenoMessage) => unknown;
  /** Sent when a message is deleted. */
  messageDelete?: (
    partial: { id: string; channel: DiscordenoChannel },
    message?: DiscordenoMessage
  ) => unknown;
  /** Sent when a message is updated. */
  messageUpdate?: (
    message: DiscordenoMessage,
    oldMessage: DiscordenoMessage
  ) => unknown;
  /** Sent when a user updates its nickname */
  nicknameUpdate?: (
    guild: DiscordenoGuild,
    member: DiscordenoMember,
    nickname: string,
    oldNickname?: string
  ) => unknown;
  /** A user's presence is their current state on a guild. This event is sent when a user's presence or info, such as name or avatar, is updated. */
  presenceUpdate?: (
    presence: PresenceUpdate,
    oldPresence?: PerformanceEntry
  ) => unknown;
  /** Sent before every event execution. Discordeno will not await its execution. */
  raw?: (data: GatewayPayload) => unknown;
  // TODO: remove this?
  // rawGateway?: (data: unknown) => unknown;
  /** Sent when all shards went ready. */
  ready?: () => unknown;
  /** Sent when a user adds a reaction to a message. */
  reactionAdd?: (
    data: MessageReactionAdd,
    member?: DiscordenoMember,
    message?: DiscordenoMessage
  ) => unknown;
  /** Sent when a user removes a reaction from a message. */
  reactionRemove?: (
    data: MessageReactionRemove,
    message?: DiscordenoMessage
  ) => unknown;
  /** Sent when a user explicitly removes all reactions from a message. */
  reactionRemoveAll?: (payload: DiscordMessageReactionRemoveAll) => unknown;
  /** Sent when a bot removes all instances of a given emoji from the reactions of a message. */
  reactionRemoveEmoji?: (
    emoji: Partial<Emoji>,
    messageId: string,
    channelId: string,
    guildId?: string
  ) => unknown;
  /** Sent when a guild role is created. */
  roleCreate?: (guild: DiscordenoGuild, role: DiscordenoRole) => unknown;
  /** Sent when a guild role is deleted. */
  roleDelete?: (guild: DiscordenoGuild, role: DiscordenoRole) => unknown;
  /** Sent when a guild role is updated. */
  roleUpdate?: (
    guild: DiscordenoGuild,
    role: DiscordenoRole,
    old: DiscordenoRole
  ) => unknown;
  roleGained?: (
    guild: DiscordenoGuild,
    member: DiscordenoMember,
    roleId: string
  ) => unknown;
  roleLost?: (
    guild: DiscordenoGuild,
    member: DiscordenoMember,
    roleId: string
  ) => unknown;
  shardReady?: (shardId: number) => unknown;
  /** Sent when a user starts typing in a channel. */
  typingStart?: (data: TypingStart) => unknown;
  /** Sent when a user joins a voice channel */
  voiceChannelJoin?: (member: DiscordenoMember, channelId: string) => unknown;
  /** Sent when a user leaves a voice channel. Does not get sent when user switches the voice channel */
  voiceChannelLeave?: (member: DiscordenoMember, channelId: string) => unknown;
  /** Sent when a user switches the voice channel */
  voiceChannelSwitch?: (
    member: DiscordenoMember,
    channelId: string,
    oldChannelId: string
  ) => unknown;
  /** Sent when a voice server is updated with information for making the bot connect to a voice channel. */
  voiceServerUpdate?: (
    payload: VoiceServerUpdate,
    guild: DiscordenoGuild
  ) => unknown;
  /** Sent when someone joins/leaves/moves voice channels. */
  voiceStateUpdate?: (
    member: DiscordenoMember,
    voiceState: VoiceState
  ) => unknown;
  /** Sent when a guild channel's webhook is created, updated, or deleted. */
  webhooksUpdate?: (channelId: string, guildId: string) => unknown;
  /** Sent when a member has passed the guild's Membership Screening requirements */
  membershipScreeningPassed?: (
    guild: DiscordenoGuild,
    member: DiscordenoMember
  ) => unknown;
  /** Sent when an integration is created on a server such as twitch, youtube etc.. */
  integrationCreate?: (data: IntegrationCreateUpdate) => unknown;
  /** Sent when an integration is updated. */
  integrationUpdate?: (data: IntegrationCreateUpdate) => unknown;
  /** Sent when an integration is deleted. */
  integrationDelete?: (data: IntegrationDelete) => undefined;
  /** Sent when a new invite to a channel is created. */
  inviteCreate?: (data: InviteCreate) => unknown;
  /** Sent when an invite is deleted. */
  inviteDelete?: (data: InviteDelete) => unknown;
}
