// Arrays and Objects Redo
// Jiya Khalsa Bangar
// 1 January 2026
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let MIN_QUESTION_COUNT = 1;
let MAX_QUESTION_COUNT = 15;

// defining the base class
class Question {
  constructor(content, answer) {
    this.content = content;
    this.answer = answer;
  }
}

// defining the subclass
// will do that later

class QuizGenerator {
  constructor() {
    this.rawText = "";
    this.quizData = []; // 2d array to store [Question, Answer] 
    this.questionObjects = []; // array of question objects 
  }
}

// helper function extracts keyword
// finds words to turn into fill in the blank
extractKeywords(text) {
  let words = words.split(" ");
  let keywords = [];

  for (let i = 0; i < words.length; i++) {
    // if a word is longer than 7 letters its a potential keyword
    if(words[i].length > 7) {
      keywords.push();
    }
  }
  return keywords;
}

generateQuiz(inputText) {
  this.rawText = inputText;
  let potentialKeywords = this.extractKeywords(this.rawText);
  
  // resets aray for a re-run
  this.quizData = [];
  this.questionObjects = [];

  // this loop creates questions
  for (let i = 0; i < potentialKeywords.length && i < MAX_QUESTION_COUNT; i++) {
    let keyword = potentialKeywords[i];
    let questionTest = "Identify the missing word : The concept of ______ is central in this text."

    // stores 2d array [Question, Answer] 
    this.quizData.push([questionTest, keyword]);

    // stores as an object
    let newQuestion = new KeywordQuestion(questionTest, keyword, inputText.substring(0, 50));
    this.questionObjects.push(newQuestion);

  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
}
