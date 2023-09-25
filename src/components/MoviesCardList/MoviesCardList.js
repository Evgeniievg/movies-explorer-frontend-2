import React, { useState, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { calculateVisibleCardCount } from '../../utils/constants';
import { calculateMoreMovies } from '../../utils/constants';

export default function MoviesCardList({ movies }) {
  const initialCardCount = movies.length;
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

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

  const cardElements = movies
    .slice(0, location.pathname === '/movies' ? visibleCardCount : movies.length)
    .map((movie, index) => (
      location.pathname === '/movies' ? (
        <MoviesCard saveStatus={checkIsSaved(movie)} key={index} movie={movie} />
      ) : (
        <MoviesCard saveStatus={{ isSaved: true, id: movie._id }} key={index} movie={movie} />
      )
    ));


  const loadMore = () => {
    const nextVisibleCount = visibleCardCount + calculateMoreMovies(windowWidth);

    setVisibleCardCount(nextVisibleCount <= initialCardCount ? nextVisibleCount : initialCardCount);
  };

  return (
    <section className='movies-list'>
      <ul className='movies-list__cards'>{cardElements}</ul>
      {location.pathname === '/movies' && visibleCardCount < initialCardCount && (
        <button type='button' className="movies-list__button" onClick={loadMore}>
          Еще
        </button>
      )}
    </section>
  );
}
