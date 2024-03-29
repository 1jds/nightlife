import React, { useState, useEffect } from "react";
import LoadingDots from "./LoadingDots";
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
import NumberAttending from "./NumberAttending";

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
};

export default function Venues(props: VenuesProps) {
  // Component state
  const [resultsList, setResultsList] = useState<JSX.Element[] | null>(null);
  const [venuesAttendingList, setVenuesAttendingList] = useState<
    JSX.Element[] | null
  >(null);
  const [venuesAttendingDetails, setVenuesAttendingDetails] = useState<any[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);

  // Component functionality
  const handleVenueAttendingAdd = async (id: string): Promise<boolean> => {
    try {
      const venueAttendingJsonData = JSON.stringify({
        venueYelpId: id,
        userId: props.userAuthed?.userId,
      });
      const response = await fetch("/api/venues-attending", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: venueAttendingJsonData,
      });
      if (response.status === 200) {
        const data = await response.json();
        return data.insertSuccessful;
      } else {
        console.error("Error fetching data: ", response);
        return false;
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
      return false;
    }
  };

  const handleVenueAttendingRemove = async (id: string): Promise<boolean> => {
    try {
      const venueAttendingJsonData = JSON.stringify({
        venueYelpId: id,
        userId: props.userAuthed?.userId,
      });
      const response = await fetch("/api/venue-remove", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: venueAttendingJsonData,
      });
      if (response.status === 200) {
        const data = await response.json();
        return data.removeSuccessful;
      } else {
        console.error("Error fetching data: ", response);
        return false;
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
      return false;
    }
  };

  useEffect(() => {
    if (props.isOnHomePage) {
      setResultsList(
        props.venuesData.map(
          (
            {
              name,
              id,
              image_url,
              rating,
              price,
              location: { city = "", address1 = "" } = {}, // see documentation.md
            },
            index
          ) => {
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
                  <p>"Open Now!"</p>
                  <NumberAttending id={id} index={index} />
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
                        onClick={async () => {
                          const isSuccess = await handleVenueAttendingAdd(id);
                          if (isSuccess) {
                            props.setVenuesAttendingIds((prevState) => [
                              ...prevState,
                              id,
                            ]);
                          }
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
        )
      );
    }
  }, [props.isOnHomePage, props.venuesData, props.venuesAttendingIds]);

  useEffect(() => {
    if (!props.isOnHomePage) {
      const populateResultsAsync = async (arr: string[]) => {
        for (let i = 0; i < arr.length; i += 3) {
          const receivedData = await Promise.all(
            arr.slice(i, i + 3).map(async (id) => {
              const url = `/api/get-venues-attending/${id}`;
              const options = {
                method: "GET",
                headers: {
                  accept: "application/json",
                },
              };
              try {
                const response = await fetch(url, options);
                if (!response.ok) {
                  throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                if (data) {
                  return data;
                } else {
                  return null;
                }
              } catch (error) {
                console.error("Error fetching data:", error);
              }
            })
          );
          await new Promise((resolve) => setTimeout(resolve, 2500)); // The Yelp API is rate-limited for requests at about 5/s.
          setVenuesAttendingDetails((prevState) => [
            ...prevState,
            ...receivedData,
          ]);
        }
        setIsLoading(false);
      };
      populateResultsAsync(props.venuesAttendingIds);
    }
  }, [props.isOnHomePage]);

  useEffect(() => {
    setVenuesAttendingList(
      venuesAttendingDetails.map(
        (
          {
            name,
            id,
            image_url,
            rating,
            price,
            location: { city = "", address1 = "" } = {}, // see documentation.md
          },
          index
        ) => {
          if (!name) {
            return <></>;
          }

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
                <p>"Open Now!"</p>
                <NumberAttending id={id} index={index} />
                <p>Price: {price}</p>
                <p>
                  {address1}, {city}
                </p>
              </div>
              <div className="venue-attending">
                <button
                  className="btn"
                  onClick={async () => {
                    const isRemoveSuccess = await handleVenueAttendingRemove(
                      id
                    );
                    if (isRemoveSuccess) {
                      props.setVenuesAttendingIds((prevState) => {
                        return prevState.filter((item) => item !== id);
                      });
                      setVenuesAttendingDetails((prevState) => {
                        return prevState.filter((item) => item.id !== id);
                      });
                    }
                  }}
                >
                  Remove from Plan?
                </button>
              </div>
            </div>
          );
        }
      )
    );
  }, [venuesAttendingDetails]);

  // Return JSX
  return (
    <>
      {props.isOnHomePage ? resultsList : venuesAttendingList}
      {props.isOnHomePage == false && isLoading ? <LoadingDots /> : null}
    </>
  );
}
