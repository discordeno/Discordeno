/** https://discord.com/developers/docs/resources/channel#channel-mention-object */
export interface DiscordChannelMention {
  /** id of the channel */
  id: string;
  /** id of the guild containing the channel */
  guild_id: string;
  /** The type of channel */
  type: number;
  /** The name of the channel */
  name: string;
}