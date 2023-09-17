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
    <section className='movies-list'>
      <div className='movies-list__cards'>{cardElements}</div>
      {visibleCardCount < initialCardCount && (
        <button className="movies-list__button" onClick={loadMore}>
          Еще
        </button>
      )}
    </section>
  );
}
