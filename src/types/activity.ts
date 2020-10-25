import type { Timestamps } from "./discord.ts";

export interface ActivityPayload {
  name: string;
  type: number;
  url?: string;
  created_at: number;
  timestamps: Timestamps;
  details?: string;
}

export enum ActivityType {
  /** Example: "Playing Rocket League" */
  Game,
  /** Example: "Streaming Rocket League" */
  Streaming,
  /** Example: "Listening to spotify" */
  Listening,
  /** Example: ":smiley: I am cool" */
  Custom = 4,
  /** Example: "Competing in Arena World Champions" */
  Competing
}
