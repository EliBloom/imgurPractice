import React, { useState, useRef, useEffect } from "react";
import "./App.css";
import "antd/dist/antd.min.css";
import Search from "../Toolbar/Search";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

/**
 * App that uses Imgur API to query for desired images
 */
export default function App() {
  return (
    <div className="App">
      <QueryClientProvider client={new QueryClient()}>
        <Search />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </div>
  );
}
