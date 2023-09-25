import React, { useState, useEffect, useContext } from 'react';
import './SavedMovies.css';
import SearchMovie from '../SearchMovie/SearchMovie';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Preloader from '../Preloader/Preloader';

export default function SavedMovies() {
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isNotFound, setIsNotFound] = useState(false);
  const [isShortFilm, setIsShortFilm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { savedMovies } = useContext(CurrentUserContext);
  const [searchWord, setSearchWord] = useState('')

  useEffect(() => {
    setIsLoading(true);
    setFilteredMovies(savedMovies);
    handleSearchMovies(searchWord)
    setIsLoading(false);
  }, [savedMovies]);

  const handleSearchMovies = (keyword) => {
    if (!keyword) {
      return;
    }
    setSearchWord(keyword)
    setIsLoading(true);

    const filteredMovies = savedMovies.filter((movie) =>
      movie.nameRU.toLowerCase().includes(keyword.toLowerCase()) ||
      movie.nameEN.toLowerCase().includes(keyword.toLowerCase())
    );

    if (isShortFilm) {
      const shortMovies = filteredMovies.filter((movie) => movie.duration <= 40);
      setFilteredMovies(shortMovies);
    } else {
      setFilteredMovies(filteredMovies);
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
    }
  };

  return (
    <main className='saved-movies'>
      <SearchMovie
        notFound={isNotFound}
        handleNotFound={setIsNotFound}
        handleSearch={handleSearchMovies}
        onFilterChange={setIsShortFilm}
        shortFilm={isShortFilm}
        handleCheckbox={handleCheckbox}
      />
      {isLoading ? (
        <Preloader />
      ) : (
        <MoviesCardList movies={filteredMovies} />
      )}
    </main>
  );
}
