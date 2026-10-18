---
title: Cheese Store API
description: The catalog, the orders, the last wheel of Comté.
---

Browse the catalog, check the stock and follow an order through the shop. The reference covers HTTP endpoints and MCP tools; the guides cover the work between requests.

## Find your way around

<CardGroup cols={2}>
  <Card title="Quickstart" icon="bolt" href="/quickstart">
    Clone the example, run the docs locally and make the build your own.
  </Card>
  <Card title="Authentication" icon="key" href="/authentication">
    API keys, OAuth scopes and the credentials each operation expects.
  </Card>
  <Card title="API reference" icon="code-bracket" href="/api">
    Every endpoint, request field and response, with examples in seven languages.
  </Card>
  <Card title="MCP tools" icon="command-line" href="/mcp">
    Search the catalog and inspect the inputs, resources and prompts available to an agent.
  </Card>
  <Card title="Webhooks" icon="bell" href="/guides/webhooks">
    Follow orders and stock changes. Verify signatures and handle retries.
  </Card>
  <Card title="Changelog" icon="clock" href="/changelog">
    New endpoints, contract changes and fixes, release by release.
  </Card>
</CardGroup>

## One build, three sources

Markdown supplies the guides and changelog. An OpenAPI description supplies the HTTP reference. An MCP snapshot supplies the tools. Sourcey builds the navigation, code samples and search from those files.

The Cheese Store is fictional; the endpoints and credentials are examples. The documentation is a real Sourcey build. [Browse the source](https://github.com/cheesestore/cheesestore.github.io) or [build it yourself](/quickstart).
