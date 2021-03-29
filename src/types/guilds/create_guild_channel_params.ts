import { SnakeCaseProps } from "../util.ts";

export interface CreateGuildChannelParams {
  /** Channel name (2-100 characters) */
  name: string;
  /** The type of channel */
  type?: ChannelTypes;
  /** Channel topic (0-1024 characters) */
  topic?: string;
  /** The bitrate (in bits) of the voice channel (voice only) */
  bitrate?: number;
  /** The user limit of the voice channel (voice only) */
  userLimit?: number;
  /** Amount of seconds a user has to wait before sending another message (0-21600); bots, as well as users with the permission manageMessages or manageChannel, are unaffected */
  rateLimitPerUser?: number;
  /** Sorting position of the channel */
  position?: number;
  /** The channel's permission overwrites */
  permissionOverwrites?: Overwrite[];
  /** Id of the parent category for a channel */
  parentId?: string;
  /** Whether the channel is nsfw */
  nsfw?: boolean;
}

/** https://discord.com/developers/docs/resources/guild#create-guild-channel */
export interface DiscordCreateGuildChannelParams
  extends
    Omit<SnakeCaseProps<CreateGuildChannelParams>, "permission_overwrites"> {
  permission_overwrites: DiscordOverwrite[];
}
