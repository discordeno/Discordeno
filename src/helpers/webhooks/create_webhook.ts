import { rest } from "../../rest/rest.ts";
import { Errors } from "../../types/misc/errors.ts";
import { endpoints } from "../../util/constants.ts";
import { requireBotChannelPermissions } from "../../util/permissions.ts";
import { urlToBase64 } from "../../util/utils.ts";

/**
 * Create a new webhook. Requires the MANAGE_WEBHOOKS permission. Returns a webhook object on success. Webhook names follow our naming restrictions that can be found in our Usernames and Nicknames documentation, with the following additional stipulations:
 *
 * Webhook names cannot be: 'clyde'
 */
export async function createWebhook(
  channelId: string,
  options: WebhookCreateOptions,
) {
  await requireBotChannelPermissions(channelId, ["MANAGE_WEBHOOKS"]);

  if (
    // Specific usernames that discord does not allow
    options.name === "clyde" ||
    // Character limit checks. [...] checks are because of js unicode length handling
    [...options.name].length < 2 ||
    [...options.name].length > 32
  ) {
    throw new Error(Errors.INVALID_WEBHOOK_NAME);
  }

  const result = await rest.runMethod(
    "post",
    endpoints.CHANNEL_WEBHOOKS(channelId),
    {
      ...options,
      avatar: options.avatar ? await urlToBase64(options.avatar) : undefined,
    },
  );

  return result as WebhookPayload;
}
