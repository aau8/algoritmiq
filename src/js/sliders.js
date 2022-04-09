import Swiper, { Navigation, EffectFade, Thumbs, Autoplay, Pagination, FreeMode } from 'swiper'
import 'swiper/css'
import 'swiper/css/effect-fade'

if (document.querySelector('.main__slider')) {
  const mainSliderButtons = new Swiper('.main__slider-buttons', {
      modules: [EffectFade],
  
      slidesPerView: 1,
      allowTouchMove: false,
  
      effect: 'fade',
      fadeEffect: {
        crossFade: true
      },
  })
  
  const mainBg = new Swiper('.main-full-bg', {
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

if (document.querySelector('.sa__slider')) {
  const availableSlider = new Swiper('.sa__slider', {
    modules: [Pagination],
    
    breakpoints: {
      1024: {
        slidesPerView: 5,
        spaceBetween: 46,
      },
      768: {
        slidesPerView: 5,
        spaceBetween: 25,
      },
      600: {
        slidesPerView: 4,
        spaceBetween: 25,
      },
      425: {
        slidesPerView: 3,
        spaceBetween: 25,
      },
      0: {
        slidesPerView: 2,
        spaceBetween: 17,
      }
    },

    pagination: {
      el: '.sa__slider-pagination'
    },
    
    on: {
      init: e => {

        if (e.pagination.bullets.length > 1) {
          e.pagination.el.style.display = 'flex'
        }
      }
    }
  })
}

if (document.querySelector('.ssc__screen-slider')) {
  const screenSlider = new Swiper('.ssc__screen-slider', {
    modules: [EffectFade],
    
    allowTouchMove: false,
    slidesPerView: 1,
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },

  })

  const screenContentSlider = new Swiper('.ssc-content__slider', {
    modules: [EffectFade, Navigation, Thumbs, Pagination],
    
    slidesPerView: 1,
    effect: 'fade',
    // loop: true,
    fadeEffect: {
      crossFade: true
    },

    navigation: {
      prevEl: '.ssc-content__arrow-prev',
      nextEl: '.ssc-content__arrow-next',
    },

    pagination: {
      el: '.ssc-content__slider-pagin',
      // type: 'bullet',
      clickable: true,
      renderBullet: (i, className) => {
        return `<span class="${className}"><span>0${i+1}</span></span>`
      }
    },

    thumbs: {
      swiper: screenSlider,
    },
  })
}

const mainLightingSlider = new Swiper('.sml__slider', {
  modules: [FreeMode],
  
  freeMode: true,

  breakpoints: {
    768: {
      slidesPerView: 3,
      spaceBetween: 24,
    },
      0: { 
        slidesPerView: 'auto',
        spaceBetween: 16,
    }
  }
})