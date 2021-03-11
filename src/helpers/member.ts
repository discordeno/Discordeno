import { botID } from "../bot.ts";
import { cacheHandlers } from "../cache.ts";
import { RequestManager } from "../rest/request_manager.ts";
import { endpoints } from "../util/constants.ts";
import {
  highestRole,
  isHigherPosition,
  requireBotChannelPermissions,
  requireBotGuildPermissions,
} from "../util/permissions.ts";
import { formatImageURL, urlToBase64 } from "../util/utils.ts";
import { sendMessage } from "./channel.ts";

/** The users custom avatar or the default avatar if you don't have a member object. */
export function rawAvatarURL(
  userID: string,
  discriminator: string,
  avatar?: string | null,
  size: ImageSize = 128,
  format?: ImageFormats,
) {
  return avatar
    ? formatImageURL(endpoints.USER_AVATAR(userID, avatar), size, format)
    : endpoints.USER_DEFAULT_AVATAR(Number(discriminator) % 5);
}

/** The users custom avatar or the default avatar */
export function avatarURL(
  member: Member,
  size: ImageSize = 128,
  format?: ImageFormats,
) {
  return rawAvatarURL(
    member.id,
    member.discriminator,
    member.avatar,
    size,
    format,
  );
}

/** Add a role to the member */
export async function addRole(
  guildID: string,
  memberID: string,
  roleID: string,
  reason?: string,
) {
  const isHigherRolePosition = await isHigherPosition(
    guildID,
    botID,
    roleID,
  );
  if (!isHigherRolePosition) {
    throw new Error(Errors.BOTS_HIGHEST_ROLE_TOO_LOW);
  }

  await requireBotGuildPermissions(guildID, ["MANAGE_ROLES"]);

  const result = await RequestManager.put(
    endpoints.GUILD_MEMBER_ROLE(guildID, memberID, roleID),
    { reason },
  );

  return result;
}

/** Remove a role from the member */
export async function removeRole(
  guildID: string,
  memberID: string,
  roleID: string,
  reason?: string,
) {
  const isHigherRolePosition = await isHigherPosition(
    guildID,
    botID,
    roleID,
  );
  if (
    !isHigherRolePosition
  ) {
    throw new Error(Errors.BOTS_HIGHEST_ROLE_TOO_LOW);
  }

  await requireBotGuildPermissions(guildID, ["MANAGE_ROLES"]);

  const result = await RequestManager.delete(
    endpoints.GUILD_MEMBER_ROLE(guildID, memberID, roleID),
    { reason },
  );

  return result;
}

/** Send a message to a users DM. Note: this takes 2 API calls. 1 is to fetch the users dm channel. 2 is to send a message to that channel. */
export async function sendDirectMessage(
  memberID: string,
  content: string | MessageContent,
) {
  let dmChannel = await cacheHandlers.get("channels", memberID);
  if (!dmChannel) {
    // If not available in cache create a new one.
    const dmChannelData = await RequestManager.post(
      endpoints.USER_DM,
      { recipient_id: memberID },
    ) as DMChannelCreatePayload;
    const channelStruct = await structures.createChannelStruct(
      dmChannelData as unknown as ChannelCreatePayload,
    );
    // Recreate the channel and add it undert he users id
    await cacheHandlers.set("channels", memberID, channelStruct);
    dmChannel = channelStruct;
  }

  // If it does exist try sending a message to this user
  return sendMessage(dmChannel.id, content);
}

/** Kick a member from the server */
export async function kick(guildID: string, memberID: string, reason?: string) {
  const botsHighestRole = await highestRole(guildID, botID);
  const membersHighestRole = await highestRole(guildID, memberID);
  if (
    botsHighestRole && membersHighestRole &&
    botsHighestRole.position <= membersHighestRole.position
  ) {
    throw new Error(Errors.BOTS_HIGHEST_ROLE_TOO_LOW);
  }

  await requireBotGuildPermissions(guildID, ["KICK_MEMBERS"]);

  const result = await RequestManager.delete(
    endpoints.GUILD_MEMBER(guildID, memberID),
    { reason },
  );

  return result;
}

