import "./App.css";
import React, { useState, useEffect } from "react";
import NavBar from "./components/NavBar";

function App() {
  let [movieDetails, setMovieDetails] = useState({});
  let [show, setShow] = useState(false);
  let [toggle, setToggle] = useState(true); // toggle between users
  let [favorite, setFavorite] = useState(false); // toggle between favorite and not favorite

  // saving backend
  let [myFilms, setMyFilms] = useState([
    {
      id: "",
      film_name: "",
      status: "",
      image_url: "",
      imdb_film_id: "",
      favorite: "",
    },
  ]);

  // fetching API
  const getFilms = (id) => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?language=en-US&api_key=7c3d5af7d049ad0656688c01e6f47e64`
    )
      .then((response) => response.json())
      .then((data) => {
        setMovieDetails(data);
        setShow(true); //set show to true to display the movie details
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addWatchList = async () => {
    console.log("added");
    let options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: movieDetails.title,
        url: movieDetails.poster_path,
        id: movieDetails.imdb_id,
      }),
    };
    try {
      let response = await fetch("/api", options);
      if (response.ok) {
        let movieData = await response.json(); // converts JSON to JavaScript for client/frontend
        setMyFilms(movieData);
      } else {
        // server error
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Network error: ${err.message}`);
    }
  };

  // use to render data from fetch
  useEffect(() => {
    getMyFilms();
  }, []);

  // fetching my films from backend
  const getMyFilms = () => {
    fetch("/api")
      .then((response) => response.json())
      .then((myFilms) => {
        // console.log(myFilms);
        setMyFilms(myFilms);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // I will need to create a function mark as favorite (add/remove from favorites) that will apply on the movies on the watchlist
  // I have edit the database and added a column for favorite with a default value of null
  // I will need to create a button that will change the value of the favorite column to true or false

  const markAsFavorite = async (id) => {
    console.log("favorite " + id);
    let options = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: id,
        favorite: true,
      }),
    };
    try {
      let response = await fetch(`/api/${id}`, options);
      if (response.ok) {
        let movieData = await response.json(); // converts JSON to JavaScript for client/frontend
        // setMyFilms(movieData);
        // mapping over the previous films using prevFilms.map, we find the film with the
        //matching IMDb ID (film.imdb_film_id === id). If found, we create a new film object using the
        //spread syntax ({ ...film }) and update its favorite property by negating the previous value (!film.favorite).
        //This way, each time the button is clicked, the favorite status will toggle, and the image will be updated accordingly.
        // With this update, clicking the button again should revert the image to its original state.
        setMyFilms((prevFilms) =>
          prevFilms.map((film) =>
            film.imdb_film_id === id
              ? { ...film, favorite: !film.favorite }
              : film
          )
        );
      } else {
        // server error
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Network error: ${err.message}`);
    }
  };

  return (
    <div className="margin">
      <div className="font">
        <NavBar handleButtonClick={getFilms} />
        <div className="intro">
          <h1>
            Welcome to Good Films, the ultimate destination for movie
            enthusiasts!
          </h1>
          <p>
            With Good Films, you can now embark on an exciting cinematic journey
            like never before. Just imagine a personalized space where you can
            effortlessly keep track of all the movies you've watched and
            cherished, all in one place.
          </p>
          <p>
            Inspired by the renowned Good Reads, our platform brings you an
            innovative way to curate your very own filmography. At the heart of
            Good Films lies our powerful search bar, your gateway to discovering
            and adding movies to your watch list. It's simple and intuitive to
            use. All you need is your IMDb ID, a unique identifier for each
            movie on IMDb. Enter your IMDb ID into the search bar, and voila!
            Instantly, you'll unlock a treasure trove of films that you can add
            to your watch list, ensuring you never miss a captivating cinematic
            gem again.
          </p>
          <p>
            Whether you're browsing through the filmographies of your favorite
            actors, exploring the vast array of genres, or discovering hidden
            cinematic gems, the search bar is your faithful companion on this
            exhilarating cinematic adventure. So go ahead, enter your IMDb ID,
            and let Good Films revolutionize the way you experience and cherish
            movies. Your film journey awaits, ready to be captured and
            celebrated. Welcome to Good Films, where movies come alive!
          </p>
        </div>

        {/* This is where the featured movie is displayed after inserting the id in the search on navbar and fetched from api */}
        <div className="container text-center">
          <div className="row">
            {show ? (
              <div className="col">
                {/* card to display movie details after search */}
                <div className="resultCard">
                  <img
                    className="card-img-top"
                    src={
                      "https://image.tmdb.org/t/p/w500" +
                      movieDetails.poster_path
                    }
                  />
                  <div className="card-body">
                    <h5 className="card-title">{movieDetails.title}</h5>
                    <p className="card-text">{movieDetails.tagline}</p>
                    <p className="card-text">{movieDetails.overview}</p>
                    <p className="card-text">{movieDetails.vote_average}</p>
                    <p className="card-text">{movieDetails.runtime}</p>

                    <a>
                      {/* conditionally render button when movie data is submitted */}
                      <button
                        onClick={addWatchList}
                        type="button"
                        className="btn btn-outline-secondary"
                      >
                        Add to my films
                      </button>
                    </a>
                  </div>

                  <div className="col"></div>
                  <div className="col"></div>
                </div>
              </div>
            ) : null}

            {/* Here is the section where the watched films are displayed */}
            {/* <h5 className="watchedFilms">Watched Films</h5> */}
            {/* return my film db */}
            {/* {myFilms.map((myFilm) => {
              return (
                <div key={myFilm.id}>
                  <div className="card" style={{ width: "18rem" }}>
                    <img
                      src={"https://image.tmdb.org/t/p/w500" + myFilm.image_url}
                      className="card-img-top"
                      alt=""
                    />
                  </div>
                </div>
              );
            })} */}

            {/* Here we are placing the toggle button  */}
            <div className="toggleButton">
              {/* Here is the section where the watched films are displayed */}
              {toggle ? (
                <>
                  <div className="container">
                    <h5 className="watchedFilms">Watched Films</h5>
                    {/* return my film db */}
                    {myFilms.map((myFilm) => {
                      return (
                        // <div className="media-scroller snaps-inline">
                        <div key={myFilm.id}>
                          {/* <div className="media-scroller snaps-inline"> */}
                          <div className="media-element">
                            <img
                              src={
                                "https://image.tmdb.org/t/p/w500" +
                                myFilm.image_url
                              }
                              alt=""
                            />
                          </div>
                          {/* </div> */}

                          <button
                            className="btn-56"
                            onClick={() => markAsFavorite(myFilm.imdb_film_id)}
                          >
                            {myFilm.favorite ? (
                              <img
                                src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkvLX4Jb3rmOuc6fGBpcloC_ZqhzAWzOHTVw&usqp=CAU`}
                                alt="heart"
                                className="fullHeart"
                              />
                            ) : (
                              <img
                                src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnJOenO0JjV_hKA8tT3cGhSe0lhRcyygsY3w&usqp=CAU`}
                                alt="heart"
                                className="emptyHeart"
                              />
                            )}
                            Favorite
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </>
              ) : null}

              {/* on the otherwise null I can have an alternative text or image to show */}
            </div>

            <div className="changeview">
              <button
                className="glowing-btn"
                onClick={() => setToggle(!toggle)}
              >
                <span className="glowing-txt">
                  My <span className="faulty-letter"> F</span>ilms
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

App.jsx;
