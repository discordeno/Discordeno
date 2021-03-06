/** https://discord.com/developers/docs/resources/guild#welcome-screen-object-welcome-screen-channel-structure */
export interface WelcomeScreenChannel {
  /** The channel's id */
  channelId: bigint;
  /** The descriptino schown for the channel */
  description: string;
  /** The emoji id, if the emoji is custom */
  emojiId: bigint | null;
  /** The emoji name if custom, the unicode character if standard, or `null` if no emoji is set */
  emojiName: string | null;
}
