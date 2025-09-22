import { render, screen, fireEvent } from "@testing-library/react";
import TransactionForm from "../components/TransactionForm";

test("adds a transaction", () => {
  const addTransaction = jest.fn();
  render(<TransactionForm addTransaction={addTransaction} />);
  fireEvent.change(screen.getByPlaceholderText("Descrição"), { target: { value: "Teste" } });
  fireEvent.change(screen.getByPlaceholderText("Valor"), { target: { value: "10" } });
  fireEvent.click(screen.getByText("Adicionar"));
  expect(addTransaction).toHaveBeenCalled();
});
