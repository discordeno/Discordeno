import { cacheHandlers } from "../../cache.ts";
import { RequestManager } from "../../rest/request_manager.ts";
import { endpoints } from "../../util/constants.ts";

/** Returns the widget for the guild. */
export async function getWidget(guildId: string, options?: { force: boolean }) {
  if (!options?.force) {
    const guild = await cacheHandlers.get("guilds", guildId);
    if (!guild) throw new Error(Errors.GUILD_NOT_FOUND);
    if (!guild?.widgetEnabled) throw new Error(Errors.GUILD_WIdGET_NOT_ENABLED);
  }

  return RequestManager.get(`${endpoints.GUILD_WIDGET(guildId)}.json`);
}
