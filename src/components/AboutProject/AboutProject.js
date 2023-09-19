import React from 'react'
import './AboutProject.css'

export default function AboutProject() {
  return (
    <section id='about-project' className='about-project'>
      <h2 className='about-project__title'>О проекте</h2>
      <ul className='about-project__info'>
        <li className='about-project__block'>
          <h3 className='about-project__subtitle'>Дипломный проект включал 5 этапов</h3>
          <p className='about-project__text'>Составление плана, работу над бэкендом, вёрстку,
          добавление функциональности и финальные доработки.</p>
        </li>
        <li className='about-project__block'>
          <h3 className='about-project__subtitle'>На выполнение диплома ушло 5 недель</h3>
          <p className='about-project__text'>У каждого этапа был мягкий и жёсткий дедлайн,
          которые нужно было соблюдать, чтобы успешно защититься.</p>
        </li>
      </ul>
      <div className='about-project__schedule'>
        <span className='about-project__text about-project__text_type_schedule-text about-project__text_type_green-background'>1 неделя</span>
        <span className='about-project__text about-project__text_type_schedule-text about-project__text_type_grey-background'>4 недели</span>
        <span className='about-project__text about-project__text_type_schedule-text about-project__text_type_technologies'>Back-end</span>
        <span className='about-project__text about-project__text_type_schedule-text about-project__text_type_technologies'>Front-end</span>
      </div>
    </section>
  )
}
