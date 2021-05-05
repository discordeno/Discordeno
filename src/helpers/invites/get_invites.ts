import { rest } from "../../rest/rest.ts";
import type { Invite } from "../../types/invites/invite.ts";
import { Collection } from "../../util/collection.ts";
import { endpoints } from "../../util/constants.ts";
import { requireBotGuildPermissions } from "../../util/permissions.ts";

/** Get all the invites for this guild. Requires MANAGE_GUILD permission */
export async function getInvites(guildId: bigint) {
  await requireBotGuildPermissions(guildId, ["MANAGE_GUILD"]);

  const result = await rest.runMethod<Invite[]>(
    "get",
    endpoints.GUILD_INVITES(guildId),
  );

  return new Collection(
    result.map((invite) => [invite.code, invite]),
  );
}
