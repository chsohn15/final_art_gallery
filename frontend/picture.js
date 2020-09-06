
document.addEventListener("DOMContentLoaded",function(){
    //alert("HEllo")
    


    let body = document.querySelector('body')
    body.onload = function(){
        draw()
    }

    function draw() {
        const canvas = document.getElementById('canvas');
        let ctx = canvas.getContext('2d');
      
        // Draw slice
        ctx.drawImage(document.getElementById('source'),
                      33, 71, 104, 124, 21, 20, 87, 104);
          // Draw frame
        ctx.drawImage(document.getElementById('frame'), 0, 0);
        //debugger
    }
})

