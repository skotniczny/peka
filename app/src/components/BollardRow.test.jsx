import { render, screen } from "@testing-library/react";
import BollardRow from "./BollardRow";

const bollard = {
  symbol: "BALT92",
  name: "Bałtyk",
  tag: "BALT42",
  mainBollard: false
}

describe("BollardRow", () => {
  test("renders bollard name as main heading", () => {
    render(<BollardRow bollard={bollard} />);
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toHaveTextContent(bollard.name);
  });

  test("renders bollard tag as subheading and bollard symbol as title", () => {
    render(<BollardRow bollard={bollard} />);
    const subheading = screen.getByRole('heading', { level: 3 });
    expect(subheading).toHaveTextContent(bollard.tag);
    expect(subheading).toHaveAttribute('title', bollard.symbol);
  });
});