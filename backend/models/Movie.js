const mongoose = require("mongoose");
const { Schema } = mongoose;

const MovieSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  overview: {
    type: String,
    required: true,
  },
  releaseDate: {
    type: Date,
    required: true,
  },
  posterPath: {
    type: String,
  },
  backdropPath: {
    type: String,
  },
  genres: {
    type: [String], // You can store an array of genre names
  },
  voteAverage: {
    type: Number,
  },
  voteCount: {
    type: Number,
  },
  tmdbId: {
    type: Number, // Store the TMDb movie ID
    unique: true,
    required: true,
  },
  // Add more fields as needed for your application
  // For example, you can add fields to store cast, crew, and other movie details.
  // You can also add user-specific fields if you want to associate movies with users.
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Movie", MovieSchema);
