# Discordeno

> Discord API library for [Deno](https://deno.land)

[![Discord](https://img.shields.io/discord/785384884197392384?color=7289da&logo=discord&logoColor=dark)](https://discord.com/invite/5vBgXk3UcZ)
![Lint](https://github.com/discordeno/discordeno/workflows/Lint/badge.svg)
![Test](https://github.com/discordeno/discordeno/workflows/Test/badge.svg)

## Features

- **Secure & stable**: Discordeno is comparatively more stable than the other
  libraries. One of the greatest issues with almost every library is stability;
  types are outdated, less (or minimal) parity with the API, core maintainers
  have quit or no longer actively maintain the library, and whatnot. Discordeno,
  on the other hand, is actively maintained to ensure great performance and
  convenience. Discordeno internally checks all missing permissions before
  forwarding a request to the API so that the client does not get
  globally-banned by Discord.
- **Efficient & lightweight**: Discordeno is simplistic, easy-to-use, versatile,
  and efficient. Uses
  [Convention Over Configuration](https://en.wikipedia.org/wiki/Convention_over_configuration)
  design paradigm ― prefers defaults that Discord recommends or the best
  configuration for the majority of the users.
- [**Functional API**](https://en.wikipedia.org/wiki/Functional_programming):
  This will produce an overall concise and more performant code while removing
  the difficulties of extending built-in classes and inheritance.

## Getting Started

### Minimal Example

Here is a minimal example to get started with:

```typescript
import { startBot } from "https://deno.land/x/discordeno/mod.ts";

startBot({
  token: "BOT TOKEN",
  intents: ["GUILDS", "GUILD_MESSAGES"],
  eventHandlers: {
    ready() {
      console.log("Successfully connected to gateway");
    },
    messageCreate(message) {
      if (message.content === "!ping") {
        message.reply("Pong using Discordeno!");
      }
    },
  },
});
```

### Boilerplates

Note to developers: don't worry a lot of developers start out programming a
Discord bot as their first project (I did 😉) and it is not so easy to do so.
Discordeno is built considering all the issues that I and a lot of developers
that I personally know had when I first started out coding Discord bots with
existing libraries. If you are a beginner, you can check out these awesome
official and unofficial boilerplates:

- [Discordeno Bot Template (official)](https://github.com/Skillz4Killz/Discordeno-bot-template)
- [Add Your Own!](https://github.com/discordeno/discordeno/pulls)

## Useful Links

- [Website](https://discordeno.mod.land)
- [Documentation](https://doc.deno.land/https/deno.land/x/discordeno/mod.ts)
- [Discord](https://discord.com/invite/5vBgXk3UcZ)

## Contributing

We appreciate your help! Before contributing, please read the
[Contributing Guide](https://github.com/discordeno/discordeno/blob/master/.github/CONTRIBUTING.md).

### License

[MIT © discordeno](https://github.com/discordeno/discordeno/blob/master/LICENSE)
