import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './SearchMovie.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

export default function SearchMovie({
  handleSearch,
  notFound,
  onFilterChange,
  handleNotFound,
  shortFilm,
  isError
  }) {
  const location = useLocation();
  const [error, setError] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [savedMoviesInputValue, setSavedMoviesInputValue] = useState('');

  const errorTextClass = `${error ? 'search-movie__error-text' : 'search-movie__error-text_type_disabled'}`;
  const notFoundTextClass = `${notFound ? 'search-movie__error-text' : 'search-movie__error-text_type_disabled'}`;

  useEffect(() => {
    const savedInputValue = localStorage.getItem('inputValue');
    if(savedInputValue){
      setInputValue(savedInputValue)
    }
  }, [])

  const handleInput = (event) => {
    setInputValue(event.target.value);
    setSavedMoviesInputValue(event.target.value)
  }

  useEffect(() => {
    if(location.pathname === '/movies'){
      handleSearch(inputValue);
    }
    else {
      handleSearch(savedMoviesInputValue, shortFilm);

    }
  }, [shortFilm]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!inputValue) {
      setError(true);
      handleNotFound(false)
    } else {
      setError(false);
      handleSearch(inputValue);
      if(location.pathname === '/movies') {
        localStorage.setItem('inputValue', inputValue)
      }
    }
  }

  return (
    <section className='search-movie'>
      <form className='search-movie__form' onSubmit={handleSubmit}>
        <div className='search-movie__content'>
          <input onChange={handleInput} value={location.pathname === '/movies' ? inputValue : savedMoviesInputValue} placeholder='Фильм' className='search-movie__input'/>
          <button type='submit' className='search-movie__button'>Найти</button>
        </div>
        <FilterCheckbox handleSearch={handleSearch} onChange={onFilterChange} />
        <span className={errorTextClass}>Нужно ввести ключевое слово</span>
        <span className={notFoundTextClass}>Ничего не найдено</span>
        {isError ?
          <span className='search-movie__error-text'>Во время запроса произошла ошибка.
          Возможно, проблема с соединением или сервер недоступен.
          Подождите немного и попробуйте ещё раз</span>
          : ''
        }
      </form>
    </section>
  );
}
