import { rest } from "../../rest/rest.ts";
import type { Emoji } from "../../types/emojis/emoji.ts";
import type { ModifyGuildEmoji } from "../../types/emojis/modify_guild_emoji.ts";
import { endpoints } from "../../util/constants.ts";
import { requireBotGuildPermissions } from "../../util/permissions.ts";

/** Modify the given emoji. Requires the MANAGE_EMOJIS permission. */
export async function editEmoji(guildId: bigint, id: bigint, options: ModifyGuildEmoji) {
  await requireBotGuildPermissions(guildId, ["MANAGE_EMOJIS_AND_STICKERS"]);

  return await rest.runMethod<Emoji>("patch", endpoints.GUILD_EMOJI(guildId, id), options);
}
