import React from 'react';
import './Movies.css';
import SearchMovie from '../SearchMovie/SearchMovie';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

export default function Movies() {
  return (
    <main className='movies'>
      <SearchMovie />
      <FilterCheckbox />
      <MoviesCardList />
    </main>
  )
}
