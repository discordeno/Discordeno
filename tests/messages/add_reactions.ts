import {
  addReactions,
  cache,
  createEmoji,
  delay,
  DiscordReaction,
  sendMessage,
} from "../../mod.ts";
import { defaultTestOptions, tempData } from "../ws/start_bot.ts";
import { assertEquals, assertExists } from "../deps.ts";

async function ifItFailsBlameWolf(
  type: "getter" | "raw",
  custom = false,
  ordered = false,
) {
  const message = await sendMessage(tempData.channelId, "Hello World!");

  // Assertions
  assertExists(message);

  // Delay the execution by 5 seconds to allow MESSAGE_CREATE event to be processed
  await delay(5000);

  if (!cache.messages.has(message.id)) {
    throw new Error(
      "The message seemed to be sent but it was not cached.",
    );
  }

  let emojiIds = ["❤", "😃"];

  if (custom) {
    emojiIds = [
      `<:blamewolf:${
        (await createEmoji(
          tempData.guildId,
          "blamewolf",
          "https://cdn.discordapp.com/emojis/814955268123000832.png",
          {
            name: "blamewolf",
            image: "https://cdn.discordapp.com/emojis/814955268123000832.png",
            roles: [],
          },
        )).id
      }>`,
      `<:blamewolf2:${
        (await createEmoji(
          tempData.guildId,
          "blamewolf2",
          "https://cdn.discordapp.com/emojis/814955268123000832.png",
          {
            name: "blamewolf2",
            image: "https://cdn.discordapp.com/emojis/814955268123000832.png",
            roles: [],
          },
        )).id
      }>`,
    ];
  }

  if (type === "raw") {
    await addReactions(message.channelId, message.id, emojiIds, ordered);
  } else {
    await message.addReactions(emojiIds, ordered);
  }

  await delay(5000);

  assertEquals(
    await cache.messages.get(message.id)?.reactions?.filter((
      reaction: DiscordReaction,
    ) => emojiIds.includes(reaction.emoji?.name)).length,
    2,
  );
}

Deno.test({
  name: "[message] add reactions",
  async fn() {
    await ifItFailsBlameWolf("raw");
  },
  ...defaultTestOptions,
});

Deno.test({
  name: "[message] message.addReactions()",
  async fn() {
    await ifItFailsBlameWolf("getter");
  },
  ...defaultTestOptions,
});

Deno.test({
  name: "[message] add custom reactions",
  async fn() {
    await ifItFailsBlameWolf("raw", true);
  },
  ...defaultTestOptions,
});

Deno.test({
  name: "[message] message.addReactions() with custom reactions",
  async fn() {
    await ifItFailsBlameWolf("getter", true);
  },
  ...defaultTestOptions,
});

Deno.test({
  name: "[message] add ordered reactions",
  async fn() {
    await ifItFailsBlameWolf("raw", false, true);
  },
  ...defaultTestOptions,
});

Deno.test({
  name: "[message] message.addReactions() ordered",
  async fn() {
    await ifItFailsBlameWolf("getter", false, true);
  },
  ...defaultTestOptions,
});

Deno.test({
  name: "[message] add ordered custom reactions",
  async fn() {
    await ifItFailsBlameWolf("raw", true, true);
  },
  ...defaultTestOptions,
});

Deno.test({
  name: "[message] message.addReactions() with ordered custom reactions",
  async fn() {
    await ifItFailsBlameWolf("getter", true, true);
  },
  ...defaultTestOptions,
});
