import React from 'react';
import './InfoTooltip.css';
import registerOk from '../../images/register-ok.svg';

export default function InfoTooltip({ isOpen, onClose }) {
  const handleClosePopup = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleEscKey = (e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  if (isOpen) {
    document.addEventListener('keydown', handleEscKey);
  } else {
    document.removeEventListener('keydown', handleEscKey);
  }

  return (
    <div
      className={`popup popup-signup ${isOpen ? 'popup_opened' : ''}`}
      onClick={handleClosePopup}
    >
      <div className={`popup__container`}>
        <button onClick={onClose} className={`popup__close`} type="button" aria-label="Закрыть"></button>
        <img className='popup-signup__image' src={registerOk} alt='Регистрация прошла успешно' />
        <p className='popup-signup__title'>Вы успешно зарегистрировались!</p>
      </div>
    </div>
  );
}
