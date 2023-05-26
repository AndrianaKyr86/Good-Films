var express = require("express");
var router = express.Router();

const db = require("../model/helper");

// To QUERY a film in db
router.get("/", function (req, res, next) {
  db("SELECT * FROM my_films;")
    .then((results) => {
      res.send(results.data);
    })
    .catch((err) => res.status(500).send(err));
});

// To SAVE a film into db
router.post("/", function (req, res, next) {
  let filmName = req.body.name;
  let url = req.body.url;
  let imdbFilmId = req.body.id;
  let favorite = req.body.favorite;
  console.log(imdbFilmId);
  db(
    `insert INTO my_films (film_name, image_url, imdb_film_id, favorite) VALUES ("${filmName}", "${url}", "${imdbFilmId}, ${favorite}");`
  )
    .then((results) => db("SELECT * FROM my_films;"))
    .then((results2) => {
      res.send(results2.data);
    })
    .catch((err) => res.status(500).send(err));
});

//Here I want to have the router.put that takes the imbdFilmId and
//changes the favorite from true to false and the other way around when the button will be clicked

router.put("/:id", function (req, res, next) {
  let imdbFilmId = req.params.id;
  let favorite = req.body.favorite;
  console.log(imdbFilmId);
  db(
    `UPDATE my_films SET favorite = ${favorite} WHERE imdb_film_id = "${imdbFilmId}";`
  )
    .then((results) => db("SELECT * FROM my_films;"))
    .then((results2) => {
      res.send(results2.data);
    })
    .catch((err) => res.status(500).send(err));
});

module.exports = router;
