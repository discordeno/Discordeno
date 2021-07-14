import { endpoints } from "./../../util/constants.ts";
import type { Sticker } from "./../../types/stickers/sticker.ts";
import { rest } from "./../../rest/rest.ts";

/** Returns an array of sticker objects for the given guild. */
export async function getGuildStickers(guildId: bigint) {
  return await rest.runMethod<Sticker[]>("get", endpoints.GUILD_STICKERS(guildId));
}
