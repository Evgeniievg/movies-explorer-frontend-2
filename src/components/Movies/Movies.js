import React, { useState, useEffect } from 'react';
import SearchMovie from '../SearchMovie/SearchMovie';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import moviesApi from '../../utils/MoviesApi';
import Preloader from '../Preloader/Preloader';

export default function Movies() {
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isNotFound, setIsNotFound] = useState(false);
  const [isShortFilm, setIsShortFilm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    const isChecked = localStorage.getItem('isChecked');
    setIsShortFilm(isChecked === 'true');
  }, []);

  useEffect(() => {
    const savedSearchResults = localStorage.getItem('searchResults');
    const savedShortFilm = localStorage.getItem('shortMovies');

    if (savedSearchResults) {
      setFilteredMovies(JSON.parse(savedSearchResults));
    }

    if (savedShortFilm) {
      setFilteredMovies(JSON.parse(savedShortFilm));
    }
  }, []);

  const handleSearchMovies = (keyword) => {
    if (!keyword) {
      return;
    }
    setIsLoading(true);

    moviesApi.getMovies()
      .then((data) => {
        const filteredMovies = data.filter((movie) =>
          movie.nameRU.toLowerCase().includes(keyword.toLowerCase()) ||
          movie.nameEN.toLowerCase().includes(keyword.toLowerCase())
        );

        if (isShortFilm) {
          const shortMovies = filteredMovies.filter((movie) => movie.duration <= 40);
          setFilteredMovies(shortMovies);
          localStorage.setItem('shortMovies', JSON.stringify(shortMovies));
          localStorage.removeItem('searchResults');
        } else {
          setFilteredMovies(filteredMovies);
          localStorage.removeItem('shortMovies');
          localStorage.setItem('searchResults', JSON.stringify(filteredMovies));
        }

        if (filteredMovies.length === 0) {
          setIsNotFound(true);
        } else {
          setIsNotFound(false);
        }
      })
      .catch(() => {
        setIsError(true)
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <main className='movies'>
      <SearchMovie
        notFound={isNotFound}
        handleNotFound={setIsNotFound}
        handleSearch={handleSearchMovies}
        onFilterChange={setIsShortFilm}
        shortFilm={isShortFilm}
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
