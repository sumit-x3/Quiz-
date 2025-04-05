const questions=[{
    question:"Who played the character Dr. Doom?",
    answers:[
        {text:"varun dhawan", correct:false},
        {text:"robert downy jr", correct:true},
        {text:"chris evans",correct:false},
        {text:"jonny deep", correct:false}
    ]
},
{
    question: "Which planet is known as the Red Planet?",
    answers: [
        { text: "Earth", correct: false },
        { text: "Mars", correct: true },
        { text: "Jupiter", correct: false },
        { text: "Venus", correct: false }
    ]
},
{
    question: "What is the capital of Japan?",
    answers: [
        { text: "Seoul", correct: false },
        { text: "Beijing", correct: false },
        { text: "Tokyo", correct: true },
        { text: "Bangkok", correct: false }
    ]
},
{
    question: "Who wrote 'Harry Potter'?",
    answers: [
        { text: "J.R.R. Tolkien", correct: false },
        { text: "J.K. Rowling", correct: true },
        { text: "George R.R. Martin", correct: false },
        { text: "Rick Riordan", correct: false }
    ]
},

];

let questionElement=document.querySelector(".question");
let answerBtn=document.querySelector(".answer-buttons");
let nextBtn=document.querySelector("#next");

let curQsnIndex;
let score;

function selectAnswer(e){
    let selectedBtn=e.target;
    if(selectedBtn.dataset.correct){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    let arr=Array.from(answerBtn.children);
    arr.forEach(button=>{
        if(button.dataset.correct){
            button.classList.add("correct");
        }
        button.disabled=true;
    })
    nextBtn.style.display="block";
}

function showQuestion(){
    let curQuestion = questions[curQsnIndex];
    let questionNo=curQsnIndex+1;
    questionElement.innerHTML=questionNo + ". " + curQuestion.question;
    curQuestion.answers.forEach(answer => {
        let button=document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn")
        answerBtn.appendChild(button);
        if(answer.correct){
            button.dataset.correct=true;
        }
        button.addEventListener("click", selectAnswer)
    });

}

function resetState(){
    nextBtn.style.display="none"; 
    while(answerBtn.firstChild){
        answerBtn.removeChild(answerBtn.firstChild);
    }
}

function startQuiz(){
    resetState();
    curQsnIndex=0;
    score=0;
    nextBtn.innerHTML="Next";
    showQuestion();
}

function showScore(){
    resetState();
    questionElement.innerHTML=`your score is ${score} out of ${questions.length}`;
    nextBtn.style.display="block";

}

function handleBtn(){
    curQsnIndex++;
    if(curQsnIndex<questions.length){
        resetState();
        showQuestion();
    }else{
        showScore();
        nextBtn.innerHTML="play again";
    }
}

nextBtn.addEventListener("click",()=>{
    if(curQsnIndex<questions.length){
        handleBtn();
    }else{
        startQuiz();
    }
})

startQuiz();
