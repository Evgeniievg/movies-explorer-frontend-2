import React from 'react'
import './AboutMe.css'
import myImage from '../../images/tg-image.jpg'

function AboutMe() {
  return (
    <section className='about-me'>
      <h3 className='about-me__title'>Студент</h3>
      <div className='about-me__content'>
        <div className='about-me__description'>
          <h3 className='about-me__subtitle'>Евгений</h3>
          <span className='about-me__position'>Фронтенд-Разработчик</span>
          <p className='about-me__info'>Учился в МГУ на направлении "Востоковедение".
          Люблю писать код, занимаюсь веб-дизайном.
          На данный момент живу в Грузии, в городе Батуми.
          </p>
          <a href='https://github.com/Evgeniievg' target='blank' className='about-me__github'>Github</a>
        </div>
        <img className='about-me__image' src={myImage} alt='Мое фото'/>
      </div>
    </section>
  )
}

export default AboutMe
