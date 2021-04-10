import { checkRateLimits } from "./check_rate_limits.ts";
import { cleanupQueues } from "./cleanup_queues.ts";
import { createRequestBody } from "./create_request_body.ts";
import { handlePayload } from "./handle_payload.ts";
import { processQueue } from "./process_queue.ts";
import { processRateLimitedPaths } from "./process_rate_limited_paths.ts";
import { processRequest } from "./process_request.ts";
import { processRequestHeaders } from "./process_request_headers.ts";
import { runMethod } from "./run_method.ts";
import { simplifyUrl } from "./simplify_url.ts";

export const rest = {
  /** The bot token for this rest client. */
  token: "",
  /** The maximum amount of retries allowed */
  maxRetryCount: 10,
  apiVersion: "8",
  /** The secret authorization key to confirm that this was a request made by you and not a DDOS attack. */
  authorization: "discordeno_best_lib_ever",
  pathQueues: new Map(),
  processingQueue: false,
  processingRateLimitedPaths: false,
  globallyRateLimited: false,
  ratelimitedPaths: new Map(),
  eventHandlers: {
    // BY DEFAULT WE WILL LOG ALL ERRORS TO CONSOLE. USER CAN CHOOSE TO OVERRIDE
    error: console.error,
    // PLACEHOLDERS TO ALLOW USERS TO CUSTOMIZE
    debug: function (_type, error, ...args) {},
    fetching() {},
    fetched() {},
    fetchSuccess() {},
    fetchFailed() {},
    globallyRateLimited() {},
    retriesMaxed() {},
  },
  /** Handler function for every request. Converts to json, verified authorization & requirements and begins processing the request */
  handlePayload,
  checkRateLimits,
  cleanupQueues,
  processQueue,
  processRateLimitedPaths,
  processRequestHeaders,
  processRequest,
  createRequestBody,
  runMethod,
  simplifyUrl,
};
