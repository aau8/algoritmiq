import { initLabelTextfield } from "../render";

window.addEventListener('click', e => {
    const target = e.target

    if (target.type == 'radio' && target.closest('.radio')) {

        if (target.dataset.radioAnother != undefined && !target.closest('.qs-block').querySelector('.qs-block__another')) {
            const qsBlock = target.closest('.qs-block')
            const qsBlockList = qsBlock.querySelector('.qs-block__list')
            const radioName = target.name
            const content = `
            <div class="textfield qs-block__textfield qs-block__another">
                <input type="text" name="${radioName}-input">
                <label>Ваш вариант</label>
            </div>
            `
            qsBlockList.insertAdjacentHTML('afterend', content)
            // initLabelTextfield(qsBlockList.parentElement.querySelector('.qs-block__another input'))        
        }

        if (target.dataset.radioAnother == undefined) {
            const qsBlockAnother = target.closest('.qs-block').querySelector('.qs-block__another')
            
            if (qsBlockAnother) {
                qsBlockAnother.remove()
            }
        }
    }
})