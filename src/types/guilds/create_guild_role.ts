import { PermissionStrings } from "../permissions/permission_strings.ts";
import { SnakeCaseProps } from "../util.ts";

export interface CreateGuildRole {
  /** Name of the role, default: "new role" */
  name?: string;
  /** Bitwise value of the enabled/disabled permissions, default: everyone permissions in guild */
  permissions?: PermissionStrings[];
  /** RGB color value, default: 0 */
  color?: number;
  /** Whether the role should be displayed separately in the sidebar, default: false */
  hoist?: boolean;
  /** Whether the role should be mentionable, default: false */
  mentionable?: boolean;
}

export interface DiscordCreateGuildRole
  extends SnakeCaseProps<Omit<CreateGuildRole, "permissions">> {
  permissions?: string;
}
