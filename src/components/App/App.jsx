import React, { useState, useRef, useEffect } from "react";
import "./App.css";
import "antd/dist/antd.css";
import Search from "../Toolbar/Search";

/**
 * App that uses Imgur API to query for desired images
 */
export default function App() {
  return (
    <div className="App">
      <Search />
    </div>
  );
}
