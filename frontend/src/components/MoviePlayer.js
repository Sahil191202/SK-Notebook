import React from "react";
import ReactPlayer from "react-player/youtube"; // Import the specific player for your source (e.g., YouTube)

const MoviePlayer = ({ videoUrl }) => {
  return (
    <div>
      <h2>Movie Player</h2>
      <ReactPlayer
        url={videoUrl} // Provide the URL to your movie (e.g., YouTube or other video source)
        controls={true} // Show player controls
        width="100%"
        height="400px" // Set the desired video player size
      />
    </div>
  );
};

export default MoviePlayer;
