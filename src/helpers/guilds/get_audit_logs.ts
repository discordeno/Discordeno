import { rest } from "../../rest/rest.ts";
import type { AuditLog } from "../../types/audit_log/audit_log.ts";
import type { GetGuildAuditLog } from "../../types/audit_log/get_guild_audit_log.ts";
import { endpoints } from "../../util/constants.ts";
import { requireBotGuildPermissions } from "../../util/permissions.ts";
import { camelKeysToSnakeCase } from "../../util/utils.ts";

/** Returns the audit logs for the guild. Requires VIEW AUDIT LOGS permission */
export async function getAuditLogs(
  guildId: bigint,
  options: GetGuildAuditLog,
) {
  await requireBotGuildPermissions(guildId, ["VIEW_AUDIT_LOG"]);

  return await rest.runMethod<AuditLog>(
    "get",
    endpoints.GUILD_AUDIT_LOGS(guildId),
    camelKeysToSnakeCase({
      ...options,
      limit: options.limit && options.limit >= 1 && options.limit <= 100
        ? options.limit
        : 50,
    }),
  );
}
