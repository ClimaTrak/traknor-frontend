import {
  describe,
  it,
  beforeAll,
  afterEach,
  afterAll,
  vi,
  expect,
} from "vitest";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, fireEvent, waitFor } from "@testing-library/react";
import ReportDownloader from "../frontend/src/pages/Reports/ReportDownloader";
import { saveAs } from "file-saver";
import { showNotification } from "@mantine/notifications";

vi.mock("file-saver", () => ({ saveAs: vi.fn() }));
vi.mock("@mantine/notifications", () => ({ showNotification: vi.fn() }));

const server = setupServer(
  rest.get("http://localhost:8000/api/reports/", (_req, res, ctx) =>
    res(ctx.body("dummy")),
  ),
);

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  vi.clearAllMocks();
});
afterAll(() => server.close());

describe("ReportDownloader", () => {
  it("downloads report successfully", async () => {
    const qc = new QueryClient();
    const { getByText, getAllByRole } = render(
      <QueryClientProvider client={qc}>
        <ReportDownloader />
      </QueryClientProvider>,
    );
    fireEvent.change(getAllByRole("combobox")[0], {
      target: { value: "equipment" },
    });
    fireEvent.change(getAllByRole("combobox")[1], { target: { value: "pdf" } });
    fireEvent.click(getByText("Download"));
    await waitFor(() => expect(saveAs).toHaveBeenCalled());
  });

  it("shows error notification on failure", async () => {
    server.use(
      rest.get("http://localhost:8000/api/reports/", (_req, res, ctx) =>
        res(ctx.status(500)),
      ),
    );
    const qc = new QueryClient();
    const { getByText, getAllByRole } = render(
      <QueryClientProvider client={qc}>
        <ReportDownloader />
      </QueryClientProvider>,
    );
    fireEvent.change(getAllByRole("combobox")[0], {
      target: { value: "equipment" },
    });
    fireEvent.change(getAllByRole("combobox")[1], { target: { value: "pdf" } });
    fireEvent.click(getByText("Download"));
    await waitFor(() =>
      expect(showNotification).toHaveBeenCalledWith(
        expect.objectContaining({ color: "red" }),
      ),
    );
  });
});
