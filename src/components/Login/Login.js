import React, { useState, useEffect } from 'react';
import AuthForm from '../AuthForm/AuthForm';

export default function Login({ handleLogin }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const inputLabels = ["E-mail", "Пароль"];
  const inputTypes = ["email", "password"];
  const inputPlaceholders = ["Ваш email", "Ваш пароль"]
  const inputNames = ['email', 'password'];

  const [formErrors, setFormErrors] = useState({
    email: '',
    password: ''
  });

  useEffect(() => {
    const isFormValid = Object.values(formErrors).every((error) => error === '') &&
      formData.name !== '' &&
      formData.email !== '' &&
      formData.password !== '';

    setIsButtonDisabled(!isFormValid);
  }, [formData, formErrors]);

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const validateEmail = (email) => {
    const regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    return regex.test(email);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleLogin(formData.email, formData.password);
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
    } else if (name === 'password') {
      if (value.length < 8 || value.length > 30) {
        setFormErrors({ ...formErrors, [name]: 'Пароль должно содержать от 8 до 30 символов' });
      } else {
        setFormErrors({ ...formErrors, [name]: '' });
      }
    }  };

  return (
    <AuthForm
      title="Рады видеть!"
      inputLabels={inputLabels}
      inputPlaceholders={inputPlaceholders}
      inputTypes={inputTypes}
      inputNames={inputNames}
      buttonText="Войти"
      question="Ещё не зарегистрированы?"
      linkText="Регистрация"
      inputMinLength={[2, 8]}
      inputMaxLength={[256, 30]}
      onSubmit={handleSubmit}
      onChange={handleInputChange}
      formErrors={formErrors}
      isButtonDisabled={isButtonDisabled}
    />
  )
}
