import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const output = new URL("../dist/", import.meta.url);
const css = await readFile(new URL("sourcey.css", output), "utf8");
const stylesheet = /<link rel="stylesheet" href="(?:\.\.\/)*sourcey\.css"\/>/;
const inline = `<style>${css.replaceAll("</style", "<\\/style")}</style>`;

async function process(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      await process(path);
    } else if (entry.name.endsWith(".html")) {
      const html = await readFile(path, "utf8");
      if (!stylesheet.test(html)) {
        throw new Error(`Missing expected stylesheet in ${path}`);
      }
      await writeFile(path, html.replace(stylesheet, inline));
    }
  }
}

await process(output.pathname);
