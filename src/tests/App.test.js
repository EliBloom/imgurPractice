import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent, screen } from "@testing-library/react";
import App from "../components/App";
import userEvent from "@testing-library/user-event";
describe("Imgur testing", () => {
  test("Searchbox is rendered", () => {
    render(<App />);
    const input = screen.getByText("Search Image...");
    expect(input).toBeInTheDocument();
  });
});
