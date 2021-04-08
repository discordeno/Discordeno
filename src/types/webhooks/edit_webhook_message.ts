import { Embed } from "../embeds/embed.ts";
import { AllowedMentions } from "../messages/allowed_mentions.ts";
import { SnakeCasedPropertiesDeep } from "../util.ts";

export interface EditWebhookMessage {
  /** The message contents (up to 2000 characters) */
  content?: string | null;
  /** Embedded `rich` content */
  embeds?: Embed[] | null;
  /** Allowed mentions for the message */
  allowedMentions?: AllowedMentions | null;
}

/** https://discord.com/developers/docs/resources/webhook#edit-webhook-message-jsonform-params */
export type DiscordEditWebhookMessage = SnakeCasedPropertiesDeep<EditWebhookMessage>;
