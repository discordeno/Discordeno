import { endpoints } from "./../../util/constants.ts";
import { rest } from "./../../rest/rest.ts";
import { requireBotGuildPermissions } from "../../util/permissions.ts";
import type { Sticker } from "../../types/stickers/sticker.ts";
import type { ModifyGuildSticker } from "../../types/stickers/modify_guild_sticker.ts";
import { validateLength } from "../../util/validate_length.ts";
import { Errors } from "../../types/discordeno/errors.ts";

/** Edits the given sticker. Requires the `MANAGE_GUILD` permission. Returns the updated sticker object on success. */
export async function editGuildSticker(guildId: bigint, stickerId: bigint, options: ModifyGuildSticker) {
  if (
    options.name &&
    !validateLength(options.name, {
      min: 2,
      max: 30,
    })
  ) {
    throw new Error(Errors.STICKER_NAME_INVALID_LENGTH);
  }
  if (options.description && !validateLength(options.description, { min: 1, max: 100 })) {
    throw new Error(Errors.STICKER_DESCRIPTION_INVALID_LENGTH);
  }

  await requireBotGuildPermissions(guildId, ["MANAGE_GUILD"]);

  return await rest.runMethod<Sticker>("delete", endpoints.GUILD_STICKER(guildId, stickerId));
}
