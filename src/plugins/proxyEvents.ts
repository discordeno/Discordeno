import { eventHandlers, replaceEventHandlers } from "../bot.ts";
import type { EventHandlers } from "../types/discordeno/eventHandlers.ts";
import type { EventEmitter } from "https://deno.land/std@0.96.0/node/events.ts";

export function proxyEvent(emitter: EventEmitter) {
  replaceEventHandlers(
    new Proxy(eventHandlers, {
      get(target, prop: keyof EventHandlers) {
        return target[prop] !== undefined
          ? target[prop]
          : ((...args: unknown[]) => emitter.emit(prop, ...args));
      },
    }),
  );
}
