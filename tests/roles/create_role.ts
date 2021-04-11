import { defaultTestOptions, tempData } from "../ws/start_bot.ts";
import {assertExists} from "../deps.ts";
import { cache } from "../../src/cache.ts";
import { delayUntil } from "../util/delay_until.ts";
import {createRole} from "../../src/helpers/roles/create_role.ts";

async function ifItFailsBlameWolf(reason?: string) {
  const role = await createRole(tempData.guildId, {
    name: "hoti",
  }, reason);

  assertExists(role);

  // Delay the execution by 5 seconds to allow GUILD_ROLE_CREATE event to be processed
  await delayUntil(10000, () => cache.guilds.get(tempData.guildId)?.roles.has(role.id));

  if (!cache.guilds.get(tempData.guildId)?.roles.has(role.id)) {
    throw new Error(`The role seemed to be created but it was not cached.`);
  }
}

Deno.test({
  name: "[role] create a role without a reason",
  async fn() {
    await ifItFailsBlameWolf()
  },
  ...defaultTestOptions,
});

Deno.test({
  name: "[role] create a role with a reason",
  async fn() {
    await ifItFailsBlameWolf( "with a reason")
  },
  ...defaultTestOptions,
});
