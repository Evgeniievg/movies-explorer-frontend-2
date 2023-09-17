import React from 'react'
import './Promo.css'
import promoImage from '../../images/promo-image-2.svg'

function Promo() {
  return (
    <section className='promo'>
      <div className='promo__wrapper'>
        <div className='promo__content'>
          <img className='promo__image' src={promoImage} alt='Шар, состоящий из множества надписей "WEB"'/>
          <div className='promo__texts'>
            <h1 className='promo__title'>Учебный проект студента
            факультета Веб-разработки.</h1>
            <p className='promo__subtitle'>Листайте ниже,
            чтобы узнать больше про этот проект и его создателя.</p>
          </div>
        </div>
          <button className='promo__button'><a href='#about-project' className='promo__link'>Узнать больше</a></button>
      </div>
    </section>
  )
}

export default Promo
