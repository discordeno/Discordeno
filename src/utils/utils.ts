import type { StatusType } from "../types/discord.ts";

import { ActivityType } from "../types/activity.ts";
import { sendGatewayCommand } from "../module/shardingManager.ts";
import { encode } from "../../deps.ts";

export const sleep = (timeout: number) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export interface BotStatusRequest {
  status: StatusType;
  game: {
    name?: string;
    type: ActivityType;
  };
}

export function editBotsStatus(
  status: StatusType,
  name?: string,
  type = ActivityType.Game,
) {
  sendGatewayCommand("EDIT_BOTS_STATUS", { status, game: { name, type } });
}

export async function urlToBase64(url: string) {
  const buffer = await fetch(url).then((res) => res.arrayBuffer());
  const imageStr = encode(buffer);
  const type = url.substring(url.lastIndexOf(".") + 1);
  return `data:image/${type};base64,${imageStr}`;
}
