import { removeAll } from "../util/functions.js"
import Swiper, { Navigation, Pagination } from "swiper"

const lightingInfoSlider = new Swiper('.sli__slider', {
    modules: [Navigation, Pagination],
    
    slidesPerView: 1,
    spaceBetween: 48,
    observer: true,
    loop: true,
    loopedSlides: 2,
    allowTouchMove: true,
    
    breakpoints: {
        768: {
            allowTouchMove: false,
        }
    },
    
    navigation: {
      prevEl: ".sli__slider-arrow_prev",
      nextEl: ".sli__slider-arrow_next",
    },
  
    pagination: {
      el: ".sli__slider-pagination",
      clickable: true,
    },
})

if (document.querySelector('.scm') && document.querySelector('.sli')) {
    // Загрузка данных с помощью ajax на страницах освещения
    const tabElems = document.querySelectorAll('.scm__btn')
    const sli = document.querySelector('.sli')
    const sliContent = sli.querySelector('.sli__header')
    const sliSlider = sli.querySelector('.sli__slider .swiper-wrapper')
    const preloader = document.getElementById('sli-preloader')
    // let abortController = ''
    
    // Начальная загрузка данных
    let currentHashName = window.location.hash
    
    window.addEventListener('hashchange', e => {
    let currentHashName = window.location.hash
    let manufId = Number(currentHashName.replace('#manuf-', ''))

        if (window.location.hash.includes('#manuf-') && manufId != 0) {
            const activeTab = document.querySelector(`[data-manuf-id="${manufId}"]`)

            showPreloader()
            clearContentAndSlider()
        
            removeAll(tabElems, '_active')
            activeTab.classList.add('_active')
        
            requireToDB(manufId)
        }
    })
    
    let manufId = Number(currentHashName.replace('#manuf-', ''))

    if (currentHashName != '' && currentHashName.includes('#manuf-') && manufId != 0) {
        const activeTab = document.querySelector(`[data-manuf-id="${manufId}"]`)

        activeTab.classList.add('_active')

        requireToDB(manufId)
    }
    else {
        const activeTab = document.querySelectorAll('.scm__btn')[0]

        activeTab.classList.add('_active')
        requireToDB(activeTab.dataset.manufId)
    }
    
    // Клик по табам
    for (let i = 0; i < tabElems.length; i++) {
        const tab = tabElems[i];
        
        tab.addEventListener('click', e => {
            // abortController.abort()
            const manufId = tab.dataset.manufId
    
            changeLocationHash(manufId)
        })
    }
    
    // // Запрос в БД и выгрузка контента
    // async function requireToDB(manufId) {
    //     abortController = new AbortController()
    //     const signal = abortController.signal
    
    //     sli.classList.remove('_show')

    //     try {
    //         await fetch('./db/lighting.json', { signal })
    //             .then(res => res.json())
    //             .then(data => data.filter(e => e.id == manufId)[0])
    //             .then(manuf => {
    //                 removePreloader()

    //                 sliContent.innerHTML = renderSLIHeader(manuf)
    //                 sliSlider.innerHTML = renderSLISlides(manuf)
    //                 lightingInfoSlider.slideToLoop(0, 0)
    //                 sli.classList.add('_show')
    //             })
    //     }
    //     catch(err) {
    //         if (err.name == 'AbortError') {
    //             console.log('Canceling the download')
    //         }
    //         else {
    //             throw err
    //         }
    //     }
    // }
    
    // Запрос в БД и выгрузка контента
    function requireToDB(manufId) {
        sli.classList.remove('_show')
        const json = JSON.parse(document.querySelector('.sli').dataset.sliJson)
        const manuf = json.filter(e => e.id == manufId)[0]
        
        removePreloader()

        sliContent.innerHTML = renderSLIHeader(manuf)
        sliSlider.innerHTML = renderSLISlides(manuf)
        lightingInfoSlider.slideToLoop(0, 0)
        sli.classList.add('_show')
    }
    
    // Показать прелоадер
    function showPreloader() {
        preloader.classList.add('_show')
    }
    
    // Скрыть прелоадер
    function removePreloader() {
        preloader.classList.remove('_show')
    }
    
    // Меняем hash в url
    function changeLocationHash(manufId) {
        const hashname = 'manuf-' + manufId
        window.location.hash = hashname
    }
    
    function clearContentAndSlider() {
        sliContent.innerHTML = ''
        sliSlider.innerHTML = ''
    }
    
    // Генерирует шапку раздела SLI
    function renderSLIHeader(manuf) {
        return `
        <h2 class="title_section">${manuf.title}</h2>
        <p class="section-text">${manuf.text}</p>
        <a href="${manuf.manuf_url}" class="btn btn_fill btn_large section-button">Сайт производителя</a>
        `
    }
    
    // Генерирует слайды в слайдере раздела SLI
    function renderSLISlides(manuf) {
        return manuf.images.map(img => `<div class="swiper-slide sli-slide"><img src="${img}" alt=""></div>`).join('')
    }
}