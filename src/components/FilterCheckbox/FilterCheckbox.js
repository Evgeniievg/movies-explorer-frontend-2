import React, { useState, useEffect } from 'react';
import './FilterCheckbox.css';

export default function FilterCheckbox({ onChange }) {
  const [isChecked, setIsChecked] = useState(false);

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
    onChange(newCheckedValue);
    localStorage.setItem('isChecked', newCheckedValue.toString());
  };

  return (
    <div className='filter-checkbox'>
      <label>
        <input
          type="checkbox"
          className="filter-checkbox__input"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
      </label>
      <span className='filter-checkbox__title'>Короткометражки</span>
    </div>
  );
}
