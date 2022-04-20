import { removeAll } from "./util/functions"

const body = document.body

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

        initLabelTextfield(input)
    }
}

export function initLabelTextfield(input) {
    const label = input.parentElement.querySelector('label')

    input.addEventListener('focus', e => {
        label.classList.add('_change-label')
    })

    input.addEventListener('blur', e => {
        if (input.value === '') {
            label.classList.remove('_change-label')
        }
    })
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

import rangeslider from 'rangeslider-js/src'
import 'rangeslider-js/dist/styles.min.css'

const rangeBlockElems = document.querySelectorAll('.qmca-range')

// Инициализируем блоки с ползунками
initRanges(rangeBlockElems)
export function initRanges(elems) {
    // console.log(elems)
    for (let i = 0; i < elems.length; i++) {
        const rangeBlock = elems[i];
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
        })
        
        input.addEventListener('keydown', function(e) {
    
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
}

// Увеличение изображений при нажатии по ним (у изображения должен быть класс _zoom)
if (document.querySelector('[data-zoom]')) {
    zoomInImg();
}
function zoomInImg() {
  const zoomInImgElems = document.querySelectorAll('[data-zoom]');
        
  zoomInImgElems.forEach(zoomInImg => {
    zoomInImg.style.cursor = 'zoom-in';

    zoomInImg.addEventListener('click', () => {
      const imgSrc = zoomInImg.getAttribute('src');
  
      const bigImg = document.createElement('div');
  
      bigImg.classList.add('big-img');
      bigImg.classList.add('_zoom-out');
      bigImg.style.cursor = 'zoom-out';
      
      bigImg.innerHTML = `<div class="big-img__body"><img src="${imgSrc}" alt="" class="_zoom-out"></div>`
  
      document.querySelector('.wrapper').append(bigImg)

      setTimeout(() => {
        bigImg.classList.add('_show');
      }, 50)

      body.classList.add('_lock');
      zoomOutImg(bigImg);
    })
  })
}

function zoomOutImg(bigImg) {
  const zoomOutImgElems = document.querySelectorAll('._zoom-out');

  zoomOutImgElems.forEach(zoomOutImg => {
    zoomOutImg.addEventListener('click', () => {

      bigImg.classList.remove('_show');
      body.classList.remove('_lock');

      setTimeout(() => {
        bigImg.remove();
      }, 300)

    })
  })
}
