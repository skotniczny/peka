import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Line from "./Line";

// PEKA API response for /linia/191
const line191 = { directions: [
  {
    direction: { returnVariant: true, lineName: "191", direction: "Os. Sobieskiego" },
    bollards: [
      { symbol: "OSKO22", orderNo: 1, name: "Os. Kopernika - 02", tag: "OSKO02", mainBollard: false },
      { symbol: "JUGO22", orderNo: 2, name: "Jugosłowiańska - 02", tag: "JUGO02", mainBollard: false },
      { symbol: "STMI24", orderNo: 3, name: "Bułgarska Enea Stadion - 01", tag: "BULG01", mainBollard: false },
    ],
  },
  {
    direction: { returnVariant: false, lineName: "191", direction: "Os. Kopernika" },
    bollards: [
      { symbol: "STMI23", orderNo: 32, name: "Bułgarska Enea Stadion - 02", tag: "BULG02", mainBollard: false },
      { symbol: "JUGO21", orderNo: 33, name: "Jugosłowiańska - 01", tag: "JUGO01", mainBollard: false },
      { symbol: "OSKO21", orderNo: 34, name: "Os. Kopernika - 01", tag: "OSKO01", mainBollard: false },
    ],
  },
]};

const renderLine = (lineNumber = "191") =>
  render(
    <MemoryRouter initialEntries={[`/linia/${lineNumber}`]}>
      <Routes>
        <Route path="/linia/:number" element={<Line />} />
      </Routes>
    </MemoryRouter>
  );

describe("Line", () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  test("shows spinner while loading", () => {
    global.fetch.mockReturnValue(new Promise(() => {}));
    renderLine();
    expect(screen.getByRole("status", { name: "Ładowanie" })).toBeInTheDocument();
  });

  test("renders error message on fetch failure", async () => {
    global.fetch.mockResolvedValue({ ok: false, status: 500 });
    renderLine();
    expect(await screen.findByRole("alert")).toBeInTheDocument();
  });

  test("renders directions with bollards on success", async () => {
    global.fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(line191),
    });
    renderLine();

    expect(await screen.findByRole("heading", { level: 2, name: /Kierunek: Os. Sobieskiego/ })).toBeInTheDocument();
    expect(screen.getByText("Kierunek: Os. Kopernika")).toBeInTheDocument();
  });

  test("renders bollard links with correct paths", async () => {
    global.fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(line191),
    });
    renderLine();

    const link = await screen.findByRole("link", { name: /Os. Kopernika - 02/ });
    expect(link).toHaveAttribute("href", "/przystanek/OSKO02");
  });

  test("fetches data for the line number from URL", () => {
    global.fetch.mockReturnValue(new Promise(() => {}));
    renderLine("193");
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("/bollardsByLine/193"),
      expect.objectContaining({ signal: expect.any(AbortSignal) })
    );
  });
});
