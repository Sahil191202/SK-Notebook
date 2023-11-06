const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Movie = require("../models/Movie"); // Replace with the actual model name
const { body, validationResult } = require("express-validator");

// Endpoint to fetch all movies
router.get("/fetchallmovies", fetchuser, async (req, res) => {
  try {
    const movies = await Movie.find({}).sort({ date: -1 });
    res.json(movies);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some Error Occurred");
  }
});

// Endpoint to add a movie
router.post(
  "/addmovie",
  fetchuser,
  [
    body("title").isLength({ min: 1 }),
    body("overview").isLength({ min: 1 }),
    body("releaseDate").isISO8601(),
    // Add validation for other fields as needed
  ],
  async (req, res) => {
    try {
      const {
        title,
        overview,
        releaseDate,
        posterPath,
        backdropPath,
        genres,
        voteAverage,
        voteCount,
        tmdbId,
      } = req.body;
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const movie = new Movie({
        title,
        overview,
        releaseDate,
        posterPath,
        backdropPath,
        genres,
        voteAverage,
        voteCount,
        tmdbId,
      });

      const savedMovie = await movie.save();
      res.json(savedMovie);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some Error Occurred");
    }
  }
);

// Endpoint to delete a movie
router.delete("/deletemovie/:id", fetchuser, async (req, res) => {
  try {
    const movieId = req.params.id;
    const userId = req.user.id;

    const movie = await Movie.findById(movieId);

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    if (movie.user.toString() !== userId) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    await Movie.findByIdAndDelete(movieId);
    res.json({ message: "Movie deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some Error Occurred");
  }
});

module.exports = router;
