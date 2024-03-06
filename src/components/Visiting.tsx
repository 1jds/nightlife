import Venues from "./Venues";
import searchPlaceholder from "../assets/search-placeholder.svg";

// Types for this component
type VisitingProps = {
  isOnHomePage: boolean;
  userAuthed: null | {
    userId: number;
    username: string;
  };
  venuesData: any[];
  setVenuesData: React.Dispatch<React.SetStateAction<any[]>>;
  venuesAttendingIds: string[];
  setVenuesAttendingIds: React.Dispatch<React.SetStateAction<string[]>>;
};

const Visiting = (props: VisitingProps) => {
  // Return JSX
  return (
    <>
      <h1 className="places-going-heading">Places you are going</h1>
      <div className="results">
        {props.venuesAttendingIds.length > 0 ? (
          <Venues {...props} />
        ) : (
          <div className="centred-text">
            <p>You have not yet added any venues to your plans.</p>
            <p>
              Return to the homepage and search for venues to add to your plans
              first.
            </p>
            <img
              className="search-placeholder-img"
              src={searchPlaceholder}
              alt="reminder to add venues before viewing plans list"
            />
            {/* The placeholder vector used here was edited from the following vector by Vecteezy: href="https://www.vecteezy.com/vector-art/5631396-woman-pointing-at-web-browser-online-search-engine-bars-seo-optimization-concept-illustration" */}
          </div>
        )}
      </div>
    </>
  );
};
export default Visiting;
