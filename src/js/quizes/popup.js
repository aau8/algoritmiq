import { quizSlider, quantSlides } from './general'
import { initForm } from '../forms'
import { initLabelTextfield } from '../render'
import { initRanges } from '../render'
import 'dropzone/dist/dropzone.css'

// Предложение пройти опрос
const popupOffer = document.getElementById('popup-offer')

if (popupOffer) {
    const btnHide = popupOffer.querySelector('.po__hide')
    const btnStart = popupOffer.querySelector('.po__start')
    
    btnHide.addEventListener('click', e => {
        popupOffer.classList.remove('_show')
    })
    
    btnStart.addEventListener('click', async e => {
        const modal = document.getElementById('pquiz')
        const modalWindow = modal.querySelector('.modal__window')
        const slider = modal.querySelector('.quiz-slider')
        const sliderWrapper = slider.querySelector('.swiper-wrapper')

        if (sliderWrapper.innerHTML.trim() == '') {
            await fetch('./pop-up-quiz-slides.html')
            .then(data => data.text())
            .then(html => {
                sliderWrapper.innerHTML = html
            })
            .then(e => {
                const quizForm = modal.querySelector('.quiz-modal-form')
                const qfInputElems = quizForm.querySelectorAll('.textfield input')
                const rangeBlockElems = sliderWrapper.querySelectorAll('.qmca-range')

                quantSlides(quizSlider)
                initRanges(rangeBlockElems)
                initForm(quizForm)

                qfInputElems.forEach(initLabelTextfield)

                modalWindow.classList.remove('_preload')
                slider.classList.remove('_hide')
            })
        }
    })
    
    setTimeout(e => {
        popupOffer.classList.add('_show')
    }, 2000)
}

