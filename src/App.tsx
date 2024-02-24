import practiceData from "../practice-data.tsx";
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
import Homepage from "./components/Homepage";
import Visiting from "./components/Visiting";
import "./fonts/lato/Lato-Regular.ttf";
import { JSX } from "react/jsx-runtime";

import Footer from "./components/Footer";

function App() {
  // Application State
  const [isOnHomePage, setIsOnHomePage] = useState(true);
  const [userAuthed, setUserAuthed] = useState<null | {
    userId: number;
    username: string;
    // }>(null); // Change back to null
  }>({ userId: 123, username: "Bob" }); // Change back to null
  const [venuesData, setVenuesData] = useState<any[]>([]); // The raw data from the API about venues // practiceData.businesses
  const [venuesAttendingIds, setVenuesAttendingIds] = useState<string[]>([]);
  const [venuesAttendingDetails, setVenuesAttendingDetails] = useState<any[]>(
    []
  );

  // Application Logic

  // Check user session current
  useEffect(() => {
    console.log("THIS USE EFFECT FIRED...");
    // const URL = "http://localhost:3001";
    // const URL = "https://nightlife-8ddy.onrender.com";
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
          setVenuesAttendingIds([...data.venuesAttendingIds]);
        }
      })
      .catch((error) => {
        // Handle errors
        console.error("Error:", error);
      });
  }, []);

  return (
    <>
      <Navbar
        userAuthed={userAuthed}
        setUserAuthed={setUserAuthed}
        setIsOnHomePage={setIsOnHomePage}
        setVenuesAttendingIds={setVenuesAttendingIds}
        setVenuesAttendingDetails={setVenuesAttendingDetails}
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
              venuesAttendingDetails={venuesAttendingDetails}
              setVenuesAttendingDetails={setVenuesAttendingDetails}
            />
          ) : (
            <Visiting
              isOnHomePage={isOnHomePage}
              userAuthed={userAuthed}
              venuesData={venuesData}
              setVenuesData={setVenuesData}
              venuesAttendingIds={venuesAttendingIds}
              setVenuesAttendingIds={setVenuesAttendingIds}
              venuesAttendingDetails={venuesAttendingDetails}
              setVenuesAttendingDetails={setVenuesAttendingDetails}
            />
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default App;
