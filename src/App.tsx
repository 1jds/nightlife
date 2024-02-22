import {
  useState,
  useEffect,
  ChangeEvent,
  JSXElementConstructor,
  ReactElement,
  ReactNode,
  MouseEvent,
  MouseEventHandler,
} from "react";
import Navbar from "./components/Navbar";
import "./fonts/lato/Lato-Regular.ttf";
import { JSX } from "react/jsx-runtime";
import zeroStars from "./assets/Review_Ribbon_small_16_0.png";
import halfStars from "./assets/Review_Ribbon_small_16_half.png";
// There was no one star png provided in the Yelp assets for some reason(?)
import oneAndHalfStars from "./assets/Review_Ribbon_small_16_2_1_half.png";
import twoStars from "./assets/Review_Ribbon_small_16_2.png";
import twoAndHalfStars from "./assets/Review_Ribbon_small_16_2_half.png";
import threeStars from "./assets/Review_Ribbon_small_16_3.png";
import threeAndHalfStars from "./assets/Review_Ribbon_small_16_3_half.png";
import fourStars from "./assets/Review_Ribbon_small_16_4.png";
import fourAndHalfStars from "./assets/Review_Ribbon_small_16_4_half.png";
import fiveStars from "./assets/Review_Ribbon_small_16_5.png";
import Footer from "./components/Footer";

function App() {
  // Application State
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [venuesData, setVenuesData] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [userAuthed, setUserAuthed] = useState<null | {
    userId: number;
    username: string;
  }>(null);

  // Application Logic
  // Handle logout
  useEffect(() => {
    console.log("THIS USE EFFECT FIRED...");
    // const URL = "http://localhost:3001";
    // const URL = "https://nightlife-8ddy.onrender.com";
    fetch("api/current-session", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "https://nightlife-six.vercel.app",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle response data
        console.log(
          "And the response data from the current-session check is... : ",
          data
        );
        if (data.currentlyLoggedIn) {
          setUserAuthed({
            userId: data.userId,
            username: data.username,
          });
        }
      })
      .catch((error) => {
        // Handle errors
        console.error("Error:", error);
      });
  }, []); // I've put this piece of state into the dependency array for testing purposes

  // Query params for the venues search
  const [searchOffset, setSearchOffset] = useState(0);
  const [searchIsOpenNow, setSearchIsOpenNow] = useState(false);
  const [searchPrice, setSearchPrice] = useState(4);
  const [searchSortBy, setSearchSortBy] = useState<
    "best_match" | "rating" | "review_count" | "distance"
  >("best_match");

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
          setVenuesData((prevState) => [...prevState, ...data.businesses]);
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

  if (venuesData) {
    // if (true) {
    // resultsList = practiceData.businesses.map(
    resultsList = venuesData.map(
      ({
        name,
        id,
        image_url,
        is_closed,
        rating,
        price,
        location: { city = "", address1 = "" } = {},
      }) => {
        return (
          <div key={id} className="venue-result-box box-shadow">
            <img
              src={`${image_url}`}
              loading="lazy"
              alt={`restaurant image for ${name}`}
            />
            <div className="venue-details">
              <h2>{name}</h2>
              <img
                alt={`${rating} star rating`}
                src={
                  rating < 0.5
                    ? zeroStars
                    : rating < 1
                    ? halfStars
                    : rating < 2
                    ? oneAndHalfStars
                    : rating < 2.5
                    ? twoStars
                    : rating < 3
                    ? twoAndHalfStars
                    : rating < 3.5
                    ? threeStars
                    : rating < 4
                    ? threeAndHalfStars
                    : rating < 4.5
                    ? fourStars
                    : rating < 5
                    ? fourAndHalfStars
                    : fiveStars
                }
              />
              <p>{is_closed ? "Closed" : "Open Now!"}</p>
              <p>{3} attending</p>
              <p>Price: {price}</p>
              <p>
                {address1}, {city}
              </p>
            </div>
            {userAuthed ? (
              false ? (
                <div className="venue-attending">
                  <p className="badge bg-green">You are attending</p>
                </div>
              ) : (
                <div className="venue-attending">
                  <p className="badge">You are not going</p>
                  <button className="btn">Add to Plan?</button>
                </div>
              )
            ) : (
              <div className="venue-attending">
                <p className="badge">Login to add to plan</p>
              </div>
            )}
          </div>
        );
      }
    );
  }

  return (
    <>
      <Navbar userAuthed={userAuthed} setUserAuthed={setUserAuthed} />
      <main>
        <div className="content-grid">
          <div className="pop-out box-shadow">
            <h1>BAR BUDDIES</h1>
            <p>Have plans tonight?</p>
            <p>See which bars are hoppin' tonight and RSVP ahead of time!</p>
            <p>
              Use the search field below to find bars and restaurants in your
              local area.
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
                  setVenuesData([]);
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
                setVenuesData([]);
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
                  let value:
                    | "best_match"
                    | "rating"
                    | "review_count"
                    | "distance";
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
            {resultsList && resultsList}

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
        </div>
      </main>
      <Footer />
    </>
  );
}

export default App;
