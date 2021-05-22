import { rest } from "../../rest/rest.ts";
import type { DiscoveryMetadata } from "../../types/discovery/discovery_metadata.ts";
import { endpoints } from "../../util/constants.ts";

/** Returns the discovery metadata object for the guild. Requires the `MANAGE_GUILD` permission. */
export async function getDiscovery(guildId: bigint) {
	return await rest.runMethod<DiscoveryMetadata>("get", endpoints.DISCOVERY_METADATA(guildId));
}
