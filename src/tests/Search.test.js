import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent, screen } from "@testing-library/react";
import App from "../components/App";
import Search from "../components/Toolbar/Search";
import userEvent from "@testing-library/user-event";
describe("Imgur Search component testing", () => {
  test("Searchbox is rendered", () => {
    render(<Search />);
    const input = screen.getByText("Type Here to Search for Images...");
    expect(input).toBeInTheDocument();
  });
});
