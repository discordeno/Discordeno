export interface ModifyGuildSticker {
  /** Name of the sticker (2-30 characters) */
  name?: string;
  /** Description of the sticker (up to 100 characters) */
  description?: string;
  /** The name of a unicode emoji representing the sticker's expression */
  tags?: string;
}
