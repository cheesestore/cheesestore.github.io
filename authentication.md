---
title: Authentication
description: Security schemes in the sample OpenAPI contract.
---

# Authentication

The fictional API in `cheese.yml` declares an API key in the `X-API-Key` header and an OAuth2 authorization-code flow. These are examples of how Sourcey renders OpenAPI security requirements; the store has no developer dashboard or issued credentials.

The API-key shape looks like this:

```http
GET /v2/cheeses HTTP/1.1
Host: cheese.example.com
X-API-Key: example-key
```

Open an operation in the [API reference](/api) to see which security scheme the contract assigns to it. The example host does not serve requests.
