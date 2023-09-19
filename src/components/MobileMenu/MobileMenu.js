import React from 'react';
import { Link } from 'react-router-dom';
import './MobileMenu.css';
import profileIcon from '../../images/profile-icon.svg';


export default function MobileMenu({ isOpen, onClose }) {
  const isActive = (path) => {
    return window.location.pathname === path ? 'active' : '';
  };

  return (
    <div className={`overlay ${isOpen ? 'activated' : ''}`}>
      <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
        <button type='button' className='mobile-menu__close-button' onClick={onClose}></button>
        <nav className='mobile-menu__links'>
          <Link to='/' className={`mobile-menu__link ${isActive('/')}`} onClick={onClose}>
            Главная
          </Link>
          <Link to='/movies' className={`mobile-menu__link ${isActive('/movies')}`} onClick={onClose}>
            Фильмы
          </Link>
          <Link to='/saved-movies' className={`mobile-menu__link ${isActive('/saved-movies')}`} onClick={onClose}>
            Сохраненные фильмы
          </Link>
        </nav>
        <Link to='/profile' className='mobile-menu__profile' onClick={onClose}>
          <span className='mobile-menu__profile-link'>Аккаунт</span>
          <img src={profileIcon} alt='Иконка профиля' className='mobile-menu__profile-logo' />
        </Link>
      </div>
    </div>

  );
}
