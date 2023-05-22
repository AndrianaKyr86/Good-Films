import "./App.css";
import React, { useState, useEffect } from "react";
import NavBar from "./components/NavBar";

function App() {
  let [movieDetails, setMovieDetails] = useState({});
  let [show, setShow] = useState(false);

  // saving backend
  let [myFilms, setMyFilms] = useState([
    { id: "", film_name: "", status: "", image_url: "", imdb_film_id: "" },
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

  return (
    <div className="margin">
      <div className="font">
        <NavBar handleButtonClick={getFilms} />

        {/* This is where the featured movie is displayed after inserting the id in the search on navbar and fetched from api */}
        <div className="container text-center">
          <div className="row">
            {show ? (
              <div className="col">
                {/* card to display movie details after search */}
                <div className="card" style={{ width: "25rem" }}>
                  <img
                    src={
                      "https://image.tmdb.org/t/p/w500" +
                      movieDetails.poster_path
                    }
                    className="card-img-top"
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

            <h5 className="watchedFilms">Watched Films</h5>

            {/* return my film db */}
            {myFilms.map((myFilm) => {
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
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

App.jsx;
