import { cacheHandlers } from "../../cache.ts";
import { rest } from "../../rest/rest.ts";
import { structures } from "../../structures/mod.ts";
import type { GuildMemberWithUser } from "../../types/guilds/guild_member.ts";
import { endpoints } from "../../util/constants.ts";

/** Returns a guild member object for the specified user.
 *
 * ⚠️ **ADVANCED USE ONLY: Your members will be cached in your guild most likely. Only use this when you are absolutely sure the member is not cached.**
 */
export async function getMember(
  guildId: bigint,
  id: bigint,
  options?: { force?: boolean },
) {
  const guild = await cacheHandlers.get("guilds", guildId);
  if (!guild && !options?.force) return;

  const data = (await rest.runMethod<GuildMemberWithUser>(
    "get",
    endpoints.GUILD_MEMBER(guildId, id),
  ));

  const discordenoMember = await structures.createDiscordenoMember(
    data,
    guildId,
  );
  await cacheHandlers.set("members", discordenoMember.id, discordenoMember);

  return discordenoMember;
}
