---
title: Introduction
description: A fictional cheese store with a real Sourcey documentation build.
---

# Cheese Store API

The store is fictional. The docs build is real: Sourcey reads the Markdown, OpenAPI description, and MCP snapshot in this repository and writes this static site.

Use the [API reference](/api) to inspect a request and its response schema. The [MCP tab](/mcp) documents a small local server you can run from this repository. The HTTP API is an illustrative contract; no cheese marketplace is hosted.

## What to check

- Follow the `GET /cheeses` operation to its `Cheese` schema.
- Search for “milk type” and open the matching reference entry.
- Switch between these guides, the API reference, and the MCP snapshot.
- Run the [local build](/quickstart) and inspect the generated HTML yourself.

The [Sourcey product page](https://sourcey.com/docs) covers the supported inputs, license, and installation routes. The files behind this example are in the [demo repository](https://github.com/cheesestore/cheesestore.github.io/tree/master/source).
