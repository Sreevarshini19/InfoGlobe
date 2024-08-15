// server/routes/movies.js
const express = require('express');
const { getUpcomingMovies } = require('../controllers/movieController');
const router = express.Router();
router.get('/upcoming-movies', getUpcomingMovies);
module.exports = router;
