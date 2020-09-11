const body = document.querySelector('body')
let room1Image = document.createElement('image')
const mainBody = document.querySelector('#main')
const button1 = document.getElementById('journeys-room-btn')
const userCollectionLink = document.getElementById('user-collection')
const siteTitle = document.getElementById('site-title')
const siteNavbar = document.getElementById('site-navbar')

user = ""
// Fetch first user and set as global variable
fetch("http://localhost:3000/users/")
.then(res => res.json())
.then(users => {
    user = users[0]
    loadCarousel()
    loadHomePage()
    linkHomeButton()
    linkTitleButton()
    linkMyCollection()
    linkInteractArtBtn()
  
})

// Add event listener to home button in navbar
function linkHomeButton(){
       
        let homeLink = document.getElementById('home-nav')
        
        homeLink.addEventListener("click",function(){
            mainBody.innerHTML = ""
            loadCarousel()
            loadHomePage()
       
    })
}

//Add event listener to site title in navbar 
function linkTitleButton(){
    mainBody.setAttribute("style", "background-color: white;")
    siteTitle.addEventListener("click",function(){
        mainBody.innerHTML = ""
        loadCarousel()
        loadHomePage()
       
})}

function linkMyCollection(){

    userCollectionLink.addEventListener("click",function(){
        mainBody.innerHTML = ""

        fetch(`http://localhost:3000/users/${user.id}`)
        .then(res => res.json())
        .then (user => {
            if (user.room.paintings.length === 0){
                let noPaintingsMsg = document.createElement('h4')
                noPaintingsMsg.innerText = "You haven't saved any paintings to your collection yet!"
                mainBody.append(noPaintingsMsg)
            }
            else{
            setTimeout(function(){
                mainBody.innerHTML = ""
                loadUserRoom(user.room.paintings)
            }
            , 750);
            }
        })
    
    })
}

function linkInteractArtBtn(){
    let interactArtBtn = document.querySelector('#interact-nav')
    interactArtBtn.addEventListener("click",function(){
        loadInteractiveArt()
    })
}

function loadCarousel(){
   
    mainBody.innerHTML = 
    `<div id="carouselExampleCaptions" class="carousel slide" data-ride="carousel">
    <ol class="carousel-indicators">
      <li data-target="#carouselExampleCaptions" data-slide-to="0" class="active"></li>
      <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
      <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
    </ol>
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img id="carousel-image-1" src="https://www.claude-monet.com/images/paintings/cliff-walk-at-pourville.jpg" class="d-block w-100" alt="...">
        <div id="carousel-caption-1" class="carousel-caption d-none d-md-block">
          <h5 class="carousel-caption-text-1">Epic Journeys</h5>
          <p class="carousel-caption-text-2">Explore the K&C Art Gallery's newest exhibit.</p>
        </div>
      </div>
      <div class="carousel-item">
        <img id="carousel-image-2" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Thomas_Cole_-_The_Voyage_of_Life_Youth%2C_1842_%28National_Gallery_of_Art%29.jpg/800px-Thomas_Cole_-_The_Voyage_of_Life_Youth%2C_1842_%28National_Gallery_of_Art%29.jpg" class="d-block w-100" alt="...">
        <div id="carousel-caption-2" class="carousel-caption d-none d-md-block">
          <h5 class="carousel-caption-text-1">Visual Tours</h5>
          <p class="carousel-caption-text-2">Take a Visual Tour of Thomas Cole's <i>The Voyage of Life: Youth</i></p>
        </div>
      </div>
      <div class="carousel-item">
        <img id="carousel-image-3" src="https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/the-path-erin-hanson.jpg" class="d-block w-100" alt="...">
        <div id="carousel-caption-3" class="carousel-caption d-none d-md-block">
          <h5 class="carousel-caption-text-1">Where Entropy Reigns Supreme</h5>
          <p class="carousel-caption-text-2">Explore the K&C Art Gallery's <i>Where Entropy Reigns Supreme</i> exhibit.</p>
        </div>
      </div>
    </div>
    <a class="carousel-control-prev" href="#carouselExampleCaptions" role="button" data-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="sr-only">Previous</span>
    </a>
    <a class="carousel-control-next" href="#carouselExampleCaptions" role="button" data-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="sr-only">Next</span>
    </a>
  </div>`

}

