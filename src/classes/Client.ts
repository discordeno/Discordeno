import { EventEmitter } from "./deps.ts";

import { helpers } from "../helpers/mod.ts";
import { ClientOptions } from "./types/client_options.ts";
import {
  CreateGuild,
  CreateGuildChannel,
  CreateGuildEmoji,
  CreateMessage,
  DiscordImageFormat,
  DiscordImageSize,
  DiscordOverwrite,
  GetGuildAuditLog,
  GetGuildPruneCountQuery,
  GetGuildWidgetImageQuery,
  ListPublicArchivedThreads,
  ModifyChannel,
  ModifyGuild,
  ModifyGuildChannelPositions,
  ModifyGuildDiscoveryMetadata,
  ModifyGuildEmoji,
  ModifyGuildWelcomeScreen,
  ModifyThread,
  Overwrite,
  PermissionStrings,
  StartThread,
  UpdateOthersVoiceState,
  UpdateSelfVoiceState,
} from "../types/mod.ts";

export class Client extends EventEmitter {
  /** The bot's token */
  token: string;
  /** The timestamp when the bot started. */
  startedAt = Date.now();

  constructor(options: ClientOptions) {
    super();

    this.token = options.token;
  }

  // GETTERS

  get uptime() {
    return Date.now() - this.startedAt;
  }

  /** Start connecting shards?? */
  async connect() {
    // TODO: we might wana do this slightly differently
  }

  // CHANNEL HELPER METHODS

  /** Adds the current user to a thread. Returns a 204 empty response on success. Also requires the thread is not archived. Fires a Thread Members Update Gateway event.Adds another user to a thread. Requires the ability to send messages in the thread. Also requires the thread is not archived. Returns a 204 empty response on success. Fires a Thread Members Update Gateway event */
  addToThread(channelId: bigint, userId?: bigint) {
    return helpers.addToThread(channelId, userId);
  }

  /** Returns all active threads in the channel, including public and private threads. Threads are ordered by their id, in descending order. Requires the READ_MESSAGE_HISTORY permission. */
  getActiveThreads(channelId: bigint) {
    return helpers.getActiveThreads(channelId);
  }

  getArchivedThreads(
    channelId: bigint,
    options?:
      | (ListPublicArchivedThreads & {
        type?: "public" | "private" | "privateJoinedThreads" | undefined;
      })
      | undefined,
  ) {
    return helpers.getArchivedThreads(channelId, options);
  }

  /** Returns array of thread members objects that are members of the thread. */
  getThreadMembers(channelId: bigint) {
    return helpers.getThreadMembers(channelId);
  }

  /** Removes another user from a thread. Requires the MANAGE_THREADS permission or that you are the creator of the thread. Also requires the thread is not archived. Returns a 204 empty response on success. Fires a Thread Members Update Gateway event */
  removeFromThread(channelId: bigint, userId?: bigint) {
    return helpers.removeFromThread(channelId, userId);
  }

  /** Creates a new public thread from an existing message. Returns a channel on success, and a 400 BAD REQUEST on invalid parameters. Fires a Thread Create Gateway event. */
  startThread(
    channelId: bigint,
    options: StartThread & {
      messageId?: bigint | undefined;
    },
  ) {
    return helpers.startThread(channelId, options);
  }

  /** Gets all the channels ids that are the children of this category. */
  categoryChildren(id: bigint) {
    return helpers.categoryChildren(id);
  }

  /** Checks if a channel overwrite for a user id or a role id has permission in this channel */
  channelOverwriteHasPermission(
    guildId: bigint,
    id: bigint,
    overwrites: (Omit<DiscordOverwrite, "id" | "allow" | "deny"> & {
      id: bigint;
      allow: bigint;
      deny: bigint;
    })[],
    permissions: PermissionStrings[],
  ) {
    return helpers.channelOverwriteHasPermission(
      guildId,
      id,
      overwrites,
      permissions,
    );
  }

  /** Create a copy of a channel */
  cloneChannel(channelId: bigint, reason?: string) {
    return helpers.cloneChannel(channelId, reason);
  }

  /** Create a channel in your server. Bot needs MANAGE_CHANNEL permissions in the server. */
  createChannel(
    guildId: bigint,
    options?: CreateGuildChannel,
    reason?: string,
  ) {
    return helpers.createChannel(guildId, options, reason);
  }

