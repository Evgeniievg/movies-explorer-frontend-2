import React, { useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCard.css';
import mainApi from '../../utils/MainApi';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import formatMovieDuration from '../../utils/constants';

export default function MoviesCard({ movie, saveStatus }) {
  const location = useLocation();
  const { savedMovies, setSavedMovies } = useContext(CurrentUserContext);
  const [isLiked, setIsLiked] = useState(false);
  const [movieId, setMovieId] = useState('');

  useEffect(() => {
    setIsLiked(saveStatus.isSaved);
    setMovieId(saveStatus.id);
  }, [saveStatus]);

  const movieDataToSend = {
    country: movie.country,
    director: movie.director,
    duration: movie.duration,
    year: movie.year,
    description: movie.description,
    image: `https://api.nomoreparties.co/${movie.image.url}`,
    trailerLink: movie.trailerLink,
    nameRU: movie.nameRU,
    nameEN: movie.nameEN,
    thumbnail: `https://api.nomoreparties.co/${movie.thumbnail}`,
    movieId: movie.id
  };

  const isMovieSaved = savedMovies.some((savedMovie) => savedMovie.movieId === movie.id);

  const handleLikeClick = () => {
    if (isMovieSaved) {
      return;
    }

    mainApi
      .likeMovie(movieDataToSend)
      .then((likedMovie) => {
        setSavedMovies([...savedMovies, likedMovie.data]);
        setIsLiked(true);
      })
      .catch((error) => {
        console.error('Ошибка в сохранении фильма:', error);
      });
  };

  const handleDislikeClick = () => {
    mainApi
      .dislikeMovie(movieId)
      .then(() => {
        setSavedMovies(savedMovies.filter((data) => {
          return !(data._id === movieId);
        }));
        setIsLiked(false);
      })
      .catch((err) => console.log(err))
  };

  const formattedDuration = formatMovieDuration(movie.duration);

  return (
    <li className='movies-card'>
      <a href={movie.trailerLink} className='movies-card__link' target='_blank' rel='noreferrer'>
        <img
          src={location.pathname === '/movies' ? `https://api.nomoreparties.co/${movie.image.url}` : movie.image}
          alt={movie.nameRU}
          className='movies-card__cover'
        />
      </a>
      <div className='movies-card__container'>
        <p className='movies-card__title'>{movie.nameRU}</p>
        <button
          type='button'
          onClick={isLiked ? handleDislikeClick : handleLikeClick}
          className={`${location.pathname === '/saved-movies' ? 'movies-card__button movies-card__button_type_saved' : 'movies-card__button'} ${isLiked ? 'movies-card__button movies-card__button_type_liked' : 'movies-card__button'}`}
        />
      </div>
      <div className='movies-card__duration-container'>
        <span className='movies-card__duration'>{formattedDuration}</span>
      </div>
    </li>
  )
}
