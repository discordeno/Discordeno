import { rest } from "../../rest/rest.ts";
import { endpoints } from "../../util/constants.ts";
import type { ModifyCurrentMember } from "../../types/members/modify_current_member.ts";

/** Modifies the current member in a guild. Requires `CHANGE_NICKNAME` permission. Fires a `GUILD_MEMBER_UPDATE` gateway event. */
export async function editBotMember(guildId: bigint, options?: ModifyCurrentMember) {
  // deno-lint-ignore no-explicit-any
  return await rest.runMethod("patch", endpoints.GUILD_MEMBER(guildId, "@me" as any), options);
}
