import Navbar from "./Navbar";
import "./fonts/lato/Lato-Regular.ttf";

function App() {
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
              autoCapitalize="off"
              autoComplete="off"
              autoCorrect="off"
              className="textarea-input"
              type="text"
              placeholder="Where are you?"
              spellCheck="false"
              value=""
            />
            <button className="btn btn-cta" type="submit">
              Search
            </button>
          </form>
        </div>
      </main>
      <footer>
        <p>Some footer text here</p>
      </footer>
    </>
  );
}

export default App;
