import { gsap } from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger.js'
// import {DrawSVGPlugin} from 'gsap/src/DrawSVGPlugin' 

import { heightToLine } from './render.js'

gsap.registerPlugin(ScrollTrigger)
// gsap.registerPlugin(DrawSVGPlugin)

// const controller = new ScrollMagic.Controller()

// const ssIconElems = document.querySelectorAll('.ss-card__icon svg')
// console.log(ssIconElems)
// for (let i = 0; i < ssIconElems.length; i++) {
//     const ssIcon = ssIconElems[i];

// }


// gsap.to(ssIcon, {
//     scrollTrigger: {
//         // trigger: '.ss-card__icon',
//         start: 'center center',
//         pin: true,
//         // scrub: true,
//         markers: true,
//     },
//     fill: '#328AE6',
// })

gsap.utils.toArray('.ss-card__icon .func-icon').forEach(elem => {
    ScrollTrigger.create({
        trigger: elem,
        start: 'center center',
        // markers: true,
        // onToggle: self => console.log("toggled, isActive:"),
        // fill: '#328AE6',
        toggleClass: 'func-icon_blue',
    })
})


const lineContainer = document.querySelector('.s-steps__column-center')
const lineContainerHeight = lineContainer.clientHeight

// gsap.to('.s-steps__line_active', {
//     scrollTrigger: {
//         trigger: '.s-steps__line_active',
//         start: 'top center',
//         end: 'bottom center',
//         scrub: true,
//         markers: true
//     },
// })
// .from(".s-steps__line_active svg line", {drawSVG: 0}, 0)

const main = gsap.timeline({defaults: {duration: 1},
    scrollTrigger: {
      trigger: ".s-steps__line_active svg",
      scrub: true,
      start: "top center",
      end: "bottom center"
    }})
  .from(".s-steps__line_active svg line", {drawSVG: 0}, 0)


// ScrollTrigger.create({
//     trigger: '.s-steps__line_active',
//     start: 'top center',
//     scrub: true,
//     markers: true
// })