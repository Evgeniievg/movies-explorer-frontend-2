import React from 'react';
import AuthForm from '../AuthForm/AuthForm';

export default function Login() {
  const inputLabels = ["E-mail", "Пароль"];
  const inputTypes = ["email", "password"];


  return (
    <AuthForm title="Рады видеть!"
    inputLabels={inputLabels}
    inputTypes={inputTypes}
    buttonText="Войти"
    question="Ещё не зарегистрированы?"
    linkText="Регистрация"
    />
  )
}
