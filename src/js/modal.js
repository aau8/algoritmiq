import { find, findAll, removeAll, bodyLock, getSiblings } from "./util/functions.js"

// Функции для модальных окон
modal()
function modal() {
    
    // Открытие модальных окон при клике по кнопке
    openModalWhenClickingOnBtn()
    function openModalWhenClickingOnBtn() {
        window.addEventListener('click', e => {
            const target = e.target

            if (target.dataset.modalOpen != undefined || target.closest('[data-modal-open]')) {
                const btn = target.closest('[data-modal-open]') ? target.closest('[data-modal-open]') : target;
                const dataBtn = btn.dataset.modalOpen;
                const modal = document.querySelector(`#${dataBtn}`)

                openModal(modal)
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
                    closeModal(modal)

                })
            }
        }
    }

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
    
            await fetch('./db/products.json')
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

let observer = new MutationObserver(e => {
    const elem = e[0].target

    if (!elem.classList.contains('_show')) {
        svModalContent.innerHTML = ''
    }
})
observer.observe(svModal, { 
    attributes: true,
})