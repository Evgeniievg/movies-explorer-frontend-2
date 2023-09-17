import React from 'react';
import './MoviesCard.css'
import movieCover from '../../images/movie-cover.jpg'

export default function MoviesCard() {
  return (
    <div className='movies-card'>
      <img src={movieCover} className='movies-card__cover' />
      <p className='movies-card__title'>33 слова о дизайне</p>
      <button className='movies-card__button'/>
      <div className='movies-card__duration-container'>
        <span className='movies-card__duration'>1ч 42м</span>
      </div>
    </div>
  )
}
