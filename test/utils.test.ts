import { describe, expect, it } from "vitest";

import { add } from "../src/utils.js";

describe("Utils", () => {
  it("add", () => {
    expect(add(1, 2)).toBe(3);
  });
});
