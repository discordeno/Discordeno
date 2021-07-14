import { endpoints } from "./../../util/constants.ts";
import type { Sticker } from "./../../types/stickers/sticker.ts";
import { rest } from "./../../rest/rest.ts";

/** Returns a sticker object for the given guild and sticker ID. */
export async function getGuildSticker(guildId: bigint, stickerId: bigint) {
  return await rest.runMethod<Sticker>("get", endpoints.GUILD_STICKER(guildId, stickerId));
}
