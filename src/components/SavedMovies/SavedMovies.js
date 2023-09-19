import React from 'react';
import './SavedMovies.css';
import SearchMovie from '../SearchMovie/SearchMovie';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

export default function SavedMovies() {
  return (
    <main className='saved-movies'>
      <SearchMovie />
      <MoviesCardList />
    </main>
  )
}
