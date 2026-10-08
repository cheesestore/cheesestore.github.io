import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const output = new URL("../dist/", import.meta.url);
const stylesheet = /<link rel="stylesheet" href="((?:\.\.\/)*sourcey\.css)"\/>/;

async function process(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      await process(path);
    } else if (entry.name.endsWith(".html")) {
      const html = await readFile(path, "utf8");
      const match = html.match(stylesheet);
      if (!match) throw new Error(`Missing expected stylesheet in ${path}`);
      const preload = `<link rel="preload" as="style" href="${match[1]}"/>`;
      await writeFile(path, html.replace("<head>", `<head>${preload}`));
    }
  }
}

await process(output.pathname);
