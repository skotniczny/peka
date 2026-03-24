import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import BollardsBy from "./BollardsBy";

// PEKA API response for przystanki/Rondo Żegrze
const stops = { bollards: [
  {
    directions: [
      { returnVariant: false, lineName: "1", direction: "Głogowska/Hetmańska" },
      { returnVariant: false, lineName: "11", direction: "Piątkowska" },
    ],
    bollard: { symbol: "RZEG01", name: "Rondo Żegrze", tag: "RZEG41", mainBollard: false },
  },
  {
    directions: [
      { returnVariant: false, lineName: "1", direction: "Franowo" },
      { returnVariant: false, lineName: "2", direction: "Franowo" },
    ],
    bollard: { symbol: "RZEG02", name: "Rondo Żegrze", tag: "RZEG42", mainBollard: false },
  },
]};

// PEKA API response for ulica/Śródka%2FŚródka
const streets = { bollards: [
  {
    directions: [
      { returnVariant: false, lineName: "488", direction: "Krerowo/Kościół" },
    ],
    bollard: { symbol: "SRSKR02", name: "Śródka/Skrzyżowanie nż.", tag: "SRSKR02", mainBollard: false },
  },
  {
    directions: [
      { returnVariant: false, lineName: "488", direction: "Poklatki/Pętla" },
    ],
    bollard: { symbol: "SRSKR01", name: "Śródka/Skrzyżowanie nż.", tag: "SRSKR01", mainBollard: false },
  },
]};

const renderBollardsBy = (method, name) =>
  render(
    <MemoryRouter initialEntries={[`/test/${encodeURIComponent(name)}`]}>
      <Routes>
        <Route path="/test/:name" element={<BollardsBy method={method} />} />
      </Routes>
    </MemoryRouter>
  );

describe("BollardsBy", () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  test("shows spinner while loading", () => {
    global.fetch.mockReturnValue(new Promise(() => {}));
    renderBollardsBy("bollardsByStopPoint", "Rondo Żegrze");
    expect(screen.getByRole("status", { name: "Ładowanie" })).toBeInTheDocument();
  });

  test("renders error message on fetch failure", async () => {
    global.fetch.mockResolvedValue({ ok: false, status: 500 });
    renderBollardsBy("bollardsByStopPoint", "Rondo Żegrze");
    expect(await screen.findByRole("alert")).toBeInTheDocument();
  });

  describe("bollardsByStopPoint", () => {
    test("renders bollard cards with links on success", async () => {
      global.fetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(stops),
      });
      renderBollardsBy("bollardsByStopPoint", "Rondo Żegrze");

      const links = await screen.findAllByRole("link");
      expect(links).toHaveLength(2);
      expect(links[0]).toHaveAttribute("href", "/przystanek/RZEG41");
      expect(links[1]).toHaveAttribute("href", "/przystanek/RZEG42");
    });

    test("encodes name in API URL", () => {
      global.fetch.mockReturnValue(new Promise(() => {}));
      renderBollardsBy("bollardsByStopPoint", "Rondo Żegrze");
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining("/bollardsByStopPoint/Rondo%20%C5%BBegrze"),
        expect.objectContaining({ signal: expect.any(AbortSignal) })
      );
    });
  });

  describe("bollardsByStreet", () => {
    test("renders bollard cards with links on success", async () => {
      global.fetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(streets),
      });
      renderBollardsBy("bollardsByStreet", "Śródka/Śródka");

      const links = await screen.findAllByRole("link");
      expect(links).toHaveLength(2);
      expect(links[0]).toHaveAttribute("href", "/przystanek/SRSKR02");
      expect(links[1]).toHaveAttribute("href", "/przystanek/SRSKR01");
    });

    test("encodes slash in street name in API URL", () => {
      global.fetch.mockReturnValue(new Promise(() => {}));
      renderBollardsBy("bollardsByStreet", "Śródka/Śródka");
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining("/bollardsByStreet/%C5%9Ar%C3%B3dka%2F%C5%9Ar%C3%B3dka"),
        expect.objectContaining({ signal: expect.any(AbortSignal) })
      );
    });
  });
});
