if (document.querySelector('.st-card')) {
    const cardElems = document.querySelectorAll('.st-card')
    const modal = document.getElementById('savant-product')
    const modalContent = modal.querySelector('.modal-service__content')
    const modalIcon = modal.querySelector('.modal-service__icon')
    
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
        <div class="modal-service__content">
            <h2 class="modal-service__title">${product.title}</h2>
            <div class="modal-service__text">${product.content}</div>
        </div>
        `
    }
    
    // Генерирует контент с видео
    function renderContentWithVideo(product) {
        const src = product.video
    
        if (src.match(/http(s)?:/)) {
            return `
            <h2 class="modal-service__title">${product.title}</h2>
            <div class="modal-service__text"><div class="modal-service__video"><iframe src="${src}" allowfullscreen allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe></div></div>
            `
        }
        else {
            return `
            <h2 class="modal-service__title">${product.title}</h2>
            <div class="modal-service__text"><div class="modal-service__video"><video src="${src}" autoplay></video></div></div>
            `
        }
    }
}

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