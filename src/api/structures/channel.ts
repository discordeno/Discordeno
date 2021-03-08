import {
  ChannelCreatePayload,
  ChannelEditOptions,
  ChannelType,
  MessageContent,
  Overwrite,
  Permission,
  RawOverwrite,
} from "../../types/mod.ts";
import { cache } from "../../util/cache.ts";
import { Collection } from "../../util/collection.ts";
import { createNewProp } from "../../util/utils.ts";
import {
  channelOverwriteHasPermission,
  editChannel,
  sendMessage,
} from "../handlers/channel.ts";
import {
  deleteChannel,
  deleteChannelOverwrite,
  editChannelOverwrite,
} from "../handlers/guild.ts";
import { kickFromVoiceChannel } from "../handlers/member.ts";
import { CleanVoiceState, Guild } from "./guild.ts";
import { Member } from "./member.ts";
import { Message } from "./message.ts";

const baseChannel: Partial<Channel> = {
  get guild() {
    return cache.guilds.get(this.guildID!);
  },
  get messages() {
    return cache.messages.filter((m) => m.channelID === this.id!);
  },
  get mention() {
    return `<#${this.id!}>`;
  },
  get voiceStates() {
    return this.guild?.voiceStates.filter((voiceState) =>
      voiceState.channelID === this.id
    );
  },
  get connectedMembers() {
    const voiceStates = this.voiceStates;
    if (!voiceStates) return undefined;

    return new Collection(
      voiceStates.map((vs, key) => [key, cache.members.get(key)]),
    );
  },
  send(content) {
    return sendMessage(this.id!, content);
  },
  disconnect(memberID) {
    return kickFromVoiceChannel(this.guildID!, memberID);
  },
  delete() {
    return deleteChannel(this.guildID!, this.id!);
  },
  editOverwrite(id, options) {
    return editChannelOverwrite(this.guildID!, this.id!, id, options);
  },
  deleteOverwrite(id) {
    return deleteChannelOverwrite(this.guildID!, this.id!, id);
  },
  hasPermission(overwrites, permissions) {
    return channelOverwriteHasPermission(
      this.guildID!,
      this.id!,
      overwrites,
      permissions,
    );
  },
  edit(options, reason) {
    return editChannel(this.id!, options, reason);
  },
};

// deno-lint-ignore require-await
export async function createChannel(
  data: ChannelCreatePayload,
  guildID?: string,
) {
  const {
    guild_id: rawGuildID = "",
    last_message_id: lastMessageID,
    user_limit: userLimit,
    rate_limit_per_user: rateLimitPerUser,
    parent_id: parentID = undefined,
    last_pin_timestamp: lastPinTimestamp,
    permission_overwrites: permissionOverwrites = [],
    nsfw = false,
    ...rest
  } = data;

  const restProps: Record<string, ReturnType<typeof createNewProp>> = {};
  for (const key of Object.keys(rest)) {
    // @ts-ignore index signature
    restProps[key] = createNewProp(rest[key]);
  }

  const channel = Object.create(baseChannel, {
    ...restProps,
    guildID: createNewProp(guildID || rawGuildID),
    lastMessageID: createNewProp(lastMessageID),
    userLimit: createNewProp(userLimit),
    rateLimitPerUser: createNewProp(rateLimitPerUser),
    parentID: createNewProp(parentID),
    lastPinTimestamp: createNewProp(
      lastPinTimestamp ? Date.parse(lastPinTimestamp) : undefined,
    ),
    permissionOverwrites: createNewProp(permissionOverwrites),
    nsfw: createNewProp(nsfw),
  });

  return channel as Channel;
}
