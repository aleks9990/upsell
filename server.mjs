import { appendFileSync, createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize, resolve } from "node:path";

const root = resolve(".");
const port = Number(process.env.PORT || 8788);
const log = (message) => appendFileSync("node-server.log", `${new Date().toISOString()} ${message}\n`);

process.on("uncaughtException", (error) => {
  log(`uncaught ${error.stack || error.message}`);
  process.exit(1);
});

process.on("unhandledRejection", (error) => {
  log(`unhandled ${error?.stack || error}`);
  process.exit(1);
});

const types = {
  ".html": "text/html; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
};

const server = createServer((req, res) => {
  const url = new URL(req.url || "/", "http://127.0.0.1");
  const requested = url.pathname === "/" ? "/index.html" : url.pathname;
  const target = normalize(join(root, decodeURIComponent(requested)));

  if (!target.startsWith(root) || !existsSync(target) || !statSync(target).isFile()) {
    res.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
    res.end("Not found");
    return;
  }

  res.writeHead(200, { "content-type": types[extname(target).toLowerCase()] || "application/octet-stream" });
  createReadStream(target).pipe(res);
});

server.on("error", (error) => {
  log(`listen error ${error.stack || error.message}`);
  process.exit(1);
});

server.listen(port, "127.0.0.1", () => {
  log(`listening ${port}`);
});
