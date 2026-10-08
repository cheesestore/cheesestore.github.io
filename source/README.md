# Cheese Store documentation example

This is a fictional Cheese Store API and a local MCP example rendered with
Sourcey. The documentation build and the small MCP server are runnable; no
cheese HTTP service is hosted.

Run `npm ci` and `npm run build` in this directory. The site is written to
`dist/` from the Markdown, OpenAPI, and MCP files here. `robots.txt` is copied
into the deployed static output. The public site uses the canonical origin
`https://cheesestore-docs.pages.dev`.

Run `npm run mcp:example` to start the example MCP server over stdio. Its
tool inventory matches the checked-in `mcp.json` snapshot.

The introduction has no auto-loaded video or external font. That keeps the
example useful on a slow connection and makes performance measurements easier
to reproduce. Any Lighthouse score describes one URL, release, test version,
device profile, and run time; it is not a property of every Sourcey site.
