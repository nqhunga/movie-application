const express = require('express');
const path = require('path');
const app = express();
const request = require('request-promise');
const port = process.env.PORT || 3000;
require('dotenv').load();

const SEARCH_MOVIE_URL = 'https://api.themoviedb.org/3/search/movie?';
const DISCOVER_MOVIE_URL = 'https://api.themoviedb.org/3/discover/movie?';
const MOVIE_DETAIL_URL = 'https://api.themoviedb.org/3/movie/';
const SEARCH_PERSON_URL = 'https://api.themoviedb.org/3/search/person?';
const PERSON_DETAIL_URL = 'https://api.themoviedb.org/3/person/';
const GENRE_DETAIL_URL = 'https://api.themoviedb.org/3/genre/movie/list?';
const POSTER_URL = 'https://image.tmdb.org/t/p/w500/';

app.use('/', express.static(path.join(__dirname, '..', 'build')));
app.get('/search-movie/:movieName', (req, res) => {
  request(`${SEARCH_MOVIE_URL}api_key=${process.env.SECRET_KEY}&query=${req.params.movieName}&language=en-US`)
    .then((data) => {
      const result = JSON.parse(data);
      res.status(200).send(result);
    })
    .catch((err) => {
      console.log(err);
    })
});
app.get('/discover-movie/:sortBy', (req, res) => {
  request(`${DISCOVER_MOVIE_URL}api_key=${process.env.SECRET_KEY}&language=en-US&sort_by=${req.params.sortBy}&page=1`)
    .then((data) => {
      const result = JSON.parse(data);
      res.status(200).send(result);
    })
    .catch((err) => {
      console.log(err);
    })
});
app.get('/movie-detail/:movieID', (req, res) => {
  request(`${MOVIE_DETAIL_URL}${req.params.movieID}?api_key=${process.env.SECRET_KEY}&language=en-US`)
    .then((data) => {
      const result = JSON.parse(data);
      res.status(200).send(result);
    })
    .catch((err) => {
      console.log(err);
    })
});
app.get('/movie-credit/:movieID', (req, res) => {
  request(`${MOVIE_DETAIL_URL}${req.params.movieID}/credits?api_key=${process.env.SECRET_KEY}`)
    .then((data) => {
      const result = JSON.parse(data);
      res.status(200).send(result);
    })
    .catch((err) => {
      console.log(err);
    })
});
app.get('/search-person/:personName', (req, res) => {
  request(`${SEARCH_PERSON_URL}api_key=${process.env.SECRET_KEY}&query=${req.params.personName}&language=en-US`)
    .then((data) => {
      const result = JSON.parse(data);
      res.status(200).send(result);
    })
    .catch((err) => {
      console.log(err);
    })
});
app.get('/person-detail/:personID', (req, res) => {
  request(`${PERSON_DETAIL_URL}${req.params.personID}?api_key=${process.env.SECRET_KEY}&language=en-US`)
    .then((data) => {
      const result = JSON.parse(data);
      res.status(200).send(result);
    })
    .catch((err) => {
      console.log(err);
    })
});
app.get('/genre/', (req, res) => {
  request(`${GENRE_DETAIL_URL}api_key=${process.env.SECRET_KEY}&language=en-US`)
    .then((data) => {
      const result = JSON.parse(data);
      res.status(200).send(result);
    })
    .catch((err) => {
      console.log(err);
    })
});
app.get('/trailer/:movieID', (req, res) => {
  request(`${MOVIE_DETAIL_URL}${req.params.movieID}/videos?api_key=${process.env.SECRET_KEY}&language=en-US`)
    .then((data) => {
      const result = JSON.parse(data);
      res.status(200).send(result);
    })
    .catch((err) => {
      console.log(err);
    })
});


app.listen(port, () => console.log('Example app listening on port', port, '! '));