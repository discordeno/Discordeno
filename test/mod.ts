import { startBot,delay,botID } from "../mod.ts";
import { assertExists } from "./deps.ts";

// Default options for tests
export const defaultTestOptions: Partial<Deno.TestDefinition> = {
  sanitizeOps: false,
  sanitizeResources: false,
  // sanitizeExit: false,
};

// Temporary data
export const tempData = {
  guildID: "",
  roleID: "",
  channelID: "",
  messageID: "",
};

// Main
Deno.test({
  name: "[main] connect to gateway",
  async fn() {
    const token = Deno.env.get("DISCORD_TOKEN");
    if (!token) throw new Error("Token is not provided");

    await startBot({
      token,
      intents: ["GUILD_MESSAGES", "GUILDS"],
    });

    // Delay the execution by 5 seconds
    await delay(5000);

    // Assertions
    assertExists(botID);
  },
  ...defaultTestOptions,
});

// // Guild

// Deno.test({
//   name: "[guild] create a new guild",
//   async fn() {
//     const guild = await createGuild({
//       name: "Discordeno Test",
//     }) as Guild;

//     // Assertions
//     assertExists(guild);

//     tempData.guildID = guild.id;

//     // Delay the execution by 5 seconds to allow GUILD_CREATE event to be processed
//     await delay(5000);
//   },
//   ...defaultTestOptions,
// });

// // Role

// Deno.test({
//   name: "[role] create a role in a guild",
//   async fn() {
//     if (!tempData.guildID) {
//       throw new Error("guildID not present in temporary data");
//     }

//     const name = "Discordeno Test";
//     const role = await createRole(tempData.guildID, {
//       name,
//     });

//     // Assertions
//     assertExists(role);
//     assertEquals(role.name, name);

//     tempData.roleID = role.id;
//   },
//   ...defaultTestOptions,
// });

// Deno.test({
//   name: "[role] edit a role in a guild",
//   async fn() {
//     const name = "Discordeno Test Edited";
//     const color = 4320244;
//     const role = await editRole(tempData.guildID, tempData.roleID, {
//       name,
//       color,
//       hoist: false,
//       mentionable: false,
//     }) as Role;

//     // Assertions
//     assertExists(role);
//     assertEquals(role.name, name);
//     assertEquals(role.color, color);
//     assertEquals(role.hoist, false);
//     assertEquals(role.mentionable, false);

//     tempData.roleID = role.id;
//   },
//   ...defaultTestOptions,
// });

// // Channel

// Deno.test({
//   name: "[channel] create a channel in a guild",
//   async fn() {
//     const channel = await createGuildChannel(tempData.guildID, "test");

//     // Assertions
//     assertExists(channel);

//     tempData.channelID = channel.id;
//   },
//   ...defaultTestOptions,
// });

// Deno.test({
//   name: "[channel] get a channel in a guild",
//   async fn() {
//     const channel = await getChannel(tempData.channelID);

//     // Assertions
//     assertExists(channel);
//     assertEquals(channel.id, tempData.channelID);
//   },
//   ...defaultTestOptions,
// });

// Deno.test({
//   name: "[channel] edit a channel in a guild",
//   async fn() {
//     const channel = await editChannel(tempData.channelID, {
//       name: "discordeno-test-edited",
//       overwrites: [
//         {
//           id: tempData.roleID,
//           type: OverwriteType.ROLE,
//           allow: ["VIEW_CHANNEL", "SEND_MESSAGES"],
//           deny: ["USE_EXTERNAL_EMOJIS"],
//         },
//       ],
//     }) as Channel;

//     // Wait 5s for CHANNEL_UPDATE to fire
//     await delay(5000);

//     // Assertions
//     assertExists(channel);
//     assertEquals(channel.name, "discordeno-test-edited");
//   },
//   ...defaultTestOptions,
// });

// Deno.test({
//   name: "[channel] channel overwrite has permission",
//   fn() {
//     const channel = cache.channels.get(tempData.channelID);
//     if (!channel) throw new Error("Channel not found");
//     if (!channel.permissionOverwrites) {
//       throw new Error("permissionOverwrites not found");
//     }

