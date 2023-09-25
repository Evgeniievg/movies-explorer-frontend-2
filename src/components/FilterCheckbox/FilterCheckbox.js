import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './FilterCheckbox.css';

export default function FilterCheckbox({ onChange, handleSearch }) {
  const [isChecked, setIsChecked] = useState(false);
  const [isSavedMoviesChecked, setIsSavedMoviesChecked] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const savedCheckbox = localStorage.getItem('isChecked');
    if (savedCheckbox === 'true') {
      setIsChecked(true);
    } else {
      setIsChecked(false);
    }

  }, []);

  const handleCheckboxChange = () => {
    const newCheckedValue = !isChecked;
    setIsChecked(newCheckedValue);
    setIsSavedMoviesChecked(newCheckedValue)
    onChange(newCheckedValue);
    if(location.pathname === '/movies') {
      localStorage.setItem('isChecked', newCheckedValue.toString())
    } else {
      handleSearch('', newCheckedValue);
    }
  };

  return (
    <div className='filter-checkbox'>
      <label>
        <input
          type="checkbox"
          className="filter-checkbox__input"
          checked={location.pathname === '/movies' ? isChecked : isSavedMoviesChecked}
          onChange={handleCheckboxChange}
        />
      </label>
      <span className='filter-checkbox__title'>Короткометражки</span>
    </div>
  );
}
