import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import SummaryForm from "../SummaryForm";
import userEvent from "@testing-library/user-event";

test("checkbox is unchecked by default", () => {
  render(<SummaryForm />);
  const checkbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  expect(checkbox).not.toBeChecked();
});

test("checking checkbox enables button the first time, disables the second", () => {
  render(<SummaryForm />);
  const confirmButton = screen.getByRole("button", { name: "Confirm order" });
  const checkbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });

  userEvent.click(checkbox);
  expect(confirmButton).toBeEnabled();

  userEvent.click(checkbox);
  expect(confirmButton).toBeDisabled();
});

test("popover respons to hover", async () => {
  render(<SummaryForm />);
  //starts out hidden
  const nullPopover = screen.queryByText(
    /No ice cream will actually be delivered/i
  );
  expect(nullPopover).not.toBeInTheDocument();

  //shows on mouseover
  const termsAndConditions = screen.getByText(/terms and conditions/i);
  userEvent.hover(termsAndConditions);

  const popover = screen.getByText(/No ice cream will actually be delivered/i);
  expect(popover).toBeInTheDocument();

  //disappears when we mouse out
  userEvent.unhover(termsAndConditions);
  await waitForElementToBeRemoved(() =>
    screen.queryByText(/No ice cream will actually be delivered/i)
  );
});
