import { createChannel } from "./channel.ts";
import { createGuild } from "./guild.ts";
import { createMember } from "./member.ts";
import { createMembershipScreening } from "./membership_screening.ts";
import { createMessage } from "./message.ts";
import { createRole } from "./role.ts";
import { createTemplate } from "./template.ts";

/** This is the placeholder where the structure creation functions are kept. */
export let structures = {
  createChannel,
  createGuild,
  createMember,
  createMessage,
  createRole,
  createTemplate,
  createMembershipScreening,
};

export type Structures = typeof structures;

/** This function is used to update/reload/customize the internal structures of Discordeno.
 *
 *  ⚠️ **ADVANCED USE ONLY: If you customize this incorrectly, you could potentially create many new errors/bugs.
 * Please take caution when using this.**
*/
export function updateStructures(newStructures: Structures) {
  structures = {
    ...structures,
    ...newStructures,
  };
}

export type { Channel } from "./channel.ts";
export type { Guild } from "./guild.ts";
export type { Member } from "./member.ts";
export type { MembershipScreening } from "./membership_screening.ts";
export type { Message } from "./message.ts";
export type { Role } from "./role.ts";
export type { Template } from "./template.ts";
