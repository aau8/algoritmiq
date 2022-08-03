import Swiper, { Navigation, EffectFade, Thumbs, Autoplay, Pagination, FreeMode } from 'swiper'
// import Dropzone from 'dropzone'

export const quizSlider = new Swiper('.quiz-slider:not(.pquiz-modal .quiz-slider)', {
    modules: [EffectFade, Thumbs],

    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },

    slidesPerView: 1,
    autoHeight: true,
    allowTouchMove: false,
    observer: true,
})

const pQuizSwiper = new Swiper('.pquiz-modal .quiz-slider', {
    modules: [ Thumbs ],

    // effect: 'fade',
    // fadeEffect: {
    //   crossFade: true
    // },

    slidesPerView: 1,
    // autoHeight: true,
    allowTouchMove: false,
    observer: true,
})

// quizSlider.slideTo(quizSlider.slides.length - 1)
// quizSlider.slideTo(17)

// Устанавливаем текущий номер слайда и общее их кол-во
quantSlides(pQuizSwiper)
quantSlides(quizSlider)
export function quantSlides(slider) {
    const quizSlides = slider.slides

    for (let i = 0; i < quizSlides.length; i++) {
        const quizSlide = quizSlides[i];
        const modal = quizSlide.querySelector('.quiz-modal')
        const modalHeader = quizSlide.querySelector('.quiz-modal__header')
        const score = quizSlide.querySelector('.quiz-modal__score')
        const scoreCurrent = quizSlide.querySelector('.quiz-modal__score-current')
        const scoreTotal = quizSlide.querySelector('.quiz-modal__score-total')
        const progressbar = document.createElement('div')

        scoreCurrent.innerText = i+1
        scoreTotal.innerText = quizSlides.length

        progressbar.classList.add('quiz-modal__progressbar')
        modalHeader.append(progressbar)

        progressbar.style.width = i * ((modal.clientWidth - parseInt(window.getComputedStyle(modalHeader).paddingRight) * 2 - score.clientWidth - 12) / (quizSlides.length - 1))  + 'px'

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
    const quizDataInputHidden = slider.querySelector('.quiz-modal-form .qmca-data-form')
    const slideBody = slide.querySelector('.quiz-modal__body')
    const slideTitle = slideBody.querySelector('.quiz-modal__title')
    let rowText = ''

    if (slider.classList.contains('quiz-slider_calc-amount')) {
        const table = slider.querySelector('.qmca-18__table')
        const checkedRadio = slideBody.querySelector('[type="radio"]:checked')
        const rangeInput = slideBody.querySelector('.qmca-range input[type="text"]')

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
    }

    if (slider.classList.contains('quiz-slider_professionals')) {
        const blockElems = slideBody.querySelectorAll('.qs-block')

        // console.log(blockElems)
        for (let i = 0; i < blockElems.length; i++) {
            const block = blockElems[i];
            const checkedRadio = block.querySelector('input[type=radio]:checked')
            const checkedCheckboxElems = block.querySelectorAll('input[type=checkbox]:checked')
            const input = block.querySelector('input[type=text], input[type=number]')
            const dropzone = block.querySelector('input[type=file]')

            console.log(checkedCheckboxElems)

            if (checkedCheckboxElems.length != 0) {

                for (let i = 0; i < checkedCheckboxElems.length; i++) {
                    const checkedCheckbox = checkedCheckboxElems[i];

                    if (checkedCheckbox.value === 'Другое') {
                        const inputAnother = checkedCheckbox.closest('.qs-block').querySelector('.qs-block__another input')

                        rowText += `*${inputAnother.value != '' ? inputAnother.value : 'Другое'}`
                    }
                    else {
                        rowText += checkedCheckbox.value
                        rowText += (i == checkedCheckboxElems.length - 1) ? '' : ', '
                    }
                }
            }

            if (checkedRadio) {

                if (checkedRadio.value === 'Другое') {
                    const inputAnother = checkedRadio.closest('.qs-block').querySelector('.qs-block__another input')

                    // console.log(inputAnother)
                    rowText = `*${inputAnother.value != '' ? inputAnother.value : 'Другое'}`
                }
                else {
                    rowText = checkedRadio.value
                }
            }

            // console.log(!input.parentElement.classList.contains('qs-block__another'))
            if (input && !input.parentElement.classList.contains('qs-block__another')) {
                rowText = `${rowText != '' ? rowText + ': ' : ''}(${input.value != '' ? input.value : '-'})`
                // console.log('input not another')
            }

            if (dropzone) {
                // console.log(dropzone)

                if (dropzone.files.length != 0) {
                    // const inputFile = dropzone.querySelector('input[type=file]')
                    const formInputFile = slider.querySelector(`.qmca-19__file-${dropzone.dataset.dropzoneId}`)

                    formInputFile.files = dropzone.files
                    rowText = `${rowText} ${dropzone.fileName}`
                }
                else {
                    rowText = '(-)'
                }
            }
        }
    }

    // Добавляем данные в массиве в LocalStorage
    // let quizArr = i == 0 ? [] : JSON.parse(localStorage.getItem('quizCalcArr'))
    // let quizArr = i == 0 ? [] : JSON.parse(quizDataInputHidden.value)
    let quizArr = i == 0 ? [] : quizDataInputHidden.value.split('\r\n')

    quizArr.push(`${slideTitle.dataset.quizSubtitle}: ${rowText};\r\n`)
    // localStorage.setItem('quizCalcArr', JSON.stringify(quizArr))
    // quizDataInputHidden.value = JSON.stringify(quizArr)
    quizDataInputHidden.value = quizArr.join('\r\n')

    // console.log(quizDataInputHidden.value)
    // document.querySelector('.test').innerHTML = quizDataInputHidden.value
}

// Удаляет строку
function removeRowEnteredData(slide, i) {
    const slider = slide.closest('.quiz-slider')
    const quizDataInputHidden = slider.querySelector('.quiz-modal-form .qmca-data-form')

    if (slider.classList.contains('quiz-slider_calc-amount')) {
        const row = document.getElementById(`qmca-row-${i-1}`)

        row.remove()
    }

    // let quizArr = i == 0 ? [] : JSON.parse(localStorage.getItem('quizCalcArr'))
    let quizArr = i == 0 ? [] : quizDataInputHidden.value.split('\r\n')

    quizArr.splice(i-1)
    // localStorage.setItem('quizCalcArr', JSON.stringify(quizArr))
    quizDataInputHidden.value = quizArr.join('\r\n')
    // console.log(quizDataInputHidden.value)
    // document.querySelector('.test').innerHTML = quizDataInputHidden.value
}

dropzone()
function dropzone() {
    const qufDropzoneElems = document.querySelectorAll('.quf-dropzone')

    for (let i = 0; i < qufDropzoneElems.length; i++) {
        const qufDropzone = qufDropzoneElems[i];
        const input = qufDropzone.querySelector('.quf-dropzone__input input[type=file]')
        const infoElem = qufDropzone.querySelector('.quf-dropzone__info')

        qufDropzone.addEventListener('dragover', dragEventReset)
        qufDropzone.addEventListener('dragenter', dragEventReset)
        qufDropzone.addEventListener('dragleave', dragEventReset)
        qufDropzone.addEventListener('drop', dragEventReset)

        qufDropzone.addEventListener('dragenter', e => {
            qufDropzone.classList.add('is-dragenter')
        })

        qufDropzone.addEventListener('dragleave', e => {
            qufDropzone.classList.remove('is-dragenter')
        })

        qufDropzone.addEventListener('drop', e => {
            let files = e.dataTransfer.files

            qufDropzone.classList.remove('is-dragenter')

            if (files.length > 1) {
                callError('Вы можете добавить только 1 файл')
            }
            else if (files[0].size / 1024 / 1024 * 1000 > 5000) {
                callError('Файл весит больше 5 Мб')
            }
            else {
                input.files = files
                inputFilesChange(input.files[0])
            }
        })

        input.addEventListener('change', e => {

            if (input.files.length === 0) {
                clearFile()
                return false
            }

            if (input.files[0].size / 1024 / 1024 * 1000 > 5000) {
                clearFile()
                callError('Файл весит больше 5 Мб')
            }
            else {
                inputFilesChange(input.files[0])
            }
        })

        function inputFilesChange(file) {
            const fileSizeSimple = Math.round(file.size / 1024 / 1024 * 1000) // Конверировал в кб
            const fileSize = fileSizeSimple >= 1000 ? Math.round(fileSizeSimple / 10) / 100 + ' Мб' : fileSizeSimple + ' Кб'
            const infoText = `${file.name} ${fileSize}`

            input.fileName = file.name

            infoElem.innerHTML = infoText
            qufDropzone.classList.add('is-full')
        }

        function dragEventReset(e) {
            e.preventDefault()
            e.stopPropagation()
            return false
        }

        function callError(errorText) {
            qufDropzone.dataset.error = errorText
            qufDropzone.classList.add('is-error')

            setTimeout(e => {
                qufDropzone.dataset.error = ''
                qufDropzone.classList.remove('is-error')
            }, 3000)
        }

        function clearFile() {
            input.dataURL = ''
            input.value = ''
            qufDropzone.classList.remove('is-full')
        }
    }
}