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
  venuesAttendingDetails: any[];
  setVenuesAttendingDetails: React.Dispatch<React.SetStateAction<any[]>>;
};

const Visiting = (props: VisitingProps) => {
  return (
    <>
      <h1 className="places-going-heading">Places you are going</h1>
      <div className="results">{props.venuesData && <Venues {...props} />}</div>
    </>
  );
};

export default Visiting;
