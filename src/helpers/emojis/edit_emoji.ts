import { rest } from "../../rest/rest.ts";
import { endpoints } from "../../util/constants.ts";
import { requireBotGuildPermissions } from "../../util/permissions.ts";

/** Modify the given emoji. Requires the MANAGE_EMOJIS permission. */
export async function editEmoji(
  guildId: string,
  id: string,
  options: EditEmojisOptions,
) {
  await requireBotGuildPermissions(guildId, ["MANAGE_EMOJIS"]);

  const result = await rest.runMethod(
    "patch",
    endpoints.GUILD_EMOJI(guildId, id),
    {
      name: options.name,
      roles: options.roles,
    },
  );

  return result;
}
