let gameSeq = [];
let userSeq = [];

let btns = ["red", "green","yellow", "blue"];
    
let started = false;
let level = 0;
let previousLevel = 0;

let h3 = document.querySelector("h3");

document.addEventListener("keypress", function(event){
    if(started == false){
        console.log("Game is started");
        started = true;
        levelUp();  
    }
    else{
        event.preventDefault();
    }
});

function systemFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash");
    }, 250);
}  

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function() {  
        btn.classList.remove("userflash");
    }, 250);
}  


function levelUp() {
    userSeq = [];
    level++;
    h3.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random()*4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    
    gameSeq.push(randColor);
    console.log(gameSeq);
    systemFlash(randBtn);
}

function wrongColor(){
    let body = document.querySelector("body");
    body.classList.add("bodyColor");
    setTimeout(function(){
        body.classList.remove("bodyColor");
    }, 1000)
}

function checkAns(idx){
    if(userSeq[idx] === gameSeq[idx]) {
        console.log("userSeq[idx] = ",userSeq[idx]);
        console.log("gameSeq[idx] = ",gameSeq[idx]);
        if(userSeq.length == gameSeq.length) {
            console.log("userSeq.length = ",userSeq.length);
            console.log("gameSeq.length = ",gameSeq.length);
            setTimeout(levelUp, 1000);
        }
    }
    else{
        wrongColor();
        h3.innerHTML =` Game over.....! Your score was <b>${level}</b> <br> Press any key to start again..`;
        
       let currentLevel = level;
        console.log(currentLevel);
        if(previousLevel <= currentLevel){
            previousLevel = currentLevel;
        }
        reset();
    }
}
function btnPress(){
    let btn = this;
    
    userFlash(btn);

    userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click",btnPress);
}

function reset(){
    started = false;
    userSeq = [];
    gameSeq = [];
    level = 0;  
}

 
let button = document.querySelector("button");
button.addEventListener("click",()=>{
    button.innerHTML = `<b>Till now Your highest level is ${previousLevel}</b>`; 
    reset();
  
     document.getElementById("okbuttom").style.display="inline";
});


let gobacktohome = () => {
    document.getElementById("score").innerHTML="";
    document.getElementById("score").textContent="Click here to See Highest Score";
    document.getElementById("score").style.fontWeight="bold";
    document.getElementById("okbuttom").style.display="none";

}