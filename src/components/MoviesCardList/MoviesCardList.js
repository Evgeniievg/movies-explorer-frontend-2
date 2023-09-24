import React, { useState, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

export default function MoviesCardList({ movies }) {
  const initialCardCount = movies.length;
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const calculateVisibleCardCount = (width) => {
    if (width >= 1280) {
      return 16;
    } else if (width >= 768 && width < 1280) {
      return 9;
    } else if (width < 768 && width >= 550) {
      return 8;
    } else {
      return 5;
    }
  };
  const [visibleCardCount, setVisibleCardCount] = useState(calculateVisibleCardCount(windowWidth));
  const { savedMovies } = useContext(CurrentUserContext);
  const location = useLocation();

  const handleResizeWindow = () => {
    const newWindowWidth = window.innerWidth;
    setWindowWidth(newWindowWidth);
    setVisibleCardCount(calculateVisibleCardCount(newWindowWidth));
  };

  useEffect(() => {
    window.addEventListener('resize', handleResizeWindow);
    return () => {
      window.removeEventListener('resize', handleResizeWindow);
    };
  }, []);

  const checkIsSaved = (movie) => {
    const targetMovie = savedMovies.find((film) => film.movieId === movie.id);
    return targetMovie
      ? { isSaved: true, id: targetMovie._id }
      : { isSaved: false, id: '' };
  };

  const cardElements = movies.slice(0, visibleCardCount).map((movie, index) => (
    location.pathname === '/movies' ? (
      <MoviesCard saveStatus={checkIsSaved(movie)} key={index} movie={movie} />
    ) : (
      <MoviesCard saveStatus={{ isSaved: true, id: movie._id }} key={index} movie={movie} />
    )
  ));

  const calculateMoreMovies = (width) => {
    if (width >= 1280) {
      return 4;
    } else if (width >= 768 && width < 1280) {
      return 3;
    } else if (width < 768 && width >= 550) {
      return 2;
    } else {
      return 2;
    }
  };

  const loadMore = () => {
    const nextVisibleCount = visibleCardCount + calculateMoreMovies(windowWidth);

    console.log()
    setVisibleCardCount(nextVisibleCount <= initialCardCount ? nextVisibleCount : initialCardCount);
  };

  return (
    <section className='movies-list'>
      <ul className='movies-list__cards'>{cardElements}</ul>
      {visibleCardCount < initialCardCount && (
        <button type='button' className="movies-list__button" onClick={loadMore}>
          Еще
        </button>
      )}
    </section>
  );
}
