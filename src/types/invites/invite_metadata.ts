import { SnakeCasedPropertiesDeep } from "../util.ts";
import { Invite } from "./invite.ts";

export interface InviteMetadata extends Invite {
  /** Number of times this invite has been used */
  uses: number;
  /** Max number of times this invite can be used */
  maxUses: number;
  /** Duration (in seconds) after which the invite expires */
  maxAge: number;
  /** Whether this invite only grants temporary membership */
  temporary: boolean;
  /** When this invite was created */
  createdAt: string;
}

/** https://discord.com/developers/docs/resources/invite#invite-metadata-object */
export type DiscordInviteMetadata = SnakeCasedPropertiesDeep<InviteMetadata>;
