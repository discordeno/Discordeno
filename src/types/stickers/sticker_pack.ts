import { Sticker } from "./sticker.ts";

export interface StickerPack {
  /** Id of the sticker pack */
  id: string;
  /** The stickers in the pack */
  stickers: Sticker[];
  /** Name of the sticker pack */
  name: string;
  /** Id of the pack's SKU */
  skuId: string;
  /** Id of a sticker in the pack which is shown as the pack's icon */
  coverStickerId?: string;
  /** Description of the sticker pack */
  description: string;
  /** Id of the sticker pack's banner image */
  bannerAssetId: string;
}
