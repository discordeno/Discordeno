import { DiscordGatewayOpcodes } from "../types/codes/gateway_opcodes.ts";
import { ws } from "./ws.ts";

export async function identify(shardId: number, maxShards: number) {
  ws.log("IDENTIFYING", { shardId, maxShards });

  // CREATE A SHARD
  const socket = await ws.createShard(shardId);

  // Identify can just set/reset the settings for the shard
  ws.shards.set(shardId, {
    id: shardId,
    ws: socket,
    resumeInterval: 0,
    sessionId: "",
    previousSequenceNumber: 0,
    resuming: false,
    heartbeat: {
      lastSentAt: 0,
      lastReceivedAt: 0,
      acknowledged: false,
      keepAlive: false,
      interval: 0,
      intervalId: 0,
    },
  });

  socket.onopen = () => {
    socket.send(
      JSON.stringify({
        op: DiscordGatewayOpcodes.Identify,
        d: { ...ws.identifyPayload, shard: [shardId, maxShards] },
      }),
    );
  };

  return new Promise((resolve, reject) => {
    ws.loadingShards.set(shardId, {
      shardId,
      resolve,
      reject,
      startedAt: Date.now(),
    });

    ws.cleanupLoadingShards();
  });
}
