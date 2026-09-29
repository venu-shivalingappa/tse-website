import { render } from "@testing-library/react";
import { JsonLd } from "./JsonLd";

it("serialises data and escapes closing tags", () => {
  const { container } = render(<JsonLd data={{ name: "</script><b>" }} />);
  const script = container.querySelector("script") as HTMLScriptElement;
  expect(script).toHaveAttribute("type", "application/ld+json");
  expect(script.innerHTML).not.toContain("</script>");
  expect(script.innerHTML).toContain("\\u003c/script>");
});
