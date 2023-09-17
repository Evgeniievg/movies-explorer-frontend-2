import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './AuthForm.css';
import mainLogo from '../../images/main-logo.svg';

export default function AuthForm(props) {
  const location = useLocation();
  const isLogin = location.pathname === '/signin'
  const buttonClassName = `auth-form__button ${isLogin ? 'auth-form__button_type_login' : ''}`

  return (
    <section className='auth-form'>
      <Link to='/'>
        <img src={mainLogo} alt='Логотип Movie Explorer' className='auth-form__logo'/>
      </Link>
      <h1 className='auth-form__title'>{props.title}</h1>
      <form className='auth-form__form'>
        {props.inputLabels.map((label, index) => (
          <div key={index} className='auth-form__inputs'>
            <label className='auth-form__label'>{label}</label>
            <input className='auth-form__input' type={props.inputTypes[index]} />
          </div>
        ))}
        <button type='submit' className={buttonClassName}>{props.buttonText}</button>
      </form>
      <p className='auth-form__text'>{props.question}&nbsp;
        <Link to={location.pathname === '/signin' ? '/signup' : '/signin'} className='auth-form__link'>{props.linkText}</Link>
      </p>
    </section>
  );
}
