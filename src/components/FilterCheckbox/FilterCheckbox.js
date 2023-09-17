import React from 'react';
import './FilterCheckbox.css';

export default function FilterCheckbox() {
  return (
    <section className='filter-checkbox'>
      <label>
        < input type="checkbox" className="filter-checkbox__input" />
      </label>
      <span className='filter-checkbox__title'>Короткометражки</span>
    </section>
  )
}
