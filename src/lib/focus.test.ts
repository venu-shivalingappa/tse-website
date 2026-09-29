import { focusElement } from "./focus";

it("focuses mounted elements and ignores null", () => {
  const btn = document.createElement("button");
  document.body.appendChild(btn);
  focusElement(btn);
  expect(document.activeElement).toBe(btn);
  expect(() => focusElement(null)).not.toThrow();
  btn.remove();
});
