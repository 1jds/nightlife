import {
  useState,
  useEffect,
  ChangeEvent,
  JSXElementConstructor,
  ReactElement,
  ReactNode,
} from "react";
import Navbar from "./Navbar";
import "./fonts/lato/Lato-Regular.ttf";
import { JSX } from "react/jsx-runtime";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [isDataReceived, setIsDataReceived] = useState(false);
  const [APIresponse, setAPIresponse] = useState<{
    businesses: [];
    total: number | null;
    region: {};
    msg?: string;
  }>({
    businesses: [],
    total: null,
    region: {},
    msg: "",
  });
  const [error, setError] = useState(null);

  const handleSearchTextInput = (e: ChangeEvent<HTMLInputElement>): void => {
    let { value: searchWords } = e.target;
    setSearchTerm(searchWords);
  };

  const handleSearch = (e: any): void => {
    e.preventDefault();

    setLoading(true);

    if (!searchTerm) {
      alert("Please enter a location first, such as 'London', or 'New York'.");
      return;
    }

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    };

    fetch(
      `https://nightlife-8ddy.onrender.com/yelp-data/${searchTerm}`,
      options
    )
      .then((response) => {
        console.log("The response status: ", response.status);
        if (response.status === 200) {
          return response.json();
        }
        return Promise.reject(response);
      })
      .then((data) => {
        console.log("The response data: ", data);
        if (data.status === 404 || data.status === 405) {
          setAPIresponse({
            businesses: [],
            total: null,
            region: {},
            msg: "No results found. Please adjust your search parameters and try again.",
          });
          setIsDataReceived(true);
          return;
        }
        setAPIresponse(data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
    // navigate("/poems/search");
  };

  let resultsList:
    | string
    | number
    | boolean
    | JSX.Element[]
    | ReactElement<any, string | JSXElementConstructor<any>>
    | Iterable<ReactNode>
    | null
    | undefined = [];
  if (isDataReceived && APIresponse.businesses) {
    resultsList = APIresponse.businesses.map(
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
          <div key={id} className="favourites-page--favourites-item-container">
            <h4>{name}</h4>
            <img src={`${image_url}`} />
            <p>{is_closed}</p>
            <p>{rating}</p>
            <p>{price}</p>
            <p>{address1}</p>
            <p>{city}</p>
          </div>
        );
      }
    );
  }

  return (
    <>
      <Navbar />
      <main>
        <div className="content-grid">
          <div className="pop-out">
            <h1>BAR BUDDIES</h1>
            <p>Have plans tonight?</p>
            <p>See which bars are hoppin' tonight and RSVP ahead of time!</p>
          </div>
          <form className="search-bar">
            <input
              id="location-search-input"
              className="textarea-input"
              type="text"
              placeholder="Where are you?"
              onChange={handleSearchTextInput}
              onKeyDown={(e) => {
                e.key === "Enter" && handleSearch(e);
              }}
              value={searchTerm}
              autoCapitalize="off"
              autoComplete="off"
              autoCorrect="off"
              spellCheck="false"
            />
            <button className="btn btn-cta" type="submit">
              Search
            </button>
          </form>
          {error ? (
            <p>An error has occured. Please try again. {error}</p>
          ) : loading ? (
            <p>Results loading. Please wait...</p>
          ) : isDataReceived ? (
            resultsList
          ) : null}
        </div>
      </main>
      <footer>
        <p>
          Credit to Kunal Yadav whose work was referenced in the creation of
          this page.
        </p>
        <a href="https://github.com/abkunal/Nightlife-Coordination-App">
          See Yadav's sourcecode here.
        </a>
      </footer>
    </>
  );
}

export default App;
