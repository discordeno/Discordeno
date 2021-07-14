import { endpoints } from "./../../util/constants.ts";
import type { Sticker } from "./../../types/stickers/sticker.ts";
import { rest } from "./../../rest/rest.ts";

/** Returns a sticker object for the given sticker Id. */
export async function getSticker(stickerId: bigint) {
  return await rest.runMethod<Sticker>("get", endpoints.STICKER(stickerId));
}