function loadHomePage (){

    // Direct carousel caption 1 to Room 1
    let carouselCaption1 = document.getElementById('carousel-caption-1')
    carouselCaption1.addEventListener("click", function(){
        mainBody.innerHTML = ""
        fetch("http://localhost:3000/paintings") 
        .then(res => res.json())
        .then(paintings => {
            all_paintings = paintings.slice(0, 6)
            loadRoom(all_paintings)
        })
    })

    //Direct carousel caption 2 to visual tour
    let carouselCaption2 = document.getElementById('carousel-caption-2')
    carouselCaption2.addEventListener("click", function(){
        fetch("http://localhost:3000/paintings") 
        .then(res => res.json())
        .then(paintings => {
            let painting = paintings[0]
            mainBody.innerHTML = ""
            mainBody.innerHTML = `<svg  version="1.1"  viewport="0 0 600 600" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><image id="voyage-youth" href="${painting.image_url}" x="0" y="0" height= "90%" width="100%" ></svg>`
            debugger
            loadVisualScroll(painting)
        })   
    })

    // Direct caption 3 to Room 2
    let carouselCaption3 = document.getElementById('carousel-caption-3')
    carouselCaption3.addEventListener("click", function(){
        mainBody.innerHTML = ""
        fetch("http://localhost:3000/paintings") 
        .then(res => res.json())
        .then(paintings => {
            all_paintings = paintings.slice(6, 12)
            console.log(all_paintings)
            loadAudioRoom(all_paintings)
        })
    })

    // Add link to exhibits
    let exhibitLink = document.getElementById('room-nav')
    exhibitLink.addEventListener("click", function(){
            loadExhibits()
    })
    // Function to load each room after clicking on exhibit
    function loadExhibits(){
        mainBody.innerHTML = ""

        let mainExhibitDiv = document.createElement('div')
        mainExhibitDiv.id = "main-exhibit-div"
        mainBody.append(mainExhibitDiv)

        mainExhibitDiv.innerHTML = `
        <br>
        <br>
        <div class="card mb-3">
            <img class="card-img-top" style="max-height:420px;" src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Thomas_Cole_-_The_Voyage_of_Life_Old_Age%2C_1842_%28National_Gallery_of_Art%29.jpg/1280px-Thomas_Cole_-_The_Voyage_of_Life_Old_Age%2C_1842_%28National_Gallery_of_Art%29.jpg" alt="Card image cap">
                <div class="card-body" style="text-align:center;">
                    <h5 class="card-title">Epic Journeys</h5>
                    <p class="card-text">Embark on a journey through time with characters from around the world.</p>
                    <button id="room1-button" type="button" class="btn btn-outline-secondary">Enter Exhibit</button>
                </div>
        </div>
        <br>
        <div class="card mb-3">
            <img class="card-img-top" style="max-height:500px;" src="https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/the-order-of-chaos-rita-dianni-kaleel.jpg" alt="Card image cap">
                <div class="card-body" style="text-align:center;">
                    <h5 class="card-title"> Where Entropy Reigns Supreme </h5>
                    <p class="card-text">Experience the fantastical imaginations of visionary painters as they blur the boundaries between chaos and order.</p>
                    <button id="room2-button" type="button" class="btn btn-outline-secondary">Enter Exhibit</button>
                </div>
        </div>
        <br>`

        
        let room1Btn = document.getElementById('room1-button')
        room1Btn.addEventListener("click",function(){
            mainBody.innerHTML = ""
            fetch("http://localhost:3000/paintings") 
            .then(res => res.json())
            .then(paintings => {
                all_paintings = paintings.slice(0, 6)
                loadRoom(all_paintings)
            })
        })

        let room2Btn = document.getElementById('room2-button')
        room2Btn.addEventListener("click",function(){
            mainBody.innerHTML = ""
            fetch("http://localhost:3000/paintings") 
            .then(res => res.json())
            .then(paintings => {
                all_paintings = paintings.slice(6, 12)
                console.log(all_paintings)
                loadAudioRoom(all_paintings)
            })
        })

    }   
    // Click on My Collection in NavBar
    
    
}





