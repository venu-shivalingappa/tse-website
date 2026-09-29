/**
 * @jest-environment node
 */
import { trackEvent } from "./analytics";

it("is a no-op on the server", () => {
  expect(() => trackEvent({ name: "nav_open" })).not.toThrow();
});
