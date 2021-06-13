import React from "react";
import { useState, useEffect } from "react";
import axios from "./axios";
import "./Row.css";

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // if [] is empty, run once when the row loads first and dont run it again
    // if [movies], then it will run every time the moveis variable changes
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
    // If you use a variable inside your useEffect function like fetchUrl in this case,
    //    you have to add that variable to your dependencies because if that variable changes
    //    you should re-invoke the method in the useEffect
  }, [fetchUrl]);

  // You can use console.table for crazy table looking
  // console.table(movies);

  return (
    <div className="row">
      {/* title */}
      <h2>{title}</h2>
      <div className="row-posters">
        {/* row posters */}
        {movies.map((movie) => (
          <img
            key={movie.id}
            className={`row-poster ${isLargeRow && "row-poster-large"}`}
            key={movie.index}
            src={`${base_url}/${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
    </div>
  );
}

export default Row;
