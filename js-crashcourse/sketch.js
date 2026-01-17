// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


// function setup() {
//   createCanvas(windowWidth, windowHeight);
// }

// function draw() {
//   background(220);
// }

// Arrays
// let marksOfStudent1 = 97;
// let marksOfStudent2 = 82;

// Calculate avrage of the given array

// let marks = [85, 97, 44, 37, 76, 60];

// let sum = 0;

// for (let mark of marks) {
//   sum += mark;
// }

// let average = sum/ marks.length;

// console.log("Average marks of class is " + average);


let prices = [250, 645, 300, 900, 50];

for (let i = 0; i < prices.length; i++) {
  let offer = prices[i] / 10;
  prices[i] -= offer;
}

console.log(prices);