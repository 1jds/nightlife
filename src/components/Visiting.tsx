import Venues from "./Venues";

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
          <div>
            <p>You have not yet added any venues to your plans.</p>
            <p>
              Return to the homepage and search for venues to add to your plans
              first.
            </p>
          </div>
        )}
      </div>
    </>
  );
};
export default Visiting;
