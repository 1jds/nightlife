import Venues from "./Venues";

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
  return (
    <>
      <h1 className="places-going-heading">Places you are going</h1>
      <div className="results">
        {props.venuesAttendingIds && <Venues {...props} />}
      </div>
    </>
  );
};

export default Visiting;
