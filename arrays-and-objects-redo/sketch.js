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
// this allows for us to keep the code efficient without repeating the Question class again
class KeyWordQuestion extends Question {
  constructor(content, answer, snippet) {
    
    // super() calls the constructor of the parent Question class
    // refernced from Inheritence OOP demo done in class
    super(content, answer); // calls the content/answer to the question parent

    // this.snippet is unique to KeywordQuestion 
    this.snippet = snippet;
  }
}

// will do that later

class QuizGenerator {
  constructor() {
    this.rawText = "";
    this.quizData = []; // 2d array to store [Question, Answer] 
    this.questionObjects = []; // array of question objects 
  }

  // helper function extracts keyword
  // finds words to turn into fill in the blank
  extractKeywords(text) {
    let words = text.split(" ");
    let keywords = [];
  
    for (let i = 0; i < words.length; i++) {
      // if a word is longer than 7 letters its a potential keyword
      if(words[i].length > 7) {
        let clean = this.cleanPunctuation(words[i]);
        keywords.push(clean);
      }
    }
    return keywords;
  }


  // helper function that manually cleans punctuation from a string
  cleanPunctuation(word) {
    // searched up most commonly used punctuations on the web 
    let FORBIDDEN = [".", ",", "!", "?", "(",")",":", ";", "''", "/"];
    let result = "";

    for(let character of word) {
      // .includes() checks if the current character is in our punctuation array
      if (!FORBIDDEN.includes(character)) {
        result += character;
      }
    }
    // searched ai for this function -> toLowerCase()
    return result.toLowerCase(); // lowercase makes it easier for matching 
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
      let questionTest = "Identify the missing word : The concept of ______ is central in this text.";
  
      // stores 2d array [Question, Answer] 
      this.quizData.push([questionTest, keyword]);
  
      // stores as an object
      // the .substring method is extracting first 50 characters of the text to show a small preveiw or snippet of the source
      let newQuestion = new KeywordQuestion(questionTest, keyword, inputText.substring(0, 50));
      this.questionObjects.push(newQuestion);
  
    }
  }
}

let generator;

function setup() {
  createCanvas(windowWidth, windowHeight);
  generator = new QuizGenerator();

  // test runb
  generator.generateQuiz("Programming reqires logic and reasoning.");
  console.log(generator.questionObjects);
}

function draw() {
  background(220);
  text("Check (F12) console for more information!", 20, 20);
}
