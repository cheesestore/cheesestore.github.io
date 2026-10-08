---
title: Build the demo
description: Reproduce the Cheese Store documentation site from its checked-in inputs.
---

# Build the demo

Clone the [Cheese Store docs repository](https://github.com/cheesestore/cheesestore.github.io), then run:

```sh
npm ci
npm run build
```

Sourcey reads `sourcey.config.ts`, the Markdown files, `cheese.yml`, and `cheesestore.mcp.json`. It writes the site to `dist/`. The lockfile pins the Sourcey version. Serve `dist/` with any static file server to inspect the output.

## What to compare

Change a description in `cheese.yml` and rebuild. The [API reference](/api) shows that description beside its operation. Change a guide and rebuild; the page and search index update together. That is the workflow this example demonstrates.

The Cheese Store API and MCP server are fictional fixtures. The example requests, credentials, and server addresses in their reference pages do not connect to a running service. To evaluate Sourcey with your own material, replace the two fixture files in the config and build again.
