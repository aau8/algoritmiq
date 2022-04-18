import { removeAll } from "./util/functions"

// Высота линий в разделе этапов на главной странице
if (document.querySelector('.s-steps')) {
    const ssLineDefault = document.querySelector('.s-steps__line_default')
    const ssLineActive = document.querySelector('.s-steps__line_active')
    const lineContainer = document.querySelector('.s-steps__column-center')
    const lineContainerHeight = lineContainer.clientHeight
    
    heightToLine(ssLineDefault, lineContainerHeight)
    heightToLine(ssLineActive, lineContainerHeight)
}

export function heightToLine(line, height) {
    const lineSVG = line.querySelector('svg')
    const lineSVGLine = lineSVG.querySelector('line')
    
    lineSVG.setAttribute('viewBox', `0 0 2 ${height}`)
    lineSVGLine.setAttribute('y2', height)
}

// Плейсхолдер текстовых полей
labelTextfield()
function labelTextfield() {
    const textfieldElems = document.querySelectorAll('.textfield')

    for (let i = 0; i < textfieldElems.length; i++) {
        const textfield = textfieldElems[i];
        const input = textfield.querySelector('input, textarea')
        const label = textfield.querySelector('label')

        if (input.value != '') {
            label.classList.add('_change-label')
        }

        input.addEventListener('focus', e => {
            label.classList.add('_change-label')
        })

        input.addEventListener('blur', e => {
            if (input.value === '') {
                label.classList.remove('_change-label')
            }
        })
    }
}

// Списки выбора
select()
function select() {
    // Проверяем есть ли выбранные элементы при загрузке страницы. Если есть, то селект заполняется
    const selectedItemElems = document.querySelectorAll('.select-dropdown__item._selected')

    for (let i = 0; i < selectedItemElems.length; i++) {
        const selectedItem = selectedItemElems[i];
        const select = selectedItem.closest('.select')
        const sTitle = select.querySelector('.select-input__title')

        sTitle.innerText = selectedItem.innerHTML
        select.classList.add('_valid')
    }

    // Если пользователь кликнул по селекту, то он открывается/закрывается. Также он закроется если кликнуть вне его области
    window.addEventListener('click', e => {
        const target = e.target

        // Если пользователь кликнул вне зоны селекта
        if (!target.classList.contains('select') && !target.closest('.select._open')) {
            
            if (document.querySelector('.select._open')) {
                document.querySelector('.select._open').classList.remove('_open')
            }
        }

        // Если пользователь кликнул по шапке селекта
        if (target.classList.contains('select-input')) {
            target.parentElement.classList.toggle('_open')
            target.parentElement.classList.remove('_textfield-error')
        }

        // Если пользователь выбрал пункт из списка селекта
        if (target.classList.contains('select-dropdown__item')) {
            const select = target.closest('.select')
            const sTitle = select.querySelector('.select-input__title')
            const neighbourTargets = target.parentElement.querySelectorAll('.select-dropdown__item')

            sTitle.innerText = target.innerText

            removeAll(neighbourTargets, '_selected')
            target.classList.add('_selected')

            select.classList.remove('_open')
            select.classList.add('_valid')
        }
    })
}

// Взаимосвязь между инпутом с ползунком и соседним инпутом с числами
// changeRangeInput()
// function changeRangeInput() {
//     const rangeElems = document.querySelectorAll('input[type="range"]')

//     for (let i = 0; i < rangeElems.length; i++) {
//         const range = rangeElems[i];
//         const numInput = range.parentElement.querySelector('input[type="number"]')
        
//         range.addEventListener('input', () => {
//             numInput.value = range.value
//         })
        
//         numInput.addEventListener('input', () => {
//             range.value = numInput.value
//         })
//     }
// }

import $ from "jquery"
// import rangeslider from "rangeslider.js"
import rangeslider from 'rangeslider-js/src'
import 'rangeslider-js/dist/styles.min.css'

const rangeBlockElems = document.querySelectorAll('.qmca-range')

for (let i = 0; i < rangeBlockElems.length; i++) {
    const rangeBlock = rangeBlockElems[i];
    const range = rangeBlock.querySelector('.qmca-range__range')
    const textfield = rangeBlock.querySelector('.qmca-range__textfield')
    const tfPrefix = textfield.dataset.prefix

    const rangeSlider = rangeslider.create(range, {

        onInit: (value) => {
            textfield.value = value + ' ' + tfPrefix
        },

        onSlide: (value) => {
            
            if (textfield.type == 'number') {
                textfield.value = parseInt(value)
                setValueInput([textfield], value)
            }
            else {
                textfield.value = value + ' ' + tfPrefix
                setValueInput([textfield], value)
            }
        },
    })
}

// изменение значения инпута с помощью стрелок
const tfNumElems = document.querySelectorAll('[data-textfield-num]')

