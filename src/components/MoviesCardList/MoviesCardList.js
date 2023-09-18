import React, { useState } from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

export default function MoviesCardList() {
  const initialCardCount = 33;
  const increment = 16;
  const [visibleCardCount, setVisibleCardCount] = useState(increment);

  const cardElements = [];
  for (let i = 0; i < visibleCardCount; i++) {
    cardElements.push(<MoviesCard key={i} />);
  }

  const loadMore = () => {
    const nextVisibleCount = visibleCardCount + increment;
    setVisibleCardCount(nextVisibleCount <= initialCardCount ? nextVisibleCount : initialCardCount);
  };

  return (
    <div className='movies-list'>
      <ul className='movies-list__cards'>{cardElements}</ul>
      {visibleCardCount < initialCardCount && (
        <button type='button' className="movies-list__button" onClick={loadMore}>
          Еще
        </button>
      )}
    </div>
  );
}
