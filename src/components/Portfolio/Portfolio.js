import React from 'react'
import './Portfolio.css'

export default function Portfolio() {
  return (
    <section className='portfolio'>
      <h2 className='portfolio__title'>Портфолио</h2>
      <ul className='portfolio__list'>
        <li className='portfolio__item'>
          <a href='https://evgeniievg.github.io/how-to-learn/' target='blank' className='portfolio__link'>
            Статичный сайт
            <span className='portfolio__icon'>↗</span>
          </a>
        </li>
        <li className='portfolio__item'>
          <a href='https://evgeniievg.github.io/russian-travel/' target='blank' className='portfolio__link'>
            Адаптивный сайт
            <span className='portfolio__icon'>↗</span>
          </a>
        </li>
        <li className='portfolio__item'>
          <a href='https://github.com/Evgeniievg/react-mesto-api-full-gha' target='blank' className='portfolio__link'>
            Одностраничное приложение
            <span className='portfolio__icon'>↗</span>
          </a>
        </li>
        <li className='portfolio__item'>
          <a href='https://evgeniievg.github.io/sanat-project' target='blank' className='portfolio__link'>
            Блог об искусстве
            <span className='portfolio__icon'>↗</span>
          </a>
        </li>
        <li className='portfolio__item'>
          <a href='https://evgeniievg.github.io/todo-app/' target='blank' className='portfolio__link'>
            To-Do List
            <span className='portfolio__icon'>↗</span>
          </a>
        </li>
        <li className='portfolio__item'>
          <a href='https://evgeniievg.github.io/Quotes--The-Book-of-Genesis/' target='blank' className='portfolio__link'>
            Генератор цитат из Книги Бытия
            <span className='portfolio__icon'>↗</span>
          </a>
        </li>
      </ul>
    </section>
  )
}
