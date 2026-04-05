import { defineConfig } from "sourcey";

export default defineConfig({
  name: "Cheese Store",
  theme: {
    colors: {
      primary: "#d97706",
      light: "#d97706",
      dark: "#8b5033",
    },
  },
  logo: "./cheese.svg",
  favicon: "./favicon.ico",
  repo: "https://github.com/cheesestore/cheesestore.github.io",
  editBranch: "main",
  codeSamples: ["curl", "javascript", "typescript", "python", "go", "ruby", "rust"],
  search: {
    featured: ["introduction", "quickstart", "authentication"],
  },
  navigation: {
    tabs: [
      {
        tab: "Documentation",
        slug: "",
        groups: [
          {
            group: "Getting Started",
            pages: ["introduction", "quickstart", "authentication"],
          },
          {
            group: "Concepts",
            pages: ["concepts"],
          },
        ],
      },
      {
        tab: "Guides",
        groups: [
          {
            group: "Integration",
            pages: ["webhooks"],
          },
          {
            group: "Reference",
            pages: ["directives"],
          },
        ],
      },
      {
        tab: "API Reference",
        slug: "api",
        openapi: "./cheese.yml",
      },
      {
        tab: "MCP Tools",
        slug: "mcp",
        mcp: "./cheesestore.mcp.json",
      },
      {
        tab: "Changelog",
        groups: [
          {
            group: "Updates",
            pages: ["changelog"],
          },
        ],
      },
    ],
  },
  navbar: {
    links: [
      { type: "github", href: "https://github.com/cheesestore/cheesestore.github.io" },
    ],
    primary: {
      type: "button",
      label: "Install Sourcey",
      href: "https://sourcey.com",
    },
  },
  footer: {
    links: [
      { type: "github", href: "https://github.com/cheesestore/cheesestore.github.io" },
    ],
  },
});
