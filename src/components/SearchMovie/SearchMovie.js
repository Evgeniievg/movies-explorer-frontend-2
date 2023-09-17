import React from 'react';
import './SearchMovie.css'

export default function SearchMovie() {
  return (
    <section className='search-movie'>
      <form className='search-movie__form'>
        <input placeholder='Фильм' className='search-movie__input'/>
        <button className='search-movie__button'>Найти</button>
      </form>
    </section>
  )
}
