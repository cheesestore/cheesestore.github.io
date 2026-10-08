---
title: Webhooks
description: A small example of an event payload in a Markdown guide.
---

# Webhooks

A store might send an event when inventory changes. This guide is an example of prose living beside generated API reference pages.

```json
{
  "type": "cheese.stock_changed",
  "data": { "id": "cheese_42", "available": 12 }
}
```

The sample has no live webhook sender. Its job is to show a reader how ordinary Markdown and API reference can share one site and one search index.
