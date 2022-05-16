import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent, screen } from "@testing-library/react";
import App from "../components/App";

// test("renders learn react link", () => {
//   render(<App />);
//   const linkElement = screen.getByText("Search Image...");
//   expect(linkElement).toBeInTheDocument();
// });

describe("Basic Calculator Test", () => {
  delete window.matchMedia;
  window.matchMedia = (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  });

  describe("Calculator UI Functionality", () => {
    test("The buttons of the Basic Calculator should be rendered", () => {
      render(<App />);
      const input = screen.getByText("Search Image...");
      expect(input).toBeInTheDocument();
    });
  });
});
