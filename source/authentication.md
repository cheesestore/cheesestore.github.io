---
title: Authentication
description: The authentication shape in the illustrative Cheese Store contract.
---

# Authentication

The example API describes an API key sent in the `X-API-Key` header:

```http
GET /cheeses HTTP/1.1
Host: api.example.com
X-API-Key: your-key-here
```

There is no production key or endpoint for this fictional store. The example lets you check how Sourcey renders an OpenAPI security scheme and attaches it to operations.
