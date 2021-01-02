import {
  Channel,
  Guild,
  Member,
  Message,
} from "../api/structures/structures.ts";
import { PresenceUpdatePayload } from "../types/mod.ts";
import { Collection } from "./collection.ts";

export interface CacheData {
  isReady: boolean;
  lastGuild: null | number;
  guilds: Collection<string, Guild>;
  channels: Collection<string, Channel>;
  messages: Collection<string, Message>;
  members: Collection<string, Member>;
  unavailableGuilds: Collection<string, number>;
  presences: Collection<string, PresenceUpdatePayload>;
  fetchAllMembersProcessingRequests: Collection<string, Function>;
  executedSlashCommands: Collection<string, string>;
}

export const cache: CacheData = {
  isReady: false,
  lastGuild: null,
  guilds: new Collection(),
  channels: new Collection(),
  messages: new Collection(),
  members: new Collection(),
  unavailableGuilds: new Collection(),
  presences: new Collection(),
  fetchAllMembersProcessingRequests: new Collection(),
  executedSlashCommands: new Collection(),
};
