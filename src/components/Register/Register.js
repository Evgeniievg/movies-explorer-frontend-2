import React from 'react';
import AuthForm from '../AuthForm/AuthForm';

export default function Register() {
  const inputLabels = ["Имя", "E-mail", "Пароль"];
  const inputTypes = ["text", "email", "password"];

  return (
    <AuthForm
      title="Добро пожаловать"
      inputLabels={inputLabels}
      inputTypes={inputTypes}
      buttonText="Зарегистрироваться"
      question="Уже зарегистрированы?"
      linkText="Войти"
      inputMinLength={[2, 2, 8]}
      inputMaxLength={[30, 256, 30]}
    />
  );
}
