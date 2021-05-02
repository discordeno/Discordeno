import { SnakeCasedPropertiesDeep } from "../../util.ts";
import { ButtonStyles } from "./button_styles.ts";

// TODO: add docs link
export interface ButtonComponent {
  /** All button components have type 2 */
  type: 2;
  /** for what the button says (max 80 characters) */
  label: string;
  /** a dev-defined unique string sent on click (max 100 characters). type 5 Link buttons can not have a custom_id */
  customId?: string;
  /** For different styles/colors of the buttons */
  style: ButtonStyles;
  /** Emoji object that includes fields of name, id, and animated supporting unicode and custom emojis. */
  emoji?: {
    /** Emoji id */
    id: string | null;
    /** Emoji name (can only be null in reaction emoji objects) */
    name: string | null;
    /** Whether this emoji is animated */
    animated?: boolean;
  };
  /** optional url for link-style buttons that can navigate a user to the web. Only type 5 Link buttons can have a url */
  url?: string;
  /** Whether or not this button is disabled */
  disabled?: boolean;
}

export type DiscordButtonComponent = SnakeCasedPropertiesDeep<ButtonComponent>;
