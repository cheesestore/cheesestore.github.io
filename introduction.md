---
title: Introduction
description: A fictional cheese API and a real Sourcey documentation build.
---

# Cheese Store API

The store is fictional. The documentation build is real. Sourcey turns this repository's Markdown, OpenAPI description, and MCP snapshot into the site you are reading. There are no customer accounts, orders, or live cheese endpoints behind the examples.

## What to inspect

<CardGroup cols={2}>
  <Card title="API reference" icon="code-bracket" href="/api">
    Open an operation, follow its request and response schemas, and inspect the generated code samples.
  </Card>
  <Card title="MCP tools" icon="command-line" href="/mcp">
    See how a tool, resource, and prompt snapshot becomes browsable reference. This is a sample contract, not a hosted server.
  </Card>
  <Card title="Guides" icon="book-open" href="/guides/webhooks">
    Read a Markdown guide beside the generated references. The sample events are illustrative.
  </Card>
  <Card title="Reproduce the build" icon="arrow-down-tray" href="/quickstart">
    Clone the source, run the pinned version of Sourcey, and inspect the static output yourself.
  </Card>
</CardGroup>

The API fixture includes authentication schemes, pagination, and several response types. Use the search box to find a field across the guides and reference. The [source files](https://github.com/cheesestore/cheesestore.github.io) show exactly what was written by hand and what Sourcey generated.

For the generator's supported inputs, installation routes, and AGPL license, see [Sourcey documentation](https://sourcey.com/docs).
