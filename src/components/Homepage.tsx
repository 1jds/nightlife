import { useState, ChangeEvent } from "react";
import Venues from "./Venues";
import LoadingDots from "./LoadingDots";
import searchPlaceholder from "../assets/search-placeholder.svg";

// Types for this component
type SearchIsOpen = "false" | "true";
type SearchSortBy = "best_match" | "rating" | "review_count" | "distance";
type SearchPrice = "1" | "2" | "3" | "4";

// Types for this component's props
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
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  searchOffset: number;
  setSearchOffset: React.Dispatch<React.SetStateAction<number>>;
};

const Homepage = (props: HomepageProps) => {
  // Component State
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchOnlyOpenNow, setSearchOnlyOpenNow] =
    useState<SearchIsOpen>("false");
  const [searchPrice, setSearchPrice] = useState<SearchPrice>("4");
  const [searchSortBy, setSearchSortBy] = useState<SearchSortBy>("best_match");

  // Component Functionality
  const handleSearchTextInput = (e: ChangeEvent<HTMLInputElement>): void => {
    let { value: searchWords } = e.target;
    props.setSearchTerm(searchWords);
  };

  const handleSearch = (e: any): void => {
    e.preventDefault();
    setLoading(true);
    if (!props.searchTerm) {
      setError(
        "Please enter a location first, such as 'London', or 'New York'."
      );
      setLoading(false);
      return;
    }
    const searchFormData = {
      searchOffset: props.searchOffset,
      searchOnlyOpenNow,
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
    fetch(`/api/yelp-data/${props.searchTerm}`, options)
      .then((response) => {
        if (response.status === 200 || response.status === 400) {
          return response.json();
        }
        return Promise.reject(response);
      })
      .then((data) => {
        if (data.locationFound === false) {
          setError(data.message);
        } else if (data.error?.description) {
          setError(data.error.description);
        } else {
          setError("");
          props.setVenuesData((prevState) => [
            ...prevState,
            ...data.businesses,
          ]);
          props.setSearchOffset((prevState) => prevState + 5);
        }
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setError("An error occurred. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Return JSX
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
          placeholder="Enter your location to find venues"
          onChange={handleSearchTextInput}
          onKeyDown={(e): void => {
            if (e.key === "Enter") {
              props.setSearchOffset(0);
              props.setVenuesData([]);
              handleSearch(e);
            }
          }}
          value={props.searchTerm}
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
          spellCheck="false"
        />
        <button
          className="btn btn-cta"
          type="submit"
          onClick={(e) => {
            props.setSearchOffset(0);
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
              const value: SearchPrice = e.target.value as SearchPrice;
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
              const value: SearchSortBy = e.target.value as SearchSortBy;
              setSearchSortBy(value);
            }}
          >
            <option value="best_match">Best Match</option>
            <option value="rating">Rating</option>
            <option value="review_count">Review Count</option>
            <option value="distance">Distance</option>
          </select>
        </div>
        <div className="options-bar--selector">
          <label htmlFor="sortBySelect">Open now</label>
          <select
            id="sortBySelect"
            value={searchOnlyOpenNow}
            onChange={(e) => {
              const value: SearchIsOpen = e.target.value as SearchIsOpen;
              setSearchOnlyOpenNow(value);
            }}
          >
            <option value="false">Open or Closed</option>
            <option value="true">Open Now</option>
          </select>
        </div>
      </div>
      <div className="results">
        {props.venuesData && (
          <Venues
            isOnHomePage={props.isOnHomePage}
            userAuthed={props.userAuthed}
            venuesData={props.venuesData}
            setVenuesData={props.setVenuesData}
            venuesAttendingIds={props.venuesAttendingIds}
            setVenuesAttendingIds={props.setVenuesAttendingIds}
          />
        )}

        {error ? <p style={{ margin: "1rem 0rem 2rem" }}>{error}</p> : null}
        {loading ? <LoadingDots /> : null}
        {props.searchOffset ? (
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
