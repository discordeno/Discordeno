import { DiscordenoChannel } from "../../structures/channel.ts";
import { DiscordenoGuild } from "../../structures/guild.ts";
import { DiscordenoMember } from "../../structures/member.ts";
import { DiscordenoMessage } from "../../structures/message.ts";
import { DiscordenoRole } from "../../structures/role.ts";
import { Collection } from "../../util/collection.ts";
import { ThreadMember } from "../channels/threads/thread_member.ts";
import { ThreadMembersUpdate } from "../channels/threads/thread_members_update.ts";
import { IntegrationCreateUpdate } from "../integrations/integration_create_update.ts";
import { ApplicationCommandCreateUpdateDelete } from "../interactions/commands/application_command_create_update_delete.ts";
import {
  DiscordGatewayPayload, Emoji, GatewayPayload, IntegrationDelete, Interaction, InviteCreate, InviteDelete, MessageReactionAdd, MessageReactionRemove, MessageReactionRemoveAll, PresenceUpdate, TypingStart, User, VoiceState
} from "../mod.ts";
import { VoiceServerUpdate } from "../voice/voice_server_update.ts";
import { DebugArg } from "./debug_arg.ts";
import { GuildUpdateChange } from "./guild_update_change.ts";

type EventHandlersTestT = {
  /** Test */
  applicationCommandCreate: [data: ApplicationCommandCreateUpdateDelete];
  applicationCommandUpdate: [data: ApplicationCommandCreateUpdateDelete];
  applicationCommandDelete: [data: ApplicationCommandCreateUpdateDelete];
  botUpdate: [user: User];
  channelCreate: [channel: DiscordenoChannel];
  channelUpdate: [channel: DiscordenoChannel, oldChannel: DiscordenoChannel];
  channelDelete: [channel: DiscordenoChannel];
  channelPinsUpdate: [channel: DiscordenoChannel, guild?: DiscordenoGuild, lastPinTimestamp?: string | null];
  debug: [args: string | DebugArg, data?: string];
  dispatchRequirements: [data: DiscordGatewayPayload, shardId: number];
  guildBanAdd: [guild: DiscordenoGuild, user: User, member?: DiscordenoMember];
  guildBanRemove: [guild: DiscordenoGuild, user: User, member?: DiscordenoMember];
  guildCreate: [guild: DiscordenoGuild];
  guildLoaded: [guild: DiscordenoGuild];
  guildAvailable: [guild: DiscordenoGuild];
  guildUnavailable: [guild: DiscordenoGuild];
  guildIntegrationsUpdate: [guild: DiscordenoGuild];
  guildUpdate: [guild: DiscordenoGuild, changes: GuildUpdateChange[]];
  guildDelete: [guild: DiscordenoGuild];
  guildEmojisUpdate: [guild: DiscordenoGuild, emojis: Collection<bigint, Emoji>, oldEmojis: Collection<bigint, Emoji>];
  guildMemberAdd: [guild: DiscordenoGuild, member: DiscordenoMember];
  guildMemberRemove: [guild: DiscordenoGuild, user: User, member?: DiscordenoMember];
  guildMemberUpdate: [guild: DiscordenoGuild, member: DiscordenoMember, oldMember?: DiscordenoMember];
  interactionCreate: [data: Omit<Interaction, "member">, member?: DiscordenoMember];
  interactionGuildCreate: [data: Omit<Interaction, "member">, member: DiscordenoMember];
  interactionDMCreate: [data: Omit<Interaction, "member">];
  messageCreate: [message: DiscordenoMessage];
  messageDelete: [partial: { id: string; channel: DiscordenoChannel }, message?: DiscordenoMessage];
  messageUpdate: [message: DiscordenoMessage, oldMessage: DiscordenoMessage];
  nicknameUpdate: [guild: DiscordenoGuild, member: DiscordenoMember, nickname: string, oldNickname?: string];
  presenceUpdate: [presence: PresenceUpdate, oldPresence?: PresenceUpdate];
  raw: [data: GatewayPayload];
  ready: [];
  reactionAdd: [data: MessageReactionAdd, message?: DiscordenoMessage];
  reactionRemove: [data: MessageReactionRemove, message?: DiscordenoMessage];
  reactionRemoveAll: [payload: MessageReactionRemoveAll, message?: DiscordenoMessage];
  reactionRemoveEmoji: [emoji: Partial<Emoji>, messageId: bigint, channelId: bigint, guildId?: bigint];
  roleCreate: [guild: DiscordenoGuild, role: DiscordenoRole];
  roleDelete: [guild: DiscordenoGuild, role: DiscordenoRole];
  roleUpdate: [guild: DiscordenoGuild, role: DiscordenoRole, old: DiscordenoRole];
  roleGained: [guild: DiscordenoGuild, member: DiscordenoMember, roleId: bigint];
  roleLost: [guild: DiscordenoGuild, member: DiscordenoMember, roleId: bigint];
  shardReady: [shardId: number];
  shardFailedToLoad: [shardId: number, unavailableGuildIds: Set<bigint>];
  threadCreate: [channel: DiscordenoChannel];
  threadUpdate: [cahnnel: DiscordenoChannel, oldChannel: DiscordenoChannel];
  threadListSync: [channels: Collection<bigint, DiscordenoChannel>, members: ThreadMember[], guildId: bigint];
  threadMemberUpdate: [threadMember: ThreadMember];
  threadMembersUpdate: [update: ThreadMembersUpdate];
  threadDelete: [channel: DiscordenoChannel];
  typingStart: [data: TypingStart];
  voiceChannelJoin: [member: DiscordenoMember, channelId: bigint];
  voiceChannelLeave: [member: DiscordenoMember, channelId: bigint];
  voiceChannelSwitch: [member: DiscordenoMember, channelId: bigint, oldChannelId: bigint];
  voiceServerUpdate: [payload: VoiceServerUpdate, guild: DiscordenoGuild];
  voiceStateUpdate: [member: DiscordenoMember, voiceState: VoiceState];
  webhooksUpdate: [channelId: bigint, guildId: bigint];
  membershipScreeningPassed: [guild: DiscordenoGuild, member: DiscordenoMember];
  integrationCreate: [data: IntegrationCreateUpdate];
  integrationUpdate: [data: IntegrationCreateUpdate];
  integrationDelete: [data: IntegrationDelete];
  inviteCreate: [data: InviteCreate];
  inviteDelete: [data: InviteDelete];
}

export type EventHandlerFunctions = {
  [E in keyof EventHandlersTestT]?: (...args: EventHandlersTestT[E]) => unknown;
};
