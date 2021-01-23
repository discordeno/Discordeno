import {
  channelOverwriteHasPermission,
  createInvite,
  deleteMessages,
  editChannel,
  followChannel,
  getChannelInvites,
  getChannelWebhooks,
  getMessage,
  getMessages,
  getPins,
  isChannelSynced,
  sendMessage,
} from "./channel.ts";
import {
  ban,
  categoryChildrenIDs,
  createEmoji,
  createGuildChannel,
  createGuildFromTemplate,
  createGuildRole,
  createGuildTemplate,
  createServer,
  deleteChannel,
  deleteEmoji,
  deleteGuildTemplate,
  deleteIntegration,
  deleteRole,
  deleteServer,
  editEmoji,
  editGuild,
  editGuildTemplate,
  editIntegration,
  editRole,
  editWidget,
  emojiURL,
  fetchMembers,
  getAuditLogs,
  getBan,
  getBans,
  getChannel,
  getChannels,
  getGuild,
  getGuildTemplate,
  getGuildTemplates,
  getIntegrations,
  getInvites,
  getMember,
  getMembersByQuery,
  getPruneCount,
  getRoles,
  getUser,
  getVanityURL,
  getVoiceRegions,
  getWebhooks,
  getWidgetSettings,
  guildBannerURL,
  guildIconURL,
  guildSplashURL,
  leaveGuild,
  pruneMembers,
  swapChannels,
  swapRoles,
  syncGuildTemplate,
  syncIntegration,
  unban,
} from "./guild.ts";
import {
  addRole,
  avatarURL,
  editBotProfile,
  editMember,
  kick,
  moveMember,
  rawAvatarURL,
  removeRole,
  sendDirectMessage,
} from "./member.ts";
import {
  addReaction,
  addReactions,
  deleteMessage,
  deleteMessageByID,
  editMessage,
  getReactions,
  pin,
  publishMessage,
  removeAllReactions,
  removeReaction,
  removeReactionEmoji,
  removeUserReaction,
  unpin,
} from "./message.ts";
import { createWebhook, executeWebhook, getWebhook } from "./webhook.ts";

export let handlers = {
  // Channel handler
  channelOverwriteHasPermission,
  createInvite,
  deleteMessages,
  editChannel,
  followChannel,
  getChannelInvites,
  getChannelWebhooks,
  getMessage,
  getMessages,
  getPins,
  isChannelSynced,
  sendMessage,

  // Guild handler
  ban,
  categoryChildrenIDs,
  createEmoji,
  createGuildChannel,
  createGuildFromTemplate,
  createGuildRole,
  createGuildTemplate,
  createServer,
  deleteChannel,
  deleteEmoji,
  deleteGuildTemplate,
  deleteIntegration,
  deleteRole,
  deleteServer,
  editWidget,
  editEmoji,
  editGuild,
  editGuildTemplate,
  editIntegration,
  editRole,
  emojiURL,
  fetchMembers,
  getAuditLogs,
  getBan,
  getBans,
  getChannel,
  getChannels,
  getWidgetSettings,
  getGuild,
  getGuildTemplate,
  getGuildTemplates,
  getIntegrations,
  getInvites,
  getMember,
  getMembersByQuery,
  getPruneCount,
  getRoles,
  getUser,
  getVanityURL,
  getVoiceRegions,
  getWebhooks,
  guildBannerURL,
  guildIconURL,
  guildSplashURL,
  leaveGuild,
  pruneMembers,
  swapChannels,
  swapRoles,
  syncGuildTemplate,
  syncIntegration,
  unban,

  // Member handler
  addRole,
  avatarURL,
  editBotProfile,
  editMember,
  kick,
  moveMember,
  rawAvatarURL,
  removeRole,
  sendDirectMessage,

  // Message handler
  addReaction,
  addReactions,
  deleteMessage,
  deleteMessageByID,
  editMessage,
  getReactions,
  pin,
  publishMessage,
  removeAllReactions,
  removeReaction,
  removeReactionEmoji,
  removeUserReaction,
  unpin,

  // Webhook handler
  createWebhook,
  executeWebhook,
  getWebhook,
};

export type Handlers = typeof handlers;

export function updateHandlers(newHandlers: Partial<Handlers>) {
  handlers = {
    ...handlers,
    ...newHandlers,
  };
}
