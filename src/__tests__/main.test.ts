import { expect, test } from "vitest";

import { sayHello } from "../main";

test("sayHello should say hello", () => {
  expect(sayHello("Joe")).toBe("Hey, Joe!");
});
