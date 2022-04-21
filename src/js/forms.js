import { quizSlider } from './quizes/general'

window.addEventListener('click', e => {
    const target = e.target

    if (target.nodeName == 'INPUT') {
        textfieldRemoveError(target.parentElement)
    }
})

// Форма вопроса
if (document.querySelector('.quest-modal__form')) {
    const questForm = document.querySelector('.quest-modal__form')
    const qfInputElems = questForm.querySelectorAll('.textfield input[data-tf-required]')
    const qfInputEmail = questForm.querySelector('input[data-tf-email]')
    const qfSelect = questForm.querySelector('.quest-modal__theme-quest')
    const qfCheckbox = questForm.querySelector('input[type="checkbox"][data-tf-required]')
    const qfSubmit = questForm.querySelector('button[type="submit"]')
    
    questForm.addEventListener('submit', async e => {
        let validForm = true
        e.preventDefault()
    
        // Проверка email
        if (!validateEmail(qfInputEmail.value)) {
            validForm = false
            textfieldAddError(qfInputEmail.parentElement, 'Неправильно заполненный email')
        }
    
        // Проверка на пустоту
        qfInputElems.forEach(input => {
            if (textfieldEmpty(input)) {
                validForm = false
            }
        })
    
        // Проверка заполненности поля выбора
        if (!qfSelect.classList.contains('_valid')) {
            textfieldAddError(qfSelect, 'Выберите тему вопроса')
            validForm = false
        }
    
        // Проверка принятия условий политоты
        if (!qfCheckbox.checked) {
            textfieldAddError(qfCheckbox.parentElement, 'Поставьте здесь галочку')
            validForm = false
        }
    
        if (validForm === false) {
            console.log('Форма не до конца заполнена!')
            return
        }
    
        const formData = new FormData(questForm)
        const formAction = questForm.getAttribute('action')
    
        formData.append('theme', qfSelect.querySelector('.select-input__title').innerText)
        showPreloadSubmit(qfSubmit)
    
        const response = await fetch(formAction, {
            method: 'POST',
            body: formData,
        })
    
        if (response.ok) {
            resetForm(questForm)
            hidePreloadSubmit(qfSubmit)
            submitFormAlert(qfSubmit, 'Вопрос отправлен!')
        }
        else {
    
            setTimeout(e => {
                submitFormAlert(qfSubmit, 'Ошибка! Вопрос не отправлен')
                hidePreloadSubmit(qfSubmit)
    
                console.error("Ошибка HTTP: " + response.status)
            }, 2000)
        }
    })
}

// Форма калькулятора
if (document.querySelector('.quiz-modal-form')) {
    const calcForm = document.querySelector('.quiz-modal-form')
    initForm(calcForm)
}

export function initForm(form) {
    const cfInputElems = form.querySelectorAll('input[data-tf-required]')
    const cfInputEmail = form.querySelector('input[data-tf-email]')
    const cfSubmit = form.querySelector('button[type="submit"]')
    
    form.addEventListener('submit', async e => {
        let validForm = true
        e.preventDefault()
    
        // Проверка email
        if (!validateEmail(cfInputEmail.value)) {
            validForm = false
            textfieldAddError(cfInputEmail.parentElement, 'Неправильно заполненный email')
        }
    
        // Проверка на пустоту
        cfInputElems.forEach(input => {
            if (textfieldEmpty(input)) {
                validForm = false
            }
        })

        if (validForm === false) {
            console.log('Форма не до конца заполнена!')
            return
        }
    
        const formData = new FormData(form)
        const formAction = form.getAttribute('action')

        formData.append('quize_calc_arr', localStorage.getItem('quizCalcArr'))
        showPreloadSubmit(cfSubmit)
    
        const response = await fetch(formAction, {
            method: 'POST',
            body: formData,
        })
    
        if (response.ok) {
            resetForm(form)
            hidePreloadSubmit(cfSubmit)
            submitFormAlert(cfSubmit, 'Вопрос отправлен!')
            localStorage.setItem('quizCalcArr', '')
            quizSlider.slideTo(0)
        }
        else {
    
            setTimeout(e => {
                submitFormAlert(cfSubmit, 'Ошибка! Вопрос не отправлен')
                hidePreloadSubmit(cfSubmit)
                
                console.error("Ошибка HTTP: " + response.status)
            }, 2000)
        }
    })
}

// Если пустое поле...
function textfieldEmpty(textfield) {
    if (textfield.value.trim() == '') {
        textfieldAddError(textfield.parentElement, 'Поле не должно быть пустым')
        return true
    }
}

// Показать прелоадер
function showPreloadSubmit(button) {
    button.classList.add('_preload')
}

// Скрыть прелоадер
function hidePreloadSubmit(button) {
    button.classList.remove('_preload')
}

// Уведомление об отправлке формы
function submitFormAlert(btn, textAlert) {
    const btnText = btn.innerHTML

    btn.innerHTML = textAlert
    setTimeout(e => {
        btn.innerHTML = btnText
    }, 2000)
}

// Добавить ошибку
function textfieldAddError(textfield, errorText) {
    textfield.dataset.textfieldError = errorText
    textfield.classList.add('_textfield-error')
}

// Удалить ошибку
function textfieldRemoveError(textfield) {
    textfield.removeAttribute('data-textfield-error')
    textfield.classList.remove('_textfield-error')
}

// Валидность email
function validateEmail(email) {
    var pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern .test(email);
}

function resetForm(form) {
    form.reset()

    const tfElems = form.querySelectorAll('.textfield')

    for (let i = 0; i < tfElems.length; i++) {
        const tf = tfElems[i]
        const tfLabel = tf.querySelector('label')
        
        tfLabel.classList.remove('_change-label')
    }
}