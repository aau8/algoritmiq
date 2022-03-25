/**
 * Функционал модального окна
 * 1. Открытие при клике по кнопке с атрибутом data-open-modal="#id-selector"
 * 2. Закрытие при клике по крестику
 * 3. Закрытие при клике по фону
 */

class Modal {
    constructor(props) {

        this.init()
    }

    init() {
        this.openedModal = false
        this.openedButton = false

        this.eventsFeeler()
    }

    eventsFeeler() {
        document.addEventListener('click', e => {
            const target = e.target

            if (target.getAttribute('[data-open-modal]') || target.closest('[data-open-modal]')) {
                this.openedButton = target

                console.log(target, 'ok')
                this.open(target.dataset.openModal)
            }
        })
    }

    open(selector) {
        if (typeof selector === 'string') {
            this.openedModal = document.querySelector(`#${selector}`)
        }
        else {
            this.openedModal = selector
        }

        this.openedModal.classList.add('_show')
        this.lockScrollPage()
    }

    lockScrollPage() {
        document.body.classList.toggle('_lock')
    }
}

const modal = new Modal()

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