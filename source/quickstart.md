---
title: Build the demo
description: Reproduce the Cheese Store documentation site from its checked-in inputs.
---

# Build the demo

Clone the [demo repository](https://github.com/cheesestore/cheesestore.github.io), then run:

```sh
cd source
npm ci
npm run build
```

The generated site is in `source/dist`. Serve that directory with any static file server. The package lock pins the Sourcey version used for this build.

The OpenAPI file is an illustrative contract; it does not start an HTTP service. The MCP snapshot documents a small working local server. Run `npm run mcp:example` to start it over stdio.
