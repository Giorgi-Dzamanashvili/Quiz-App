class Quiz {
    constructor(questions) {
        this.score = 0;
        this.questions = questions;
        this.questionIndex = 0;
    }

    getQuestionIndex() {
        return this.questions[this.questionIndex];
    }

    guess(answer) {
        if (this.getQuestionIndex().isCorrectAnswer(answer)) {
            this.score++
        }
        this.questionIndex++;
    }

    isEnded() {
        return this.questionIndex === this.questions.length;
    }
}

// QUESTION CLASS

class Question {
    constructor(text, choices, answer) {
        this.text = text;
        this.choices = choices;
        this.answer = answer;
    }

    isCorrectAnswer(choice) {
        return this.answer === choice;
    }
}

// DISPLAY QUESTION

function displayQuestion() {
    if (quiz.isEnded()) {
        showScores();
    } else {
        // SHOW NEXT QUESTIONS

        let questionElement = document.getElementById("question");
        questionElement.innerHTML = quiz.getQuestionIndex().text;

        // SHOW OPTIONS
        let choices = quiz.getQuestionIndex().choices;
        for (let i = 0; i < choices.length; i++) {
            let choiceElement = document.getElementById("choice" + i);
            choiceElement.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }

        showProgress();
    }
};

// GUESS FUNCTION

function guess(id, guess) {
    let button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess);
        displayQuestion();
    }
}

// SHOW QUIZ PROGRESS

function showProgress() {
    let currentQuestionNumber = quiz.questionIndex + 1;
    let progressElement = document.getElementById("progress");
    progressElement.innerHTML = 
    `შეკითხვა ნომერი ${currentQuestionNumber}`;
}

// SHOW SCORE

function showScores() {
    let quizEndHTML = 
        `
            <h1>ქვიზი დასრულდა</h1>
            <h2 id="score">თქვენ აიღეთ: ${quiz.score} ქულა ${quiz.questions.length} ქულიდან</h2>
            <div class="quiz-repeat">
                <a href="index.html">თავიდან დაწყება</a>
            </div>
        `;

        let quizElement = document.getElementById("quiz")
        quizElement.innerHTML = quizEndHTML;
}

// QUIZ QUESTIONS

let questions = [
    new Question(
        "როდის მოხდა დიდგორის ბრძოლა", ["1121 წელს", "1820 წელს", "1011 წელს", "1045 წელს"], "1121 წელს"
    ),
    new Question(
        "რომელია საქართველოს დედაქალი", ["ხაშური", "რუსთავი", "თბილისი", "გორი"], "თბილისი"
    ),
    new Question(
        "რომელ წელს დაიწყო COVID-19", ["2020 წელს", "2019 წელს", "2021 წელს", "2018 წელს"], "2019 წელს"
    ),
    new Question(
        'ვინ დაწერა "ვეფხისტყაოსანი"', ["ბიძინა ივანიშვილმა", "ვინმე კოლხმა", "ჩარლზ მენსონმა", "შოთა რუსთაველმა"], "შოთა რუსთაველმა"
    ),
    new Question(
        "ვინ არის საქართველოს მოქმედი პრეზიდენტი", ["ბიძინა ივანიშვილი", "1820 წელსლევან ბერძენიშვილი", "სალომე ზურაბიშვილი", "ნიკა მელია"], "სალომე ზურაბიშვილი"
    ),
    new Question(
        "რომელ წელს შევა საქართველო ნატოში", ["უკვე შესულია", "2022 წელს", "კაცმა არ იცის", "2025 წელს"], "კაცმა არ იცის"
    ),
    new Question(
        "რომელია ყველაზე გრძელი მდინარე მსოფლიოში", ["მტკვარი", "ნილოსი", "სურამულა", "ლისის ტბა"], "ნილოსი"
    ),
    new Question(
        "ლეგენდის თანახმად, რომელ მეცნიერს დაეცა ვაშლი", ["გია დვალს", "ავლიპ ზურაბიშვილს", "ნიკოლა ტესლას", "ისააკ ნიუტონს"], "ისააკ ნიუტონს"
    ),
    new Question(
        "ადამიანის რომელ ორგანოს ეწოდება ადემის ვაშლი", ["მაკლიურას", "ჰიპოთალამუსს", "თვალს", "ტვინს"], "მაკლიურას"
    ),
    new Question(
        "როგორ გარდაიცვალა ნიკოლოზ ბარათაშვილი", ["თავი მოიკლა", "ფილტვების ანთებით", "სმით", "ავტოავარიით"], "ფილტვების ანთებით"
    ),
];

let quiz = new Quiz(questions);

// DISPLAY QUESTION

displayQuestion();

// QOUNTDOWN

let time = 10;
let quizTimeInMinutes = time * 60 * 60;
quizTime = quizTimeInMinutes / 60;

let counting = document.getElementById("count-down");

function startCountDown() {
    let quizTimer = setInterval(function() {
        if (quizTime <= 0) {
            clearInterval(quizTimer);
            showScores();
        } else {
            quizTime--;
            let sec = Math.floor(quizTime % 60);
            let min = Math.floor(quizTime / 60) % 60;
            counting.innerHTML = `დრო: ${min} : ${sec}`;
        }
    }, 1000)
}

startCountDown();