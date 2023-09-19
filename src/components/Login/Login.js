import React from 'react';
import AuthForm from '../AuthForm/AuthForm';

export default function Login() {
  const inputLabels = ["E-mail", "Пароль"];
  const inputTypes = ["email", "password"];
  const inputPlaceholders = ["Ваш email", "Ваш пароль"]


  return (
    <AuthForm title="Рады видеть!"
    inputLabels={inputLabels}
    inputPlaceholders = {inputPlaceholders}
    inputTypes={inputTypes}
    buttonText="Войти"
    question="Ещё не зарегистрированы?"
    linkText="Регистрация"
    inputMinLength={[2, 8]}
    inputMaxLength={[256, 30]}
    />
  )
}
