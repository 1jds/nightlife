import Navbar from "./Navbar";
import "./fonts/lato/Lato-Regular.ttf";

function App() {
  return (
    <>
      <Navbar />
      <main>
        <div className="hero-text">
          <h1>BAR BUDDIES</h1>
          <p>Have plans tonight?</p>
          <p>See which bars are hoppin' tonight and RSVP ahead of time!</p>
        </div>
        <form>
          <input type="text" />
          <button>Search</button>
        </form>
      </main>
    </>
  );
}

export default App;
