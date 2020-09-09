const body = document.querySelector('body')
let room1Image = document.createElement('image')
const mainBody = document.querySelector('#main')
const button1 = document.getElementById('journeys-room-btn')
const userCollectionLink = document.getElementById('user-collection')

user = ""
// Fetch first user and set as global variable
fetch("http://localhost:3000/users/")
.then(res => res.json())
.then(users => {
    user = users[0]
})


setTimeout(function(){
// document.addEventListener("DOMContentLoaded",function(){


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
            setTimeout(function(){loadUserRoom(user.room.paintings)}, 1000);
            }
        )
    
    })
    
}, 1000)


