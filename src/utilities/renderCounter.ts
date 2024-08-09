import {Counter} from "../templates/Counter.ts";

export const renderCounter = (count: number) => {
  return new Response(Counter(count), {
    status: 200,
    headers: {
      "Content-Type": "image/svg+xml",
    },
  });
};
