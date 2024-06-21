import {
  AutoComplete,
  Button,
  Tooltip,
  Alert,
  Row,
  Col,
  Divider,
  Image,
  InputNumber,
  Select,
} from "antd";
import React, { useState, useRef, useEffect } from "react";
import { SearchOutlined } from "@ant-design/icons";
import keywords from "../Utils/Keywords";
import "antd/dist/antd.min.css";

/**
 * Search-bar component that uses Imgur API to query for desired images
 */
export default function Search() {
  const [options, setOptions] = useState(keywords);
  //user input for  Imgur gallery search
  const [userText, setUserText] = useState("");
  //holder for ongoing typing in input
  const ongoingText = useRef("");

  //the loaded images from using userText in Imgur gallery
  const [loadedImages, setLoadedImages] = useState([]);
  //error for if their is a server error for api call
  const [loadErrorMessage, setLoadErrorMessage] = useState("");
  //optional url variable
  const page = useRef(1);
  //optional url variable
  const imgurWindow = useRef("all");
  //optional url variable
  const sort = useRef("time");

  //initialized to base url
  const [url, setUrl] = useState("https://api.imgur.com/3/gallery/search/?q=");
  const authId = "b067d5cb828ec5a";
  const { Option } = Select;

  const text = <span>Begin the search for your hopes and dreams...</span>;

  useEffect(() => {
    onImageSearch();
  }, [userText, url]);

  //This should eventually be replaced by a api call
  function search(userSearch) {
    userSearch ? setOptions([...keywords]) : setOptions(keywords);
  }

  /**
   * when enter button is pressed or search, call imgur api and fill grid with images
   */
  async function onImageSearch() {
    let response = await fetch(url + userText, {
      headers: {
        Authorization: "Client-ID " + authId,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      setLoadErrorMessage(
        "Failed to load requested images with followingError: " +
          response.status
      );
    } else {
      let json = await response.json();
      handleJSON(json);
    }
  }

  /**
   * for when autocomplete option is selected
   */
  function onAutoCompleteSelect(data) {
    setUserText(data);
  }

  /**
   * for closing the error message alert
   */
  function closeErrorMessage() {
    setLoadErrorMessage("");
  }

  /**
   * for updating the page to use the updated url, hence updating images displayed
   */
  async function updatePage() {
    let newUrl =
      "https://api.imgur.com/3/gallery/search/{" +
      sort.current +
      "}/{" +
      imgurWindow.current +
      "}/{" +
      page.current +
      "}?q=";

    setUrl(newUrl);
  }

  /*
   * Helper that handles the processing of json
   **/
  function handleJSON(json) {
    let imagesArr = [];
    json.data
      .filter((data) => data.images?.length > 0)
      .forEach((data) => {
        data.images.forEach((image) => {
          let imageUrl = image.link;
          if (imageUrl && !imageUrl.includes("mp4")) {
            imagesArr.push(imageUrl);
          }
        });
      });
    setLoadedImages(imagesArr);
  }

  return (
    <div className="Search">
      {loadErrorMessage ? (
        <Alert
          className="App-errormessage"
          message={loadErrorMessage}
          type="error"
          closable
          onClose={closeErrorMessage}
        />
      ) : (
        <></>
      )}

      <header className="App-header">
        {/* Text box for entering search query */}
        <AutoComplete
          options={options}
          className="App-autoComplete"
          style={{ width: 200 }}
          filterOption={true}
          onSelect={onAutoCompleteSelect}
          placeholder="Type Here to Search for Images..."
          onChange={(e) => {
            ongoingText.current = e;
          }}
          //An api call will eventually go here in order to load the suggested words from database rather than just a file and having a fixed constant number of suggestions
          onSearch={(value) => {
            search(value);
          }}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              setUserText(ongoingText.current);
            }
          }}
        ></AutoComplete>

        <Tooltip title={text}>
          <Button
            type="primary"
            icon={<SearchOutlined />}
            onClick={() => {
              setUserText(ongoingText.current);
            }}
          />
        </Tooltip>

        {sort.current !== "top" ? (
          <></>
        ) : (
          <Select
            className="App-selectWindow"
            defaultValue="all"
            style={{
              width: 120,
              padding: "20px",
            }}
            onChange={(selected) => {
              imgurWindow.current = selected;
              updatePage();
            }}
          >
            <Option value="all">all</Option>
            <Option value="year">year</Option>
            <Option value="month">month</Option>
            <Option value="week">week</Option>
            <Option value="day">day</Option>
          </Select>
        )}

        <Select
          className="App-selectSort"
          defaultValue="time"
          style={{ width: 180, padding: "20px" }}
          onChange={(newSort) => {
            sort.current = newSort;
            updatePage();
          }}
        >
          <Option value="time">time</Option>
          <Option value="top">top</Option>
          <Option value="viral">viral</Option>
        </Select>

        <InputNumber
          min={1}
          max={60}
          defaultValue={1}
          className="App-setPage"
          onChange={(number) => {
            page.current = number;
            updatePage();
          }}
        />
      </header>
      {loadedImages.length > 0 ? (
        <div className="App-imageGrid">
          <Divider orientation="left"></Divider>

          <Row gutter={[16, 24]}>
            {loadedImages.map((image) => {
              if (image !== undefined || image != null) {
                return (
                  <Col className="gutter-row" span={6}>
                    <div>
                      <Image width={200} src={image} />
                    </div>
                  </Col>
                );
              }
              return <></>;
            })}
          </Row>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
