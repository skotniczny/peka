import { render, screen, within } from "@testing-library/react";
import Directions from "./Directions";

// mirrors shape returned by PEKA API
const directions = [
  { returnVariant: false, lineName: "6", direction: "Miłostowo" },
  { returnVariant: false, lineName: "13", direction: "Starołęka PKM" },
];

describe("Directions", () => {
  test("renders column headings", () => {
    render(<Directions directions={directions} />);
    expect(screen.getByRole("columnheader", { name: "Linia" })).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: "Kierunek" })).toBeInTheDocument();
  });

  test("renders no data rows for empty list", () => {
    render(<Directions directions={[]} />);
    expect(screen.queryAllByRole("cell")).toHaveLength(0);
  });

  test("renders line and direction in each row", () => {
    render(<Directions directions={directions} />);
    const [, firstDataRow, secondDataRow] = screen.getAllByRole("row");
    expect(within(firstDataRow).getByRole("cell", { name: "6" })).toBeInTheDocument();
    expect(within(firstDataRow).getByRole("cell", { name: "Miłostowo" })).toBeInTheDocument();
    expect(within(secondDataRow).getByRole("cell", { name: "13" })).toBeInTheDocument();
    expect(within(secondDataRow).getByRole("cell", { name: "Starołęka PKM" })).toBeInTheDocument();
  });
});
