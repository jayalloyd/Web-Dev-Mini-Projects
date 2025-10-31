const randomColor = function () {
    const hex = "0123456789ABCDEF"
    let color = "#";
    for (let i = 0 ; i < 6 ; i++) {
        color += hex[Math.floor((Math.random()*16))]
    };
    return color;
}
let interwalId ;
  
const startChangingColor = function () {
    const changeBycolor = function() {
        document.body.style.backgroundColor = randomColor();
    }
    if (!interwalId) {
        interwalId = setInterval(changeBycolor,100); 
    }
}

const stopChangingColor = function () {
    clearInterval(interwalId);
    interwalId = null; 

}
document.querySelector("#start").addEventListener("click" ,startChangingColor )
document.querySelector("#stop").addEventListener("click" ,stopChangingColor )