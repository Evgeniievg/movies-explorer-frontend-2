import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './PageNotFound.css'

export default function PageNotFound() {
  const navigate = useNavigate();
  const handleReturn = () =>{
    navigate(-1);
  }
  return (
    <main className='not-found'>
      <h1 className='not-found__title'>404</h1>
      <p className='not-found__text'>Страница не найдена</p>
      <Link onClick={handleReturn} className='not-found__link'>Назад</Link>
    </main>
  )
}
