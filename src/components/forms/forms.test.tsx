import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ContactForm } from "./ContactForm";
import { Field } from "./Field";

type W = Window & { dataLayer?: Record<string, unknown>[] };

describe("Field", () => {
  it("links hint and error to the control", () => {
    render(
      <Field id="f" label="Email" hint="Hint" error="Error" optional>
        {(describedBy) => <input id="f" aria-describedby={describedBy} />}
      </Field>,
    );
    expect(screen.getByLabelText(/Email/)).toHaveAttribute("aria-describedby", "f-hint f-error");
    expect(screen.getByText("(optional)")).toBeInTheDocument();
  });

  it("omits describedby when there is nothing to describe", () => {
    render(<Field id="g" label="Name">{(describedBy) => <input id="g" aria-describedby={describedBy} />}</Field>);
    expect(screen.getByLabelText("Name")).not.toHaveAttribute("aria-describedby");
  });
});

async function fillValid(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText("Name"), "Asha Rao");
  await user.type(screen.getByLabelText("Organisation"), "Acme");
  await user.type(screen.getByLabelText(/^Email/), "asha@acme.com");
  await user.selectOptions(screen.getByLabelText("Business stage"), "Growing");
  await user.type(screen.getByLabelText("What are you trying to achieve?"), "Opening a second office next year.");
}

function mockFetch(status: number, body: unknown) {
  global.fetch = jest.fn().mockResolvedValue({ ok: status < 400, status, json: async () => body }) as unknown as typeof fetch;
}

describe("ContactForm", () => {
  afterEach(() => {
    delete (window as W).dataLayer;
  });

  it("shows a focused error summary linked to invalid fields", async () => {
    const user = userEvent.setup();
    global.fetch = jest.fn() as unknown as typeof fetch;
    render(<ContactForm />);
    await user.click(screen.getByRole("button", { name: "Start the Conversation" }));

    const summary = screen.getByRole("alert");
    expect(summary).toHaveTextContent("Please check 5 fields");
    expect(summary).toHaveFocus();
    expect(screen.getByLabelText("Name")).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByLabelText("Name")).toHaveAttribute("aria-describedby", "field-name-error");
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it("uses singular wording for one error", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);
    await fillValid(user);
    await user.type(screen.getByLabelText(/^Phone/), "abc");
    await user.click(screen.getByRole("button", { name: "Start the Conversation" }));
    expect(screen.getByRole("alert")).toHaveTextContent("Please check one field");
  });

  it("submits valid enquiries and acknowledges success", async () => {
    const user = userEvent.setup();
    mockFetch(200, { ok: true });
    render(<ContactForm endpoint="/api/test" />);
    await fillValid(user);
    await user.type(screen.getByLabelText(/^Role/), "CEO");
    await user.click(screen.getByRole("button", { name: "Start the Conversation" }));

    const status = await screen.findByRole("status");
    expect(status).toHaveTextContent("Thank you");
    expect(status).toHaveFocus();
    const [url, init] = (global.fetch as jest.Mock).mock.calls[0];
    expect(url).toBe("/api/test");
    expect(JSON.parse(init.body)).toMatchObject({ name: "Asha Rao", role: "CEO", stage: "Growing", website: "" });
    expect((window as W).dataLayer).toContainEqual({ event: "contact_submit", status: "success" });
  });

  it("shows a sending state while submitting", async () => {
    const user = userEvent.setup();
    let resolve!: (v: unknown) => void;
    global.fetch = jest.fn().mockReturnValue(new Promise((r) => (resolve = r))) as unknown as typeof fetch;
    render(<ContactForm />);
    await fillValid(user);
    await user.click(screen.getByRole("button", { name: "Start the Conversation" }));
    expect(screen.getByRole("button", { name: "Sending…" })).toBeDisabled();
    await act(async () => resolve({ ok: true, json: async () => ({ ok: true }) }));
    expect(await screen.findByRole("status")).toBeInTheDocument();
  });

  it("surfaces server-side field errors", async () => {
    const user = userEvent.setup();
    mockFetch(422, { ok: false, errors: { email: "Server says no." } });
    render(<ContactForm />);
    await fillValid(user);
    await user.click(screen.getByRole("button", { name: "Start the Conversation" }));
    await waitFor(() => expect(screen.getAllByText("Server says no.").length).toBeGreaterThan(0));
    expect(screen.getByText(/Something went wrong/)).toBeInTheDocument();
    expect((window as W).dataLayer).toContainEqual({ event: "contact_submit", status: "error" });
  });

  it("handles server errors without field details and network failures", async () => {
    const user = userEvent.setup();
    mockFetch(500, { ok: false });
    const { unmount } = render(<ContactForm />);
    await fillValid(user);
    await user.click(screen.getByRole("button", { name: "Start the Conversation" }));
    expect(await screen.findByText(/Something went wrong/)).toBeInTheDocument();
    unmount();

    global.fetch = jest.fn().mockRejectedValue(new Error("offline")) as unknown as typeof fetch;
    render(<ContactForm />);
    await fillValid(user);
    await user.click(screen.getByRole("button", { name: "Start the Conversation" }));
    expect(await screen.findByText(/Something went wrong/)).toBeInTheDocument();
  });

  it("keeps the honeypot out of the accessibility tree but wired to state", async () => {
    const user = userEvent.setup();
    mockFetch(200, { ok: true });
    const { container } = render(<ContactForm />);
    const honeypot = container.querySelector("#field-website") as HTMLInputElement;
    expect(honeypot.closest("[aria-hidden]")).toHaveAttribute("aria-hidden", "true");
    await user.type(honeypot, "bot");
    await fillValid(user);
    await user.click(screen.getByRole("button", { name: "Start the Conversation" }));
    await screen.findByRole("status");
    expect(JSON.parse((global.fetch as jest.Mock).mock.calls[0][1].body).website).toBe("bot");
  });
});
