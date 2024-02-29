import { useEffect, useState } from "react";

type NumberAttendingProps = {
  id: string;
};

const NumberAttending = (props: NumberAttendingProps) => {
  // Component State
  const [number, setNumber] = useState(5);

  // Component Logic
  useEffect(() => {
    fetch("/api/number-attending", {
      method: "GET",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(props.id),
    })
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
        console.log(countData);
        if (countData.countAttendeesSuccessful) {
          setNumber(countData.attendingCount);
        }
      });
  }, [props.id]);

  // Component JSX
  return <p className="number-attending-tiny-component">{number} attending</p>;
};
export default NumberAttending;
