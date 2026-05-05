# Cheese Store Docs

Reference documentation project built with [Sourcey](https://sourcey.com). Clone it, run it, use it as a starting point for your own docs.

**[Live demo](https://sourcey.com/cheesestore)**

## What's inside

This project demonstrates every Sourcey feature in one site:

- **Markdown guides** with rich components (cards, tabs, steps, callouts, accordions, code groups)
- **OpenAPI reference** auto-generated from `cheese.yml` with code samples in 7 languages
- **MCP server docs** rendered from `cheesestore.mcp.json` with JSON-RPC and SDK samples
- **Five navigation tabs** — Documentation, Guides, API Reference, MCP Tools, Changelog
- **Custom branding** — colors, logo, favicon, navbar with primary CTA
- **Dark mode**, instant search, and static HTML output

## Quick start

```bash
git clone https://github.com/cheesestore/cheesestore.github.io
cd cheesestore.github.io
npm install
npx sourcey dev
```

Open [http://localhost:4400](http://localhost:4400).

## Build

```bash
npx sourcey build
```

Static HTML written to `dist/`. Deploy anywhere.

The demo deploys to Cloudflare Pages as `cheesestore-docs` and is served at
`https://sourcey.com/cheesestore` through the sourcey.com proxy.

## Project structure

```
sourcey.config.ts    # Site config — tabs, navigation, theme
cheese.yml           # OpenAPI 3.0 spec (Cheese Store API)
cheesestore.mcp.json # MCP server snapshot
cheese.svg           # Logo
introduction.md      # Landing page
quickstart.md        # Getting started guide
authentication.md    # Auth guide
concepts.md          # Core concepts
webhooks.md          # Webhook integration guide
directives.md        # Component showcase (every directive type)
changelog.md         # Release notes
```

## Use as a template

1. Fork or clone this repo
2. Replace `cheese.yml` with your OpenAPI spec
3. Edit `sourcey.config.ts` to match your project
4. Rewrite the markdown pages
5. Run `npx sourcey build` and deploy

## License

MIT
