import { afterAll, afterEach, beforeAll, expect, it } from "vitest";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, fireEvent } from "@testing-library/react";
import WorkOrderInbox from "../frontend/src/pages/WorkOrders/WorkOrderInbox";

const workOrders = [
  {
    id: 1,
    titulo: "Trocar filtro",
    prioridade: "HIGH",
    equipamento: "Ar 01",
    status: "OPEN",
    dataAbertura: "2024-06-23",
  },
];

const statusChoices = [
  { label: "Iniciar", value: "IN_PROGRESS" },
  { label: "Cancelar", value: "CANCELLED" },
];

const server = setupServer(
  rest.get("http://localhost:8000/api/work-orders/", (_req, res, ctx) =>
    res(ctx.json(workOrders)),
  ),
  rest.get("http://localhost:8000/api/work-orders/1/", (_req, res, ctx) =>
    res(ctx.json(workOrders[0])),
  ),
  rest.get(
    "http://localhost:8000/api/work-orders/1/status-choices/",
    (_req, res, ctx) => res(ctx.json(statusChoices)),
  ),
  rest.patch(
    "http://localhost:8000/api/work-orders/1/status/",
    (_req, res, ctx) =>
      res(ctx.json({ ...workOrders[0], status: "IN_PROGRESS" })),
  ),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

it("renders inbox and detail", async () => {
  const qc = new QueryClient();
  const { findByText } = render(
    <QueryClientProvider client={qc}>
      <WorkOrderInbox />
    </QueryClientProvider>,
  );
  expect(await findByText("Trocar filtro")).toBeDefined();
  fireEvent.click(await findByText("Trocar filtro"));
  expect(await findByText("Equipamento: Ar 01")).toBeDefined();
});
