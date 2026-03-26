import App, { AppRoutes } from "./App";
import { MemoryRouter } from "react-router-dom";
import { render, screen, waitFor, within } from "@testing-library/react";

const renderRoute = (path) => render(
  <MemoryRouter initialEntries={[path]}>
    <AppRoutes />
  </MemoryRouter>
);

describe("mount", () => {
  test("renders app structure", () => {
    render(<App />);
    const banner = screen.getByRole("banner");
    expect(banner).toBeInTheDocument();
    expect(within(banner).getByRole("heading", { level: 1, name: /Wirtualny Monitor/ })).toBeInTheDocument();
    expect(screen.getByRole("main")).toBeInTheDocument();
  });
});

describe("routing", () => {
  const mockFetch = (data) => {
    vi.stubGlobal("fetch", vi.fn(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve(data)
    })));
  };

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  test("render Lines for /", () => {
    renderRoute("/");
    expect(screen.getByRole("heading", { level: 2, name: /Linie Tramwajowe/ })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: /Linie Autobusowe/ })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: /Linie Nocne/ })).toBeInTheDocument();
  });

  test("render Line for /linia/159", async () => {
    mockFetch({ directions: [
      { bollards: [], direction: { returnVariant: true, lineName: "159", direction: "Port Lotniczy Ławica", }, },
      { bollards: [], direction: { returnVariant: false, lineName: "159", direction: "Poznań Główny", }, },
    ]});
    renderRoute("/linia/159");
    expect(screen.getByRole("status")).toBeInTheDocument();
    await waitFor(() => expect(screen.queryByRole("status")).not.toBeInTheDocument());
    expect(screen.getByRole("heading", { level: 2, name: /Port Lotniczy Ławica/ })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: /Poznań Główny/ })).toBeInTheDocument();
  });

  test("render StopPoints for /przystanek/RKAP01", async () => {
    mockFetch({
      times: [
        { realTime: false, onStopPoint: false, line: "219", minutes: 735, departure: "2026-03-26T23:00:00.000Z", direction:"Kiekrz PKM" },
        { realTime: false, onStopPoint: false, line: "219", minutes: 795, departure: "2026-03-27T00:00:00.000Z", direction:"Wichrowa" }
      ],
      bollard: { symbol: "RKAP01", name: "Rondo Kaponiera", tag: "RKAP25", mainBollard: false } 
    });
    renderRoute("/przystanek/RKAP01");
    expect(screen.getByRole("status")).toBeInTheDocument();
    await waitFor(() => expect(screen.queryByRole("status")).not.toBeInTheDocument());
    expect(screen.getByRole("heading", { level: 2, name: /Rondo Kaponiera/ })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 3, name: /RKAP01/ })).toBeInTheDocument();
  });

  test("render BollardsByName for /przystanki/Bałtyk", async () => {
    mockFetch({ bollards: [{
      directions: [{returnVariant: false, lineName:"6", direction: "Miłostowo"}],
      bollard: {symbol: "BALT92", name: "Bałtyk", tag: "BALT42", mainBollard: false }
    }] });
    renderRoute("/przystanki/Bałtyk");
    expect(screen.getByRole("status")).toBeInTheDocument();
    await waitFor(() => expect(screen.queryByRole("status")).not.toBeInTheDocument());
    expect(screen.getByRole("heading", { level: 2, name: /Bałtyk/ })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 3, name: /BALT42/ })).toBeInTheDocument();
  });

  test("render BollardsByStreet for /ulica/Bukowska", async () => {
    mockFetch({ bollards: [{
      directions: [{ returnVariant: false, lineName: "159", direction: "Port Lotniczy Ławica" }],
      bollard: { symbol: "PLL22", name: "Port Lotniczy Ławica", tag: "PLL04", mainBollard: false }
    }] });
    renderRoute("/ulica/Bukowska");
    expect(screen.getByRole("status")).toBeInTheDocument();
    await waitFor(() => expect(screen.queryByRole("status")).not.toBeInTheDocument());
    expect(screen.getByRole("heading", { level: 2, name: /Port Lotniczy Ławica/ })).toBeInTheDocument();
  });

  test("render NotFound for not existing path", () => {
    renderRoute("/not/found");
    expect(screen.getByRole("heading", { level: 2, name: /404/ })).toBeInTheDocument();
  });
});
