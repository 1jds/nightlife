import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Homepage from "./components/Homepage";
import Visiting from "./components/Visiting";
import "./fonts/lato/Lato-Regular.ttf";

import Footer from "./components/Footer";

function App() {
  // Application State
  const [isOnHomePage, setIsOnHomePage] = useState(true);
  const [userAuthed, setUserAuthed] = useState<null | {
    userId: number;
    username: string;
  }>(null);
  const [venuesData, setVenuesData] = useState<any[]>([]); // The raw data from the API about venues // practiceData.businesses
  const [venuesAttendingIds, setVenuesAttendingIds] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchOffset, setSearchOffset] = useState(0);

  // Application Logic
  // Check user session current
  useEffect(() => {
    fetch("/api/current-session", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.currentlyLoggedIn) {
          setUserAuthed({
            userId: data.userId,
            username: data.username,
          });
          setVenuesAttendingIds([...data.venuesAttendingIds]);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  // Return JSX
  return (
    <>
      <Navbar
        userAuthed={userAuthed}
        setUserAuthed={setUserAuthed}
        setIsOnHomePage={setIsOnHomePage}
        setVenuesAttendingIds={setVenuesAttendingIds}
      />
      <main>
        <div className="content-grid">
          {isOnHomePage ? (
            <Homepage
              isOnHomePage={isOnHomePage}
              userAuthed={userAuthed}
              venuesData={venuesData}
              setVenuesData={setVenuesData}
              venuesAttendingIds={venuesAttendingIds}
              setVenuesAttendingIds={setVenuesAttendingIds}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              searchOffset={searchOffset}
              setSearchOffset={setSearchOffset}
            />
          ) : (
            <Visiting
              isOnHomePage={isOnHomePage}
              userAuthed={userAuthed}
              venuesData={venuesData}
              setVenuesData={setVenuesData}
              venuesAttendingIds={venuesAttendingIds}
              setVenuesAttendingIds={setVenuesAttendingIds}
            />
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
export default App;
