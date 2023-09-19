import React from 'react';
import './SearchMovie.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

export default function SearchMovie() {
  return (
    <section className='search-movie'>
      <form className='search-movie__form'>
        <div className='search-movie__content'>
          <input required placeholder='Фильм' className='search-movie__input'/>
          <button type='submit' className='search-movie__button'>Найти</button>
        </div>
        <FilterCheckbox />
      </form>
    </section>
  )
}
