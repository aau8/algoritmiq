import { quizSlider, quantSlides } from './general'
import Dropzone from 'dropzone'
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
    
        // popupOffer.classList.remove('_show')
        // console.log(sliderWrapper.innerHTML)
    
        if (sliderWrapper.innerHTML.trim() == '') {
            await fetch('./pop-up-quiz-slides.html')
            .then(data => data.text())
            .then(html => {
                sliderWrapper.innerHTML = html
            })
            .then(e => {
                quantSlides(quizSlider)
                initDropzone()
                modalWindow.classList.remove('_preload')
                slider.classList.remove('_hide')
                console.log('Start quiz')
            })
        }
    })
    
    setTimeout(e => {
        popupOffer.classList.add('_show')
    }, 2000)

    initDropzone()
    function initDropzone() {
        const gufDropzoneElems = document.querySelectorAll('.guf-dropzone')
        
        gufDropzoneElems.forEach(gufDropzone => {
        
            let myDropzone = new Dropzone(gufDropzone, {
                paramName: "file",
                maxFilesize: 2, // MB
                addRemoveLinks: true,
                url: '/upload-docs',
            });
            
            myDropzone.on("addedfile", file => {
              console.log(`File added: ${file.name}`);
            });
        })
    }
}