//     const hasPerm = channelOverwriteHasPermission(
//       tempData.guildID,
//       tempData.roleID,
//       channel.permissionOverwrites,
//       ["VIEW_CHANNEL", "SEND_MESSAGES"],
//     );
//     const missingPerm = channelOverwriteHasPermission(
//       tempData.guildID,
//       tempData.roleID,
//       channel.permissionOverwrites,
//       ["USE_EXTERNAL_EMOJIS"],
//     );

//     assertEquals(hasPerm, true);
//     assertEquals(missingPerm, false);
//   },
//   ...defaultTestOptions,
// });

// // Message

// Deno.test({
//   name: "[message] send a message in a text channel",
//   async fn() {
//     const message = await sendMessage(tempData.channelID, {
//       embed: {
//         title: "Discordeno Test",
//       },
//     });

//     // Assertions
//     assertExists(message);
//     assertEquals(message.embeds[0].title, "Discordeno Test");

//     tempData.messageID = message.id;
//   },
//   ...defaultTestOptions,
// });

// Deno.test({
//   name: "[message] get a message in a guild",
//   async fn() {
//     const message = await getMessage(tempData.channelID, tempData.messageID);

//     // Assertions
//     assertExists(message);
//     assertEquals(message.embeds[0].title, "Discordeno Test");
//   },
//   ...defaultTestOptions,
// });

// Deno.test({
//   name: "[message] pin a message in a channel",
//   async fn() {
//     await pin(tempData.channelID, tempData.messageID);
//   },
//   ...defaultTestOptions,
// });

// Deno.test({
//   name: "[message] get pinned message in a channel",
//   async fn() {
//     const [msg] = await getPins(tempData.channelID);

//     // Assertions
//     assertExists(msg);
//     assertEquals(msg.id, tempData.messageID);
//     assertEquals(msg.pinned, true);
//   },
//   ...defaultTestOptions,
// });

// Deno.test({
//   name: "[message] unpin a message",
//   async fn() {
//     await unpin(tempData.channelID, tempData.messageID);
//   },
//   ...defaultTestOptions,
// });

// Deno.test({
//   name: "[message] add a reaction to a message",
//   async fn() {
//     // TODO: add tests for a guild emoji ― <:name:id>

//     await addReaction(tempData.channelID, tempData.messageID, "👍");
//   },
//   ...defaultTestOptions,
// });

// // TODO(ayntee): add unit tests for getReactions()

// Deno.test({
//   name: "[message] remove a reaction to a message",
//   async fn() {
//     await removeReaction(tempData.channelID, tempData.messageID, "👍");
//   },
//   ...defaultTestOptions,
// });

// // Cleanup

// Deno.test({
//   name: "[message] delete a message by channel ID",
//   async fn() {
//     await deleteMessageByID(tempData.channelID, tempData.messageID);
//   },
//   ...defaultTestOptions,
// });

// Deno.test({
//   name: "[channel] delete a channel in a guild",
//   async fn() {
//     await deleteChannel(tempData.guildID, tempData.channelID);
//   },
//   ...defaultTestOptions,
// });

// Deno.test({
//   name: "[role] delete a role in a guild",
//   async fn() {
//     await deleteRole(tempData.guildID, tempData.roleID);
//   },
//   ...defaultTestOptions,
// });

// Deno.test({
//   name: "[guild] delete a guild",
//   async fn() {
//     await deleteServer(tempData.guildID);

//     // TODO(ayntee): remove this weird shit lol
//     // TODO(ayntee): check if the GUILD_DELETE event is fired
//     tempData.guildID = "";
//     assertEquals(tempData.guildID, "");
//   },
//   ...defaultTestOptions,
// });

// // Forcefully exit the Deno process once all tests are done.
// Deno.test({
//   name: "[main] exit the process forcefully",
//   fn() {
//     Deno.exit();
//   },
//   ...defaultTestOptions,
// });
