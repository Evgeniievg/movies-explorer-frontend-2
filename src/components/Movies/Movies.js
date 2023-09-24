import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SearchMovie from '../SearchMovie/SearchMovie';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import moviesApi from '../../utils/MoviesApi';
import Preloader from '../Preloader/Preloader';

export default function Movies() {
  const [allMovies, setAllMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isNotFound, setIsNotFound] = useState(false);
  const [isShortFilm, setIsShortFilm] = useState(false);
  const [originalFilms, setOriginalFilms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false)
  const location = useLocation();

  useEffect(() => {

    const savedSearchResults = localStorage.getItem('searchResults');
    const savedIsShortFilm = localStorage.getItem('isShortFilm');

    if (savedSearchResults) {
      setFilteredMovies(JSON.parse(savedSearchResults));
    }

    if (savedIsShortFilm) {
      setIsShortFilm(JSON.parse(savedIsShortFilm));
    }

    moviesApi.getMovies()
      .then((data) => {
        setAllMovies(data);
      })
      .catch(() => {
        setIsError(true)
      });
  }, []);

  const handleSearchMovies = (keyword) => {
    if (!keyword) {
      return;
    }

    setIsLoading(true);

    const filteredMovies = allMovies.filter((movie) =>
      movie.nameRU.toLowerCase().includes(keyword.toLowerCase()) ||
      movie.nameEN.toLowerCase().includes(keyword.toLowerCase())
    );

      localStorage.setItem('searchResults', JSON.stringify(filteredMovies));
      localStorage.setItem('isShortFilm', JSON.stringify(isShortFilm));

    if (isShortFilm) {
      const shortMovies = filteredMovies.filter((movie) => movie.duration <= 40);
      setFilteredMovies(shortMovies);
    } else {
      setFilteredMovies(filteredMovies);
      setOriginalFilms(filteredMovies);
    }

    if (filteredMovies.length === 0) {
      setIsNotFound(true);
    } else {
      setIsNotFound(false);
    }

    setIsLoading(false);
  };

  const handleCheckbox = () => {
    if (isShortFilm) {
      const shortMovies = filteredMovies.filter((movie) => movie.duration <= 40);
      setFilteredMovies(shortMovies);
    } else {
      setFilteredMovies(originalFilms);
    }
  };

  return (
    <main className='movies'>
      <SearchMovie
        notFound={isNotFound}
        handleNotFound={setIsNotFound}
        handleSearch={handleSearchMovies}
        onFilterChange={setIsShortFilm}
        shortFilm={isShortFilm}
        handleCheckbox={handleCheckbox}
        isError={isError}
      />
      {isLoading ? (
        <Preloader />
      ) : (
        <MoviesCardList movies={filteredMovies} />
      )}
    </main>
  );
}
