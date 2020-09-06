const notes = [
    "The Voyage of Life: Youth by Thomas Cole","Look at this marvelous painting", "Note 1", "Note 2"]
let counter = 0;
const main1= document.getElementById('main1')
const image = document.getElementById('voyage-youth')
image.width = window.innerWidth
const imgContainer = document.querySelector("figure.painting")
const svgTag = document.querySelector('svg')


document.addEventListener("DOMContentLoaded", function(){
    if (counter < 4){
        notes.forEach(note => loadNote(note))
    }
})

window.onscroll = () => {

    let yOffset = window.pageYOffset 

    if (yOffset > 250 && yOffset < 766){
        // Calculate current scale value
       //svgTag.style.transform = "scale(1.0)"
        svgTag.style.transform = `scale(${getLinearValue(250, 766, 1.0, 2.0)})`
        svgTag.style.transformOrigin = "75% 75%"
        svgTag.style.transition = "transform .3s"
    }
    // Linger on bottom right
    if (yOffset > 766 && yOffset < 1000){
        svgTag.style.transition = "transform .2s"
    }
    // Zoom to top left
    if (yOffset > 1000 && yOffset < 1422){
        svgTag.style.transform = `scale(${getLinearValue(1000, 1422, 2.0, 2.6)})`
        svgTag.style.transformOrigin = `${getLinearValue(1000, 1422, 75, 25)}% ${getLinearValue(1000, 1422, 75, 25)}%`
        svgTag.style.transition = "transform .1s"
        //svgTag.style.transformOrigin = "25% 25%;"
        //svgTag.style.transform = "scale(2.6)"
        
        //svgTag.style.transition = "width 1s,  height 1s, transform 1s"
    }
    // Linger on top left
    if (yOffset > 1422 && yOffset < 1720){
        svgTag.style.transition = "transform .2s"
    }
    //Zoom in on bottom left
    if (yOffset > 1720 && yOffset < 2000){
        svgTag.style.transform = `scale(${getLinearValue(1720, 2000, 2.6, 2.8)})`
        svgTag.style.transformOrigin = `${getLinearValue(1720, 2000, 25, 25)}% ${getLinearValue(1720, 2000, 25, 75)}%`
        //svgTag.style.transition = "transform .1s"
    }

    function getLinearValue(yOffset1, yOffset2, scale1, scale2){
        let currentYOffset = yOffset // current scroll position

        let x2 = yOffset2 //x2
        let x1 = yOffset1 //x1
        let scaleY2 = scale2 //y2
        let scaleY1 = scale1 //y1

        let slope = (scaleY2 - scaleY1)/(x2 - x1) // m = (y2-y1)/(x2-x1) Calculate slope
        let b = scaleY1 - (slope * x1) //b = y - mx calculate y-intercept
         
        let currentScale = (slope * currentYOffset) + b //Calculate y-value for x-offset value
        return currentScale // Return linear y-value
        
    }

}
let bottom1 = 500
function loadNote(note){

    let capContainer = document.createElement('div')
    capContainer.className = "caption-container"
    capContainer.style.height = "90%;"

    let figCaption = document.createElement('figcaption')
    figCaption.className = "caption"
    figCaption.style.bottom = bottom1 

    bottom1 -= 800
    let p = document.createElement('p')
    p.className = "p-caption"
    p.innerText = note

    figCaption.append(p)
    capContainer.append(figCaption)
    main1.append(capContainer)
    counter += 1
}
