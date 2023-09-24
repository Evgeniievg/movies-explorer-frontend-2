import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';
import mainApi from '../../utils/MainApi';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Preloader from '../Preloader/Preloader';

export default function Profile({ onSignOut }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaveButtonActive, setIsSaveButtonActive] = useState(false)
  const userContext = useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [title, setTitle] = useState('');
  const [isCongratsActive, setIsCongratsActive] = useState(false)
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
  });

  useEffect(() => {
    if (userContext.currentUser && userContext.currentUser.data) {
      setName(userContext.currentUser.data.name);
      setEmail(userContext.currentUser.data.email);
      setTitle(userContext.currentUser.data.name);
    }
  }, [userContext.currentUser]);

  const validateName = (name) => {
    if (!name) {
      return 'Поле "Имя" не может быть пустым';
    }
    if (name.length < 2) {
      return 'Имя должно содержать минимум 2 символа';
    }
    if (name.length > 30) {
      return 'Имя не может содержать более 30 символов';
    }
    return '';
  };

  const validateEmail = (email) => {
    if (!email) {
      return 'Поле "E-mail" не может быть пустым';
    }
    const regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    return regex.test(email) ? '' : 'Email некорректен';
  };

  const handleNameChange = (event) => {
    const newName = event.target.value;
    setName(newName);
    const nameError = validateName(newName);
    setFormErrors({
      ...formErrors,
      name: nameError,
    });
    setIsSaveButtonActive(true);
  };

  const handleEmailChange = (event) => {
    const newEmail = event.target.value;

    setEmail(newEmail);
    const emailError = validateEmail(newEmail);
    setFormErrors({
      ...formErrors,
      email: emailError,
    });
    setIsSaveButtonActive(true);
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const updatedUserData = {
      name: name,
      email: email,
    };
    setIsLoading(true);
    mainApi
      .updateUser(updatedUserData)
      .then((updatedUser) => {
        setIsCongratsActive(true)
        if (updatedUser && updatedUser.data) {
          setName(updatedUser.data.name);
          setEmail(updatedUser.data.email);
          setTitle(updatedUser.data.name);
        }
        setIsEditing(false);
      })
      .catch((error) => {
        console.error('Ошибка при обновлении данных:', error);
        setFormErrors({
          ...formErrors,
          general: 'При обновлении профиля произошла ошибка',
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <main>
      <section className='profile'>
      {isLoading ? (
              <Preloader />
            ) : (
              <>
        <h1 className='profile__title'>{`Привет, ${title}!`}</h1>
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
              placeholder='Ваше имя'
            />
          </label>
          {formErrors.name && (
            <span className="profile__error">{formErrors.name}</span>
          )}
          <label className="profile__label">
            <span className="profile__label-text">E-mail</span>
            <input
              type='email'
              value={email}
              className='profile__input'
              onChange={handleEmailChange}
              disabled={!isEditing}
              placeholder='Ваш email'
            />
          </label>
          {formErrors.email && (
            <span className="profile__error">{formErrors.email}</span>
          )}
          <div className='profile__buttons'>
            {formErrors.general && (
              <span className='profile__error-text'>{formErrors.general}</span>
            )}
            {isCongratsActive && (
              <span className='profile__congrats-text'>Данные успешно изменены!</span>
            )}
                <button
                  type='submit'
                  className={`profile__button-save ${isEditing ? '' : 'disabled'} ${
                    formErrors.name || formErrors.email ? 'inactive' : ''
                  } ${!isSaveButtonActive ? 'inactive' : ''}`}
                  onClick={toggleEdit}
                  disabled={formErrors.name || formErrors.email || !isSaveButtonActive}
                  >
                  Сохранить
                </button>
                <button
                  type='button'
                  className={`profile__button ${isEditing ? 'disabled' : ''}`}
                  onClick={toggleEdit}
                >
                  Редактировать
                </button>
                <Link
                  onClick={onSignOut}
                  className={`profile__link ${isEditing ? 'disabled' : ''}`}
                  to='/'
                >
                  Выйти из аккаунта
                </Link>
          </div>
        </form>
        </>
        )}
      </section>
    </main>
  );
}
