import React, { useState, useEffect } from 'react';
import AuthForm from '../AuthForm/AuthForm';

export default function Register({ handleRegister }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const inputLabels = ["Имя", "E-mail", "Пароль"];
  const inputTypes = ["text", "email", "password"];
  const inputPlaceholders = ["Ваше имя", "Ваш email", "Ваш пароль"];
  const inputNames = ['name', 'email', 'password'];
  const [registrationError, setRegistrationError] = useState('');

  useEffect(() => {
    const isFormValid = Object.values(formErrors).every((error) => error === '') &&
      formData.name !== '' &&
      formData.email !== '' &&
      formData.password !== '';

    setIsButtonDisabled(!isFormValid);
  }, [formData, formErrors]);

  const validateEmail = (email) => {
    const regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    return regex.test(email);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    const isFormValid = Object.values(formErrors).every((error) => error === '') &&
      formData.name !== '' &&
      formData.email !== '' &&
      formData.password !== '';

    if (isFormValid) {
      handleRegister(formData.name, formData.email, formData.password);
    }
  };

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;
    setFormData({
      ...formData,
      [name]: value
    });

    if (name === 'email') {
      if (!validateEmail(value)) {
        setFormErrors({ ...formErrors, [name]: 'Некорректный email' });
      } else {
        setFormErrors({ ...formErrors, [name]: '' });
      }
    } else if (name === 'name') {
      if (!/^[A-Za-zА-Яа-яЁё\s-]*$/.test(value)) {
        setFormErrors({ ...formErrors, [name]: 'Имя должно содержать только латиницу, кириллицу, пробел или дефис' });
      } else if (value.length < 2 || value.length > 30) {
        setFormErrors({ ...formErrors, [name]: 'Имя должно содержать от 2 до 30 символов' });
      } else {
        setFormErrors({ ...formErrors, [name]: '' });
      }
    } else if (name === 'password') {
      if (value.length < 8 || value.length > 30) {
        setFormErrors({ ...formErrors, [name]: 'Пароль должно содержать от 8 до 30 символов' });
      } else {
        setFormErrors({ ...formErrors, [name]: '' });
      }
    }
  };

  return (
    <AuthForm
      title="Добро пожаловать"
      inputLabels={inputLabels}
      inputTypes={inputTypes}
      inputPlaceholders={inputPlaceholders}
      inputNames={inputNames}
      buttonText="Зарегистрироваться"
      question="Уже зарегистрированы?"
      linkText="Войти"
      inputMinLength={[2, 2, 8]}
      inputMaxLength={[30, 256, 30]}
      onSubmit={handleSubmit}
      onChange={handleInputChange}
      formErrors={formErrors}
      isButtonDisabled={isButtonDisabled}
    />
  );
}
