const ssLineDefault = document.querySelector('.s-steps__line_default')
const ssLineActive = document.querySelector('.s-steps__line_active')
const lineContainer = document.querySelector('.s-steps__column-center')
const lineContainerHeight = lineContainer.clientHeight

heightToLine(ssLineDefault, lineContainerHeight)
// heightToLine(ssLineActive, lineContainerHeight)

export function heightToLine(line, height) {
    const lineSVG = line.querySelector('svg')
    const lineSVGLine = lineSVG.querySelector('line')
    
    lineSVG.setAttribute('viewBox', `0 0 2 ${height}`)
    lineSVGLine.setAttribute('y2', height)
}