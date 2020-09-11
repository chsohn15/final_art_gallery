function loadUserRoom(paintings){
    let mainDiv = document.createElement('div')
    mainDiv.id = "user-room-div"
    
    let roomTitle = document.createElement('h1')
    roomTitle.innerText = "My Collection"
    roomTitle.id = "my-collection-title"

  
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
        
        // Create div for text 
        let textDiv = document.createElement('div')
        textDiv.className = "text-div"
        textDiv.id = "text-div-user"
        
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

            let paintingMainDiv = document.createElement('div')
            paintingMainDiv.className = "painting-main-div"
            paintingMainDiv.id = "my-collection-div"

            let paintingTextDiv = document.createElement('div')
            paintingTextDiv.className = "painting-text-div"
            paintingTextDiv.id = "painting-text-div2"

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

            paintingTextDiv.append(imgHeader, imgArtist, imgMovement, imgDate)

            // Zoom box
            let zoomBox = document.createElement('div')
            zoomBox.className = "zoom-box"


            //jQuery zoom feature
            $(function(){
                $("img").jqZoom({
                    selectorWidth: 30,
                    selectorHeight: 30,
                    viewerWidth: 600,
                    viewerHeight: 500
                });
            })

            // Create image for zooming
            let zoomImg = document.createElement('img')
            zoomImg.src = painting.image_url 
            zoomImg.width = "500"
            zoomImg.height = "400"
            zoomBox.append(zoomImg)

            // Create remove button
            let removeBtn = document.createElement('button')
            removeBtn.className = "btn btn-light"
            removeBtn.id = "my-collection-remove-btn"
            removeBtn.innerText = "Remove from My Collection"

            //Create a notes form 
            let notesForm = document.createElement("form")
            notesForm.className = "form-group col-md-3"
            notesForm.id = "my-collection-notes-form"
            let notesLabel = document.createElement("label")
            notesLabel.setAttribute = ("for", "formGroupExampleInput")
            notesLabel.innerText = "Add a note to this painting"
            let notesInput = document.createElement("input")
            notesInput.setAttribute("type", "text")
            notesInput.className = "form-control"
            notesInput.id = "formGroupExampleInput"
            notesInput.setAttribute("placeholder","Add A Note Here")
            let notesBtn = document.createElement("button")
            notesBtn.className = "btn btn-light"
            notesBtn.id = "my-collection-notes-btn"
            notesBtn.innerText = "Submit Note"
            notesForm.append(notesLabel, notesInput,notesBtn)
            

            // creates notes ul and adds existing notes
            let notesUl = document.createElement("ul")
    
            fetch(`http://localhost:3000/paintings/${painting.id}`)
            .then(res => res.json())
            .then(response => {  console.log(response.notes)
            
                response.notes.forEach(note => { 
                    
                    if(!note["original?"]){
                    let notesLi = document.createElement("li")
                    notesLi.innerText = note.content
                    notesUl.append(notesLi)
                    let deleteNoteBtn = document.createElement("button")
                    deleteNoteBtn.innerText = "Delete This Note"
                    deleteNoteBtn.dataset.id = note.id
                    // deleteNoteBtn.value = note
                    notesLi.append(deleteNoteBtn)
                    
                    deleteNoteBtn.addEventListener("click",function(e){
                        let noteId =  e.target.dataset.id
                        let configObj =  {   method: "DELETE" }
                        fetch(`http://localhost:3000/notes/${noteId}`, configObj)
                        .then(()=> notesLi.remove())
                        })
                    }
                }
            )  
        })
           
        let backBtn = document.createElement('button')
        backBtn.className = "btn btn-light"
        backBtn.id = "my-collection-back-btn"
        backBtn.innerText = "Back to My Collection"

        let br = document.createElement('br')
        // Create container for buttons

        let myCollectionsBtnDiv = document.createElement('div')
        myCollectionsBtnDiv.id = "my-collections-btn-div"
        myCollectionsBtnDiv.append(backBtn, br, removeBtn, notesForm, notesUl)


        paintingMainDiv.append(paintingTextDiv, zoomBox, myCollectionsBtnDiv)
        mainBody.append(paintingMainDiv)
            
            backBtn.addEventListener("click", function(){
                mainBody.innerHTML = ""
                loadUserRoom(paintings)
            })
            
            // add a note 
            notesForm.addEventListener("submit", function(e){
                e.preventDefault()
                let userNote = e.target[0].value
                let configObj = {
                    method: "POST",
                    headers:{
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        painting_id: painting.id,
                        user_id: user.id,
                        content: userNote,
                        "original?": false
                    })
                }
                fetch("http://localhost:3000/notes", configObj)
                .then(res => res.json())
                .then(note  => {
                    let notesLi = document.createElement("li")
                    notesLi.innerText = note.content
                    notesUl.append(notesLi)
                    notesForm.reset()

                    let deleteNoteBtn = document.createElement("button")
                    deleteNoteBtn.innerText = "Delete This Note"
                    deleteNoteBtn.dataset.id = note.id
                    // deleteNoteBtn.value = note
                    notesLi.append(deleteNoteBtn)
                    
                    deleteNoteBtn.addEventListener("click",function(e){
                        let noteId =  e.target.dataset.id
                        let configObj =  {   method: "DELETE" }
                        fetch(`http://localhost:3000/notes/${noteId}`, configObj)
                        .then(()=> notesLi.remove())
                        })
                })
                
                
            })

            removeBtn.addEventListener("click",function(){
                //painting.id
                
                let paintingID = painting.id
                let roomID = user.room.id

                let configObj = {
                    method: "POST",
                    headers: {
                        "Content-Type":"application/json"
                    }, 
                    body: JSON.stringify({
                        roomID, 
                        paintingID
                    })
                }
                // Destroy painting
                fetch(`http://localhost:3000/deletepr`, configObj)

                Swal.fire({
                    title: 'You have removed this painting from your collection!',
                    imageUrl: `${painting.image_url}`,
                    imageWidth: 400,
                    imageHeight: 200,
                    imageAlt: 'Custom image',
                  })
                  mainBody.innerHTML = ""

                  // var user =
                  fetch(`http://localhost:3000/users/${user.id}`)
                  .then(res => res.json())
                  .then (user => {
                      setTimeout(function(){loadUserRoom(user.room.paintings)}, 1000);
                      }
                  )
                

              
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
                canvas.className = "canvas-room-basic"
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
let bottom1 = 500

// Function to load visual tour
function loadScroll(){
    
    const notes = paintings[0].notes.map(note => {
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
}
