let numberOfQuestion=1
let firstNum=0
let secondNum=0
let answer=0

let savedStatus = JSON.parse(localStorage.getItem("status")) || {"win": 0, "lose": 0};
let succsed = savedStatus.win;
let lose = savedStatus.lose;

let timer=0
let time=0
const pageTimer=document.querySelector("#timer")
const targil=document.querySelector("#targil")
const optionsArray=Array(4).fill(-99)
const numberQ=document.querySelector("#numberQ")
const scoreDisplay=document.querySelector("#score")

const updateScoreDisplay = () => {
    if(scoreDisplay) scoreDisplay.textContent = `Wins: ${succsed} | Losses: ${lose}`;
}

const saveStatus = () => {
    localStorage.setItem("status", JSON.stringify({"win": succsed, "lose": lose}));
    updateScoreDisplay();
}

const startGame=()=>{
    updateScoreDisplay();
    for(let i=1;i<=4;i++)
    {
        const currOpt=document.querySelector(`#opt${i}`)
        currOpt.addEventListener("click",()=>{
            clearInterval(timer)
            if(currOpt.textContent===answer.toString())
                succsed++
            else lose++
            
            saveStatus()
            doQuestion()
        })
    }
    doQuestion()
}

const FillOtherOptions=(dont,thePos)=>{
    let opt=0
    for(let i=0;i<4;i++)
    {
        if(i!==thePos)
        {
            opt=(Math.floor(Math.random()*100)+1)
            while(opt===dont)
             opt=(Math.floor(Math.random()*100)+1);
            optionsArray[i]=opt
        }
    }
}

const createAnswers=()=>{
    for(let i=1;i<=4;i++)
    {
        const currOpt=document.querySelector(`#opt${i}`)
        currOpt.textContent=optionsArray[i-1]
    }
}

function turnTimerOn(){
    time=10
    pageTimer.textContent=time
    timer=setInterval(()=>{
        time--
        pageTimer.textContent=time
        if(time===0)
        {
            lose++
            saveStatus()
            clearInterval(timer)
            doQuestion()
        }
    },1000)
}

function finishGame(){
    const what=document.querySelector("#what")
    const op=document.querySelector("#options")
    const timerText=document.querySelector("#timerText")
    what.style.display="none"
    op.style.display="none"
    timerText.style.display="none"
    const message=document.createElement("div")
    message.textContent="מספר התשובות הנכונות "+succsed.toString()+"\nתשובות שגויות "+ "  "+lose.toString()
    const restart=document.createElement("button")
    restart.textContent="האם ברצונך רוצה לשחק שוב?"
    const sec=document.querySelector("section")
    sec.append(message)
    sec.append(restart)
    restart.addEventListener("click",()=>{
        restart.remove()
        message.remove()
        succsed=0
        lose=0
        numberOfQuestion=1
        what.style.display="flex"
        op.style.display="flex"
        timerText.style.display="flex"
        doQuestion()
    })
}

function doQuestion(){
    if(numberOfQuestion===11) 
    {
        finishGame()
        return
    }
    numberQ.textContent=numberOfQuestion
    numberOfQuestion++
        firstNum=Math.floor(Math.random()*10)+1
    secondNum=Math.floor(Math.random()*10)+1
       
    let simbol=Math.floor(Math.random()*2)+1
    let sim='+'
    switch(simbol){
        case 1: {answer=firstNum+secondNum; sim='+'; break}
        case 2: {answer=firstNum*secondNum; sim='*'; break}
    }
    targil.textContent=firstNum+sim+secondNum
    
    let answerPos=Math.floor(Math.random()*4) 
    optionsArray[answerPos]=answer
    FillOtherOptions(answer,answerPos)
    createAnswers()
    turnTimerOn()
}

startGame()