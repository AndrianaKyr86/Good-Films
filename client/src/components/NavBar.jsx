import React, { useState, useEffect } from "react";
import "./NavBar.css";

export default function NavBar({ handleButtonClick }) {
  let [filmId, setFilmId] = useState("");

  // input box
  const handleInput = (event) => {
    setFilmId(event.target.value);

    // setFilmId((prevState) => value);
  };

  // I want to pass the filmId to the app.jsx using props and then use it in the getFilms function

  // submit film search button
  const handleClick = (event) => {
    event.preventDefault();
    handleButtonClick(filmId);
    // getFilms(filmId);
  };

  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand">Good Films 🎬</a>
        <a className="login" href="">
          Login
        </a>
        <a className="signup" href="">
          Sign Up
        </a>
        <form className="d-flex input-group w-auto" onSubmit={handleClick}>
          <input
            type="search"
            className="form-control rounded"
            placeholder="Search IMDB movie ID!"
            aria-label="Search"
            aria-describedby="search-addon"
            value={filmId}
            onChange={handleInput}
          />
          <button
            onClick={handleClick}
            type="submit"
            className="btn btn-outline-secondary"
          >
            Search
          </button>

          <span className="input-group-text border-0" id="search-addon">
            <i className="fas fa-search"></i>
          </span>
        </form>
      </div>
    </nav>
  );
}

NavBar.jsx;
