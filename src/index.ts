import { BunFile } from "bun";
import { resolve } from "node:path";

import { Counter } from "./templates/Counter.ts";

let count = 0;
let iconFile: BunFile | undefined = undefined;

const server = Bun.serve({
  port: 4005,
  fetch(req) {
    const path = new URL(req.url).pathname;

    if (req.method === "GET" && path === "/count-me-in-scotty") {
      return new Response(Counter(count++), {
        status: 200,
        headers: {
          "Content-Type": "image/svg+xml",
        },
      });
    }

    if (req.method === "GET" && path === "/are-you-alright") {
      return new Response("Never been better, thanks!");
    }

    if (req.method === "GET" && path === "/favicon.ico") {
      if (!iconFile) {
        const iconPath = resolve(import.meta.dir, "../public/favicon.ico");
        iconFile = Bun.file(iconPath);
      }

      return new Response(iconFile);
    }

    return new Response("It never existed, we made it up!", { status: 404 });
  },
});

console.info(`🌭 Running at ${server.url}`);
