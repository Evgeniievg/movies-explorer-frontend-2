import React from 'react';
import './MoviesCard.css'
import movieCover from '../../images/movie-cover.jpg'

export default function MoviesCard({ title }) {
  return (
    <li className='movies-card'>
      <img src={movieCover} alt={title} className='movies-card__cover' />
      <p className='movies-card__title'>{title}</p>
      <button type='button' className='movies-card__button'/>
      <div className='movies-card__duration-container'>
        <span className='movies-card__duration'>1ч 42м</span>
      </div>
    </li>
  )
}
