import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent, screen } from "@testing-library/react";
import App from "../components/App";
import userEvent from "@testing-library/user-event";

describe("Basic Imgur API App Test", () => {
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

  describe("Testing basic rendering", () => {
    test("The search box should be rendered into the app.", () => {
      render(<App />);
      const input = screen.getByText("Search Image...");
      expect(input).toBeInTheDocument();
    });
  });
});
