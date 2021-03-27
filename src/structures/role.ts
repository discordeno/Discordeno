import { cache } from "../cache.ts";
import { deleteRole } from "../helpers/roles/delete_role.ts";
import { editRole } from "../helpers/roles/edit_role.ts";
import { Collection } from "../util/collection.ts";
import { createNewProp } from "../util/utils.ts";
import { Guild } from "./guild.ts";
import { Member } from "./member.ts";

const baseRole: Partial<Role> = {
  get guild() {
    return cache.guilds.find((g) => g.roles.has(this.id!));
  },
  get hexColor() {
    return this.color!.toString(16);
  },
  get members() {
    return cache.members.filter((m) =>
      m.guilds.some((g) => g.roles.includes(this.id!))
    );
  },
  get mention() {
    return `<@&${this.id}>`;
  },

  // METHODS
  delete(guildId?: string) {
    // If not guild id was provided try and find one
    if (!guildId) guildId = guildId || this.guild?.id;
    // If a guild id is still not available error out
    if (!guildId) {
      throw new Error(
        "role.delete() did not find a valid guild in cache. Please provide the guildId like role.delete(guildId)",
      );
    }

    return deleteRole(guildId, this.id!).catch(console.error);
  },
  edit(options: CreateRoleOptions, guildId?: string) {
    // If not guild id was provided try and find one
    if (!guildId) guildId = guildId || this.guild?.id;
    // If a guild id is still not available error out
    if (!guildId) {
      throw new Error(
        "role.edit() did not find a valid guild in cache. Please provide the guildId like role.edit({}, guildId)",
      );
    }

    return editRole(guildId, this.id!, options);
  },
  higherThanRoleId(roleId: string, position?: number) {
    // If no position try and find one from cache
    if (!position) position = this.guild?.roles.get(roleId)?.position;
    // If still none error out.
    if (!position) {
      throw new Error(
        "role.higherThanRoleId() did not have a position provided and the role or guild was not found in cache. Please provide a position like role.higherThanRoleId(roleId, position)",
      );
    }

    // Rare edge case handling
    if (this.position === position) {
      return this.id! < roleId;
    }

    return this.position! > position;
  },
};

// deno-lint-ignore require-await
export async function createRoleStruct({ tags = {}, ...rest }: RoleData) {
  const restProps: Record<string, ReturnType<typeof createNewProp>> = {};
  for (const key of Object.keys(rest)) {
    // @ts-ignore index signature
    restProps[key] = createNewProp(rest[key]);
  }

  const role = Object.create(baseRole, {
    ...restProps,
    botId: createNewProp(tags.bot_id),
    isNitroBoostRole: createNewProp("premium_subscriber" in tags),
    integrationId: createNewProp(tags.integration_id),
  });

  return role as Role;
}
