const body = document.querySelector('body')
let room1Image = document.createElement('image')
const mainBody = document.querySelector('#main')
const button1 = document.getElementById('journeys-room-btn')
document.addEventListener("DOMContentLoaded",function(){
    

    button1.addEventListener("click",function(){
        mainBody.innerHTML = ""
        fetch("http://localhost:3000/paintings") 
        .then(res => res.json())
        .then(paintings => {
            loadRoom(paintings)
        })
    })

  
})