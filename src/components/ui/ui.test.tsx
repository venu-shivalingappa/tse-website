import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "./Button";
import { CheckList } from "./CheckList";
import { Container } from "./Container";
import { Icon } from "./Icon";
import { Prose } from "./Prose";
import { Section } from "./Section";
import { SectionHeading } from "./SectionHeading";
import { Split } from "./Split";
import { VerifyBadge } from "./VerifyBadge";

describe("Button", () => {
  it("renders a link when given href", () => {
    render(
      <Button href="/contact" variant="hero" size="lg" withArrow trackLabel="hero">
        Talk to TSE
      </Button>,
    );
    const link = screen.getByRole("link", { name: "Talk to TSE" });
    expect(link).toHaveAttribute("href", "/contact");
    expect(link).toHaveAttribute("data-track", "hero");
    expect(link).toHaveClass("button", "hero", "lg");
    expect(link.querySelector("svg")).toBeInTheDocument();
  });

  it("renders a native button with defaults", async () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Go</Button>);
    const btn = screen.getByRole("button", { name: "Go" });
    expect(btn).toHaveAttribute("type", "button");
    expect(btn).toHaveClass("primary", "md");
    expect(btn.querySelector("svg")).toBeNull();
    await userEvent.click(btn);
    expect(onClick).toHaveBeenCalled();
  });

  it("supports submit and disabled", () => {
    render(
      <Button type="submit" disabled>
        Send
      </Button>,
    );
    expect(screen.getByRole("button")).toHaveAttribute("type", "submit");
    expect(screen.getByRole("button")).toBeDisabled();
  });
});

describe("Icon", () => {
  it("is decorative by default", () => {
    const { container } = render(<Icon name="check" />);
    const svg = container.querySelector("svg") as SVGElement;
    expect(svg).toHaveAttribute("aria-hidden", "true");
    expect(svg).toHaveAttribute("width", "20");
  });

  it("is labelled when given a label", () => {
    render(<Icon name="mail" label="Email" size={32} />);
    expect(screen.getByRole("img", { name: "Email" })).toHaveAttribute("width", "32");
  });
});

describe("layout primitives", () => {
  it("Container supports sizes", () => {
    const { container, rerender } = render(<Container>x</Container>);
    expect(container.firstChild).toHaveClass("container", "default");
    rerender(
      <Container size="narrow" className="extra">
        x
      </Container>,
    );
    expect(container.firstChild).toHaveClass("narrow", "extra");
  });

  it("Section applies tone and labelling", () => {
    const { container, rerender } = render(<Section>content</Section>);
    const section = container.querySelector("section") as HTMLElement;
    expect(section).toHaveClass("light", "default");
    expect(section).toHaveAttribute("data-tone", "light");
    rerender(
      <Section id="s" labelledBy="t" tone="dark" spacing="tight" container="narrow" className="c">
        content
      </Section>,
    );
    expect(section).toHaveAttribute("id", "s");
    expect(section).toHaveAttribute("aria-labelledby", "t");
    expect(section).toHaveClass("dark", "tight", "c");
  });

  it("SectionHeading renders optional parts", () => {
    const { rerender } = render(<SectionHeading title="Title" />);
    expect(screen.getByRole("heading", { level: 2, name: "Title" })).toBeInTheDocument();
    rerender(<SectionHeading as="h1" id="h" eyebrow="Eyebrow" lead={<p>Lead</p>} align="center" title="Main" />);
    expect(screen.getByRole("heading", { level: 1, name: "Main" })).toHaveAttribute("id", "h");
    expect(screen.getByText("Eyebrow")).toBeInTheDocument();
    expect(screen.getByText("Lead")).toBeInTheDocument();
  });

  it("CheckList renders items in columns", () => {
    const { container, rerender } = render(<CheckList items={["One", "Two"]} />);
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
    expect(container.firstChild).toHaveClass("cols1");
    rerender(<CheckList items={["One"]} columns={3} className="x" />);
    expect(container.firstChild).toHaveClass("cols3", "x");
  });

  it("Split renders aside and main", () => {
    render(<Split aside={<p>Aside</p>}>Main</Split>);
    expect(screen.getByText("Aside")).toBeInTheDocument();
    expect(screen.getByText("Main")).toBeInTheDocument();
  });

  it("Prose wraps content", () => {
    render(
      <Prose>
        <p>Body</p>
      </Prose>,
    );
    expect(screen.getByText("Body")).toBeInTheDocument();
  });
});

describe("VerifyBadge", () => {
  it("renders with and without a reviewer note", () => {
    const { rerender } = render(<VerifyBadge />);
    expect(screen.getByText("Pending verification")).toBeInTheDocument();
    rerender(<VerifyBadge note="Confirm figures" />);
    expect(screen.getByText(/Confirm figures/)).toBeInTheDocument();
  });
});
