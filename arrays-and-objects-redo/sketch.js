// Arrays and Objects Redo
// Jiya Khalsa Bangar
// 1 January 2026


//Sources:
// https://p5js.org/examples/input-elements-dom-form-elements/ (reference to p5js.dom library features)

// Extra for Experts:
// - I used Object-Oriented Programming (Inheritance with subclass)  
// - Implemented a custom text cleaning algorithm
// - Used p5js DOM elements for user input

let MAX_QUESTIONS = 15;

let inputField;
let generateButton;
let quizResults = [];

let generator; // we will store our QuizGenerator here


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

class QuizGenerator {
  constructor() {
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

  // Extra for experts
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
    
    
    // resets aray for a re-run
    this.questionObjects = [];
  
    // this loop creates questions
    for (let i = 0; i < potentialKeywords.length && i < MAX_QUESTION_COUNT; i++) {
      let keyword = potentialKeywords[i];
      let questionTest = "Identify the missing word : The concept of ______ is central in this text.";
  
      // stores 2d array [Question, Answer] 
      this.quizData.push([questionTest, keyword]);
  
      // stores as an object
      // the .substring method is extracting first 50 characters of the text to show a small preveiw or snippet of the source
      let newQuestion = new KeyWordQuestion(questionTest, keyword, inputText.substring(0, 50));
      this.questionObjects.push(newQuestion);
  
    }
  }
}

// p5js setup 
function setup() {
  createCanvas(windowWidth, windowHeight);

  generator = new QuizGenerator(); // initialize the class

  // created the text area where you can paste the text 
  // referenced from p5js form elements 
  inputField = createInput();
  inputField.position(20, 50);
  inputField.size(300, 150);

  // created a p5js button tha generates the quiz
  generateButton = createButton("Generate Quiz");
  generateButton.position(20, 210);

  // when the button is clicked we run the startQuiz function
  generateButton.mousePressed(startQuiz);
}


// now we use the class 
function startQuiz() {
  let fullText = inputField.value();
  let words = fullText.split(" ");

  quizResults = []; // this clears the old quiz

  for (let i = 0; i < words.length; i++) {
    // look for long words about 8+ letters
    if (words[i].length >= 8 && quizResults.length < MAX_QUESTIONS) {
      
      // ceated an object 
      let questionObject = {
        question: "Fill in the blank: The text mentions ________.",
        answer: words[i],
        wordLength: words[i].length
      };

      // pushes the question to an array
      quizResults.push(questionObject);

    } 
  } 
}

function draw() {
  background(220);
  text("Check (F12) console for more information!", 20, 20);
  text("Paste text here: ", 20, 40);
  
  // we will loop through the array to show the results on the screen
  for (let i = 0; i < quizResults.length; i++) {
    let y = 280 + i * 20;
    // this displays the answer from the Object inside the Array
    text(i + 1 + "." + quizResults[i].answer, 20, y);
  }
}
