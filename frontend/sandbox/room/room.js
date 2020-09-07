const journeyImages = [
    "https://images.nga.gov/?service=asset&action=show_preview&asset=149503",
    "https://www.impressionists.org/images/paintings/bridge-at-argenteuil.jpg",
    "https://cdn.shortpixel.ai/client/to_webp,q_lossy,ret_img/https://www.art-critique.com/wp-content/uploads/thumbs/16-524577-3a57h6fzrmunifi45r2dj4.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Mary_Cassatt_-_The_Boating_Party_-_Google_Art_Project.jpg/1280px-Mary_Cassatt_-_The_Boating_Party_-_Google_Art_Project.jpg"]
const body = document.querySelector('body')
document.addEventListener("DOMContentLoaded",function(){
    
    let roomTable = document.createElement('table')
    let roomTableRow = document.createElement('tr')
    let roomTableRow2 = document.createElement('tr')
    
    journeyImages.slice(0,2).forEach(image => {
        //debugger
        let roomTableData = document.createElement('td')
        let roomTableImg = document.createElement('img')
        roomTableImg.width = "350"
        // roomTableImg.dataset.coordinates = "  "
        roomTableImg.id = "source"
        roomTableImg.style.display = "none"
        let imgP = document.createElement('p')
        imgP.innerText = "Image Title"
        roomTableImg.src = image
        roomTableData.append(roomTableImg, imgP)
        roomTableRow.append(roomTableData)
    })

    journeyImages.slice(2,4).forEach(image => {
        //debugger
        let roomTableData = document.createElement('td')
        let roomTableImg = document.createElement('img')
        //roomTableImg.width = "350"
        roomTableImg.setAttribute = ("style","object-fit: contain;")
        roomTableImg.id = "source"
        roomTableImg.style.display = "none"
        let imgP = document.createElement('p')
        imgP.innerText = "Image Title"
        roomTableImg.src = image
        roomTableData.append(roomTableImg, imgP)
        roomTableRow2.append(roomTableData)
    })
    
    roomTable.append(roomTableRow, roomTableRow2)
    body.append(roomTable)
    let frame = document.createElement('img')
    frame.id = "frame"
    frame.src = "https://www.onlygfx.com/wp-content/uploads/2020/01/gold-picture-frame-1.png"
    frame.style.display = "none"
    body.append(frame)
    
    
    body.onload = function(){
        draw()
    }

    function draw() {
        for (var i = 0; i < document.images.length; i++) {
            if (document.images[i].getAttribute('id') != 'frame') {
                canvas = document.createElement('canvas');
                canvas.setAttribute('width', 500);
                canvas.setAttribute('height', 400);

                document.images[i].parentNode.insertBefore(canvas,document.images[i]);

                ctx = canvas.getContext('2d');

                ctx.drawImage(document.getElementById('frame'), 0, 0, 500, 400);
                ctx.drawImage(document.images[i], 55, 55);
            }
        }
}
})