function loadRoom(paintings){
    let mainDiv = document.createElement('div')
    mainDiv.className = "main-div"
    mainDiv.setAttribute("style", "background-color: #780507;")

    let roomTitle = document.createElement('h2')
    
    roomTitle.innerText = paintings[0].rooms[0].name
    roomTitle.id = "room-1-title"
    let roomTable = document.createElement('table')
    let roomTableRow = document.createElement('tr')
    roomTableRow.className = "room-1-row"
    let roomTableRow2 = document.createElement('tr')
    roomTableRow2.className = "room-1-row"


    //Place each painting on the DOM in room
    paintings.forEach(painting => {
        
        let roomTableData = document.createElement('td')
        let roomTableImg = document.createElement('img')


        // Create image
        roomTableImg.id = "source"
        roomTableImg.style.display = "none"
        
        // Create div for text 
        let textDiv = document.createElement('div')
        textDiv.className = "text-div"

        //Create image text
        let imgP = document.createElement('p')
        imgP.className = "image-p"
        imgP.innerText = painting.title
        imgP.dataset.id = painting.id 

        //Create artist text
        let imgP2 = document.createElement('p')
        imgP2.className = "image-p2"
        imgP2.innerText = painting.artist

        textDiv.append(imgP, imgP2)

        // Link to show page of one painting on click
        textDiv.addEventListener("click", function(){
            
            mainBody.innerHTML = ""
            mainBody.setAttribute("style", "background-color:white;")

            // Painting title
            let imgHeader = document.createElement('h2')
            imgHeader.innerText = painting.title

            // Painting artist
            let imgArtist = document.createElement('h3')
            imgArtist.innerText = `By ${painting.artist}`
            
            // Painting movement
            let imgMovement = document.createElement('h4')
            imgMovement.innerText = `Movement: ${painting.movement}`

            // Painting date
            let imgDate = document.createElement('h4')
            imgDate.innerText = `Date: ${painting.date}`

            // Zoom box
            zoomBox = document.createElement('div')
            zoomBox.className = "zoom-box"

            //jQuery zoom feature
            $(function(){
                $("img").jqZoom({
                    selectorWidth: 30,
                    selectorHeight: 30,
                    viewerWidth: 400,
                    viewerHeight: 300
                });
            })

            // Create image for zooming
            let zoomImg = document.createElement('img')
            zoomImg.src = painting.image_url 
            zoomImg.width = "400"
            zoomImg.height = "300"
            zoomBox.append(zoomImg)

            saveBtn = document.createElement('button')
            saveBtn.innerText = "*"
            saveBtn.addEventListener("click", ()=> { 
                
                fetch("http://localhost:3000/painting_rooms"
                , {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    painting_id: painting.id,
                    room_id: user.room.id
                }
                )
            }
            )
            .then(res => res.json())
            .then(res => {console.log(res)})
            
            Swal.fire({
                title: 'You saved this image to your collection!',
                imageUrl: `${painting.image_url}`,
                imageWidth: 400,
                imageHeight: 200,
                imageAlt: 'Custom image',
              })
        })

        let backBtn = document.createElement('button')
        backBtn.innerText = "Back to 'Epic Journeys' Collection"

        let br = document.createElement('br')
        mainBody.append(imgHeader, imgArtist, imgMovement, imgDate, zoomBox, saveBtn)
        
            // Append visual tour button for first painting in series
            if (painting === paintings[0]){
                let tourBtn = document.createElement('button')
                tourBtn.innerText = "Visual Tour"

                // Click on visual tour button to clear HTML and load visual tour
                tourBtn.addEventListener("click", function(){
                    console.log(painting.image_url)
                    mainBody.innerHTML = ""
                    mainBody.innerHTML = `<svg  version="1.1"  viewport="0 0 600 600" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><image id="voyage-youth" href="${painting.image_url}" x="0" y="0" height= "90%" width="100%" ></svg>`
                    
                    // Load visual tour feature
                    loadVisualScroll(paintings[0])
                })
                mainBody.append(tourBtn)
            }

            mainBody.append(br, backBtn)

            backBtn.addEventListener("click", function(){
                mainBody.innerHTML = ""
                loadRoom(paintings)
            })
        })

        
        roomTableImg.src = painting.image_url
        roomTableData.append(roomTableImg, textDiv)

        // Append three paintings per row
        if (painting === paintings[0] || painting === paintings[1] || painting === paintings[2]){  
            roomTableRow.append(roomTableData)
        }
        else{
            roomTableRow2.append(roomTableData)
        }


    })
    
    // Append table to body
    roomTable.append(roomTableRow, roomTableRow2)
    mainDiv.append(roomTitle, roomTable)
    mainBody.append(mainDiv)
    // Create a frame
    let frame = document.createElement('img')
    frame.id = "frame"
    frame.src = "https://www.onlygfx.com/wp-content/uploads/2020/01/gold-picture-frame-1.png"
    frame.style.display = "none"
    mainBody.append(frame)
    
    //Wait one second and load images
    setTimeout(function(){draw()}, 1000);

    
    // Function to draw images and frames on canvas
    function draw() {

        for (var i = 0; i < document.images.length; i++) {
            if (document.images[i].getAttribute('id') != 'frame') {
                canvas = document.createElement('canvas');
                canvas.className = "canvas-room-1"
                canvas.setAttribute('width', 400);
                canvas.setAttribute('height', 300);

                document.images[i].parentNode.insertBefore(canvas,document.images[i]);

                ctx = canvas.getContext('2d');

                ctx.drawImage(document.images[i], 35, 37, 325, 225);
                ctx.drawImage(document.getElementById('frame'), 0, 0, 400, 300);
            }
        }
}

// Set distance of note from bottom of screen


}

// Function to load visual tour
function loadVisualScroll(painting){
    let bottom1 = 500
    // const notes = [
    //     "The Voyage of Life: Youth by Thomas Cole","Look at this marvelous painting", "Note 1", "Note 2"]
    const notes = painting.notes.map(note => {
        return note.content
    })
    let counter = 0;
    //const main1= document.getElementById('main1')
    const image = document.getElementById('voyage-youth')
    image.width = window.innerWidth
    const imgContainer = document.querySelector("figure.painting")
    const svgTag = document.querySelector('svg')
    
    
    
    if (counter < 4){
        notes.forEach(note => loadNote(note))
    }
    
    // Create picture zoom-in that is responsive to scroll
    window.onscroll = () => {
    
        let yOffset = window.pageYOffset 
    
        if (yOffset > 250 && yOffset < 766){
            // Calculate current scale value
           //svgTag.style.transform = "scale(2.0)"
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
        
        // Calculate linear value based on scroll position
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
        mainBody.append(capContainer)
        counter += 1
    }
    }
