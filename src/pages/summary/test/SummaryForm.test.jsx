import { fireEvent, render, screen } from "@testing-library/react";
import SummaryForm from "../SummaryForm";

test("checkbox is unchecked by default", () => {
  render(<SummaryForm />);
  const checkbox = screen.getByRole("checkbox", 
    { name: 
        /terms and conditions/i,
    });
  expect(checkbox).not.toBeChecked();
});

test("checking checkbox enables button the first time, disables the second", () => {
  render(<SummaryForm />);
  const confirmButton = screen.getByRole("button", { name: "Confirm order" });
  const checkbox = screen.getByRole("checkbox", 
  { name: 
      /terms and conditions/i,
  });

  fireEvent.click(checkbox);
  expect(confirmButton).toBeEnabled();

  fireEvent.click(checkbox);
  expect(confirmButton).toBeDisabled();
});
