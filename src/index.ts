import { Counter } from "./templates/Counter.ts";

let count = 0;

Bun.serve({
  port: 4001,
  fetch(_) {
    return new Response(Counter(count++), {
      status: 200,
      headers: {
        "Content-Type": "image/svg+xml"
      }
    });
  },
});
