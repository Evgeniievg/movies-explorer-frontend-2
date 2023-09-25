import React from 'react'
import './Footer.css'

export default function Footer() {
  return (
    <footer className='footer'>
      <span className='footer__title'>Учебный проект Яндекс.Практикум х BeatFilm.</span>
      <div className='footer__content'>
        <span className='footer__copyright'>© 2023</span>
        <ul className='footer__list'>
        <li>
            <a href='https://practicum.yandex.ru/' target='blank' className='footer__link'>Яндекс.Практикум</a>
          </li>
          <li>
            <a href='https://github.com/Evgeniievg' target='blank' className='footer__link'>Github</a>
          </li>
        </ul>

      </div>

    </footer>
  )
}
