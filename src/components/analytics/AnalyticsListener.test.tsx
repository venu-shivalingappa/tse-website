import { fireEvent, render } from "@testing-library/react";
import { AnalyticsListener } from "./AnalyticsListener";

type W = Window & { dataLayer?: Record<string, unknown>[] };

function setScroll(y: number, scrollHeight: number, innerHeight: number) {
  Object.defineProperty(window, "scrollY", { configurable: true, value: y });
  Object.defineProperty(window, "innerHeight", { configurable: true, value: innerHeight });
  Object.defineProperty(document.documentElement, "scrollHeight", { configurable: true, value: scrollHeight });
}

describe("AnalyticsListener", () => {
  afterEach(() => {
    delete (window as W).dataLayer;
    document.body.innerHTML = "";
  });

  it("renders nothing", () => {
    const { container } = render(<AnalyticsListener />);
    expect(container).toBeEmptyDOMElement();
  });

  it("tracks clicks on data-track elements only", () => {
    render(<AnalyticsListener />);
    document.body.insertAdjacentHTML(
      "beforeend",
      '<a href="/contact" data-track="hero"><span id="inner">Talk</span></a><button data-track="btn" id="b">B</button><p id="plain">x</p>',
    );
    fireEvent.click(document.getElementById("inner") as HTMLElement);
    fireEvent.click(document.getElementById("b") as HTMLElement);
    fireEvent.click(document.getElementById("plain") as HTMLElement);
    expect((window as W).dataLayer).toEqual([
      { event: "cta_click", label: "hero", href: "/contact" },
      { event: "cta_click", label: "btn", href: undefined },
    ]);
  });

  it("reports each scroll milestone once", () => {
    const { unmount } = render(<AnalyticsListener />);
    setScroll(500, 2000, 1000);
    fireEvent.scroll(window);
    fireEvent.scroll(window);
    expect((window as W).dataLayer).toEqual([
      { event: "scroll_depth", percent: 25 },
      { event: "scroll_depth", percent: 50 },
    ]);
    unmount();
    fireEvent.scroll(window);
    expect((window as W).dataLayer).toHaveLength(2);
  });

  it("treats non-scrollable pages as fully read", () => {
    render(<AnalyticsListener />);
    setScroll(0, 800, 1000);
    fireEvent.scroll(window);
    expect((window as W).dataLayer).toHaveLength(4);
  });
});
