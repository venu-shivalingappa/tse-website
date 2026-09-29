import { act, fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Breadcrumbs } from "./Breadcrumbs";
import { Footer } from "./Footer";
import { Header, SCROLL_THRESHOLD } from "./Header";
import { Logo } from "./Logo";
import { NavMenu } from "./NavMenu";
import { SkipLink } from "./SkipLink";

type W = Window & { dataLayer?: Record<string, unknown>[] };

describe("Logo", () => {
  it("links home with the Figma layers and tagline", () => {
    const { container } = render(<Logo />);
    expect(screen.getByRole("link", { name: "Tech Solve Engine — home" })).toHaveAttribute("href", "/");
    expect(container.querySelectorAll("img")).toHaveLength(4);
    expect(screen.getByText("Ignite Innovations")).toBeInTheDocument();
  });

  it("can hide the tagline", () => {
    render(<Logo withTagline={false} className="x" />);
    expect(screen.queryByText("Ignite Innovations")).toBeNull();
  });
});

it("SkipLink targets main content", () => {
  render(<SkipLink />);
  expect(screen.getByRole("link", { name: "Skip to main content" })).toHaveAttribute("href", "#main");
});

describe("Breadcrumbs", () => {
  it("prepends Home, marks the current page and emits schema", () => {
    const { container } = render(<Breadcrumbs items={[{ name: "About", href: "/about" }]} />);
    const nav = screen.getByRole("navigation", { name: "Breadcrumb" });
    expect(within(nav).getByRole("link", { name: "Home" })).toHaveAttribute("href", "/");
    expect(within(nav).getByText("About")).toHaveAttribute("aria-current", "page");
    expect(container.querySelector('script[type="application/ld+json"]')?.innerHTML).toContain("BreadcrumbList");
  });
});

describe("Footer", () => {
  it("renders navigation groups, legal links and the current year", () => {
    render(<Footer />);
    expect(screen.getByRole("navigation", { name: "What We Build" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Privacy Policy" })).toHaveAttribute("href", "/privacy");
    expect(screen.getByText(new RegExp(`© ${new Date().getFullYear()}`))).toBeInTheDocument();
  });

  it("accepts a fixed year", () => {
    render(<Footer year={2030} />);
    expect(screen.getByText(/© 2030/)).toBeInTheDocument();
  });
});

describe("NavMenu", () => {
  it("is hidden when closed", () => {
    const { container } = render(<NavMenu id="m" open={false} onClose={jest.fn()} />);
    expect(container.firstChild).toHaveAttribute("hidden");
  });

  it("focuses close, locks scroll and closes on Escape / backdrop / links", async () => {
    const onClose = jest.fn();
    const { unmount } = render(<NavMenu id="m" open onClose={onClose} />);
    const dialog = screen.getByRole("dialog", { name: "Site menu" });
    expect(screen.getByRole("button", { name: "Close menu" })).toHaveFocus();
    expect(document.body.style.overflow).toBe("hidden");

    fireEvent.keyDown(document, { key: "Enter" });
    expect(onClose).not.toHaveBeenCalled();
    fireEvent.keyDown(document, { key: "Escape" });
    expect(onClose).toHaveBeenCalledTimes(1);

    await userEvent.click(screen.getByTestId("menu-backdrop"));
    expect(onClose).toHaveBeenCalledTimes(2);

    await userEvent.click(within(dialog).getByRole("link", { name: "Why TSE" }));
    expect(onClose).toHaveBeenCalledTimes(3);

    unmount();
    expect(document.body.style.overflow).toBe("");
  });

  it("toggles the What We Build dropdown", async () => {
    const onClose = jest.fn();
    render(<NavMenu id="m" open onClose={onClose} />);
    const toggle = screen.getByRole("button", { name: "Show What We Build capabilities" });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(document.getElementById("m-sub")).toHaveAttribute("hidden");

    await userEvent.click(toggle);
    expect(screen.getByRole("button", { name: "Hide What We Build capabilities" })).toHaveAttribute("aria-expanded", "true");
    await userEvent.click(screen.getByRole("link", { name: "Cloud Engineering" }));
    expect(onClose).toHaveBeenCalled();
    await userEvent.click(screen.getByRole("link", { name: "What We Build" }));
    expect(onClose).toHaveBeenCalledTimes(2);
  });
});

describe("Header", () => {
  afterEach(() => {
    delete (window as W).dataLayer;
    Object.defineProperty(window, "scrollY", { configurable: true, value: 0 });
  });

  it("becomes solid after scrolling past the threshold", () => {
    render(<Header />);
    const header = screen.getByRole("banner");
    expect(header).toHaveAttribute("data-scrolled", "false");
    act(() => {
      Object.defineProperty(window, "scrollY", { configurable: true, value: SCROLL_THRESHOLD + 1 });
      window.dispatchEvent(new Event("scroll"));
    });
    expect(header).toHaveAttribute("data-scrolled", "true");
  });

  it("opens the menu, tracks it and returns focus on close", async () => {
    const { unmount } = render(<Header />);
    const menuButton = screen.getByRole("button", { name: "Open menu" });
    await userEvent.click(menuButton);
    expect(menuButton).toHaveAttribute("aria-expanded", "true");
    expect((window as W).dataLayer).toEqual([{ event: "nav_open" }]);

    await userEvent.click(screen.getByRole("button", { name: "Close menu" }));
    expect(menuButton).toHaveAttribute("aria-expanded", "false");
    expect(menuButton).toHaveFocus();
    unmount();
  });
});
