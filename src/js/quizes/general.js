import Swiper, { Navigation, EffectFade, Thumbs, Autoplay, Pagination, FreeMode } from 'swiper'

export const quizSlider = new Swiper('.quiz-slider', {
    // modules: [EffectFade, Thumbs],

    slidesPerView: 1,
    autoHeight: true,
    allowTouchMove: false,
    observer: true,
})

// quizSlider.slideTo(quizSlider.slides.length - 1)

// Устанавливаем текущий номер слайда и общее их кол-во
quantSlides(quizSlider)
export function quantSlides(slider) {
    const quizSlides = slider.slides
    
    for (let i = 0; i < quizSlides.length; i++) {
        const quizSlide = quizSlides[i];
        const scoreCurrent = quizSlide.querySelector('.quiz-modal__score-current')
        const scoreTotal = quizSlide.querySelector('.quiz-modal__score-total')
    
        scoreCurrent.innerText = i+1
        scoreTotal.innerText = quizSlides.length
    
        // Переключение слайдеров
        const quizButtonPrev = quizSlide.querySelector('[data-quiz-prev]')
        const quizButtonNext = quizSlide.querySelector('[data-quiz-next]')
    
        if (quizButtonNext) {
            quizButtonNext.addEventListener('click', e => {
                e.preventDefault()
                addRowEnteredData(quizSlide, i)
                slider.slideNext()
            })
        }
    
        if (quizButtonPrev) {
            quizButtonPrev.addEventListener('click', e => {
                e.preventDefault()
                removeRowEnteredData(quizSlide, i)
                slider.slidePrev()
            })
        }
    }
}

// Добавляет строку с заполненными данными в предпоследний слайд с таблицей
function addRowEnteredData(slide, i) {
    const slider = slide.closest('.quiz-slider')
    const table = slider.querySelector('.qmca-18__table')

    if (table == null) {
        return
    }
    
    const slideBody = slide.querySelector('.quiz-modal__body')
    const slideTitle = slideBody.querySelector('.quiz-modal__title')
    const checkedRadio = slideBody.querySelector('[type="radio"]:checked')
    const rangeInput = slideBody.querySelector('.qmca-range input[type="text"]')
    let rowText = ''

    if (checkedRadio) {
        rowText = checkedRadio.value
    }

    if (rangeInput) {

        if (checkedRadio) {
            rowText = `${checkedRadio.value} (${parseInt(rangeInput.value)})`
        }
        else {
            rowText = parseInt(rangeInput.value)
        }
    }

    const content = `
        <div class="qmca-18__row" id="qmca-row-${i}">
            <span class="qmca-18__row-title">${slideTitle.dataset.quizSubtitle}</span>
            <span class="qmca-18__row-text">${rowText}</span>
        </div>
    `

    table.insertAdjacentHTML('beforeend', content)

    // Добавляем данные в массиве в LocalStorage
    let quizArr = i == 0 ? [] : JSON.parse(localStorage.getItem('quizCalcArr'))

    quizArr.push([slideTitle.dataset.quizSubtitle, rowText])
    localStorage.setItem('quizCalcArr', JSON.stringify(quizArr))
}

// Удаляет строку
function removeRowEnteredData(slide, i) {
    const row = document.getElementById(`qmca-row-${i-1}`)

    if (row == null) {
        return
    }

    row.remove()

    let quizArr = i == 0 ? [] : JSON.parse(localStorage.getItem('quizCalcArr'))

    quizArr.splice(i-1)
    localStorage.setItem('quizCalcArr', JSON.stringify(quizArr))
}