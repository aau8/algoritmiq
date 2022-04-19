import { find, findAll, removeAll, bodyLock, getSiblings } from "./util/functions.js"

// Функции для модальных окон
modal()
function modal() {
    
    // Открытие модальных окон при клике по кнопке
    openModalWhenClickingOnBtn()
    function openModalWhenClickingOnBtn() {
        // const btnsOpenModal = document.querySelectorAll('[data-modal-open]');
    
        // for (let i = 0; i < btnsOpenModal.length; i++) {
        //     const btn = btnsOpenModal[i];
    
        //     btn.addEventListener('click', (e) => {
        //         const dataBtn = btn.dataset.modalOpen;
        //         const modal = document.querySelector(`#${dataBtn}`)

        //         openModal(modal)
        //         window.location.hash = dataBtn
        //     });
        // }

        window.addEventListener('click', e => {
            const target = e.target

            // console.log(target.dataset.modalOpen)
            if (target.dataset.modalOpen != undefined || target.closest('[data-modal-open]')) {
                const btn = target.closest('[data-modal-open]') ? target.closest('[data-modal-open]') : target;
                const dataBtn = btn.dataset.modalOpen;
                const modal = document.querySelector(`#${dataBtn}`)

                openModal(modal)
                // window.location.hash = dataBtn

            }
        })
    }

    // Открытие модального окна, если в url указан его id
    // openModalHash()
    // function openModalHash() {
    //     if (window.location.hash) {
    //         const hash = window.location.hash.substring(1)
    //         const modal = document.querySelector(`.modal#${hash}`)
    
    //         if (modal) openModal(modal)
    //     }
    // }

    // Показываем/убираем модальное окно при изменения хеша в адресной строке
    // checkHash()
    // function checkHash() {
    //     window.addEventListener('hashchange', e => {
    //         const hash = window.location.hash
    //         const modal = document.querySelector(`.modal${hash}`)

    //         if (find('.modal._show')) find('.modal._show').classList.remove('_show')
    //         if (modal && hash != '') openModal(modal)
    //     })
    // }

    // Закрытие модального окна при клике по заднему фону
    // closeModalWhenClickingOnBg()
    function closeModalWhenClickingOnBg() {
        document.addEventListener('click', (e) => {
            const target = e.target
            // const modal = document.querySelector('.modal._show')

            if (modal && target.classList.contains('modal__wrap')) {
                const modal = target.closest('.modal')

                closeModal(modal)
            }
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

            const modalBg = modal.querySelector('.modal__bg')

            if (modalBg) {
                
                modalBg.addEventListener('click', e => {
                    // e.stopPropagation()
                    // console.log('ok')
                    closeModal(modal)

                })
            }
        }
    }

    // Закрытие модальных окон при нажатии по клавише ESC
    // closeModalWhenClickingOnESC()
    // function closeModalWhenClickingOnESC() {
    //     const modalElems = document.querySelectorAll('.modal')
    //     for (let i = 0; i < modalElems.length; i++) {
    //         const modal = modalElems[i];
    
    //         document.addEventListener('keydown', e => {
    //             if (e.key === 'Escape') closeModal(modal)
    //         })
    //     }
    // }

    // Сброс id модального окна в url
    // function resetHash() {
    //     const windowTop = window.pageYOffset
    //     window.location.hash = ''
    //     window.scrollTo(0, windowTop)
    // }

    // Открытие модального окна
    function openModal(modal) {
        modal.classList.add('_show')
        bodyLock(true)
    }

    // Закрытие модального окна
    function closeModal(modal) {
        modal.classList.remove('_show')

        if (!document.querySelector('.modal._show')) {
            bodyLock(false)
        }
        // resetHash()
    }
}

if (document.querySelector('.st-card')) {
    const cardElems = document.querySelectorAll('.st-card')
    const modal = document.getElementById('savant-product')
    const modalContent = modal.querySelector('.service-modal__content')
    const modalIcon = modal.querySelector('.service-modal__icon')
    
    for (let i = 0; i < cardElems.length; i++) {
        const card = cardElems[i];
        
        card.addEventListener('click', async e => {
            const productId = card.dataset.productId
    
            clearContent()
            showPreload()
    
            await fetch('../db/products.json')
                .then(data => data.json())
                .then(json => json.filter(e => { return e.id == productId })[0])
                .then(product => {
                    hidePreload()
                    modalIcon.innerHTML = renderIcon(product)
    
                    if (product.video) {
                        modalContent.innerHTML = renderContentWithVideo(product)
                    }
                    else {
                        modalContent.innerHTML = renderContent(product)
                    }
                })
        })
    }
    
    // Отчистить контент
    function clearContent() {
        modalIcon.innerHTML = ''
        modalContent.innerHTML = ''
    }
    
    // Показать загрузку
    function showPreload() {
        modal.classList.add('_load')
    }
    
    // Скрыть загрузку
    function hidePreload() {
        modal.classList.remove('_load')
    }
    
    // Генерирует иконку
    function renderIcon(product) {
        return `
        <div class="func-icon func-icon_m">${product.icon}</div>
        `
    }
    
    // Генерирует контент
    function renderContent(product) {
        return `
        <div class="service-modal__content">
            <h2 class="service-modal__title">${product.title}</h2>
            <div class="service-modal__text">${product.content}</div>
        </div>
        `
    }
    
    // Генерирует контент с видео
    function renderContentWithVideo(product) {
        const src = product.video
    
        if (src.match(/http(s)?:/)) {
            return `
            <h2 class="service-modal__title">${product.title}</h2>
            <div class="service-modal__text"><div class="service-modal__video"><iframe src="${src}" allowfullscreen allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe></div></div>
            `
        }
        else {
            return `
            <h2 class="service-modal__title">${product.title}</h2>
            <div class="service-modal__text"><div class="service-modal__video"><video src="${src}" autoplay></video></div></div>
            `
        }
    }
}

// Открыть модалку с видео
const svModal = document.getElementById('video')
const svModalContent = svModal.querySelector('.modal__window')

window.addEventListener('click', e => {
    const target = e.target

    if (target.dataset.videoOpen != undefined || target.closest('[data-video-open]')) {
        const btn = target.closest('[data-video-open]') ? target.closest('[data-video-open]') : target;
        const videoSrc = btn.dataset.videoSrc

        if (!svModalContent.querySelector('video', 'iframe')) {
            if (videoSrc.match(/http(s)?:/)) {
                const iframe = document.createElement('iframe')
                iframe.src = videoSrc
                iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture')
                iframe.setAttribute('allowfullscreen', '')

                svModalContent.append(iframe)
            }
            else {
                const video = document.createElement('video')
                video.src = videoSrc
                video.setAttribute('autoplay', '')
                video.setAttribute('controls', '')

                svModalContent.append(video)
            }
        }
    }
})

// const svButtonElems = document.querySelectorAll('[data-video-open]')
let observer = new MutationObserver(e => {
    const elem = e[0].target

    if (!elem.classList.contains('_show')) {
        svModalContent.innerHTML = ''
    }
    // console.log(e)
})
observer.observe(svModal, { 
    attributes: true,
})

/**
 * Функционал модального окна
 * 1. Открытие при клике по кнопке с атрибутом data-open-modal="#id-selector"
 * 2. Закрытие при клике по крестику
 * 3. Закрытие при клике по фону
 */

// class Modal {
//     constructor(props) {

//         this.init()
//     }

//     init() {
//         this.openedModal = false
//         this.openedButton = false

//         this.eventsFeeler()
//     }

//     eventsFeeler() {
//         document.addEventListener('click', e => {
//             const target = e.target

//             if (target.getAttribute('[data-open-modal]') || target.closest('[data-open-modal]')) {
//                 this.openedButton = target

//                 console.log(target, 'ok')
//                 this.open(target.dataset.openModal)
//             }
//         })
//     }

//     open(selector) {
//         if (typeof selector === 'string') {
//             this.openedModal = document.querySelector(`#${selector}`)
//         }
//         else {
//             this.openedModal = selector
//         }

//         this.openedModal.classList.add('_show')
//         this.lockScrollPage()
//     }

//     lockScrollPage() {
//         document.body.classList.toggle('_lock')
//     }
// }

// const modal = new Modal()

// class Modal {
//     constructor(selector, options) {
//         if (options === undefined) options = {}

//         this.$el = document.querySelector(selector)
//         this.width = options.width || null
//         this.height = options.height || null
//         this.background = options.background || null 

//         this.$el.style.width = this.width + 'px'
//         this.$el.style.height = this.height + 'px'
//         this.$el.style.background = this.background
//     }

//     set setWidth(newWidth) {
//         this.width = newWidth
//         this.$el.style.width = this.width + 'px'
//     }
// }

// const box = new Modal('.box', {
//     width: 30,
//     height: 30,
//     background: '#333',
// })

// box.setWidth = 200
// console.log(box)

// class Component {

//     constructor(selector) {
//         this.$el = document.querySelector(selector)
//     }
// }

// class Square extends Component {

//     constructor(options) {
//         super(options.selector)
//         this.$el.style.width = this.$el.style.height = options.size + 'px'
//         this.$el.style.background = options.color
//     }

//     get getWidth() {
//         return this
//     }
// }

// const box = new Square({
//     selector: '.box',
//     size: 100,
//     color: '#333',
// })

// console.log(box)