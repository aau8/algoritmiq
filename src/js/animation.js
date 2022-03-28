import { gsap } from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger.js'

gsap.registerPlugin(ScrollTrigger)

// Присвоение класса _active карточкам в разделе "Этапы" на главной странице
// и появление заголовка и текста карточек
gsap.utils.toArray('.ss-card').forEach(elem => {
  const title = elem.querySelector('.ss-card__title')
  const text = elem.querySelector('.ss-card__text')

  ScrollTrigger.create({
      trigger: elem,
      start: window.innerWidth <= 768 ? 'center 60%' : 'center center',
      onEnter: () => {
        elem.classList.add('_active')

        title.style.transform = 'translate(0, 0)'
        title.style.opacity = 1
        setTimeout(e => {
          text.style.transform = 'translate(0, 0)'
          text.style.opacity = 1
        }, 100)
      },
      onLeaveBack: () => {
        elem.classList.remove('_active')

        text.style = ''
        setTimeout(e => {
          title.style = ''
        }, 100) 
      }
  })
})

// Анимация голубой линии
const lineContainer = document.querySelector('.s-steps__column-center')
const lineContainerHeight = lineContainer.clientHeight

gsap.timeline({defaults: {duration: 1, ease: 'none'},
    scrollTrigger: {
      trigger: ".s-steps__list",
      scrub: true,
      start: window.innerWidth <= 768 ? 'top 60%' : 'top center',
      end: window.innerWidth <= 768 ? 'bottom 60%' : 'bottom center', 
    }})
  .fromTo(".s-steps__line_active", {height: 0}, {height: lineContainerHeight})