---
title: Inventory
description: Use filters and pagination in the sample API contract.
---

# Inventory

The example [`GET /cheeses`](/api) operation accepts `milk_type` and `limit` query parameters. The response includes a list of cheeses and a cursor for the next page.

This is a fixture. To evaluate Sourcey against your own API, replace `openapi.yaml` in the [config](https://github.com/cheesestore/cheesestore.github.io/blob/master/source/sourcey.config.ts) with your spec, build again, and inspect the generated operation and schema pages.