  /** Creates a new Stage instance associated to a Stage channel. Requires the user to be a moderator of the Stage channel. */
  createStageInstance(channelId: bigint, topic: string) {
    return helpers.createStageInstance(channelId, topic);
  }

  /** Delete the channel permission overwrites for a user or role in this channel. Requires MANAGE_ROLES permission. */
  deleteChannelOverwrite(
    guildId: bigint,
    channelId: bigint,
    overwriteId: bigint,
  ) {
    return helpers.deleteChannelOverwrite(guildId, channelId, overwriteId);
  }

  /** Delete a channel in your server. Bot needs MANAGE_CHANNEL permissions in the server. */
  deleteChannel(channelId: bigint, reason?: string) {
    return helpers.deleteChannel(channelId, reason);
  }

  /** Deletes the Stage instance. Requires the user to be a moderator of the Stage channel. */
  deleteStageInstance(channelId: bigint) {
    return helpers.deleteStageInstance(channelId);
  }

  /** Edit the channel permission overwrites for a user or role in this channel. Requires `MANAGE_ROLES` permission. */
  editChannelOverwrite(
    guildId: bigint,
    channelId: bigint,
    overwriteId: bigint,
    options: Omit<Overwrite, "id">,
  ) {
    return helpers.editChannelOverwrite(
      guildId,
      channelId,
      overwriteId,
      options,
    );
  }

  /** Update a channel's settings. Requires the `MANAGE_CHANNELS` permission for the guild. */
  editChannel(
    channelId: bigint,
    options: ModifyChannel | ModifyThread,
    reason?: string,
  ) {
    return helpers.editChannel(channelId, options, reason);
  }

  /** Follow a News Channel to send messages to a target channel. Requires the `MANAGE_WEBHOOKS` permission in the target channel. Returns the webhook id. */
  followChannel(sourceChannelId: bigint, targetChannelId: bigint) {
    return helpers.followChannel(sourceChannelId, targetChannelId);
  }

  /** Gets the webhooks for this channel. Requires MANAGE_WEBHOOKS */
  getChannelWebhooks(channelId: bigint) {
    return helpers.getChannelWebhooks(channelId);
  }

  /** Fetches a single channel object from the api. */
  getChannel(channelId: bigint, addToCache = true) {
    return helpers.getChannel(channelId, addToCache);
  }

  /** Returns a list of guild channel objects. */
  getChannels(guildId: bigint, addToCache = true) {
    return helpers.getChannels(guildId, addToCache);
  }

  /** Get pinned messages in this channel. */
  getPins(channelId: bigint) {
    return helpers.getPins(channelId);
  }

  /** Gets the stage instance associated with the Stage channel, if it exists. */
  getStageInstance(channelId: bigint) {
    return helpers.getStageInstance(channelId);
  }

  /** Checks whether a channel is synchronized with its parent/category channel or not. */
  isChannelSynced(channelId: bigint) {
    return helpers.isChannelSynced(channelId);
  }

  /**
   * Trigger a typing indicator for the specified channel. Generally bots should **NOT** implement this route.
   * However, if a bot is responding to a command and expects the computation to take a few seconds,
   * this endpoint may be called to let the user know that the bot is processing their message.
 */
  startTyping(channelId: bigint) {
    return helpers.startTyping(channelId);
  }

  /** Modify the positions of channels on the guild. Requires MANAGE_CHANNELS permisison. */
  swapChannels(
    guildId: bigint,
    channelPositions: ModifyGuildChannelPositions[],
  ) {
    return helpers.swapChannels(guildId, channelPositions);
  }

  /** Updates fields of an existing Stage instance. Requires the user to be a moderator of the Stage channel. */
  updateStageInstance(channelId: bigint, topic: string) {
    return helpers.updateStageInstance(channelId, topic);
  }

