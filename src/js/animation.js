import { gsap } from 'gsap'
import { TweenLite } from 'gsap/gsap-core.js'
import ScrollTrigger from 'gsap/ScrollTrigger.js'
// import DrawSVGPlugin from 'gsap/DrawSVGPlugin.js'

gsap.registerPlugin(ScrollTrigger)

if (document.querySelector('.s-steps')) {
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
}

gsap.timeline({defaults: {duration: 1},
scrollTrigger: {
  trigger: ".stg-thumb",
  start: 'top center',
}})
.fromTo(".stg-thumb__img-main", {opacity: 0}, {opacity: 1})

gsap.timeline({defaults: {duration: .5},
scrollTrigger: {
  trigger: ".stg-thumb",
  start: 'top center',
}})
.fromTo(".stg-thumb__img-second", {opacity: 0, x: -100}, {opacity: 1, x: 0})

// Пульт на странице с видами управляющих устройств
gsap.timeline({defaults: {duration: 1.5},
  scrollTrigger: {
    trigger: ".rc__img",
    start: 'top bottom',
    markers: true,
  }})
  .fromTo(".rc__img", {opacity: 0, y: 400}, {opacity: 1, y: 0})
  
// Анимация раздела с интерфейсом приложения
// const sInter = gsap.timeline( { defaults: { duration: 2 } },{
//   scrollTrigger: {
//     trigger: "#i-body",
//     start: "center center",
//     end: "bottom top",
//     scrub: true,
//     pin: true
//   }
// })
// .fromTo("#si-answer-1", {opacity: 0}, {opacity: 1})
// .fromTo("#si-answer-1", {opacity: 1}, {opacity: 2})
// .fromTo("#si-answer-2", {opacity: 0}, {opacity: 1})
// .fromTo("#si-answer-2", {opacity: 1}, {opacity: 2})

// .from("#si-answer-1",  { opacity: 1 })
// .from("#si-answer-1",  { opacity: 0 })
// .from("#si-answer-2", { opacity: 1 })
// .from("#si-answer-2", { opacity: 0 })



  // gsap.utils.toArray('#i-body').forEach(elem => {
  //   // const title = elem.querySelector('.ss-card__title')
  //   // const text = elem.querySelector('.ss-card__text')
  //   const answerElems = elem.querySelectorAll('.si-answer')
  
  //   ScrollTrigger.create({
  //       trigger: elem,
  //       // start: window.innerWidth <= 768 ? 'center 60%' : 'center center',
  //       start: 'center center',
  //       end: "bottom top",
  //       scrub: true,
  //       pin: true,
  //       onEnter: () => { 
  //         console.log('onEnter')
  //         // elem.classList.add('_active')
  
  //         // title.style.transform = 'translate(0, 0)'
  //         // title.style.opacity = 1
  //         // setTimeout(e => {
  //         //   text.style.transform = 'translate(0, 0)'
  //         //   text.style.opacity = 1
  //         // }, 100)
  //       },
  //       onLeaveBack: () => {
  //         console.log('onLeaveBack')

  //         // elem.classList.remove('_active')
  
  //         // text.style = ''
  //         // setTimeout(e => {
  //         //   title.style = ''
  //         // }, 100) 
  //       }
  //   })
  // })



// Анимация 404
// gsap.registerPlugin(DrawSVGPlugin)
// TweenLite.to('#404', 1, {drawSVG: '0', delay: .5})
// var animation = document.getElementById("morphing");
//  document.querySelector('#svg1').addEventListener('click', e => {
//   animation.beginElement();
//  })