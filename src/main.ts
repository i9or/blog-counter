import { App } from "@tinyhttp/app";
import { logger } from "@tinyhttp/logger";

export const sayHello = (name: string) => `Hey, ${name}!`;

const app = new App();

app
  .use(logger())
  .get("/favicon.ico", (_, res) => void res.sendStatus(201))
  .get("/", (_, res) => void res.send(`<h1>${sayHello("user")}</h1>`))
  .listen(3000, () => {
    console.info("Listening on http://localhost:3000");
  });
