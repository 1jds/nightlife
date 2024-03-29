import { useEffect, useState } from "react";

// Types for this component
type NumberAttendingProps = {
  id: string;
  index: number;
};

const NumberAttending = (props: NumberAttendingProps) => {
  // Component State
  const [number, setNumber] = useState("0");

  // Component Logic
  useEffect(() => {
    setTimeout(() => {
      fetch(`/api/number-attending/${props.id}`)
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          }
          return Promise.reject(response);
        })
        .then((countData): void => {
          if (countData.countAttendeesSuccessful) {
            setNumber(countData.attendingCount);
          }
        });
    }, props.index * 500);
  }, [props.id]);

  // Component JSX
  return <p className="number-attending-tiny-component">{number} attending</p>;
};
export default NumberAttending;
