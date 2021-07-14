import { endpoints } from "./../../util/constants.ts";
import { rest } from "./../../rest/rest.ts";
import { requireBotGuildPermissions } from "../../util/permissions.ts";

/** Delete the given sticker. Requires the `MANAGE_GUILD` permission. */
export async function deleteGuildSticker(guildId: bigint, stickerId: bigint) {
  await requireBotGuildPermissions(guildId, ["MANAGE_GUILD"]);

  return await rest.runMethod<undefined>("delete", endpoints.GUILD_STICKER(guildId, stickerId));
}
