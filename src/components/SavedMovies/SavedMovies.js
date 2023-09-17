import React from 'react';
import './SavedMovies.css';
import SearchMovie from '../SearchMovie/SearchMovie';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

export default function SavedMovies() {
  return (
    <main className='saved-movies'>
      <SearchMovie />
      <FilterCheckbox />
    </main>
  )
}
