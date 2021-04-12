import { DiscordGatewayIntents } from "../types/gateway/gateway_intents.ts";
import { DiscordGetGatewayBot } from "../types/gateway/get_gateway_bot.ts";
import { StartGatewayOptions } from "./start_gateway_options.ts";
import { ws } from "./ws.ts";

/** ADVANCED DEVS ONLY!!!!!!
 * Starts the standalone gateway.
 * This will require starting the bot separately.
 */
export async function startGateway(options: StartGatewayOptions) {
  ws.identifyPayload.token = `Bot ${options.token}`;
  ws.secretKey = options.secretKey;
  ws.firstShardId = options.firstShardId;
  ws.url = options.url;
  if (options.shardsPerCluster) ws.shardsPerCluster = options.shardsPerCluster;
  if (options.maxClusters) ws.maxClusters = options.maxClusters;

  if (options.compress) {
    ws.identifyPayload.compress = options.compress;
  }
  if (options.reshard) ws.reshard = options.reshard;
  // TODO: Once an hour check if resharding is necessary
  // setInterval(ws.resharder, 1000 * 60 * 60);

  ws.identifyPayload.intents = options.intents.reduce(
    (
      bits,
      next,
    ) => (bits |= typeof next === "string"
      ? DiscordGatewayIntents[next]
      : next),
    0,
  );

  const data = (await fetch(`https://discord.com/api/gateway/bot`, {
    headers: { Authorization: ws.identifyPayload.token },
  }).then((res) => res.json())) as DiscordGetGatewayBot;

  ws.maxShards = options.maxShards || data.shards;
  ws.lastShardId = options.lastShardId || data.shards - 1;

  // TODO: ALL THE FOLLOWING CAN BE REPLACED BY THIS 1 LINE
  // ws.botGatewayData = snakeToCamel(await getGatewayBot())
  ws.botGatewayData.sessionStartLimit.total = data.session_start_limit.total;
  ws.botGatewayData.sessionStartLimit.resetAfter =
    data.session_start_limit.reset_after;
  ws.botGatewayData.sessionStartLimit.remaining =
    data.session_start_limit.remaining;
  ws.botGatewayData.sessionStartLimit.maxConcurrency =
    data.session_start_limit.max_concurrency;
  ws.botGatewayData.shards = data.shards;
  ws.botGatewayData.url = data.url;

  ws.spawnShards(ws.firstShardId);
  await ws.cleanupLoadingShards();
}
