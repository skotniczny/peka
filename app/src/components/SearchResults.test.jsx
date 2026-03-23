import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import SearchResults from "./SearchResults";

const renderWith = (props) =>
  render(<SearchResults {...props} />, { wrapper: MemoryRouter });

// PEKA API response for query "żegrze"
const stops = [
  { symbol: "SZII", name: "Os. Stare Żegrze" },
  { symbol: "RZEG", name: "Rondo Żegrze" },
  { symbol: "Z I", name: "Żegrze I" },
  { symbol: "Z II", name: "Żegrze II" },
  { symbol: "ZIII", name: "Żegrze III" }
];

// PEKA API response for query "poln"
const streets = [
  { name: "Czerwonak/Polna", id: 221 },
  { name: "Komorniki/Polna", id: 221 },
  { name: "Luboń/Polna", id: 221 },
  { name: "Robakowo/Polna", id: 221 },
  { name: "Swarzędz/Polna", id: 221 }
];

describe("SearchResults", () => {
  test("renders nothing when result list is empty", () => {
    renderWith({ result: [], isEmpty: false, path: "przystanki" });
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });

  test("renders nothing when query is empty", () => {
    renderWith({ result: streets, isEmpty: true, path: "ulice" });
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });

  describe("stops", () => {
    test("renders links for each result", () => {
      renderWith({ result: stops, isEmpty: false, path: "przystanki" });
      const links = screen.getAllByRole("link");
      expect(links).toHaveLength(5);
      expect(links[0]).toHaveTextContent("Os. Stare Żegrze");
      expect(links[4]).toHaveTextContent("Żegrze III");
    });

    test("encodes name in link href", () => {
      renderWith({ result: stops, isEmpty: false, path: "przystanki" });
      expect(screen.getByRole("link", { name: /Rondo/ })).toHaveAttribute(
        "href",
        "/przystanki/Rondo%20%C5%BBegrze"
      );
    });

    test("renders symbol alongside name", () => {
      renderWith({ result: [stops[0]], isEmpty: false, path: "przystanki" });
      expect(screen.getByText("SZII")).toBeInTheDocument();
      expect(screen.getByRole("link")).toHaveTextContent("Os. Stare Żegrze SZII");
    });
  });

  describe("streets", () => {
    test("renders links for each result", () => {
      renderWith({ result: streets, isEmpty: false, path: "ulice" });
      const links = screen.getAllByRole("link");
      expect(links).toHaveLength(5);
      expect(links[0]).toHaveTextContent("Czerwonak/Polna");
    });

    test("does not render symbol tag", () => {
      const { container } = renderWith({ result: streets, isEmpty: false, path: "ulice" });
      expect(container.querySelector(".tag")).toBeNull();
    });

    test("encodes name in link href", () => {
      renderWith({ result: [streets[2]], isEmpty: false, path: "ulice" });
      expect(screen.getByRole("link", { name: /Luboń/ })).toHaveAttribute(
        "href",
        "/ulice/Lubo%C5%84%2FPolna"
      );
    });
  });
});
