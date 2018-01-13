
//some variables to target certain HTML elements

//Required variables for assigment
let missed = 0; //number of missed guesses
const qwerty = document.getElementById('qwerty'); //the keyboard
const phrase = document.getElementById('phrase'); //the phrase display

const phraseUL = phrase.children; //ul where the phrase will be appended to
const scoreboard = document.getElementById('scoreboard'); //the scoreboard
const scoreboardOL = scoreboard.children[0]; //OL where the lives are contained
const tries = document.getElementsByClassName('tries'); //the hearts used as 'lives'
const overlay = document.getElementById('overlay'); //start overlay when page loads
let title = overlay.children;
let count = 4 //this is used for the lives system, making sure the right heart greys out
const startButton = document.getElementsByClassName("btn__reset"); //start button

//array of phrases
const phrases = [
	"I love coding",
	"Javascript is the best",
	"Treehouse is great",
	"I like the Slack channel",
	"I like the techdegree"
];

//when the start button is clicked, it hides the starting overlay
startButton[0].addEventListener('click', () => {
	overlay.style.display = 'none';
});

//chooses a random string from an array of strings and splits it into it's characters
function getRandomPhraseArray(arr) {
	const numberOfArrElements = arr.length - 1;
	const randomInteger = Math.round(numberOfArrElements * ( Math.random() ) ); 
	const currentArrElement = arr[randomInteger];
	const splitArray = currentArrElement.split("");
	return splitArray;
}

//takes a string with it's characters split, creates LI elements, and separates letters from spaces 
function addPhraseToDisplay(arr) {
	for(i=0 ; i<arr.length ; i++){
		const LI = document.createElement("li")
		LI.style.transition = "all 2s 0.5s"; //CSS transition for each letter

		//adds the class 'letter' to array elements that are not empty strings
		if(arr[i] !== " "){
			LI.textContent = arr[i];
			LI.className = "letter";
		}else{
			LI.textContent = arr[i];
			LI.className = "space";
		} 
		//appends the created li to the phrase ul
		phraseUL[0].appendChild(LI);
	}	
}

//removes the existing phrase from the display and adds a new empty UL
function removePhraseFromDisplay(arr){
	phrase.removeChild(phraseUL[0]);
	const UL = document.createElement("ul");
	phrase.appendChild(UL);
}

//adds lives back to the scoreboard OL
function addLives(){
	for(i=0 ; i<tries.length ; i++){
		tries[i].children[0].setAttribute('src','images/liveHeart.png');
		count = 4;
	}
}

//checks for the clicked letter and shows letters that match
function checkLetter(clickedLetter){
	const letters = document.getElementsByClassName('letter');
	let matchingLetter = null;
	for(i=0 ; i<letters.length ; i++){
		const currentLetter = letters[i].textContent.toLowerCase();
		
		if(currentLetter === clickedLetter){
			
			letters[i].className += " show";
			matchingLetter = currentLetter;
		}
	}
	return matchingLetter;
}

//checks if you win or lose and runs the resetgame function
function checkWin(){

	let classOfLetters = document.getElementsByClassName('letter');
	let classOfShow = document.getElementsByClassName('show');

	if(classOfLetters.length === classOfShow.length){
		overlay.className = "win";
		overlay.style.display = "";
		title[0].textContent = "You Win!"
		startButton[0].textContent = "Reset Game";
		resetGame();
	}else if(missed === 5){
		overlay.className = "lose";
		overlay.style.display = "";
		title[0].textContent = "You Lose!"
		startButton[0].textContent = "Reset Game";
		resetGame();
	}
}

//resets the game
function resetGame(){
	//resets the keyoard so all keys are enabled and unclicked
	for(i=0 ; i<keyboardLetters.length ; i++){ 
		keyboardLetters[i].removeAttribute('disabled');
		keyboardLetters[i].className = "";
	}
	removePhraseFromDisplay(); //removes the old phrase
	phraseArray = getRandomPhraseArray(phrases);
	addPhraseToDisplay(phraseArray); //adds a new phrase
	addLives(); //adds lives back
	missed = 0; //resets missed guesses
}

////////////////////////////////////////////////////////////////////////////////////////////
//all functions are above


//takes a random phrase from the array and adds it to the display
let phraseArray = getRandomPhraseArray(phrases);
addPhraseToDisplay(phraseArray);

//adds an event listener to the keyboard buttons only
//disables selected buttons
//removes a life if letter isn't in the display
//checks if you win or lose
qwerty.addEventListener('click', (e) => {
	if(e.target.tagName === 'BUTTON'){ //checks to make sure only buttons are clicked
		e.target.className = "chosen";
		e.target.setAttribute('disabled',true);
		const keyboardLetter = e.target.textContent;
		// console.log(keyboardLetter);
		let letterFound = checkLetter(keyboardLetter);
		if(letterFound === null){
			tries[count].children[0].setAttribute('src','images/lostHeart.png');
			missed += 1;
			count = count -1
		}
		checkWin();
	}	
});

keyboardLetters = qwerty.getElementsByTagName("button");




