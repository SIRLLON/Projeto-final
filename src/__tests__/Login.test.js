import { render, screen, fireEvent } from "@testing-library/react";
import Login from "../pages/Login";

test("shows login form", () => {
  render(<Login onLoginSuccess={() => {}} />);
  expect(screen.getByText(/FinanSmart Web/i)).toBeInTheDocument();
});

test("alerts on wrong login", () => {
  window.alert = jest.fn();
  render(<Login onLoginSuccess={() => {}} />);
  fireEvent.change(screen.getByPlaceholderText("Usuário"), { target: { value: "x" } });
  fireEvent.change(screen.getByPlaceholderText("Senha"), { target: { value: "y" } });
  fireEvent.click(screen.getByText("Entrar"));
  expect(window.alert).toHaveBeenCalled();
});
