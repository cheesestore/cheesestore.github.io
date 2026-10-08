import { createInterface } from "node:readline";

const cheeses = [
  { id: "cheese_42", name: "Comté", milk_type: "cow", available: 12 },
  { id: "cheese_43", name: "Manchego", milk_type: "sheep", available: 7 },
  { id: "cheese_44", name: "Chèvre", milk_type: "goat", available: 5 },
];

const tool = {
  name: "search_cheeses",
  description: "Example tool: search a fictional cheese catalog by milk type.",
  inputSchema: {
    type: "object",
    properties: { milk_type: { type: "string", enum: ["cow", "goat", "sheep"] } },
  },
  annotations: {
    readOnlyHint: true,
    destructiveHint: false,
    idempotentHint: true,
    openWorldHint: false,
  },
};

function result(request) {
  switch (request.method) {
    case "initialize":
      return {
        protocolVersion: "2025-11-25",
        capabilities: { tools: { listChanged: false } },
        serverInfo: { name: "cheesestore-example", version: "1.0.0" },
      };
    case "tools/list":
      return { tools: [tool] };
    case "tools/call": {
      if (request.params?.name !== tool.name) {
        throw { code: -32602, message: "Unknown tool" };
      }
      const milkType = request.params.arguments?.milk_type;
      if (milkType !== undefined && !["cow", "goat", "sheep"].includes(milkType)) {
        throw { code: -32602, message: "Invalid milk_type" };
      }
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(cheeses.filter((cheese) => !milkType || cheese.milk_type === milkType)),
          },
        ],
      };
    }
    default:
      throw { code: -32601, message: "Method not found" };
  }
}

const lines = createInterface({ input: process.stdin, crlfDelay: Infinity });
for await (const line of lines) {
  let request;
  try {
    request = JSON.parse(line);
    if (request.id === undefined) continue;
    process.stdout.write(`${JSON.stringify({ jsonrpc: "2.0", id: request.id, result: result(request) })}\n`);
  } catch (error) {
    const code = typeof error?.code === "number" ? error.code : -32603;
    const message = typeof error?.message === "string" ? error.message : "Invalid request";
    process.stdout.write(`${JSON.stringify({ jsonrpc: "2.0", id: request?.id ?? null, error: { code, message } })}\n`);
  }
}
