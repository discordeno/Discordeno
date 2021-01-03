/** https://discord.com/developers/docs/topics/opcodes-and-status-codes#opcodes-and-status-codes */
export enum GatewayOpcodes {
  Dispatch,
  Heartbeat,
  Identify,
  PresenceUpdate,
  VoiceStateUpdate,
  Resume = 6,
  Reconnect,
  RequestGuildMembers,
  InvalidSession,
  Hello,
  HeartbeatACK,
}

/** https://discord.com/developers/docs/topics/opcodes-and-status-codes#opcodes-and-status-codes */
export enum GatewayCloseEventCodes {
  UNKNOWN_ERROR = 4000,
  UNKNOWN_OPCODE,
  DECODE_ERROR,
  NOT_AUTHENTICATED,
  AUTHENTICATION_FAILED,
  ALREADY_AUTHENTICATED,
  INVALID_SEQ = 4007,
  RATE_LIMITED,
  SESSION_TIMED_OUT,
  INVALID_SHARD,
  SHARDING_REQUIRED,
  INVALID_API_VERSION,
  INVALID_INTENTS,
  DISALLOWED_INTENTS,
}

/** https://discord.com/developers/docs/topics/opcodes-and-status-codes#voice */
export enum VoiceOpcodes {
  IDENTIFY,
  SELECT_PROTOCOL,
  READY,
  HEARTBEAT,
  SESSION_DESCRIPTION,
  SPEAKING,
  HEARTBEAT_ACK,
  RESUME,
  HELLO,
  RESUMED,
  CLIENT_DISCONNECT = 13,
}

/** https://discord.com/developers/docs/topics/opcodes-and-status-codes#voice */
export enum VoiceCloseEventCodes {
  UNKNOWN_OPCODE = 4001,
  FAILED_TO_DECODE_PAYLOAD,
  NOT_AUTHENTICATED,
  AUTHENTICATION_FAILED,
  ALREADY_AUTHENTICATED,
  SESSION_NO_LONGER_VALID,
  SESSION_TIMEOUT = 4009,
  SERVER_NOT_FOUND = 4011,
  UNKNOWN_PROTOCOL,
  DISCONNECTED = 4014,
  VOICE_SERVER_CRASHED,
  UNKNOWN_ENCRYPTION_MODE,
}

/** https://discord.com/developers/docs/topics/opcodes-and-status-codes#http */
export enum HTTPResponseCodes {
  OK = 200,
  CREATED,
  NO_CONTENT = 204,
  NOT_MODIFIED = 304,
  BAD_REQUEST = 400,
  UNAUTHORIZED,
  FORBIDDEN = 403,
  NOT_FOUND,
  METHOD_NOT_ALLOWED,
  TOO_MANY_REQUESTS = 429,
  GATEWAY_UNAVAILABLE = 502,
}

