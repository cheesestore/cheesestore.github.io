import { defineConfig, markdown, mcp, openapi } from "sourcey";

export default defineConfig({
  name: "Cheese Store",
  siteUrl: "https://cheesestore-docs.pages.dev",
  prettyUrls: "strip",
  repo: "https://github.com/cheesestore/cheesestore.github.io",
  editBranch: "master",
  editBasePath: "source",
  theme: {
    name: "default",
    colors: { primary: "#ad590a" },
    fonts: { sans: "system-ui", google: false },
  },
  navigation: {
    tabs: [
      {
        tab: "Docs",
        slug: "",
        source: markdown({ groups: [{ group: "Start here", pages: ["introduction", "quickstart", "authentication"] }] }),
      },
      {
        tab: "Guides",
        slug: "guides",
        source: markdown({ groups: [{ group: "Workflows", pages: ["webhooks", "inventory"] }] }),
      },
      { tab: "API Reference", slug: "api", source: openapi("./openapi.yaml") },
      { tab: "MCP", slug: "mcp", source: mcp("./mcp.json") },
      {
        tab: "Changelog",
        slug: "changelog",
        source: markdown({ groups: [{ group: "Releases", pages: ["changes"] }] }),
      },
    ],
  },
  navbar: {
    links: [{ type: "github", href: "https://github.com/cheesestore/cheesestore.github.io/tree/master/source" }],
    primary: { type: "button", label: "Get Sourcey", href: "https://sourcey.com/docs" },
  },
});
