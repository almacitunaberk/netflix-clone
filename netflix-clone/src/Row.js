import React from "react";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
import { useState, useEffect } from "react";
import axios from "./axios";
import "./Row.css";

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [currentMovieId, setCurrentMovieId] = useState(-1);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

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

  const handleClick = (movie) => {
    if (currentMovieId === movie.id) {
      setTrailerUrl("");
      setCurrentMovieId(-1);
    } else {
      setCurrentMovieId(movie.id);
      movieTrailer(movie?.name || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className="row">
      {/* title */}
      <h2>{title}</h2>
      <div className="row-posters">
        {/* row posters */}
        {movies.map((movie) => (
          <img
            key={movie.id}
            onClick={() => handleClick(movie)}
            className={`row-poster ${isLargeRow && "row-poster-large"}`}
            key={movie.index}
            src={`${base_url}/${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;
