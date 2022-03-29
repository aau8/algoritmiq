// import 'bulma/sass/grid/_all.sass' // Сеточная система бибилотеки Bulma
import '../scss/style.scss'
import './render.js' 
import './animation.js'
import { find, findAll, removeAll, bodyLock, getSiblings } from "./util/functions.js"
import './sliders.js'
// import './modal.js'

// Картинки, которые добавляются фоном
import '../img/main/main.png'
import '../img/about/video-thumb.png'
import '../video/vista.mp4'

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
    popupOffer.classList.add('_show')
}, 2000)

// Стрелка "Наверх"
document.querySelector('.back-to-top').addEventListener('click', e => {
    window.scrollBy(0, -window.scrollY)
})

// Функции для модальных окон
modal()
function modal() {
    
    // Открытие модальных окон при клике по кнопке
    openModalWhenClickingOnBtn()
    function openModalWhenClickingOnBtn() {
        const btnsOpenModal = document.querySelectorAll('[data-modal-open]');
    
        for (let i = 0; i < btnsOpenModal.length; i++) {
            const btn = btnsOpenModal[i];
    
            btn.addEventListener('click', (e) => {
                const dataBtn = btn.dataset.modalOpen;
                const modal = document.querySelector(`#${dataBtn}`)

                openModal(modal)
                window.location.hash = dataBtn
            });
        }
    }

    // Открытие модального окна, если в url указан его id
    openModalHash()
    function openModalHash() {
        if (window.location.hash) {
            const hash = window.location.hash.substring(1)
            const modal = document.querySelector(`.modal#${hash}`)
    
            if (modal) openModal(modal)
        }
    }

    // Показываем/убираем модальное окно при изменения хеша в адресной строке
    checkHash()
    function checkHash() {
        window.addEventListener('hashchange', e => {
            const hash = window.location.hash
            const modal = document.querySelector(`.modal${hash}`)

            if (find('.modal._show')) find('.modal._show').classList.remove('_show')
            if (modal && hash != '') openModal(modal)
        })
    }

    // Закрытие модального окна при клике по заднему фону
    closeModalWhenClickingOnBg()
    function closeModalWhenClickingOnBg() {
        document.addEventListener('click', (e) => {
            const target = e.target
            const modal = document.querySelector('.modal._show')

            if (modal && target.classList.contains('modal__wrap')) closeModal(modal)
        })
    }

    // Закрытие модальных окон при клике по крестику
    closeModalWhenClickingOnCross()
    function closeModalWhenClickingOnCross() {
        const modalElems = document.querySelectorAll('.modal')
        for (let i = 0; i < modalElems.length; i++) {
            const modal = modalElems[i];
            const closeThisModal = modal.querySelector('.modal-close')
    
            closeThisModal.addEventListener('click', () => {
                closeModal(modal)
            })
        }
    }

    // Закрытие модальных окон при нажатии по клавише ESC
    closeModalWhenClickingOnESC()
    function closeModalWhenClickingOnESC() {
        const modalElems = document.querySelectorAll('.modal')
        for (let i = 0; i < modalElems.length; i++) {
            const modal = modalElems[i];
    
            document.addEventListener('keydown', e => {
                if (e.key === 'Escape') closeModal(modal)
            })
        }
    }

    // Сброс id модального окна в url
    function resetHash() {
        const windowTop = window.pageYOffset
        window.location.hash = ''
        window.scrollTo(0, windowTop)
    }

    // Открытие модального окна
    function openModal(modal) {
        modal.classList.add('_show')
        bodyLock(true)
    }

    // Закрытие модального окна
    function closeModal(modal) {
        modal.classList.remove('_show')
        bodyLock(false)
        resetHash()
    }
}

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
                    // videoBlock.insertAdjacentHTML('beforeend', `<iframe src="${src}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`)
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