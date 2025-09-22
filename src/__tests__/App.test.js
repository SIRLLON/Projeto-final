import { render, screen } from "@testing-library/react";
import App from "../App";

test("renders footer text", () => {
  render(<App />);
  expect(screen.getByText(/TP5 - React Web/i)).toBeInTheDocument();
});
