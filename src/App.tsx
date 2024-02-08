import { useState, useEffect, ChangeEvent } from "react";
import Navbar from "./Navbar";
import "./fonts/lato/Lato-Regular.ttf";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [APIresponse, setAPIresponse] = useState([
    {
      msg: "Use the search bar to find some poetry!",
    },
  ]);
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

    // fetch("https://nightlife-8ddy.onrender.com/yelp-data", options)
    //   .then((response) => response.json())
    //   .then((response) => console.log(response))
    //   .catch((err) => console.error(err));

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
        // if (data.status === 404 || data.status === 405) {
        //   setAPIresponse([
        //     {
        //       msg: "No results found. Please adjust your search parameters and try again.",
        //     },
        //   ]);
        //   return;
        // }
        // setAPIresponse(data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        // setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
    // navigate("/poems/search");
  };

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
