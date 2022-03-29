import Swiper, { Navigation, EffectFade, Thumbs, Autoplay } from 'swiper'
import 'swiper/css'
import 'swiper/css/effect-fade'

if (document.querySelector('.main__slider')) {
  console.log('ok')
  const mainSliderButtons = new Swiper('.main__slider-buttons', {
      modules: [EffectFade],
  
      slidesPerView: 1,
      allowTouchMove: false,
  
      effect: 'fade',
      fadeEffect: {
        crossFade: true
      },
  })
  
  const mainBg = new Swiper('.main__bg', {
      modules: [EffectFade, Thumbs],
  
      slidesPerView: 1,
      allowTouchMove: false,
  
      effect: 'fade',
      fadeEffect: {
        crossFade: true
      },
  
      thumbs: {
          swiper: mainSliderButtons,
      }
  })
  
  const progressSlider = document.getElementById('progress-slider')
  const sliderDelay = 4000
  
  const mainSlider = new Swiper('.main__slider', {
      modules: [Navigation, EffectFade, Thumbs, Autoplay],
      
      allowTouchMove: false,
      autoHeight: true,
      effect: 'fade',
      loop: true,
      fadeEffect: {
        crossFade: true
      },
      
      autoplay: {
        delay: sliderDelay,
        disableOnInteraction: false,
      },
  
      navigation: {
          prevEl: '.main__slider-arrow_prev',
          nextEl: '.main__slider-arrow_next',
      },
  
      thumbs: {
          swiper: mainBg,
      },
  
      on: {
        init: e => {
          progressSlider.style.animationDuration = sliderDelay + 'ms'
          progressSlider.classList.add('_active')
        }
      }
  })
  
  mainSlider.on('slideChange', e => {
    const msNum = document.querySelector('.ms-num__elem')
    const msNumValue = msNum.querySelector('span')
  
    msNumValue.innerText = e.realIndex + 1
  
    // progressSlider.classList.add('_reset')
    progressSlider.classList.remove('_active')
  
    setTimeout(e => {
      progressSlider.classList.add('_active')
    }, 10)
  })
  
  // mainSlider.on('autoplay', e => {
  
  //   setTimeout(e => {
  //     // progressSlider.classList.remove('_reset')
  //   }, 500)
  // })
}