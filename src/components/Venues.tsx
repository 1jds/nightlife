import zeroStars from "../assets/Review_Ribbon_small_16_0.png";
import halfStars from "../assets/Review_Ribbon_small_16_half.png";
// There was no one star png provided in the Yelp assets for some reason(?)
import oneAndHalfStars from "../assets/Review_Ribbon_small_16_2_1_half.png";
import twoStars from "../assets/Review_Ribbon_small_16_2.png";
import twoAndHalfStars from "../assets/Review_Ribbon_small_16_2_half.png";
import threeStars from "../assets/Review_Ribbon_small_16_3.png";
import threeAndHalfStars from "../assets/Review_Ribbon_small_16_3_half.png";
import fourStars from "../assets/Review_Ribbon_small_16_4.png";
import fourAndHalfStars from "../assets/Review_Ribbon_small_16_4_half.png";
import fiveStars from "../assets/Review_Ribbon_small_16_5.png";

// TypeScript types for this component's props
type VenuesProps = {
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

export default function Venues(props: VenuesProps) {
  let resultsList;
  if (props.isOnHomePage) {
    resultsList = props.venuesData.map(
      ({
        name,
        id,
        image_url,
        is_closed,
        rating,
        price,
        location: { city = "", address1 = "" } = {}, // see documentation.md
      }) => {
        return (
          <div key={id} className="venue-result-box box-shadow">
            <img
              src={`${image_url}`}
              loading="lazy"
              alt={`restaurant image for ${name}`}
            />
            <div className="venue-details">
              <h2>{name}</h2>
              <img
                alt={`${rating} star rating`}
                src={
                  rating < 0.5
                    ? zeroStars
                    : rating < 1
                    ? halfStars
                    : rating < 2
                    ? oneAndHalfStars
                    : rating < 2.5
                    ? twoStars
                    : rating < 3
                    ? twoAndHalfStars
                    : rating < 3.5
                    ? threeStars
                    : rating < 4
                    ? threeAndHalfStars
                    : rating < 4.5
                    ? fourStars
                    : rating < 5
                    ? fourAndHalfStars
                    : fiveStars
                }
              />
              <p>{is_closed ? "Closed" : "Open Now!"}</p>
              <p>{3} attending</p>
              <p>Price: {price}</p>
              <p>
                {address1}, {city}
              </p>
            </div>
            {props.userAuthed ? (
              props.venuesAttendingIds.includes(id) ? (
                <div className="venue-attending">
                  <p className="badge bg-green">You are attending</p>
                </div>
              ) : (
                <div className="venue-attending">
                  <p className="badge">You are not going</p>
                  <button
                    className="btn"
                    onClick={() => {
                      props.setVenuesAttendingIds((prevState) => [
                        ...prevState,
                        id,
                      ]);
                      props.setVenuesAttendingDetails((prevState) => {
                        const venueSelectDetails = {
                          name,
                          id,
                          image_url,
                          is_closed,
                          rating,
                          price,
                          location: { address1, city },
                        };
                        return [...prevState, venueSelectDetails];
                      });
                    }}
                  >
                    Add to Plan?
                  </button>
                </div>
              )
            ) : (
              <div className="venue-attending">
                <p className="badge">Login to add to plan</p>
              </div>
            )}
          </div>
        );
      }
    );
  } else {
    resultsList = props.venuesAttendingDetails.map(
      ({
        name,
        id,
        image_url,
        is_closed,
        rating,
        price,
        location: { city = "", address1 = "" } = {}, // see documentation.md
      }) => {
        return (
          <div key={id} className="venue-result-box box-shadow">
            <img
              src={`${image_url}`}
              loading="lazy"
              alt={`restaurant image for ${name}`}
            />
            <div className="venue-details">
              <h2>{name}</h2>
              <img
                alt={`${rating} star rating`}
                src={
                  rating < 0.5
                    ? zeroStars
                    : rating < 1
                    ? halfStars
                    : rating < 2
                    ? oneAndHalfStars
                    : rating < 2.5
                    ? twoStars
                    : rating < 3
                    ? twoAndHalfStars
                    : rating < 3.5
                    ? threeStars
                    : rating < 4
                    ? threeAndHalfStars
                    : rating < 4.5
                    ? fourStars
                    : rating < 5
                    ? fourAndHalfStars
                    : fiveStars
                }
              />
              <p>{is_closed ? "Closed" : "Open Now!"}</p>
              <p>{3} attending</p>
              <p>Price: {price}</p>
              <p>
                {address1}, {city}
              </p>
            </div>
            <div className="venue-attending">
              <button
                className="btn"
                onClick={() => {
                  props.setVenuesAttendingIds((prevState) => {
                    return prevState.filter((item) => item !== id);
                  });
                  props.setVenuesAttendingDetails((prevState) => {
                    return prevState.filter((item) => item.id !== id);
                  });
                }}
              >
                Remove from Plan?
              </button>
            </div>
          </div>
        );
      }
    );
  }
  return <>{resultsList}</>;
}