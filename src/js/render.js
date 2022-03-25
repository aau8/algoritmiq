
const ssLineElems = document.querySelectorAll('.s-steps__line')
const lineContainer = document.querySelector('.s-steps__column-center')
const lineContainerHeight = lineContainer.clientHeight

for (let i = 0; i < ssLineElems.length; i++) {
    const line = ssLineElems[i];
    const lineSVG = line.querySelector('svg')
    const lineSVGLine = lineSVG.querySelector('line')

    lineSVG.setAttribute('viewBox', `0 0 2 ${lineContainerHeight}`)
    lineSVGLine.setAttribute('y2', lineContainerHeight)
}