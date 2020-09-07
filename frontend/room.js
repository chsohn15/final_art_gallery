// const journeyImages = [
//     "https://images.nga.gov/?service=asset&action=show_preview&asset=149503",
//     "https://www.impressionists.org/images/paintings/bridge-at-argenteuil.jpg",
//     "https://cdn.shortpixel.ai/client/to_webp,q_lossy,ret_img/https://www.art-critique.com/wp-content/uploads/thumbs/16-524577-3a57h6fzrmunifi45r2dj4.jpg",
//     "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Mary_Cassatt_-_The_Boating_Party_-_Google_Art_Project.jpg/1280px-Mary_Cassatt_-_The_Boating_Party_-_Google_Art_Project.jpg",
//     "https://www.claude-monet.com/images/paintings/cliff-walk-at-pourville.jpg",
//     "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Thomas_Cole_-_The_Voyage_of_Life_Old_Age%2C_1842_%28National_Gallery_of_Art%29.jpg/1280px-Thomas_Cole_-_The_Voyage_of_Life_Old_Age%2C_1842_%28National_Gallery_of_Art%29.jpg"]

function loadRoom(paintings){

    let roomTitle = document.createElement('h2')
    roomTitle.innerText = "Journeys"
    let roomTable = document.createElement('table')
    let roomTableRow = document.createElement('tr')
    let roomTableRow2 = document.createElement('tr')
    //debugger
    paintings.slice(0,2).forEach(painting => {
        //debugger
        let roomTableData = document.createElement('td')
        let roomTableImg = document.createElement('img')
        roomTableImg.width = "350"
        // roomTableImg.dataset.coordinates = "  "
        roomTableImg.id = "source"
        roomTableImg.style.display = "none"
        let imgP = document.createElement('span')
        imgP.innerText = painting.title
        imgP.dataset.id = painting.id 

        imgP.addEventListener("click", function(){
            debugger
            mainBody.innerHTML = ""

            
        })
        roomTableImg.src = painting.image_url
        roomTableData.append(roomTableImg, imgP)
        roomTableRow.append(roomTableData)
    })

    paintings.slice(3,5).forEach(painting => {
        //debugger
        let roomTableData = document.createElement('td')
        let roomTableImg = document.createElement('img')
        //roomTableImg.width = "350"
        roomTableImg.setAttribute = ("style","object-fit: contain;")
        roomTableImg.id = "source"
        roomTableImg.style.display = "none"
        let imgP = document.createElement('span')
        imgP.innerText = painting.title
        imgP.dataset.id = painting.id 
        roomTableImg.src = painting.image_url
        roomTableData.append(roomTableImg, imgP)
        roomTableRow2.append(roomTableData)
    })
    
    roomTable.append(roomTableRow, roomTableRow2)
    mainBody.append(roomTitle, roomTable)
    let frame = document.createElement('img')
    frame.id = "frame"
    frame.src = "https://www.onlygfx.com/wp-content/uploads/2020/01/gold-picture-frame-1.png"
    frame.style.display = "none"
    mainBody.append(frame)
    
    setTimeout(function(){draw()}, 1000);
    //draw()

    function draw() {
        //debugger
        for (var i = 0; i < document.images.length; i++) {
            if (document.images[i].getAttribute('id') != 'frame') {
                canvas = document.createElement('canvas');
                canvas.setAttribute('width', 500);
                canvas.setAttribute('height', 400);

                document.images[i].parentNode.insertBefore(canvas,document.images[i]);

                ctx = canvas.getContext('2d');

                ctx.drawImage(document.images[i], 55, 55);
                ctx.drawImage(document.getElementById('frame'), 0, 0, 500, 400);
            }
        }
}
}
