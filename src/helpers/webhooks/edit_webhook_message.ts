import { rest } from "../../rest/rest.ts";
import { structures } from "../../structures/mod.ts";
import { DiscordAllowedMentionsTypes } from "../../types/messages/allowed_mentions_types.ts";
import { Message } from "../../types/messages/message.ts";
import { Errors } from "../../types/misc/errors.ts";
import { EditWebhookMessage } from "../../types/webhooks/edit_webhook_message.ts";
import { endpoints } from "../../util/constants.ts";

export async function editWebhookMessage(
  webhookId: bigint,
  webhookToken: string,
  messageId: bigint,
  options: EditWebhookMessage,
) {
  if (options.content && options.content.length > 2000) {
    throw Error(Errors.MESSAGE_MAX_LENGTH);
  }

  if (options.embeds && options.embeds.length > 10) {
    options.embeds.splice(10);
  }

  if (options.allowedMentions) {
    if (options.allowedMentions.users?.length) {
      if (
        options.allowedMentions.parse?.includes(
          DiscordAllowedMentionsTypes.UserMentions,
        )
      ) {
        options.allowedMentions.parse = options.allowedMentions.parse.filter(
          (p) => p !== "users",
        );
      }

      if (options.allowedMentions.users.length > 100) {
        options.allowedMentions.users = options.allowedMentions.users.slice(
          0,
          100,
        );
      }
    }

    if (options.allowedMentions.roles?.length) {
      if (
        options.allowedMentions.parse?.includes(
          DiscordAllowedMentionsTypes.RoleMentions,
        )
      ) {
        options.allowedMentions.parse = options.allowedMentions.parse.filter(
          (p) => p !== "roles",
        );
      }

      if (options.allowedMentions.roles.length > 100) {
        options.allowedMentions.roles = options.allowedMentions.roles.slice(
          0,
          100,
        );
      }
    }
  }

  const result = await rest.runMethod<Message>(
    "patch",
    endpoints.WEBHOOK_MESSAGE(webhookId, webhookToken, messageId),
    { ...options, allowedMentions: options.allowedMentions },
  );

  return await structures.createDiscordenoMessage(result);
}
