import { createRateLimiter } from "./rate-limit";

describe("createRateLimiter", () => {
  it("allows up to the limit within the window, then blocks", () => {
    let t = 0;
    const allow = createRateLimiter(2, 1000, () => t);
    expect(allow("a")).toBe(true);
    expect(allow("a")).toBe(true);
    expect(allow("a")).toBe(false);
    expect(allow("b")).toBe(true);
    t = 1500;
    expect(allow("a")).toBe(true);
  });

  it("uses the real clock by default", () => {
    const allow = createRateLimiter(1, 60_000);
    expect(allow("x")).toBe(true);
    expect(allow("x")).toBe(false);
  });
});
