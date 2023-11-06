import React from "react";

const baseImageUrl = "https://image.tmdb.org/t/p/w500"; // TMDb's base image URL

const MoviePoster = ({ posterPath }) => {
  const imageUrl = `${baseImageUrl}${posterPath}`;

  return <img src={imageUrl} alt="Movie Poster" />;
};

export default MoviePoster;
