import { defineConfig } from "sourcey";

export default defineConfig({
  name: "Cheese Store",
  theme: {
    colors: {
      primary: "#d97706",
      light: "#d97706",
      dark: "#ca6d06",
    },
  },
  logo: "./cheese.png",
  repo: "https://github.com/cheesestore/cheesestore.github.io",
  editBranch: "main",
  codeSamples: ["curl", "javascript", "typescript", "python", "go", "ruby", "rust"],
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
      label: "Order Cheese",
      href: "https://cheesestore.github.io",
    },
  },
  footer: {
    links: [
      { type: "github", href: "https://github.com/cheesestore/cheesestore.github.io" },
    ],
  },
});
