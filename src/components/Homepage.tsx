import { useState, ChangeEvent } from "react";
import Venues from "./Venues";

// TypeScript types for this component's props
type HomepageProps = {
  isOnHomePage: boolean;
  userAuthed: null | {
    userId: number;
    username: string;
  };
  venuesData: any[];
  setVenuesData: React.Dispatch<React.SetStateAction<any[]>>;
  venuesAttendingIds: string[];
  setVenuesAttendingIds: React.Dispatch<React.SetStateAction<string[]>>;
  venuesAttendingDetails: any[];
  setVenuesAttendingDetails: React.Dispatch<React.SetStateAction<any[]>>;
};

const Homepage = (props: HomepageProps) => {
  // Component State
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");
  // Query params for the venues search
  const [searchOffset, setSearchOffset] = useState(0);
  const [searchIsOpenNow, setSearchIsOpenNow] = useState(false);
  const [searchPrice, setSearchPrice] = useState(4);
  const [searchSortBy, setSearchSortBy] = useState<
    "best_match" | "rating" | "review_count" | "distance"
  >("best_match");

  // Component Functionality
  const handleSearchTextInput = (e: ChangeEvent<HTMLInputElement>): void => {
    let { value: searchWords } = e.target;
    setSearchTerm(searchWords);
  };

  const handleSearch = (e: any): void => {
    e.preventDefault();
    setLoading(true);

    if (!searchTerm) {
      setError(
        "Please enter a location first, such as 'London', or 'New York'."
      );
      setLoading(false);
      return;
    }

    const searchFormData = {
      searchOffset,
      searchIsOpenNow,
      searchSortBy,
      searchPrice,
    };
    const searchJsonData = JSON.stringify(searchFormData);

    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: searchJsonData,
    };

    // const URL = "http://localhost:3001";
    // const URL = "https://nightlife-8ddy.onrender.com";
    fetch(`api/yelp-data/${searchTerm}`, options)
      .then((response) => {
        console.log("The response status: ", response.status);
        if (response.status === 200) {
          return response.json();
        }
        return Promise.reject(response);
      })
      .then((data) => {
        console.log("The response data... : ", data);
        if (data.error?.description) {
          setError(data.error.description);
        } else {
          props.setVenuesData((prevState) => [
            ...prevState,
            ...data.businesses,
          ]);
          setSearchOffset((prevState) => prevState + 5);
        }
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setError(`${error}`);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  let resultsList;

  return (
    <>
      <div className="pop-out box-shadow">
        <h1>BAR BUDDIES</h1>
        <p>Have plans tonight?</p>
        <p>See which bars are hoppin' tonight and RSVP ahead of time!</p>
        <p>
          Use the search field below to find bars and restaurants in your local
          area.
        </p>
      </div>

      <form className="search-bar">
        <input
          id="location-search-input"
          className="textarea-input box-shadow"
          type="text"
          placeholder="Enter your current location"
          onChange={handleSearchTextInput}
          onKeyDown={(e): void => {
            if (e.key === "Enter") {
              setSearchOffset(0);
              props.setVenuesData([]);
              handleSearch(e);
            }
          }}
          value={searchTerm}
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
          spellCheck="false"
        />
        <button
          className="btn btn-cta"
          type="submit"
          onClick={(e) => {
            setSearchOffset(0);
            props.setVenuesData([]);
            handleSearch(e);
          }}
        >
          Search
        </button>
      </form>
      <div className="options-bar">
        <div className="options-bar--selector">
          <label htmlFor="priceSelect">Price limit</label>
          <select
            id="priceSelect"
            value={searchPrice}
            onChange={(e) => {
              let value;
              switch (e.target.value) {
                case "1":
                  value = 1;
                  break;
                case "2":
                  value = 2;
                  break;
                case "3":
                  value = 3;
                  break;
                default:
                  value = 4;
              }
              setSearchPrice(value);
            }}
          >
            <option value="4">$$$$</option>
            <option value="3">$$$</option>
            <option value="2">$$</option>
            <option value="1">$</option>
          </select>
        </div>
        <div className="options-bar--selector">
          <label htmlFor="sortBySelect">Sort by</label>
          <select
            id="sortBySelect"
            value={searchSortBy}
            onChange={(e) => {
              let value: "best_match" | "rating" | "review_count" | "distance";
              switch (e.target.value) {
                case "rating":
                  value = "rating";
                  break;
                case "review_count":
                  value = "review_count";
                  break;
                case "distance":
                  value = "distance";
                  break;
                default:
                  value = "best_match";
              }
              setSearchSortBy(value);
            }}
          >
            <option value="best_match">Best Match</option>
            <option value="rating">Rating</option>
            <option value="review_count">Review Count</option>
            <option value="distance">Distance</option>
          </select>
        </div>
      </div>
      <div className="results">
        {props.venuesData && <Venues {...props} />}

        {error ? (
          <p style={{ margin: "1rem 0rem 2rem" }}>
            An error has occured. Please try again. {error}
          </p>
        ) : loading ? (
          <p style={{ margin: "1rem 0rem 2rem" }}>
            Results loading. Please wait...
          </p>
        ) : null}
        {searchOffset ? (
          <button
            className="btn"
            onClick={(e) => {
              handleSearch(e);
            }}
          >
            Load More Results
          </button>
        ) : null}
      </div>
    </>
  );
};

export default Homepage;
