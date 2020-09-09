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
})


setTimeout(function(){

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
        <div class="carousel-caption d-none d-md-block">
          <h5>First slide label</h5>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </div>
      </div>
      <div class="carousel-item">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Thomas_Cole_-_The_Voyage_of_Life_Youth%2C_1842_%28National_Gallery_of_Art%29.jpg/800px-Thomas_Cole_-_The_Voyage_of_Life_Youth%2C_1842_%28National_Gallery_of_Art%29.jpg" class="d-block w-100" alt="...">
        <div class="carousel-caption d-none d-md-block">
          <h5>Second slide label</h5>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
      </div>
      <div class="carousel-item">
        <img src="https://www.bertc.com/subfour/g126/images/goncharova.jpg" class="d-block w-100" alt="...">
        <div class="carousel-caption d-none d-md-block">
          <h5>Third slide label</h5>
          <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
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


    

    //debugger
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
    
}, 1000)


