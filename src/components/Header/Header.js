import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';
import mainLogo from '../../images/main-logo.svg';
import profileIcon from '../../images/profile-icon.svg';
import MobileMenu from '../MobileMenu/MobileMenu';

export default function Header(props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const headerClassName = `header ${!isHomePage ? 'header_type_white' : ''}`;
  const headerLinkClassName = `header__link ${!isHomePage ? 'header__link_type_black' : ''}`;
  const headerProfileClassName = `header__profile ${!isHomePage ? 'header__profile_type_white' : ''}`;
  const headerBurderLineClassName = `header__burger-line ${!isHomePage ? 'header__burger-line_type_black' : ''}`;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <header className={headerClassName}>
      <div className='header__wrapper'>
        <Link to='/'>
          <img className='header__logo' src={mainLogo} alt='Логотип Movie Explorer' />
        </Link>
        {props.isLoggedin ? (
          <>
            <button type='button' className={`header__burger ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
              <span className={headerBurderLineClassName}></span>
              <span className={headerBurderLineClassName}></span>
              <span className={headerBurderLineClassName}></span>
            </button>
            <MobileMenu isOpen={isMenuOpen} onClose={toggleMenu} />
          </>
        ) : (
          <>
            <nav className='header__links-mobile'>
              <Link to='signup' className='header__link-mobile'>
                Регистрация
              </Link>
              <Link to='signin' className='header__link-mobile header__link-mobile_type_green'>
                Войти
              </Link>
            </nav>
          </>
        )}
        {props.isLoggedin ? (
          <>
            <nav className='header__links'>
              <Link to='/movies' className={`${headerLinkClassName} ${isActive('/movies')}`}>
                Фильмы
              </Link>
              <Link
                to='/saved-movies'
                className={`${headerLinkClassName} ${isActive('/saved-movies')}`}
              >
                Сохраненные фильмы
              </Link>
            </nav>
            <Link to='/profile' className={headerProfileClassName}>
              <span className='header__profile-link'>Аккаунт</span>
              <img src={profileIcon} alt='Иконка профиля' className='header__profile-logo' />
            </Link>
          </>
        ) : (
          <nav className='header__links'>
            <Link to='signup' className='header__link'>
              Регистрация
            </Link>
            <Link to='signin' className='header__link header__link_type_green'>
              Войти
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
