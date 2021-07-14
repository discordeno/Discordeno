import { endpoints } from "./../../util/constants.ts";
import type { StickerPack } from "./../../types/stickers/sticker_pack.ts";
import { rest } from "./../../rest/rest.ts";

/** Returns the list of sticker packs available to Nitro subscribers. */
export async function getNitroStickerPacks() {
  return await rest.runMethod<{ stickerPacks: StickerPack[] }>("get", endpoints.STICKER_PACKS);
}