  /**
   * Updates the a user's voice state, defaults to the current user
   * Caveats:
   *  - `channel_id` must currently point to a stage channel.
   *  - User must already have joined `channel_id`.
   *  - You must have the `MUTE_MEMBERS` permission. But can always suppress yourself.
   *  - When unsuppressed, non-bot users will have their `request_to_speak_timestamp` set to the current time. Bot users will not.
   *  - You must have the `REQUEST_TO_SPEAK` permission to request to speak. You can always clear your own request to speak.
   *  - You are able to set `request_to_speak_timestamp` to any present or future time.
   *  - When suppressed, the user will have their `request_to_speak_timestamp` removed.
 */
  updateVoiceState(
    guildId: bigint,
    options: UpdateSelfVoiceState | { userId: bigint } & UpdateOthersVoiceState,
  ) {
    return helpers.updateVoiceState(guildId, options);
  }

  // DISCOVERY METHODS

  /** Add a discovery subcategory to the guild. Requires the MANAGE_GUILD permission. */
  addDiscoverySubcategory(guildId: bigint, categoryId: number) {
    return helpers.addDiscoverySubcategory(guildId, categoryId);
  }

  /** Modify the discovery metadata for the guild. Requires the MANAGE_GUILD permission. Returns the updated discovery metadata object on success. */
  editDiscovery(guildId: bigint, data: ModifyGuildDiscoveryMetadata) {
    return helpers.editDiscovery(guildId, data);
  }

  /** Returns discovery category objects that can be used when editing guilds */
  getDiscoveryCategories() {
    return helpers.getDiscoveryCategories();
  }

  /** Removes a discovery subcategory from the guild. Requires the MANAGE_GUILD permission. Returns a 204 No Content on success. */
  removeDiscoverySubcategory(guildId: bigint, categoryId: number) {
    return helpers.removeDiscoverySubcategory(guildId, categoryId);
  }

  validDiscoveryTerm(term: string) {
    return helpers.validDiscoveryTerm(term);
  }

  // EMOJI METHODS

  /** Create an emoji in the server. Emojis and animated emojis have a maximum file size of 256kb. Attempting to upload an emoji larger than this limit will fail and return 400 Bad Request and an error message, but not a JSON status code. If a URL is provided to the image parameter, Discordeno will automatically convert it to a base64 string internally. */
  createEmoji(
    guildId: bigint,
    name: string,
    image: string,
    options: CreateGuildEmoji,
  ) {
    return helpers.createEmoji(guildId, name, image, options);
  }

  /** Delete the given emoji. Requires the MANAGE_EMOJIS permission. Returns 204 No Content on success. */
  deleteEmoji(guildId: bigint, id: bigint, reason?: string) {
    return helpers.deleteEmoji(guildId, id, reason);
  }

  /** Modify the given emoji. Requires the MANAGE_EMOJIS permission. */
  editEmoji(guildId: bigint, id: bigint, options: ModifyGuildEmoji) {
    return helpers.editEmoji(guildId, id, options);
  }

  /** Creates a url to the emoji from the Discord CDN. */
  emojiURL(id: bigint, animated?: boolean) {
    return helpers.emojiURL(id, animated);
  }

  /** Returns an emoji for the given guild and emoji Id. */
  getEmoji(guildId: bigint, emojiId: bigint, addToCache?: boolean) {
    return helpers.getEmoji(guildId, emojiId, addToCache);
  }

  /** Returns a list of emojis for the given guild. */
  getEmojis(guildId: bigint, addToCache?: boolean) {
    return helpers.getEmojis(guildId, addToCache);
  }

  // GUILD METHODS

  /** Create a new guild. Returns a guild object on success. Fires a Guild Create Gateway event. This endpoint can be used only by bots in less than 10 guilds. */
  createGuild(options: CreateGuild) {
    return helpers.createGuild(options);
  }

  /** Delete a guild permanently. User must be owner. Returns 204 No Content on success. Fires a Guild Delete Gateway event. */
  deleteGuild(guildId: bigint) {
    return helpers.deleteGuild(guildId);
  }

  /** Modify a guilds settings. Requires the MANAGE_GUILD permission. */
  editGuild(guildId: bigint, options: ModifyGuild) {
    return helpers.editGuild(guildId, options);
  }

  editWelcomeScreen(guildId: bigint, options: ModifyGuildWelcomeScreen) {
    return helpers.editWelcomeScreen(guildId, options);
  }

