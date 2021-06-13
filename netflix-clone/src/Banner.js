import React from "react";
import { useState, useEffect } from "react";
import axios from "./axios";
import requests from "./requests";

function Banner() {
  const [movie, setMovie] = useState([]);

  // We want the useEffect to run for once when it loads and stay the same afterward.
  // If the user refreshes the page, useEffect will be invoked again and the displayed movie will change
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
    }
    fetchData();
  }, []);
  return (
    <header>
      {" "}
      {/* <<< Background image */}
      {/* title */}
      {/* div > 2 buttons */}
      {/* description */}
    </header>
  );
}

export default Banner;
