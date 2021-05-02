import { eventHandlers } from "../../bot.ts";
import { cacheHandlers } from "../../cache.ts";
import { structures } from "../../structures/mod.ts";
import { DiscordGatewayPayload } from "../../types/gateway/gateway_payload.ts";
import { GuildMemberWithUser } from "../../types/guilds/guild_member.ts";
import { Interaction } from "../../types/interactions/interaction.ts";
import { snowflakeToBigint } from "../../util/bigint.ts";

export async function handleInteractionCreate(data: DiscordGatewayPayload) {
  const payload = data.d as Interaction;
  const discordenoMember = payload.guildId
    ? await structures.createDiscordenoMember(
      payload.member as GuildMemberWithUser,
      snowflakeToBigint(payload.guildId),
    )
    : undefined;
  if (discordenoMember) {
    await cacheHandlers.set("members", discordenoMember.id, discordenoMember);
    eventHandlers.interactionGuildCreate?.(payload, discordenoMember);
  } else {
    eventHandlers.interactionDMCreate?.(payload);
  }

  eventHandlers.interactionCreate?.(payload, discordenoMember);
}