/** https://discord.com/developers/docs/topics/opcodes-and-status-codes#json */
export enum JsonErrorCodes {
  GENERAL_ERROR,
  UNKNOWN_ACCOUNT = 10001,
  UNKNOWN_APPLICATION,
  UNKNOWN_CHANNEL,
  UNKNOWN_GUILD,
  UNKNOWN_INTEGRATION,
  UNKNOWN_INVITE,
  UNKNOWN_MEMBER,
  UNKNOWN_MESSAGE,
  UNKNOWN_PERMISSION_OVERWRITE,
  UNKNOWN_PROVIDER,
  UNKNOWN_ROLE,
  UNKNOWN_ROKEN,
  UNKNOWN_USER,
  UNKNOWN_EMOJI,
  UNKNOWN_WEBHOOK,
  UNKNOWN_BAN = 10026,
  UNKNOWN_SKU,
  UNKNOWN_STORE_LISTING,
  UNKNOWN_ENTITLEMENT,
  UNKNOWN_BUILD,
  UNKNOWN_LOBBY,
  UNKNOWN_BRANCH,
  UNKNOWN_REDISTRIBUTABLE = 10036,
  UNKNOWN_GUILD_TEMPLATE = 10057,
  BOTS_CANNOT_USE_THIS_ENDPOINT = 20001,
  ONLY_BOTS_CAN_USE_THIS_ENDPOINT,
  THIS_MESSAGE_CANNOT_BE_EDITED_DUE_TO_ACCOUNCEMENT_RATE_LIMITS = 20022,
  THE_CHANNEL_YOU_ARE_WRITING_HAS_HIT_THE_WRITE_RATE_LIMIT = 20028,
  MAXIMUM_NUMBER_OF_GUILDS_REACHED = 30001,
  MAXIMUM_NUMBER_OF_FRIENDS_REACHED,
  MAXIMUM_NUMBER_OF_PINS_REACHED_FOR_THE_CHANNEL,
  MAXIMUM_NUMBER_OF_GUILDS_ROLES_REACHED = 30005,
  MAXIMUM_NUMBER_OF_WEBHOOKS_REACHED = 30007,
  MAXIMUM_NUMBER_OF_REACTIONS_REACHED = 30010,
  MAXIMUM_NUMBER_OF_GUILD_CHANNELS_REACHED = 30013,
  MAXIMUM_NUMBER_OF_ATTACHMENTS_IN_A_MESSAGE_REACHED = 30015,
  MAXIMUM_NUMBER_OF_INVITES_REACHED,
  GUILD_ALREADY_HAS_A_TEMPLATE = 30031,
  UNAUTHORIZED_PROVIDE_A_VALID_TOKEN_AND_TRY_AGAIN = 40001,
  YOU_NEED_TO_VERIFY_YOUR_ACCOUNT_IN_ORDER_TO_PERFORM_THIS_ACTION,
  REQUEST_ENTITY_TOO_LARGE_TRY_SENDING_SOMETHING_SMALLER_IN_SIZE = 40005,
  THIS_FEATURE_HAS_BEEN_TEMPORARILY_DISABLED_SERVER_SIDE,
  THE_USER_IS_BANNED_FROM_THIS_GUILD,
  THIS_MESSAGE_HAS_ALREADY_BEEN_CROSSPOSTED = 40033,
  MISSING_ACCESS = 50001,
  INVALID_ACCOUNT_TYPE,
  CANNOT_EXECUTE_ACTION_ON_A_DM_CHANNEL,
  GUILD_WIDGET_DISABLED,
  CANNOT_EDIT_A_MESSAGE_AUTHORED_BY_ANOTHER_USER,
  CANNOT_SEND_AN_EMPTY_MESSAGE,
  CANNOT_SEND_MESSAGES_TO_THIS_USER,
  CANNOT_SEND_MESSAGES_IN_A_VOICE_CHANNEL,
  CHANNEL_VERIFICATION_LEVEL_IS_TOO_HIGH_FOR_YOU_TO_GAIN_ACCESS,
  OAUTH2_APPLICATION_DOES_NOT_HAVE_A_BOT,
  OAUTH2_APPLICATION_LIMIT_REACHED,
  INVALID_OAUTH2_STATE,
  YOU_LACK_PERMISSIONS_TO_PERFORM_THAT_ACTION,
  INVALID_AUTHENTICATION_TOKEN_PROVIDED,
  NOTE_WAS_TOO_LONG,
  PROVIDED_TOO_FEW_OR_TOO_MANY_MESSAGES_TO_DELETE_MUST_PROVIDE_AT_LEAST_2_AND_FEWER_THAN_100_MESSAGES_TO_DELETE,
  A_MESSAGE_CAN_ONLY_BE_PINNED_TO_THE_CHANNEL_IT_WAS_SENT_IN = 50019,
  INVITE_CODE_WAS_EITHER_INVALID_OR_TAKEN,
  CANNOT_EXECUTE_ACTION_ON_A_SYSTEM_MESSAGE,
  CANNOT_EXECUTE_ACTION_ON_THIS_CHANNEL_TYPE = 50024,
  INVALID_OAUTH2_ACCESS_TOKEN_PROVIDED,
  INVALID_RECIPIENTS = 50033,
  A_MESSAGE_PROVIDED_WAS_TOO_OLD_TO_BULK_DELETE,
  INVALID_FORM_BODY_OR_CONTENT_TYPE_PROVIDED,
  AN_INVITE_WAS_ACCEPTED_TO_A_GUILD_THE_APPLICATIONS_BOT_IS_NOT_IN,
  INVALID_API_VERSION_PROVIDED = 50041,
  CANNOT_DELETE_A_CHANNEL_REQUIRED_FOR_COMMUNITY_GUILDS = 50074,
  INVALID_STICKER_SENT = 50081,
  REACTION_WAS_BLOCKKED = 90001,
  API_RESOURCE_IS_CURRENTLY_OVERLOADED_TRY_AGAIN_A_LITTLE_LATER = 130000,
}

/** https://discord.com/developers/docs/topics/opcodes-and-status-codes#rpc */
export enum RpcErrorCodes {
  UNKNOWN_ERROR = 1000,
  INVALID_PAYLOAD = 4000,
  INVALID_COMMAND = 4002,
  INVALID_GUILD,
  INVALID_EVENT,
  INVALID_CHANNEL,
  INVALID_PERMISSIONS,
  INVALID_CLIENT_ID,
  INVALID_ORIGIN,
  INVALID_TOKEN,
  INVALID_USER,
  OAUTH2_ERROR = 5000,
  SELECT_CHANNEL_TIMED_OUT,
  GET_GUILD_TIMED_OUT,
  SELECT_VOICE_FORCE_REQUIRED,
  CAPTURE_SHORTCUT_ALREADY_LISTENING,
}

/** https://discord.com/developers/docs/topics/opcodes-and-status-codes#rpc */
export enum RcpCloseEventCodes {
  INVALID_CLIENT_ID = 4000,
  INVALID_ORIGIN,
  RATE_LIMITED,
  TOKEN_REVOKED,
  INVALID_VERSION,
  INVALID_ENCODING,
}
