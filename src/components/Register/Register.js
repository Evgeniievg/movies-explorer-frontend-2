import React from 'react';
import AuthForm from '../AuthForm/AuthForm';

export default function Register() {
  const inputLabels = ["Имя", "E-mail", "Пароль"];
  const inputTypes = ["text", "email", "password"];
  const inputPlaceholders = ["Ваше имя", "Ваш email", "Ваш пароль"]

  return (
    <AuthForm
      title="Добро пожаловать"
      inputLabels={inputLabels}
      inputTypes={inputTypes}
      inputPlaceholders={inputPlaceholders}
      buttonText="Зарегистрироваться"
      question="Уже зарегистрированы?"
      linkText="Войти"
      inputMinLength={[2, 2, 8]}
      inputMaxLength={[30, 256, 30]}
    />
  );
}
