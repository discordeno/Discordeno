export interface DiscordBaseUser {
  /** the user's id */
  id: string;
  /** the user's username, not unique across the platform */
  username: string;
  /** the user's 4-digit discord-tag */
  discriminator: string;
  /** the user's avatar hash */
  avatar: string | null;
}

/** https://discord.com/developers/docs/resources/user#users-resource */
export interface DiscordUser extends DiscordBaseUser {
  /** the user's id */
  id: string;
  /** the user's username, not unique across the platform */
  username: string;
  /** the user's 4-digit discord-tag */
  discriminator: string;
  /** the user's avatar hash */
  avatar: string | null;
  /** whether the user belongs to an OAuth2 application */
  bot?: boolean;
  /** whether the user is an Official Discord System user (part of the urgent message system) */
  system?: boolean;
  /** whether the user has two factor enabled on their account */
  mfa_enabled?: boolean;
  /** the user's chosen language option */
  locale?: string;
  /** whether the email on this account has been verified */
  verified?: boolean;
  /** the user's email */
  email?: string | null;
  /** the flags on a user's account */
  flags?: DiscordUserFlags;
  /** the type of Nitro subscription on a user's account */
  premium_type?: DiscordPremiumTypes;
  /** the public flags on a user's account */
  public_flags?: DiscordUserFlags;
}

/** https://discord.com/developers/docs/resources/user#users-resource */
export enum DiscordUserFlags {
  NONE = 0,
  DISCORD_EMPLOYEE = 1 << 0,
  PARTNERED_SERVER_OWNER = 1 << 1,
  HYPE_SQUAD_EVENTS = 1 << 2,
  BUG_HUNTER_LEVEL_1 = 1 << 3,
  HOUSE_BRAVERY = 1 << 6,
  HOUSE_BRILLIANCE = 1 << 7,
  HOUSE_BALANCE = 1 << 8,
  EARLY_SUPPORTER = 1 << 9,
  TEAM_USER = 1 << 10,
  SYSTEM = 1 << 12,
  BUG_HUNTER_LEVEL_2 = 1 << 14,
  VERIFIED_BOT = 1 << 16,
  EARLY_VERIFIED_BOT_DEVELOPER = 1 << 17,
}

/** https://discord.com/developers/docs/resources/user#users-resource */
export enum DiscordPremiumTypes {
  NONE = 0,
  NITRO_CLASSIC = 1,
  NITRO = 2,
}

/** https://discord.com/developers/docs/resources/guild#guild-member-object-guild-member-structure */
export interface DiscordBaseMember {
  /** this users guild nickname */
  nick: string | null;
  /** array of role payload ids */
  roles: string[];
  /** when the user joined the guild */
  joined_at: string;
  /** when the user started boosting the guild */
  premium_since?: string | null;
  /** whether the user is deafened in voice channels */
  deaf: boolean;
  /** whether the user is muted in voice channels */
  mute: boolean;
  /** whether the user has not yet passed the guild's Membership Screening requirements */
  pending?: boolean;
}

/** https://discord.com/developers/docs/resources/guild#guild-member-object-guild-member-structure */
export interface DiscordMember {
  /** the user this guild member represents */
  user?: DiscordUser;
}
