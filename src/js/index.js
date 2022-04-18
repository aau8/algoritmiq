// import 'bulma/sass/grid/_all.sass' // Сеточная система бибилотеки Bulma
import { find, findAll, removeAll, bodyLock, getSiblings } from "./util/functions.js"
import '../scss/style.scss'
import './ajax/lighting.js'
import './render.js' 
import './animation.js'
import './sliders.js'
import './modal.js'
import './forms.js'

// Квизы
import './quizes/calc-amount.js'

// Картинки, которые добавляются фоном
import '../img/main/main.png'
import '../img/about/video-thumb.png'
import '../video/vista.mp4'

// Базы данных
import '../db/products.json'
import '../db/lighting.json'

// Мобильное меню
(function menu() {
	const burger = find('.burger')
	const menu = find('.menu');
    const closeElems = findAll('[data-menu-close]')

    for (let i = 0; i < closeElems.length; i++) {
        const close = closeElems[i];
        
        close.addEventListener('click', e => {
            menu.classList.remove('_show')
            bodyLock(false)
        })
    }

	burger.addEventListener('click', (e) => {
		menu.classList.toggle('_show')
		bodyLock()
	})

    window.addEventListener('click', e => {

        if (e.target.classList.contains('menu')) {
            menu.classList.remove('_show')
            bodyLock(false)
        }
    })
})()

// Предложение пройти опрос
const popupOffer = document.getElementById('popup-offer')
const btnHide = popupOffer.querySelector('.po__hide')
const btnStart = popupOffer.querySelector('.po__start')

btnHide.addEventListener('click', e => {
    popupOffer.classList.remove('_show')
})

btnStart.addEventListener('click', e => {
    console.log('Start quiz')
})

setTimeout(e => {
    // popupOffer.classList.add('_show')
}, 2000)

// Стрелка "Наверх"
document.querySelector('.back-to-top').addEventListener('click', e => {
    window.scrollBy(0, -window.scrollY)
})

// Аккордеон
accFAQ()
function accFAQ() {
  const hiddenSiblingAcc = true // Скрывать соседние аккордеоны. false если не нужно.
  const accHeaderElems = document.querySelectorAll('[data-acc-header]')
  
  for (let i = 0; i < accHeaderElems.length; i++) {
    const accHeader = accHeaderElems[i]
    
    accHeader.addEventListener('click', e => {
      const container = (!accHeader.closest('[data-acc]')) ? accHeader.parentElement.parentElement : accHeader.closest('[data-acc]')
      const parent = (!accHeader.closest('[data-acc]')) ? accHeader.parentElement.parentElement : accHeader.closest('[data-acc]')
      const accBody = parent.querySelector('[data-acc-body]')
      parent.classList.toggle('_acc-show') 
      
      if (accBody.style.maxHeight) { 
        accBody.style.maxHeight = null
        parent.classList.remove('_acc-show') 
      }
      else {
          
        if (hiddenSiblingAcc) {
            const adjacentElems = getSiblings(parent)

            for (let i = 0; i < adjacentElems.length; i++) {
                const elem = adjacentElems[i]
                
                if (elem.getAttribute('data-acc') != null) {
                    const elemBody = elem.querySelector('[data-acc-body]')
                    
                    elem.classList.remove('_acc-show')
                    elemBody.style.maxHeight = null
                }
            }
        }
        
        accBody.style.maxHeight = accBody.scrollHeight + 'px'
        container.style.maxHeight = parseInt(container.scrollHeight) + accBody.scrollHeight + 'px'
      }

    })
  }
}

// Проигрыватель видео
videoPlayer()
function videoPlayer() {
    const videoBlockElems = document.querySelectorAll('[data-video]')

    for (let i = 0; i < videoBlockElems.length; i++) {
        const videoBlock = videoBlockElems[i];
        const thumbSrc = videoBlock.dataset.videoThumb

        if (thumbSrc != '') {
            const img = document.createElement('img')
            img.classList.add('video__thumb')
            img.src = thumbSrc

            videoBlock.append(img)
        }
        
        videoBlock.addEventListener('click', e => {
            const src = videoBlock.dataset.videoSrc

            if (!videoBlock.querySelector('video', 'iframe')) {
                if (src.match(/http(s)?:/)) {
                    const iframe = document.createElement('iframe')
                    iframe.src = src
                    iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture')
                    iframe.setAttribute('allowfullscreen', '')

                    videoBlock.append(iframe)
                }
                else {
                    const video = document.createElement('video')
                    video.src = src
                    video.setAttribute('autoplay', '')
                    video.setAttribute('controls', '')
    
                    videoBlock.append(video)
                }
    
                videoBlock.classList.add('video-playing')
            }
        }) 
    }
}
