import { applicationId } from "../../../bot.ts";
import { rest } from "../../../rest/rest.ts";
import { structures } from "../../../structures/mod.ts";
import type { DiscordenoEditWebhookMessage } from "../../../types/discordeno/edit_webhook_message.ts";
import { Errors } from "../../../types/discordeno/errors.ts";
import { DiscordAllowedMentionsTypes } from "../../../types/messages/allowed_mentions_types.ts";
import { endpoints } from "../../../util/constants.ts";
import { snakelize, validateComponents } from "../../../util/utils.ts";

/** To edit your response to a slash command. If a messageId is not provided it will default to editing the original response. */
export async function editSlashResponse(token: string, options: DiscordenoEditWebhookMessage) {
  if (options.content && options.content.length > 2000) {
    throw Error(Errors.MESSAGE_MAX_LENGTH);
  }

  if (options.components?.length) {
    validateComponents(options.components);
  }

  if (options.embeds && options.embeds.length > 10) {
    options.embeds.splice(10);
  }

  if (options.allowedMentions) {
    if (options.allowedMentions.users?.length) {
      if (options.allowedMentions.parse?.includes(DiscordAllowedMentionsTypes.UserMentions)) {
        options.allowedMentions.parse = options.allowedMentions.parse.filter((p) => p !== "users");
      }

      if (options.allowedMentions.users.length > 100) {
        options.allowedMentions.users = options.allowedMentions.users.slice(0, 100);
      }
    }

    if (options.allowedMentions.roles?.length) {
      if (options.allowedMentions.parse?.includes(DiscordAllowedMentionsTypes.RoleMentions)) {
        options.allowedMentions.parse = options.allowedMentions.parse.filter((p) => p !== "roles");
      }

      if (options.allowedMentions.roles.length > 100) {
        options.allowedMentions.roles = options.allowedMentions.roles.slice(0, 100);
      }
    }
  }

  const result = await rest.runMethod(
    "patch",
    options.messageId
      ? endpoints.WEBHOOK_MESSAGE(applicationId, token, options.messageId)
      : endpoints.INTERACTION_ORIGINAL_ID_TOKEN(applicationId, token),
    snakelize(options)
  );

  // If the original message was edited, this will not return a message
  if (!options.messageId) return result as undefined;

  const message = await structures.createDiscordenoMessage(result);
  return message;
}
