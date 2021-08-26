// selecting the elements
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");

//choices
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");

//counter
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");

//score
const scoreDiv = document.getElementById("scoreContainer");

// questions creation(array)
let questions = [
    {
        question : "Joe, _______ to reason, insisted on trying to swim to the island alone.",
        imgSrc : "img/difficult.jpg",
        choiceA : "implacable",
        choiceB : "impervious",
        choiceC : "impinging",
        correct : "A"
    },
    {
        question : "The reformer _________ against a society in which wealth is distributed so unequally.",
        imgSrc : "img/moderate.jpg",
        choiceA : "fulsome",
        choiceB : "fulminated",
        choiceC : "fracased",
        correct : "B"
    },
    {
        question : "One of the great _________ in economics is how to achieve full employment without high inflation.",
        imgSrc : "img/easy.jpg",
        choiceA : "contiguous",
        choiceB : "continence",
        choiceC : "connundrums",
        correct : "C"
    }
];

// create some variables

const lastQuestion = questions.length - 1;      //index of last question
let runningQuestion = 0;        //index of current question
let count = 0;
const questionTime = 10; // 10s
const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

// render a question
function renderQuestion(){                          
    let q = questions[runningQuestion];             //questions, assigns current question
    
    question.innerHTML = "<p>"+ q.question +"</p>";
    qImg.innerHTML = "<img src="+ q.imgSrc +">";
    choiceA.innerHTML = q.choiceA;                  //choices
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}
 
start.addEventListener("click",startQuiz);

// start quiz
function startQuiz(){
    start.style.display = "none";       //hide style
    renderQuestion();
    quiz.style.display = "block";       //put qui in blocks
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000); // 1000ms = 1s, counter interval every 1 seconf
}

// render progress
function renderProgress(){                  //adds progress in time
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}

// counter render
//gauge 
function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++             //changes width of gauge with time
    }else{
        count = 0;
        // change progress color to red
        answerIsWrong();
        if(runningQuestion < lastQuestion){     //check if all ques are done
            runningQuestion++;
            renderQuestion();
        }else{
            // end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

// checkAnwer

function checkAnswer(answer){       //a,b,c as answ
    if( answer == questions[runningQuestion].correct){
        // answer is correct
        score++;
        // change progress color to green
        answerIsCorrect();
    }else{
        // answer is wrong
        // change progress color to red
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < lastQuestion){     //donot exceed total no of ques
        runningQuestion++;
        renderQuestion();
    }else{
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }
}

// answer is correct                        //changes to green
function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

// answer is Wrong              //changes to red
function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

// score render
function scoreRender(){
    scoreDiv.style.display = "block";
    
    // calculate the amount of question percent answered by the user
    const scorePerCent = Math.round(100 * score/questions.length);
    
    // choose the image based on the scorePerCent
    let img = (scorePerCent >= 80) ? "img/5.png" :
              (scorePerCent >= 60) ? "img/4.png" :
              (scorePerCent >= 40) ? "img/3.png" :
              (scorePerCent >= 20) ? "img/2.png" :
              "img/1.png";
    
    scoreDiv.innerHTML = "<img src="+ img +">";
    scoreDiv.innerHTML += "<p>"+ scorePerCent +"%</p>";
}





















