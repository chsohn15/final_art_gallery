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
    loadNavBar()
    loadHomePage()
    linkHomeButton()
})

function linkHomeButton(){
        let homeLink = document.getElementById('home-nav')
        homeLink.addEventListener("click",function(){
        mainBody.innerHTML = ""
        loadNavBar()
        loadHomePage()
    })
}

function loadNavBar(){
    mainBody.innerHTML = 
    `<div id="carouselExampleCaptions" class="carousel slide" data-ride="carousel">
    <ol class="carousel-indicators">
      <li data-target="#carouselExampleCaptions" data-slide-to="0" class="active"></li>
      <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
      <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
    </ol>
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img src="https://www.claude-monet.com/images/paintings/cliff-walk-at-pourville.jpg" class="d-block w-100" alt="...">
        <div id="carousel-caption-1" class="carousel-caption d-none d-md-block">
          <h5>Epic Journeys</h5>
          <p>Explore the K & C Art Gallery's newest exhibit.</p>
        </div>
      </div>
      <div class="carousel-item">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Thomas_Cole_-_The_Voyage_of_Life_Youth%2C_1842_%28National_Gallery_of_Art%29.jpg/800px-Thomas_Cole_-_The_Voyage_of_Life_Youth%2C_1842_%28National_Gallery_of_Art%29.jpg" class="d-block w-100" alt="...">
        <div id="carousel-caption-2" class="carousel-caption d-none d-md-block">
          <h5>Visual Tours</h5>
          <p>Take a Visual Tour of Thomas Cole's <i>The Voyage of Life: Youth</i></p>
        </div>
      </div>
      <div class="carousel-item">
        <img src="https://www.bertc.com/subfour/g126/images/goncharova.jpg" class="d-block w-100" alt="...">
        <div id="carousel-caption-3" class="carousel-caption d-none d-md-block">
          <h5>Mythical Beasts</h5>
          <p>Explore the K & C Art Gallery's <i>Mythical Beasts</i> exhibit.</p>
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

        mainBody.innerHTML = `
        <div class="card-group">
  <div class="card">
    <img class="card-img-top" src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Thomas_Cole_-_The_Voyage_of_Life_Old_Age%2C_1842_%28National_Gallery_of_Art%29.jpg/1280px-Thomas_Cole_-_The_Voyage_of_Life_Old_Age%2C_1842_%28National_Gallery_of_Art%29.jpg" alt="Card image cap">
    <div class="card-body">
      <h5 class="card-title">Card title</h5>
      <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
      <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
    </div>
  </div>
  <div class="card">
    <img class="card-img-top" src="https://www.fridakahlo.org/images/paintings/self-portrait-with-necklace-of-thorns.jpg" alt="Card image cap">
    <div class="card-body">
      <h5 class="card-title">Card title</h5>
      <p class="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
      <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
    </div>
  </div>
  </div>
       `
        homeTitle = document.createElement('div')
        homeTitle.id = "explore-title"
        homeTitle.innerText = "Explore Our Collections!"

        btn1 = document.createElement('button')
        btn1.id = "journeys-room-btn"
        btn1.innerText = "Room 1"

        btn2 = document.createElement('button') 
        btn2.id = "kristian-room-btn"
        btn2.innerText = "Room 2"

    mainBody.append(homeTitle, btn1, btn2)

    btn1.addEventListener("click",function(){
        mainBody.innerHTML = ""
        fetch("http://localhost:3000/paintings") 
        .then(res => res.json())
        .then(paintings => {
            all_paintings = paintings.slice(0, 6)
            loadRoom(all_paintings)
        })
    })

    btn2.addEventListener("click",function(){
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
    userCollectionLink.addEventListener("click",function(){
        mainBody.innerHTML = ""

        let userRoomTitle = document.createElement('h2')
        userRoomTitle.innerText = "My Art Collection"
        mainBody.append(userRoomTitle)
        // var user =
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
                loadUserRoom(user.room.paintings)
            }
            , 1000);
            }
        })
    
    })
    
}





