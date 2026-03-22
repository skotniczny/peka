import { render, screen } from "@testing-library/react";
import StopPointDepartureTime from "./StopPointDepartureTime";

describe("StopPointDepartureTime", () => {
  test('shows minutes without blink class when realTime is true and minutes > 0', () => {
    render(<StopPointDepartureTime item={{ realTime: true, minutes: 5 }} />);
    const el = screen.getByText("5 min");
    expect(el).toBeInTheDocument();
    expect(el).not.toHaveClass("blink");
  });

  test('shows "<1 min" with blink class when realTime is true and minutes is 0', () => {
    render(<StopPointDepartureTime item={{ realTime: true, minutes: 0 }} />);
    const el = screen.getByText("<1 min");
    expect(el).toBeInTheDocument();
    expect(el).toHaveClass("blink");
  });

  test('shows formatted departure time without blink when realTime is false', () => {
    render(<StopPointDepartureTime item={{ realTime: false, minutes: 5, departure: "2026-03-22T14:30:00.000" }} />);
    const el = screen.getByText("14:30");
    expect(el).toBeInTheDocument();
    expect(el).not.toHaveClass("blink");
  });

  test('shows formatted departure time without blink when realTime is false and minutes is 0', () => {
    render(<StopPointDepartureTime item={{ realTime: false, minutes: 0, departure: "2026-03-22T14:30:00.000" }} />);
    const el = screen.getByText("14:30");
    expect(el).toBeInTheDocument();
    expect(el).not.toHaveClass("blink");
  });
});