/** Edit the member */
export async function editMember(
  guildID: string,
  memberID: string,
  options: EditMemberOptions,
) {
  const requiredPerms: Set<Permission> = new Set();

  if (options.nick) {
    if (options.nick.length > 32) {
      throw new Error(Errors.NICKNAMES_MAX_LENGTH);
    }
    requiredPerms.add("MANAGE_NICKNAMES");
  }

  if (options.roles) requiredPerms.add("MANAGE_ROLES");

  if (
    typeof options.mute !== "undefined" ||
    typeof options.deaf !== "undefined" ||
    (typeof options.channel_id !== "undefined" || "null")
  ) {
    const memberVoiceState = (await cacheHandlers.get("guilds", guildID))
      ?.voiceStates.get(memberID);

    if (!memberVoiceState?.channelID) {
      throw new Error(Errors.MEMBER_NOT_IN_VOICE_CHANNEL);
    }

    if (typeof options.mute !== "undefined") {
      requiredPerms.add("MUTE_MEMBERS");
    }

    if (typeof options.deaf !== "undefined") {
      requiredPerms.add("DEAFEN_MEMBERS");
    }

    if (options.channel_id) {
      const requiredVoicePerms: Set<Permission> = new Set([
        "CONNECT",
        "MOVE_MEMBERS",
      ]);
      if (memberVoiceState) {
        await requireBotChannelPermissions(
          memberVoiceState?.channelID,
          [...requiredVoicePerms],
        );
      }
      await requireBotChannelPermissions(
        options.channel_id,
        [...requiredVoicePerms],
      );
    }
  }

  await requireBotGuildPermissions(guildID, [...requiredPerms]);

  const result = await RequestManager.patch(
    endpoints.GUILD_MEMBER(guildID, memberID),
    options,
  ) as MemberCreatePayload;
  const member = await structures.createMemberStruct(result, guildID);

  return member;
}

/**
 * Move a member from a voice channel to another.
 * @param guildID the id of the guild which the channel exists in
 * @param memberID the id of the member to move.
 * @param channelID id of channel to move user to (if they are connected to voice)
 */
export function moveMember(
  guildID: string,
  memberID: string,
  channelID: string,
) {
  return editMember(guildID, memberID, { channel_id: channelID });
}

/** Kicks a member from a voice channel */
export function kickFromVoiceChannel(guildID: string, memberID: string) {
  return editMember(guildID, memberID, { channel_id: null });
}

/** Modifies the bot's username or avatar.
 * NOTE: username: if changed may cause the bot's discriminator to be randomized.
 */
export async function editBotProfile(username?: string, botAvatarURL?: string) {
  // Nothing was edited
  if (!username && !botAvatarURL) return;
  // Check username requirements if username was provided
  if (username) {
    if (username.length > 32) {
      throw new Error(Errors.USERNAME_MAX_LENGTH);
    }
    if (username.length < 2) {
      throw new Error(Errors.USERNAME_MIN_LENGTH);
    }
    if (["@", "#", ":", "```"].some((char) => username.includes(char))) {
      throw new Error(Errors.USERNAME_INVALID_CHARACTER);
    }
    if (["discordtag", "everyone", "here"].includes(username)) {
      throw new Error(Errors.USERNAME_INVALID_USERNAME);
    }
  }

  const avatar = botAvatarURL ? await urlToBase64(botAvatarURL) : undefined;
  const result = await RequestManager.patch(
    endpoints.USER_BOT,
    {
      username: username?.trim(),
      avatar,
    },
  );

  return result;
}

/** Edit the nickname of the bot in this guild */
export async function editBotNickname(
  guildID: string,
  nickname: string | null,
) {
  await requireBotGuildPermissions(guildID, ["CHANGE_NICKNAME"]);

  const response = await RequestManager.patch(
    endpoints.USER_NICK(guildID),
    { nick: nickname },
  ) as { nick: string };

  return response.nick;
}
