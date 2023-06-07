"use client";

import moment from "moment";
import { useEffect, useState } from "react";

const Clock = () => {
  const [date, setDate] = useState(() => moment());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDate(() => moment());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return <>{`${date.format("ddd MMM D")}\xa0\xa0${date.format("h:mm A")}`}</>;
};

export default Clock;
