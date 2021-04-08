import { User } from "../users/user.ts";
import { SnakeCasedPropertiesDeep } from "../util.ts";
import { DiscordWebhookTypes } from "./discord_webhook_types.ts";

export interface Webhook {
  /** The id of the webhook */
  id: string;
  /** The type of the webhook */
  type: DiscordWebhookTypes;
  /** The guild id this webhook is for */
  guildId?: string;
  /** The channel id this webhook is for */
  channelId: string;
  /** The user this webhook was created by (not returned when getting a webhook with its token) */
  user?: User;
  /** The default name of the webhook */
  name: string | null;
  /** The default avatar of the webhook */
  avatar: string | null;
  /** The secure token of the webhook (returned for Incomming Webhooks) */
  token?: string;
  /** The bot/OAuth2 application that created this webhook */
  applicationId: string | null;
}

/** https://discord.com/developers/docs/resources/webhook#webhook-object-webhook-structure */
export type DiscordWebhook = SnakeCasedPropertiesDeep<Webhook>;
