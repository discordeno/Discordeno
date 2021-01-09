import { Team } from "./teams.ts";
import { User } from "./user.ts";

/** https://discord.com/developers/docs/topics/oauth2#get-current-application-information */
export interface Application {
  /** id of the app */
  id: string;
  /** the name of the app */
  name: string;
  /** the icon hash of the app */
  icon: string | null;
  /** the description of the app */
  description: string;
  /** an array of rpc origin urls, if rpx is enabled */
  rpcOrigins?: string[];
  /** when false only app owner can join the app's bot to guilds */
  botPublic: boolean;
  /** when true the app's bot will only join upon completion of the full oauth2 code grant flow */
  botRequireCodeGrand: boolean;
  /** partial user object containing info on the owner of the application */
  owner: Partial<User>;
  /** if this application is a game sold on Disccord, this field will be the summary field for the store page of its primary sku */
  summary: string;
  /** the base64 enccoded key for the GameSDK'S GetTicket */
  verifyKey: string;
  /** if the application belongs to a team, this will be a list of the members of that team */
  team: Team | null;
  /** if this application is a game sold on Discord, this field will be the guild to which it has been linked */
  guildID?: string;
  /** if this application is a game sold on Discord, this field will be the id of the "Game SKU" that is created, if exists */
  primarySkuID?: string;
  /** if this application is a game sold on Discord, this field will be the URL slug that links to the store page */
  slug?: string;
  /** if this application is a game sold on Discord, this field wil be the hash of the image on store embeds */
  coverImage?: string;
  /** the application's public flags */
  flags: number;
}