for (let i = 0; i < tfNumElems.length; i++) {
    const input = tfNumElems[i];

    input.addEventListener('focus', function(e) {
        input.value = parseInt(input.value)
        input.type = 'number'
        input.select()
    })

    input.addEventListener('blur', function(e) {
        input.type = 'text'
        input.value = parseInt(input.value)
        addPrefixToValue(input)
        // console.log(document.activeElement)
    })
    
    input.addEventListener('keydown', function(e) {

        // document.querySelector('.title_section').innerHTML = e.keyCode

        if (e.keyCode === 13) {
            input.blur()
        }

        if (e.code === 'ArrowUp' || e.code === 'ArrowDown') {
            e.preventDefault()

            const minValue = parseInt(input.getAttribute('min'))
            const maxValue = parseInt(input.getAttribute('max'))
            const value = parseInt(input.value)
            const step = parseInt(input.step)

            let incr = isNaN(step) ? 1 : step
            if (e.shiftKey) incr = isNaN(step) ? 10 : step * 10

            if (e.code === 'ArrowUp') {
                const sumValue = value + incr
                
                if (sumValue >= maxValue) {
                    input.value = maxValue
                }
                else if (sumValue <= minValue) {
                    input.value = minValue
                }
                else {
                    input.value = sumValue
                }
                
                if (isNaN(value)) input.value = parseInt(input.getAttribute('value')) + 1
            }

            if (e.code === 'ArrowDown') {
                const sumValue = value - incr
                
                if (sumValue >= maxValue) {
                    input.value = maxValue
                }
                else if (sumValue <= minValue) {
                    input.value = minValue
                }
                else {
                    input.value = sumValue
                }
                
                if (isNaN(value)) input.value = parseInt(input.getAttribute('value')) - 1
            }
            this.select()
            setValueInput([input])
            updateRange(input)
        }
    })
    
    input.addEventListener('change', e => {
        input.type = 'text'
        
        const minValue = parseInt(input.getAttribute('min'))
        const maxValue = parseInt(input.getAttribute('max'))
        const isNum    = input.value.match(/[^0-9]/)
        let value      = parseInt(input.value)

        if (value > maxValue) value = maxValue
        if (value < minValue) value = minValue
        if (isNum)            value = input.getAttribute('value')
        if (isNaN(value))     value = input.getAttribute('value')

        input.value = value
        setValueInput([input])
        updateRange(input)
        addPrefixToValue(input)
    })
}

// Добавить префикс к значению инпута
function addPrefixToValue(input) {
    const prefix = input.dataset.prefix
    input.value = input.value + ' ' + prefix
}

// Изменение атрибута value
function setValueInput(selectors, value) {
    // console.log(value)
    for (let i = 0; i < selectors.length; i++) {
        const input = selectors[i];
        input.setAttribute('value', value == undefined ? parseInt(input.value) : parseInt(value))
    }
}

// Обновление ползунка после изменения значения текстового поля
function updateRange(textfield) {
    const range = textfield.parentElement.querySelector('.qmca-range__range')

    if (range) {
        range['rangeslider-js'].value = textfield.value
        range['rangeslider-js'].update()
    }
}

// Кастомный курсор в разделе Другие функции на страницах функций
// if (document.querySelector('.mf-card__custom-cursor') && window.innerWidth > 768) {
//     const cursorCardElems = document.querySelectorAll('.mf-card')
    
//     for (let i = 0; i < cursorCardElems.length; i++) {
//         const cursorCard = cursorCardElems[i];
//         const cursor = cursorCard.querySelector('.mf-card__custom-cursor')
        
//         document.addEventListener('mousemove', e => {
//             const x = e.clientX
//             const y = e.clientY
//             const cardX = cursorCard.getBoundingClientRect().x
//             const cardY = cursorCard.getBoundingClientRect().y

//             cursor.style.opacity = 1
//             cursor.style.left = x - cardX + 'px'
//             cursor.style.top = y - cardY + 'px'
//         })

//         document.addEventListener('mouseout', e => {
//             cursor.style.opacity = 0
//         })
//     }
// }

// import lightGallery from 'lightgallery';

// // Plugins
// import lgThumbnail from 'lightgallery/plugins/thumbnail'
// import lgZoom from 'lightgallery/plugins/zoom'



// import lightGallery from 'lightgallery';
// import lightGallery from 'https://cdn.jsdelivr.net/npm/lightgallery.js@1.4.0/dist/js/lightgallery.min.js'

// Plugins
// import lgThumbnail from 'lightgallery/plugins/thumbnail/lg-thumbnail.es5.js'
// // import lgThumbnail from 'lightgallery/plugins/thumbnail'
// import lgZoom from 'lightgallery/plugins/zoom/lg-zoom.es5.js'
// import lgZoom from 'lightgallery/plugins/zoom'

// lightGallery(document.querySelector('.sa__slider'));

// lightGallery(document.querySelector('.sa__slider'), {
//     plugins: [lgZoom],
//     speed: 500, 
// });


