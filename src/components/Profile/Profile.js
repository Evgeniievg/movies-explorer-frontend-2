import React, { useState } from 'react';
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

  return (
    <section className='profile'>
      <h1 className='profile__title'>Привет, Виталий!</h1>
      <form className='profile__form'>
        <label className="profile__label profile__label_type_grey-line">
          <span className="profile__label-text">Имя</span>
          <input
            value={name}
            className='profile__input'
            onChange={handleNameChange}
            disabled={!isEditing}
          />
        </label>
        <label className="profile__label">
          <span className="profile__label-text">E-mail</span>
          <input
            value={email}
            className='profile__input'
            onChange={handleEmailChange}
            disabled={!isEditing}
          />
        </label>
      </form>
      <span className='profile__error-text'>При обновлении профиля произошла ошибка.</span>
      <div className='profile__buttons'>
        <button className={`${isEditing ? 'profile__button-save' : 'profile__button'}`} onClick={toggleEdit}>
          {isEditing ? 'Сохранить' : 'Редактировать'}
        </button>
        <button className={`${isEditing ? 'profile__button_type_disabled' : 'profile__button profile__button_type_red'}`}>Выйти из аккаунта</button>
      </div>
    </section>
  );
}
