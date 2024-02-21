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
import zeroStars from "/Review_Ribbon_small_16_0.png";
import halfStars from "/Review_Ribbon_small_16_half.png";
// There was no one star png provided in the Yelp assets for some reason(?)
import oneAndHalfStars from "/Review_Ribbon_small_16_2_1_half.png";
import twoStars from "/Review_Ribbon_small_16_2.png";
import twoAndHalfStars from "/Review_Ribbon_small_16_2_half.png";
import threeStars from "/Review_Ribbon_small_16_3.png";
import threeAndHalfStars from "/Review_Ribbon_small_16_3_half.png";
import fourStars from "/Review_Ribbon_small_16_4.png";
import fourAndHalfStars from "/Review_Ribbon_small_16_4_half.png";
import fiveStars from "/Review_Ribbon_small_16_5.png";
import Footer from "./components/Footer";

const practiceData = {
  businesses: [
    {
      id: "rUcqLSIYP_mT4aLn9pPExA",
      alias: "牛かつ-もと村-東京駅八重洲口店-中央区-2",
      name: "Gyukatsu MOTOMURA Tokyo Eki Yaesuguchi",
      image_url:
        "https://s3-media3.fl.yelpcdn.com/bphoto/QQDRKifG5m4P0MQanqFzIw/o.jpg",
      is_closed: false,
      url: "https://www.yelp.com/biz/%E7%89%9B%E3%81%8B%E3%81%A4-%E3%82%82%E3%81%A8%E6%9D%91-%E6%9D%B1%E4%BA%AC%E9%A7%85%E5%85%AB%E9%87%8D%E6%B4%B2%E5%8F%A3%E5%BA%97-%E4%B8%AD%E5%A4%AE%E5%8C%BA-2?adjust_creative=TO8Fck7bySGxjeKQk5Q6yw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=TO8Fck7bySGxjeKQk5Q6yw",
      review_count: 129,
      categories: [
        {
          alias: "japanese",
          title: "Japanese",
        },
      ],
      rating: 4.9,
      coordinates: {
        latitude: 35.681375,
        longitude: 139.770603,
      },
      transactions: [],
      price: "￥￥",
      location: {
        address1: "八重洲1-6-14",
        address2: "",
        address3: "",
        city: "Chūō",
        zip_code: "103-0028",
        country: "JP",
        state: "13",
        display_address: ["八重洲1-6-14", "Chūō, 東京都 〒103-0028", "Japan"],
      },
      phone: "+81332310337",
      display_phone: "+81 3-3231-0337",
      distance: 542.6828025263433,
    },
    {
      id: "YD4NquiK0mPR_WMse5KPOA",
      alias: "六厘舎-千代田区",
      name: "Rokurinsha",
      image_url:
        "https://s3-media4.fl.yelpcdn.com/bphoto/LF9MhKH-tidgySJnukWV6A/o.jpg",
      is_closed: false,
      url: "https://www.yelp.com/biz/%E5%85%AD%E5%8E%98%E8%88%8E-%E5%8D%83%E4%BB%A3%E7%94%B0%E5%8C%BA?adjust_creative=TO8Fck7bySGxjeKQk5Q6yw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=TO8Fck7bySGxjeKQk5Q6yw",
      review_count: 295,
      categories: [
        {
          alias: "ramen",
          title: "Ramen",
        },
      ],
      rating: 4.4,
      coordinates: {
        latitude: 35.680068,
        longitude: 139.76781,
      },
      transactions: [],
      price: "￥",
      location: {
        address1: "丸の内1-9-1",
        address2: "B1F",
        address3: "",
        city: "Chiyoda",
        zip_code: "100-0005",
        country: "JP",
        state: "13",
        display_address: [
          "丸の内1-9-1",
          "B1F",
          "Chiyoda, 東京都 〒100-0005",
          "Japan",
        ],
      },
      phone: "+81332860166",
      display_phone: "+81 3-3286-0166",
      distance: 568.636091624013,
    },
    {
      id: "gBqIOKuyQFCCzGX_QiMF-A",
      alias: "神戸牛511-港区",
      name: "Kobebeef 511",
      image_url:
        "https://s3-media3.fl.yelpcdn.com/bphoto/xh2kDgLaM1NTVTRCGVIOlQ/o.jpg",
      is_closed: false,
      url: "https://www.yelp.com/biz/%E7%A5%9E%E6%88%B8%E7%89%9B511-%E6%B8%AF%E5%8C%BA?adjust_creative=TO8Fck7bySGxjeKQk5Q6yw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=TO8Fck7bySGxjeKQk5Q6yw",
      review_count: 101,
      categories: [
        {
          alias: "steak",
          title: "Steakhouses",
        },
        {
          alias: "japanese",
          title: "Japanese",
        },
        {
          alias: "beer_and_wine",
          title: "Beer, Wine & Spirits",
        },
      ],
      rating: 4.6,
      coordinates: {
        latitude: 35.674704,
        longitude: 139.735364,
      },
      transactions: [],
      price: "￥￥￥￥",
      location: {
        address1: "港区赤坂",
        address2: "4-3-28ディアプラザ赤坂B",
        address3: "",
        city: "Minato",
        zip_code: "1070052",
        country: "JP",
        state: "13",
        display_address: [
          "港区赤坂",
          "4-3-28ディアプラザ赤坂B",
          "Minato, 東京都 〒1070052",
          "Japan",
        ],
      },
      phone: "+81366850511",
      display_phone: "+81 3-6685-0511",
      distance: 3060.029790200069,
    },
    {
      id: "Gl2e6kUMnNku2efxtyof1w",
      alias: "ts-たんたん-東京駅京葉ストリート店-千代田区-2",
      name: "T's Tantan Tokyo Station Keiyo Street",
      image_url:
        "https://s3-media2.fl.yelpcdn.com/bphoto/tvwcYcV_1Sf2MeLicXoxBQ/o.jpg",
      is_closed: false,
      url: "https://www.yelp.com/biz/ts-%E3%81%9F%E3%82%93%E3%81%9F%E3%82%93-%E6%9D%B1%E4%BA%AC%E9%A7%85%E4%BA%AC%E8%91%89%E3%82%B9%E3%83%88%E3%83%AA%E3%83%BC%E3%83%88%E5%BA%97-%E5%8D%83%E4%BB%A3%E7%94%B0%E5%8C%BA-2?adjust_creative=TO8Fck7bySGxjeKQk5Q6yw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=TO8Fck7bySGxjeKQk5Q6yw",
      review_count: 187,
      categories: [
        {
          alias: "vegan",
          title: "Vegan",
        },
        {
          alias: "ramen",
          title: "Ramen",
        },
        {
          alias: "japacurry",
          title: "Japanese Curry",
        },
      ],
      rating: 4.7,
      coordinates: {
        latitude: 35.679754,
        longitude: 139.76692,
      },
      transactions: [],
      price: "￥",
      location: {
        address1: "丸の内1-9-1",
        address2: "改札内 京葉ストリート",
        address3: "",
        city: "Chiyoda",
        zip_code: "100-0005",
        country: "JP",
        state: "13",
        display_address: [
          "丸の内1-9-1",
          "改札内 京葉ストリート",
          "Chiyoda, 東京都 〒100-0005",
          "Japan",
        ],
      },
      phone: "+81332188040",
      display_phone: "+81 3-3218-8040",
      distance: 595.3642931642172,
    },
    {
      id: "n9j2Py6a0DUdQ6QDr-8ssQ",
      alias: "一風堂-銀座店-中央区-4",
      name: "IPPUDO Ginza",
      image_url:
        "https://s3-media4.fl.yelpcdn.com/bphoto/UaUv0Rmk2BzZidmTpxpqJQ/o.jpg",
      is_closed: false,
      url: "https://www.yelp.com/biz/%E4%B8%80%E9%A2%A8%E5%A0%82-%E9%8A%80%E5%BA%A7%E5%BA%97-%E4%B8%AD%E5%A4%AE%E5%8C%BA-4?adjust_creative=TO8Fck7bySGxjeKQk5Q6yw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=TO8Fck7bySGxjeKQk5Q6yw",
      review_count: 230,
      categories: [
        {
          alias: "ramen",
          title: "Ramen",
        },
        {
          alias: "dumplings",
          title: "Dumplings",
        },
        {
          alias: "donburi",
          title: "Donburi",
        },
      ],
      rating: 4.6,
      coordinates: {
        latitude: 35.670699,
        longitude: 139.767429,
      },
      transactions: [],
      price: "￥",
      location: {
        address1: "銀座4-10-3",
        address2: "セントラルビル 1F",
        address3: null,
        city: "Chūō",
        zip_code: "104-0061",
        country: "JP",
        state: "13",
        display_address: [
          "銀座4-10-3",
          "セントラルビル 1F",
          "Chūō, 東京都 〒104-0061",
          "Japan",
        ],
      },
      phone: "+81335471010",
      display_phone: "+81 3-3547-1010",
      distance: 1603.2299366335312,
    },
  ],
  total: 15000,
  region: {
    center: {
      longitude: 139.76669311523438,
      latitude: 35.685011526354074,
    },
  },
};

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
    const URL = "https://nightlife-8ddy.onrender.com";
    fetch(`${URL}/current-session`, {
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
    const URL = "https://nightlife-8ddy.onrender.com";
    fetch(`${URL}/yelp-data/${searchTerm}`, options)
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
