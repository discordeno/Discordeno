import { DiscordUser } from "./mod.ts";

/** https://discord.com/developers/docs/resources/guild#integration-object-integration-structure */
export interface IntegrationPayload {
  /** integration id */
  id: string;
  /** integration name */
  name: string;
  /** integration type (twitch, youtube, or discord) */
  type: string;
  /** is this integration enabled */
  enabled: boolean;
  /** is this integration syncing */
  syncing?: boolean;
  /** id that this integration uses for "subscribers" */
  role_id?: string;
  /** whether emoticons should be synced for this integration (twitch only currently) */
  enable_emoticons?: boolean;
  /** the behavior of expiring subscribers */
  expire_behavior?: IntegrationExpireBehavior;
  /** the grace period (in days) before expiring subscribers */
  expire_grace_period?: number;
  /** user for this integration */
  user?: DiscordUser;
  /** integration account information */
  account: IntegrationAccountPayload;
  /** when this integration was last synced */
  synced_at?: string;
  /** how many subscribers this integration has */
  subscriber_count: number;
  /** has this integration been revoked */
  revoked?: boolean;
  /** the bot/OAuth2 application for discord integrations */
  application?: IntegrationApplicationPayload;
}

/** https://discord.com/developers/docs/resources/guild#integration-object-integration-expire-behaviors */
export enum IntegrationExpireBehavior {
  REMOVE_ROLE,
  KICK,
}

/** https://discord.com/developers/docs/resources/guild#integration-account-object */
export interface IntegrationAccountPayload {
  /** id of the account */
  id: string;
  /** name of the account */
  name: string;
}

/** https://discord.com/developers/docs/resources/guild#integration-application-object */
export interface IntegrationApplicationPayload {
  /** the id of the app */
  id: string;
  /** the name of the app */
  name: string;
  /** the icon hash of the app */
  icon: string | null;
  /** the description of the app */
  description: string;
  /** the summary of the app */
  summary: string;
  /** If this application is a game sold on Discord, this field will be the hash of the image on store embeds */
  cover_image?: string;
  /** the bot associated with this application */
  bot?: DiscordUser;
}