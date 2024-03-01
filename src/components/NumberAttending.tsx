import { useEffect, useState } from "react";

type NumberAttendingProps = {
  id: string;
};

const NumberAttending = (props: NumberAttendingProps) => {
  // Component State
  const [number, setNumber] = useState("0");

  // Component Logic
  useEffect(() => {
    console.log(
      "This is the useEffect for NumberAttending tiny component firing..."
    );
    fetch(`/api/number-attending/${props.id}`)
      .then((response) => {
        console.log(
          "The response status for Number Attending tiny component... : ",
          response.status
        );
        if (response.status === 200) {
          return response.json();
        }
        return Promise.reject(response);
      })
      .then((countData): void => {
        console.log(
          "This is the count data for the NumberAttending tiny component... :",
          countData
        );
        if (countData.countAttendeesSuccessful) {
          setNumber(countData.attendingCount);
        }
      });
  }, [props.id]);

  // Component JSX
  return <p className="number-attending-tiny-component">{number} attending</p>;
};
export default NumberAttending;
