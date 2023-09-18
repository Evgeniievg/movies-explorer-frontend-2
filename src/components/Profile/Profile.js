import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';

export default function Profile() {
  const [name, setName] = useState('Виталий');
  const [email, setEmail] = useState('pochta@yandex.ru');
  const [isEditing, setIsEditing] = useState(false);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <main className='profile'>
      <h1 className='profile__title'>Привет, Виталий!</h1>
      <form className='profile__form' onSubmit={handleSubmit}>
        <label className="profile__label profile__label_type_grey-line">
          <span className="profile__label-text">Имя</span>
          <input
            type='text'
            minLength='2'
            maxLength='30'
            value={name}
            className='profile__input'
            onChange={handleNameChange}
            disabled={!isEditing}
          />
        </label>
        <label className="profile__label">
          <span className="profile__label-text">E-mail</span>
          <input
            type='email'
            value={email}
            className='profile__input'
            onChange={handleEmailChange}
            disabled={!isEditing}
          />
        </label>
        <div className='profile__buttons'>
          <span className='profile__error-text'>При обновлении профиля произошла ошибка.</span>
          {isEditing ? (
            <button type='submit' className='profile__button-save' onClick={toggleEdit}>
              Сохранить
            </button>
          ) : (
            <>
              <button type='button' className='profile__button' onClick={toggleEdit}>
                Редактировать
              </button>
              <Link className='profile__link' to='/'>
                Выйти из аккаунта
              </Link>
           </>
          )}
        </div>
      </form>
    </main>
  );
}
