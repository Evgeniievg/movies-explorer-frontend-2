import React from 'react';
import './Movies.css';
import SearchMovie from '../SearchMovie/SearchMovie';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

export default function Movies() {
  return (
    <main className='movies'>
      <SearchMovie />
      <MoviesCardList />
    </main>
  )
}
