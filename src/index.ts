import favicon from "./assets/favicon.ico";
import { sanitize } from "./utilities/sanitize.ts";
import { ERROR_COUNT } from "./utilities/constants.ts";
import { getCount, incrementCountTransaction } from "./db.ts";
import { renderCounter } from "./utilities/renderCounter.ts";

let iconFile = Bun.file(favicon);

const server = Bun.serve({
  port: Bun.env.PORT ? parseInt(Bun.env.PORT) : 4005,
  development: false,
  fetch(req) {
    const path = new URL(req.url).pathname;

    if (req.method === "GET" && path === "/count-me-in-scotty") {
      const referer = req.headers.get("referer");

      if (!referer || referer === "") {
        return renderCounter(Math.floor(Math.random() * 1000000));
      }

      try {
        const sanitizedReferer = sanitize(referer);

        incrementCountTransaction(sanitizedReferer);
        const result = getCount.get(sanitizedReferer);

        if (!result) {
          return renderCounter(ERROR_COUNT);
        }

        return renderCounter(result.count);
      } catch (err) {
        console.error(err);

        return renderCounter(ERROR_COUNT);
      }
    }

    if (req.method === "GET" && path === "/are-you-alright") {
      return Response.json({ message: "Never been better, thanks!" });
    }

    if (req.method === "GET" && path === "/favicon.ico") {
      return new Response(iconFile);
    }

    return new Response("It never existed, we made it up!", { status: 404 });
  },
});

console.info(`🌭 Running at ${server.url}`);
