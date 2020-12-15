const { name, description, repository } = require("../../package");

const title = name[0].toUpperCase() + name.slice(1);
const discordLink = "https://discord.com/invite/5vBgXk3UcZ";

module.exports = {
  base: `/`,
  title,
  description,
  head: [
    ["link", { rel: "icon", href: "/favicon.png" }],
    ["meta", { name: "theme-color", content: "#7289DA" }],
    ["meta", { name: "apple-mobile-web-app-capable", content: "yes" }],
    [
      "meta",
      { name: "apple-mobile-web-app-status-bar-style", content: "black" },
    ],
    ["meta", { name: "og:title", content: title }],
    [
      "meta",
      {
        name: "og:description",
        content: description,
      },
    ],
    ["meta", { name: "og:type", content: "website" }],
    ["meta", { name: "og:url", content: "https://discordeno.mod.land" }],
    ["meta", { name: "og:image", content: "/logo.png" }],
  ],
  theme: "yuu",
  themeConfig: {
    repo: repository,
    docsDir: "docs/src",
    editLinks: true,
    lastUpdated: true,
    sidebarDepth: 0,
    nav: [
      {
        text: "Home",
        link: "/",
      },
      {
        text: "Docs",
        link: "https://doc.deno.land/https/deno.land/x/discordeno/mod.ts",
      },
      {
        text: "Discord",
        link: discordLink,
        target: "_blank",
      },
    ],
    sidebar: {
      "/": [
        {
          title: "Home",
          children: [
            "/",
            "faq",
            "gettingstarted",
            "djs",
          ],
        },
        {
          title: "Step By Step Guide",
          children: [
            "/stepbystep/",
            "/stepbystep/createbot",
            "/stepbystep/createcommand",
            "/stepbystep/createevent",
            "/stepbystep/createlanguage",
            "/stepbystep/createmonitor",
            "/stepbystep/createinhibitor",
            "/stepbystep/createtask",
            "/stepbystep/hostingbot",
          ],
        },
        {
          title: "Advanced Guide",
          children: [
            "/advanced/",
            "/advanced/arguments",
            "/advanced/customizations",
            "/advanced/dockerhosting",
            "/advanced/dynamiccommands",
            "/advanced/permlevels",
            "/advanced/subcommands",
          ],
        },
      ],
    },
  },
  plugins: [
    "@vuepress/plugin-back-to-top",
    "@vuepress/plugin-medium-zoom",
  ],
};
