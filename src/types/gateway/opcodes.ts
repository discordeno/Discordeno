/** https://discord.com/developers/docs/topics/opcodes-and-status-codes#gateway-gateway-opcodes */
export enum DiscordGatewayOpcode {
  Dispatch,
  Heartbeat,
  Identify,
  StatusUpdate,
  VoiceStateUpdate,
  Resume = 6,
  Reconnect,
  RequestGuildMembers,
  InvalidSession,
  Hello,
  HeartbeatACK,
}
