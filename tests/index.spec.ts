import { test, expect } from "vitest";
import { sum } from "../src/utils/sum";

test("First test", () => {
  expect(1 + 1).toBe(2);
});

test("Sum function test", () => {
  expect(sum(1, 2, 3)).toBe(6);
});
