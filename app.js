let gameseq=[];
let userseq=[];

let btns=["orange" ,"red","purple","green"];

let started=false; //abhi game start nhi hua h
let level=0;
let h2=document.querySelector("h2");

document.addEventListener("keypress",function(){ //keypress(need to press key for this) is a function on eventlistener which will invoke call back function
    if(started==false){
        console.log("game started");
        started=true;
        levelup();
   } //this block will make sure that game will only start one time
});

function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash");
    },250);
}

function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function() {
        btn.classList.remove("userflash");
    },250);
}

function levelup(){
    userseq=[]; //jese hi level up hoga vese hi user seq khali ho jayega isliye user ko phirse pura seq sahi wala starting se dalna padega taki naya color flash ho  
    level++;
    h2.innerText= `Level ${level}`; //update the heading as per next moves

    //random btn choose from above written btns array
    let randIdx=Math.floor(Math.random()*3);
    let randColor=btns[randIdx];
    let randBtn=document.querySelector(`.${randColor}`); //color choose krke class bnai h 
    //console.log(randIdx);
    //console.log(randColor);
    //console.log(randBtn);
    gameseq.push(randColor);
    console.log(gameseq);
    gameFlash(randBtn); //aur phir usko show krvaya h
    
}

function checkAns(idx){
    //console.log("curr level: ",level);
    //let idx=level-1; --->its not a fixed value
    if(userseq[idx]==gameseq[idx]){ //now here two case arises .. 1.when user is in middle of the length of sequence -> then do nothing
        if(userseq.length==gameseq.length){
            setTimeout(levelup,1000);
        }                            //but in 2. when user enters the value as same in game seq then upgrade its level so that new color is generated
        //console.log("same value");
    }else{
        h2.innerHTML=`Game Over! Your score was <b>${level}</b> <br> Press any key to start again`;
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function() {
            document.querySelector("body").style.backgroundColor="white";
        },200);
        reset(); //when game is over -->need to reset the game so that user can play again without any trouble
    }
}

function btnPress() {
    //console.log("btn was pressed");
    let btn=this; //this will give the btn itself
    userFlash(btn);
    //doing this to add the color clicked by user into gameseq
    userColor=btn.getAttribute("id");
    userseq.push(userColor); 
    checkAns(userseq.length-1);
}

let allBtns=document.querySelectorAll(".btn");
for(btn of allBtns) {
    btn.addEventListener("click",btnPress); //jese hi btn press hoga -->btn was pressed will be printed
}

function reset(){
    started=false;
    gameseq=[];
    userseq=[];
    level=0;
}