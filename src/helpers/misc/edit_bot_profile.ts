import { rest } from "../../rest/rest.ts";
import { Errors } from "../../types/discordeno/errors.ts";
import type { User } from "../../types/users/user.ts";
import { endpoints } from "../../util/constants.ts";
import { urlToBase64 } from "../../util/utils.ts";

/** Modifies the bot's username or avatar.
 * NOTE: username: if changed may cause the bot's discriminator to be randomized.
 */
export async function editBotProfile(options: { username?: string; botAvatarURL?: string | null }) {
  // Nothing was edited
  if (!options.username && options.botAvatarURL === undefined) return;
  // Check username requirements if username was provided
  if (options.username) {
    if (options.username.length > 32) {
      throw new Error(Errors.USERNAME_MAX_LENGTH);
    }
    if (options.username.length < 2) {
      throw new Error(Errors.USERNAME_MIN_LENGTH);
    }
    if (["@", "#", ":", "```"].some((char) => options.username!.includes(char))) {
      throw new Error(Errors.USERNAME_INVALID_CHARACTER);
    }
    if (["discordtag", "everyone", "here"].includes(options.username)) {
      throw new Error(Errors.USERNAME_INVALID_USERNAME);
    }
  }

  const avatar = options?.botAvatarURL ? await urlToBase64(options?.botAvatarURL) : options?.botAvatarURL;

  return await rest.runMethod<User>("patch", endpoints.USER_BOT, {
    username: options.username?.trim(),
    avatar,
  });
}
