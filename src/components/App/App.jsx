import { AutoComplete, Input, Button, Tooltip } from "antd";
import React, { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import keywords from "../Utils/Keywords";
import "./App.css";
import "antd/dist/antd.css";

export default function App() {
  const [options, setOptions] = useState([]);
  const [userText, setUserText] = useState("");

  //when enter button is pressed or search, call imgur api and fill grid with images
  function onImageSearch() {
    console.log(userText);
  }

  // for when autocomplete option is selected
  function onAutoCompleteSelect(data) {
    setUserText(data);
    console.log(data);
  }

  return (
    <div className="App">
      <header className="App-header">
        <AutoComplete
          options={options}
          style={{ width: 200 }}
          onSelect={onAutoCompleteSelect}
          placeholder="Search Image..."
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              onImageSearch();
            }
          }}
          onChange={(text) => {
            let options = [];
            !text
              ? (options = [])
              : keywords.forEach((word) => {
                  if (word.includes(text)) {
                    console.log(word);
                    options.push({ value: word });
                  }
                });

            // this not fast and would ideally be implemented with trie for bigger dataset
            setOptions(options);
            setUserText(text);
          }}
        ></AutoComplete>
        <Tooltip title="search">
          <Button
            type="primary"
            icon={<SearchOutlined />}
            onClick={onImageSearch}
          />
        </Tooltip>
      </header>
    </div>
  );
}
