import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import MoviePlayer from "./MoviePlayer"; // Import your MoviePlayer component
import MoviePoster from "./MoviePoster";

const apiKey = "8b34636b662aafc4467e1cbec2614895"; 

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok");
      })
      .then((data) => {
        setMovies(data.results);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="App">
      <h1>Popular Movies</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {movies.map((movie) => (
            <li key={movie.id}>
              <h2>{movie.title}</h2>
              <p>{movie.overview}</p>
              <MoviePoster posterPath={movie.poster_path} />
              {/* <MoviePlayer */}
                {/* // videoUrl={`https://www.youtube.com/watch?v=945729${movie.id}`} */}
              {/* // /> */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
