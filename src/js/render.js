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