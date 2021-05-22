import { ApplicationCommandOption } from "../../src/types/interactions/commands/application_command_option.ts";
import { ApplicationCommandOptionChoice } from "../../src/types/interactions/commands/application_command_option_choice.ts";
import { DiscordApplicationCommandOptionTypes } from "../../src/types/interactions/commands/application_command_option_types.ts";
import { camelize, snakelize, validateSlashCommands } from "../../src/util/utils.ts";
import { assertEquals, assertThrows } from "../deps.ts";

const testSnakeObject = {
  // deno-lint-ignore camelcase
  hello_world: "hello_world",
  // deno-lint-ignore camelcase
  the_universe: {
    blue_planet: {
      water: "is_blue",
      dirt: "isDirty",
    },
    moon: {
      earth_moon: {
        is_round: true,
      },
      other_moon: {
        is_round: 0,
      },
    },
    arrays: ["one_two", { moo_cow: { boo: true } }],
    test_the_id: "123123123123",
  },
};

const testCamelObject = {
  helloWorld: "hello_world",
  theUniverse: {
    bluePlanet: {
      water: "is_blue",
      dirt: "isDirty",
    },
    moon: {
      earthMoon: {
        isRound: true,
      },
      otherMoon: {
        isRound: 0,
      },
    },
    arrays: ["one_two", { mooCow: { boo: true } }],
    testTheId: "123123123123",
  },
};

const someOther = {
  helloWorld: 1,
};

const someElseOther = {
  // deno-lint-ignore camelcase
  hello_world: 1,
};

Deno.test({
  name: "[utils] convert snake case keys to camel case",
  fn() {
    const result = camelize(testSnakeObject);
    assertEquals(result, testCamelObject);
    const resultTwo = camelize(someOther);
    assertEquals(resultTwo, someOther);
  },
});

Deno.test({
  name: "[utils] convert camel case keys to snake case",
  fn() {
    const result = snakelize(testCamelObject);
    assertEquals(result, testSnakeObject);
    const resultTwo = snakelize(someElseOther);
    assertEquals(resultTwo, someElseOther);
  },
});

Deno.test({
  name: "[utils] validateSlashCommands(): application command name",
  fn() {
    assertThrows(() =>
      validateSlashCommands([
        {
          // The maximum length of the name of an application command is 32.
          name: "a".repeat(33),
        },
      ])
    );

    validateSlashCommands([
      {
        name: "workingname",
      },
    ]);
  },
});

Deno.test({
  name: "[utils] validateSlashCommands(): application command description",
  fn() {
    assertThrows(() =>
      // The maximum length of the description of an application command is 100.
      validateSlashCommands([{ description: "a".repeat(101) }])
    );

    validateSlashCommands([
      {
        description: "valid description (should not throw)",
      },
    ]);
  },
});

Deno.test({
  name: "[utils] validateSlashCommands(): number of options",
  fn() {
    const option = {
      name: "optionname",
      description: "The description of the option.",
      type: DiscordApplicationCommandOptionTypes.String,
    };
    // The maximum number of options an application command can "accomodate" is 25.
    const options: ApplicationCommandOption[] = Array(26).fill(option);

    assertThrows(() => validateSlashCommands([{ options }]));

    validateSlashCommands([
      {
        options: [option],
      },
    ]);
  },
});

Deno.test({
  name: "[utils] validateSlashCommands(): number of option choices",
  fn() {
    const choice: ApplicationCommandOptionChoice = {
      name: "choicename",
      value: "choicevalue",
    };
    // The maximum number of application command option choices is 25.
    const choices = Array(26).fill(choice);

    assertThrows(() =>
      validateSlashCommands([
        {
          options: [
            {
              name: "optionname",
              type: DiscordApplicationCommandOptionTypes.String,
              description: "The description of the option.",
              choices,
            },
          ],
        },
      ])
    );

    validateSlashCommands([
      {
        options: [
          {
            name: "optionname",
            type: DiscordApplicationCommandOptionTypes.String,
            description: "The description of the option.",
            choices: [choice],
          },
        ],
      },
    ]);
  },
});

Deno.test({
  name: "[utils] validateSlashCommands(): option name",
  fn() {
    assertThrows(() =>
      validateSlashCommands([
        {
          options: [
            {
              // The maximum length of application command option name is 32.
              name: "a".repeat(33),
              description: "The description of the option.",
              type: DiscordApplicationCommandOptionTypes.String,
            },
          ],
        },
      ])
    );

    validateSlashCommands([
      {
        options: [
          {
            name: "optionname",
            description: "The description of the option.",
            type: DiscordApplicationCommandOptionTypes.String,
          },
        ],
      },
    ]);
  },
});

Deno.test({
  name: "[utils] validateSlashCommands(): option description",
  fn() {
    assertThrows(() =>
      validateSlashCommands([
        {
          options: [
            {
              name: "optionname",
              // The maximum length of application command option description is 100.
              description: "a".repeat(101),
              type: DiscordApplicationCommandOptionTypes.String,
            },
          ],
        },
      ])
    );

    validateSlashCommands([
      {
        options: [
          {
            name: "optionname",
            description: "The description of the option.",
            type: DiscordApplicationCommandOptionTypes.String,
          },
        ],
      },
    ]);
  },
});

Deno.test({
  name: "[utils] validateSlashCommands(): the option choice name",
  fn() {
    assertThrows(() =>
      validateSlashCommands([
        {
          options: [
            {
              name: "optionname",
              choices: [
                {
                  // The maximum length of an option choice name is 100.
                  name: "a".repeat(101),
                  value: "choicevalue",
                },
              ],
              description: "The description of the option.",
              type: DiscordApplicationCommandOptionTypes.String,
            },
          ],
        },
      ])
    );

    validateSlashCommands([
      {
        options: [
          {
            name: "optionname",
            description: "The description of the option.",
            type: DiscordApplicationCommandOptionTypes.String,
            choices: [
              {
                name: "choicename",
                value: "choicevalue",
              },
            ],
          },
        ],
      },
    ]);
  },
});

Deno.test({
  name: "[utils] validateSlashCommands(): option choice value",
  fn() {
    assertThrows(() =>
      validateSlashCommands([
        {
          options: [
            {
              type: DiscordApplicationCommandOptionTypes.String,
              description: "The description of the option.",
              name: "optionname",
              choices: [
                {
                  name: "choicename",
                  value: 123,
                },
              ],
            },
          ],
        },
      ])
    );

    assertThrows(() => {
      validateSlashCommands([
        {
          options: [
            {
              description: "The description of the option.",
              name: "optionname",
              type: DiscordApplicationCommandOptionTypes.String,
              choices: [
                {
                  name: "choicename",
                  // The maximum length of an option choice value is 100.
                  value: "a".repeat(101),
                },
              ],
            },
          ],
        },
      ]);
    });

    validateSlashCommands([
      {
        options: [
          {
            type: DiscordApplicationCommandOptionTypes.String,
            description: "The description of the option.",
            name: "optionname",
            choices: [
              {
                name: "choicename",
                value: "choicevalue",
              },
            ],
          },
        ],
      },
    ]);
  },
});
