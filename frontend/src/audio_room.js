function loadAudioRoom(paintings){

    let roomTitle = document.createElement('h2')
    
    roomTitle.innerText = paintings[0].rooms[0].name
    let roomTable = document.createElement('table')
    let roomTableRow = document.createElement('tr')
    let roomTableRow2 = document.createElement('tr')

    //Place each painting on the DOM in room
    paintings.forEach(painting => {
        
        let roomTableData = document.createElement('td')
        let roomTableImg = document.createElement('img')
        roomTableImg.width = "250"
        // roomTableImg.dataset.coordinates = "  "

        // Create image
        roomTableImg.id = "source"
        roomTableImg.style.display = "none"
        
        //Create image text
        let imgP = document.createElement('span')
        imgP.innerText = painting.title
        imgP.dataset.id = painting.id 

        // Link to show page of one painting on click
        imgP.addEventListener("click", function(){
            
            mainBody.innerHTML = ""

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
            
        })

            mainBody.append(imgHeader, imgArtist, imgMovement, imgDate, zoomBox, saveBtn)
            
            // Append visual tour button for first painting in series
            if (painting === paintings[0]){
                let tourBtn = document.createElement('button')
                tourBtn.innerText = "Audio Tour"

                // Click on visual tour button to clear HTML and load visual tour
                tourBtn.addEventListener("click", function(){
                    console.log(painting.image_url)
                    mainBody.innerHTML = ""
                    mainBody.innerHTML = `<svg  version="1.1"  viewport="0 0 600 600" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><image id="voyage-youth" href="${painting.image_url}" x="0" y="0" height= "90%" width="100%" ></svg>`
                    
                    // Load visual tour feature
                    loadScroll()
                })
                mainBody.append(tourBtn)
            }

        })
        roomTableImg.src = painting.image_url
        roomTableData.append(roomTableImg, imgP)

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
    mainBody.append(roomTitle, roomTable)

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
                canvas.setAttribute('width', 400);
                canvas.setAttribute('height', 300);

                document.images[i].parentNode.insertBefore(canvas,document.images[i]);

                ctx = canvas.getContext('2d');

                ctx.drawImage(document.images[i], 35, 37,325,225);
                ctx.drawImage(document.getElementById('frame'), 0, 0, 400, 300);
            }
        }
}

// Set distance of note from bottom of screen
let bottom1 = 500

// Function to load audio tour
function loadScroll(){
    

    const notes = [
        {content: "Im Spiel der Wellen",audio:'https://dl.dropbox.com/s/vxz7z92cfaw3hao/MOD%203%20final%20audiofile%20%20-%209%3A9%3A20%2C%205.25%20PM.mp3'},{content:"note",audio:"https://dl.dropbox.com/s/l64v34a07jithjg/mermaids.mp3" },{content:"note",audio:`https://dl.dropbox.com/s/ihqyhhu9fri1v51/centaur.mp3`}]

        // const notes = paintings[0].notes.map(note => {
    //     return note.content
    // })
    let counter = 0;
    //const main1= document.getElementById('main1')
    const image = document.getElementById('voyage-youth')
    image.width = window.innerWidth
    const imgContainer = document.querySelector("figure.painting")
    const svgTag = document.querySelector('svg')
    
    
    
    if (counter < 3){
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
            svgTag.style.transform = `scale(${getLinearValue(1000, 1422, 2.5, 1.5)})`
            svgTag.style.transformOrigin = `${getLinearValue(1000, 1422, 75, 25)}% ${getLinearValue(1000, 1422, 75, 25)}%`
            // svgTag.style.transformOrigin = "25% 25%;"
            svgTag.style.transition = "transform .1s"
            //svgTag.style.transform = "scale(2.6)"
            
            //svgTag.style.transition = "width 1s,  height 1s, transform 1s"
        }
        // Linger on top left
        if (yOffset > 1422 && yOffset < 1720){
            svgTag.style.transition = "transform .2s"
        }
        //Zoom in on bottom left
     
        
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
        p.id = "notes"
        p.innerText = note.content

        let audioElement = document.createElement('audio')
        audioElement.setAttribute('src', note.audio)
            audioElement.id ="player"
        
        p.append(audioElement)
       
       
       
        // create play div
        let playButton = document.createElement("div")
        playButton.innerText ="play audio"

        //create pause div
        let pauseButton = document.createElement("div")
        pauseButton.innerText = "pause"

        p.append(playButton,pauseButton)
        playButton.addEventListener("click", function(){audioElement.play()})
        pauseButton.addEventListener("click",function(){audioElement.pause()})
       
    
        figCaption.append(p)
        // add sound to note 
        capContainer.append(figCaption)
        mainBody.append(capContainer)
        counter += 1
    }
    }
}