  /** Modify a guild widget object for the guild. Requires the MANAGE_GUILD permission. */
  editWidget(guildId: bigint, enabled: boolean, channelId?: string | null) {
    return helpers.editWidget(guildId, enabled, channelId);
  }

  /** Returns the audit logs for the guild. Requires VIEW AUDIT LOGS permission */
  getAuditLogs(guildId: bigint, options: GetGuildAuditLog) {
    return helpers.getAuditLogs(guildId, options);
  }

  /** Returns an array of voice regions that can be used when creating servers. */
  getAvailableVoiceRegions() {
    return helpers.getAvailableVoiceRegions();
  }

  /** Returns a ban object for the given user or a 404 not found if the ban cannot be found. Requires the BAN_MEMBERS permission. */
  getBan(guildId: bigint, memberId: bigint) {
    return helpers.getBan(guildId, memberId);
  }

  /** Returns a list of ban objects for the users banned from this guild. Requires the BAN_MEMBERS permission. */
  getBans(guildId: bigint) {
    return helpers.getBans(guildId);
  }

  /** Returns the guild preview object for the given id. If the bot is not in the guild, then the guild must be Discoverable. */
  getGuildPreview(guildId: bigint) {
    return helpers.getGuildPreview(guildId);
  }

  /** This function fetches a guild's data. This is not the same data as a GUILD_CREATE. */
  getGuild(
    guildId: bigint,
    options: { counts?: boolean; addToCache?: boolean } = {
      counts: true,
      addToCache: true,
    },
  ) {
    return helpers.getGuild(guildId, options);
  }

  /** Check how many members would be removed from the server in a prune operation. Requires the KICK_MEMBERS permission */
  getPruneCount(guildId: bigint, options?: GetGuildPruneCountQuery) {
    return helpers.getPruneCount(guildId, options);
  }

  /** Returns the code and uses of the vanity url for this server if it is enabled else code will be null. Requires the MANAGE_GUILD permission. */
  getVanityURL(guildId: bigint) {
    return helpers.getVanityURL(guildId);
  }

  /** Returns a list of voice region objects for the guild. Unlike the similar /voice route, this returns VIP servers when the guild is VIP-enabled. */
  getVoiceRegions(guildId: bigint) {
    return helpers.getVoiceRegions(guildId);
  }

  getWelcomeScreen(guildId: bigint) {
    return helpers.getWelcomeScreen(guildId);
  }

  /** Returns the widget image URL for the guild. */
  getWidgetImageURL(
    guildId: bigint,
    options?: GetGuildWidgetImageQuery & { force?: boolean },
  ) {
    return helpers.getWidgetImageURL(guildId, options);
  }

  /** Returns the guild widget object. Requires the MANAGE_GUILD permission. */
  getWidgetSettings(guildId: bigint) {
    return helpers.getWidgetSettings(guildId);
  }

  /** Returns the widget for the guild. */
  getWidget(guildId: bigint, options?: { force: boolean }) {
    return helpers.getWidget(guildId, options);
  }

  /** The full URL of the banner from Discords CDN. Undefined if no banner is set. */
  guildBannerURL(id: bigint, options: {
    banner?: string | bigint;
    size?: DiscordImageSize;
    format?: DiscordImageFormat;
    animated?: boolean;
  }) {
    return helpers.guildBannerURL(id, options);
  }

  /** The full URL of the icon from Discords CDN. Undefined when no icon is set. */
  guildIconURL(id: bigint, options: {
    banner?: string | bigint;
    size?: DiscordImageSize;
    format?: DiscordImageFormat;
    animated?: boolean;
  }) {
    return helpers.guildIconURL(id, options);
  }

  /** The full URL of the splash from Discords CDN. Undefined if no splash is set. */
  guildSplashURL(id: bigint, options: {
    banner?: string | bigint;
    size?: DiscordImageSize;
    format?: DiscordImageFormat;
    animated?: boolean;
  }) {
    return helpers.guildSplashURL(id, options);
  }

  /** Leave a guild */
  leaveGuild(guildId: bigint) {
    return helpers.leaveGuild(guildId);
  }

  /** Send a message to the channel. Requires SEND_MESSAGES permission. */
  sendMessage(channelId: bigint, content: string | CreateMessage) {
    return helpers.sendMessage(channelId, content);
  }
}

export default Client;
