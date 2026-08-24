/*
* Title: Google Whale Talk
*
* Program Summary: Translates user input into whale language by extracting vowels and playing corresponding whale sounds.

* Program Element List: A List of the 10 Most Complex Concepts, Construct, Syntax Used.
*
* 1. Recursive function with callback chaining — playSequential, sound.onended
* 2. Do-while loop with multi-condition validation — translateAgain, getUserPhrase, determineWhaleDialect
* 3. Dynamic global variable assignment from local scope — determineWhaleDialect, activeTranslationMatrix
* 4. Cancellation propagation pattern — cancellationCheck, getUserPhrase, translateAgain, determineWhaleDialect
* 5. Bounded array history with unshift/pop — translatePhraseWhale, translatedPhraseHistory
* 6. Program loop without DOM refresh — runWhaleTalk, translateAgain
* 7. Dynamic DOM targeting with template literal IDs — makeHtmlHistory, clearTranslationHistory
* 8. Deferred DOM initialization — window.onload, navbar, handleNavbarScroll
* 9. Randomized switch statement — randomWhaleFactOrJoke, Math.random
* 10. Character-level array translation pipeline — translatePhraseWhale, translationMatrix, activeTranslationMatrix
*
*
* Authors (Teammate Names || Roles): Adrian (JS), Xavier (HTML/CSS), Jacob (HTML/CSS/JS)
* Version (#): 1.11
* Date (Last Updated): 24-04-26
* 
* 
*/





//FUNCTION DECLARATIONS
/*
* Summary: UI/UX functions, then get determine whale dialect(transformation matrix), get user phrase, translate phrase, output phrase, play appropriate sounds, random whale fact or joke, ask if translate again 
* @params: none
* @return: none
*/
function runWhaleTalk() { // Summary: UI/UX functions, then get determine whale dialect(transformation matrix), get user phrase, translate phrase, output phrase, play appropriate sounds, random whale fact or joke, ask if translate again 
	let translateAgainData;
	let keepTranslating;
	let dialectData;
	let whaleDialectNumber;
	let activeTranslationMatrix;
	let inputPhraseArray;
	let inputPhrase;
	let translatedPhrase;

	title();
	welcomeAlert();
	introAlert();
	instructionsAlert();
	dialectData = determineWhaleDialect();



	if (!dialectData) {
		return;

	} else {



		do {
			inputPhrase = getUserPhrase();



			if (!inputPhrase) {
				return;

			} else {
				activeTranslationMatrix = dialectData.activeTranslationMatrix;
				whaleDialectNumber = dialectData.whaleDialectNumber;
				inputPhraseArray = inputPhrase.split('');



				if (whaleDialectNumber === '1') {
					translatedPhrase = translatePhraseWhale(inputPhraseArray, activeTranslationMatrix);

				} else if (whaleDialectNumber === '2') {
					translatedPhrase = translatePhraseHumpback(inputPhraseArray, activeTranslationMatrix);

				} else if (whaleDialectNumber === '3') {
					translatedPhrase = translateBlueWhale(inputPhrase, activeTranslationMatrix);
					
				} else {
					return;

				}



				setLastTranslation(inputPhrase, translatedPhrase);
				outputWhaleTalk(inputPhrase, translatedPhrase);
				randomWhaleFactOrJoke();

				currentTranslatedPhrase = translatedPhrase;
				translateAgainData = translateAgain();
				keepTranslating = translateAgainData.keepTranslating;



				if (keepTranslating) {

					dialectData = translateAgainData.dialectData;

				}//END of if (keepTranslating)

			}// end of if-else



		} while ((keepTranslating === true));//end of do-while



	}//end of if-else



}//end of runWhaleTalk





/*
* Summary: Get a phrase from the user to translate to whale
* @params: none
* @return: Boolean — true if phrase is valid, false if cancelled
*/
function getUserPhrase() { // Summary: Get a phrase from the user to translate to whale
	//Var decs
	let inputPhrase;

	

	do {
		inputPhrase = prompt("Please enter a phrase to be translated into whale language:");



		if ((cancellationCheck(inputPhrase))) { return false; }// end of if



		if ((inputPhrase.trim() === "")) {
			alert("Oops! What do you want the whales to say? Your phrase can't be empty — give it another try! The whales are waiting to hear from you. 🐋");
			console.log("Oops! What do you want the whales to say? Your phrase can't be empty — give it another try! The whales are waiting to hear from you. 🐋");
		}// end of if



	} while ((inputPhrase.trim() === ""));//end of do-while



	inputPhraseHistory.unshift(inputPhrase);

	consoleDivider("🐋  PHRASE INPUT  🐋");
	alert(`So you want to hear the whales say '${inputPhrase}'? Let's see what they have to say!`);
	console.log(`So you want to hear the whales say '${inputPhrase}'? Let's see what they have to say!`);

	return inputPhrase;

}//end of getUserPhrase





/*
* Summary: Travese through array string and only store values found in vowel list AKA translation matrix
* @params: inputPhraseArray — array of letters and spaces from the user input phrase
* @return: none
*/
function translatePhraseWhale(inputPhraseArray, activeTranslationMatrix) {
	let translatedPhrase;
	let i;
	let v;
	let currentCharacter;
	let currentTranslationCharacter;

	translatedPhrase = [];



	// TRAVERSAL 1: Loop through user input characters
	for (i = 0; i < inputPhraseArray.length; i++) {
		currentCharacter = inputPhraseArray[i];



		// TRAVERSAL 2: Loop through translation matrix
		for (v = 0; v < activeTranslationMatrix.length; v++) {
			currentTranslationCharacter = activeTranslationMatrix[v];



			if (currentCharacter === currentTranslationCharacter) {
				translatedPhrase.push(currentCharacter);
				console.log(`${currentCharacter} is a vowel!`)
				// Stops checking once match is found
				break;
		

			} else {
				console.log(`${currentCharacter} is not a vowel!`)
			}// end of if (currentCharacter === currentTranslationCharacter)



		}// end of inner for (v = 0; v < activeTranslationMatrix.length; v++)



	}// end of outer for (i = 0; i < inputPhraseArray.length; i++)



	translatedPhrase = translatedPhrase.join('');
	translatedPhraseHistory.unshift(translatedPhrase);



	if (translatedPhraseHistory.length > 6) {

		translatedPhraseHistory.pop();

	}// end of if



	return translatedPhrase;
	
}// end of translatePhraseWhale





/*
* Summary: Traverse through array string and only store values found in vowel list AKA translation matrix
* @params: inputPhraseArray — array of letters and spaces from the user input phrase
* @return: none
*/
function translatePhraseHumpback(inputPhraseArray, activeTranslationMatrix) { // Summary: Traverse through array string and only store values found in vowel list AKA translation matrix
	let translatedPhrase;
	let i;
	translatedPhrase = [];



	for (i = 0; i < inputPhraseArray.length; i++) { //loops through each letter in the array and pushes into new array of letters and spaces 



		if ((activeTranslationMatrix.includes(inputPhraseArray[i]))) {
			translatedPhrase.push(inputPhraseArray[i]);
		}//end of if



	}//end of for



	translatedPhrase = translatedPhrase.join('');
	translatedPhraseHistory.unshift(translatedPhrase);



	if (translatedPhraseHistory.length > 6) {
		translatedPhraseHistory.pop();

	}//end of if translatedPhraseHistory.length > 5



	return translatedPhrase;
	
}//end of translatePhraseHumpback





/* 
Summary: Recursive inner vowel traversal
@parm {string} currentCharacter, @parm {number} vowelIndex, @parm {string} currentTranslation
@return {string}
*/
function traverseBlueWhaleVowels(currentCharacter, vowelIndex, currentTranslation, activeTranslationMatrix) {
	//var decs
	let currentVowel;



	// Base Case
	if (vowelIndex >= activeTranslationMatrix.length) {

		return currentTranslation;

	}//END of if (vowelIndex >= activeTranslationMatrix.length)



	currentVowel = activeTranslationMatrix[vowelIndex].toLowerCase();



	if ((currentVowel === ' ') || (currentVowel === '!') || (currentVowel === '?') || (currentVowel === '.') || (currentVowel === ',') || (currentVowel === ':')) {

		return traverseBlueWhaleVowels(currentCharacter, vowelIndex + 1, currentTranslation, activeTranslationMatrix);

	}//END of if ((currentVowel === ' ') || (currentVowel === '!') || (currentVowel === '?') || (currentVowel === '.') || (currentVowel === ',') || (currentVowel === ':'))



	// Match Found
	if (currentCharacter === currentVowel) {



		// Blue Whale Emphasis
		if (currentCharacter === "u") {

			currentTranslation += "UU";

		} else if (currentCharacter === "e") {

			currentTranslation += "EEE";

		} else {

			currentTranslation += currentCharacter.toUpperCase();

		}//END of if (currentCharacter === "u")



	}//END of if (currentCharacter === currentVowel)



	return traverseBlueWhaleVowels(currentCharacter, vowelIndex + 1, currentTranslation, activeTranslationMatrix);

}//END of traverseBlueWhaleVowels()





/* 
Summary: Recursive outer character traversal for blue whale translator
@parm {string} inputString, @parm {number} charIndex, @parm {string} translatedString
@return {string}
*/
function traverseBlueWhaleCharacters(inputString, charIndex, translatedString, activeTranslationMatrix) {
	let currentCharacter;



	// Base Case
	if (charIndex >= inputString.length) {

		return translatedString;

	}//END of if(charIndex >= inputString.length)



	currentCharacter = inputString[charIndex].toLowerCase();
	translatedString = traverseBlueWhaleVowels(currentCharacter, 0, translatedString, activeTranslationMatrix);

	return traverseBlueWhaleCharacters(inputString, charIndex + 1, translatedString, activeTranslationMatrix);

}//END of traverseBlueWhaleCharacters()





/* 
* Summary:Blue Whale translator function
* @parm {string} inputString
* @return {string}
*/
function translateBlueWhale(inputString, activeTranslationMatrix) {
	let translatedPhrase = traverseBlueWhaleCharacters(inputString, 0, "", activeTranslationMatrix);

	translatedPhraseHistory.unshift(translatedPhrase);



	if (translatedPhraseHistory.length > 6) {
		translatedPhraseHistory.pop();

	}//END of if (translatedPhraseHistory.length > 6)



	return translatedPhrase;

}//END of translateBlueWhale()





/*
* Summary: Output the translated phrase to the user and reiterate the original phrase
* @params: inputPhrase — the original phrase entered by the user, translatedPhrase — the translated whale phrase string
* @return: none
*/
function outputWhaleTalk(inputPhrase, translatedPhrase) { // Summary: Output the translated phrase to the user and reiterate the original phrase
	consoleDivider("🐋  TRANSLATION RESULT  🐋");



	if ((translatedPhrase === '')) {
		alert(`Hmm, the whales went silent on that one! It seems '${inputPhrase}' has no sounds in the current dialect — try a different phrase or dialect! 🐋`);
		console.log(`Hmm, the whales went silent on that one! It seems '${inputPhrase}' has no sounds in the current dialect — try a different phrase or dialect! 🐋`);

	} else {
		alert(`Translation complete!\nThe humans say: ${inputPhrase}\nThe Whales say: ${translatedPhrase}`);
		console.log(`Translation complete!\nThe humans say: ${inputPhrase}\nThe Whales say: ${translatedPhrase}`);
	}// end of if-else



}//end of outputWhaleTalk





/*
* Summary: Checks if the user cancelled a prompt and alerts them if so.
* @params: userInput — the value returned from a prompt() call
* @return: boolean — true if the user cancelled (input is null), false otherwise
*/
function cancellationCheck(userInput) { // Summary: Checks if the user cancelled a prompt and alerts them if so



	if ((userInput === null)) {
		alert("No worries — the program has been cancelled. Us whales will be waiting for you! Uooooo!");
		console.log("No worries — the program has been cancelled. Us whales will be waiting for you! Uooooo!");
		return true;

	} else {
		return false;

	}// end of if-else



}// end of cancellationCheck





/*
* Summary: Determine whale dialect/transformation matrix
* @params: none
* @return: whaleDialectNumber if dialect chosen, false if the user cancelled
*/
function determineWhaleDialect() { // Summary: Determine whale dialect/transformation matrix
	let whaleDialectNumber;
	let validDialectChosen;
	let activeTranslationMatrix;
	let translationMatrixWhale = ['a', 'e', 'i', 'o', 'u', ' ', 'A', 'E', 'I', 'O', 'U', '!', '?', '.', ',', ':'];
	let translationMatrixHumpback = ['e', 'i', 'E', 'I', '!', '?', '.', ',', ':', ' '];
	let translationMatrixBlue = ['o', 'u', 'O', 'U', ' ', '!', '?', '.', ',', ':'];

	validDialectChosen = false;

	consoleDivider("🐋  DIALECT SELECTION  🐋");

	do {
		whaleDialectNumber = prompt(`Please choose a whale dialect: 1. Whale 2. Humpback Whale 3. Blue Whale\nPress 1 for Whale\nPress 2 for Humpback\nPress 3 for Blue`);



		if ((cancellationCheck(whaleDialectNumber))) { return false; }// end of if



		if ((whaleDialectNumber === '1')) {
			activeTranslationMatrix = translationMatrixWhale;
			alert(`The whales will speak to you now!`);
			console.log(`You have chosen the standard whale dialect!`);
			validDialectChosen = true;

		} else if ((whaleDialectNumber === '2')) {
			activeTranslationMatrix = translationMatrixHumpback;
			alert(`The humpback whales will speak to you now!`);
			console.log(`You have chosen the Humpback Whale dialect!`);
			validDialectChosen = true;

		} else if ((whaleDialectNumber === '3')) {
			activeTranslationMatrix = translationMatrixBlue;
			alert(`The blue whales will speak to you now!`);
			console.log(`You have chosen the Blue Whale dialect!`);
			validDialectChosen = true;

		} else {
			alert("Oops, us whales don't know that dialect. Please enter a valid number between 1-3!");
			console.log("Oops, us whales don't know that dialect. Please enter a valid number between 1-3!");

		}//end of if-elseif-else



	} while ((!validDialectChosen));//end of do-while



	return { whaleDialectNumber, activeTranslationMatrix };

}// end of determineWhaleDialect





/*
* Summary: Checks if the user wants to translate another phrase and calls the appropriate functions
* @params: none
* @return: boolean — true if the user wants to translate again, false if they are done
*/
function translateAgain() {
	//Var declarations
	let userTranslateAgain;
	let dialectData;

	consoleDivider("🐋 TRANSLATE AGAIN? 🐋");

	userTranslateAgain = confirm("Would you like to translate another phrase?");



	if (userTranslateAgain) {

		alert("Woohoo, back into the ocean we go! Enter your next phrase and let's see what the whales have to say. 🐋");
		console.log("Woohoo, back into the ocean we go! Enter your next phrase and let's see what the whales have to say. 🐋");

		dialectData = determineWhaleDialect();



		if (!dialectData) {

			return { keepTranslating: false, dialectData: false };

		}// end of if



		return { keepTranslating: true, dialectData: dialectData };

	} else {

		alert("Done speaking with the whales? That's all right! 🐋");
		console.log("Done speaking with the whales? That's all right! 🐋");

		thankYou();

		return { keepTranslating: false, dialectData: false };

	}// end of if-else


	
}// end of translateAgain





/*
* Summary: Recursively plays whale sounds word by word based on the first character of each word
* @params: words — array of translated words, index — current word index
* @return: none
*/
function playSequential(words, whaleSoundMap, index) { // Summary: Recursively plays whale sounds word by word based on the first character of each word
	let firstChar;
	let sound;



	if ((index >= words.length)) {
		console.log("🐋 The whales have finished speaking! We hope you enjoyed the translation. Until next time, Uooooo! 🌊");
		return;
	}// end of if



	if ((words[index] === "")) {
		playSequential(words, whaleSoundMap, index + 1);
		return;

	}//END of if


	
	firstChar = words[index][0];
	sound = whaleSoundMap[firstChar];



	if ((sound)) {
		sound.play();


		
		sound.onended = function() {
			playSequential(words, whaleSoundMap, index + 1);

		}// end of onended


		
	} else {
		playSequential(words, whaleSoundMap, index + 1);
		
	}// end of if-else



}//end of playSequential





/*
* Summary: Splits the translated phrase into words and triggers sequential sound playback
* @params: translatedPhrase — the fully translated whale phrase string
* @return: none
*/
function speakWhaleTalk(translatedPhrase) { // Summary: Splits the translated phrase into words and triggers sequential sound playback
	let whaleSoundMap;
	let words;

	whaleSoundMap = { 'a': new Audio('WhaleSounds/WhaleA.mp3'), 'e': new Audio('WhaleSounds/WhaleE.mp3'), 'i': new Audio('WhaleSounds/WhaleI.mp3'), 'o': new Audio('WhaleSounds/WhaleO.mp3'), 'u': new Audio('WhaleSounds/WhaleU.mp3'), 'A': new Audio('WhaleSounds/WhaleA.mp3'), 'E': new Audio('WhaleSounds/WhaleE.mp3'), 'I': new Audio('WhaleSounds/WhaleI.mp3'), 'O': new Audio('WhaleSounds/WhaleO.mp3'), 'U': new Audio('WhaleSounds/WhaleU.mp3') };

	words = translatedPhrase.split(' ');
	playSequential(words, whaleSoundMap, 0);
}//end of speakWhaleTalk





/*
* Summary: Generates a random whale fact or joke
* @params: none
* @return: none
*/
function randomWhaleFactOrJoke() { // Summary: Generates a random whale fact or joke
	let messageNumber;
	let whaleFactOrJoke;

	messageNumber = (Math.floor((Math.random()) * 10)) + 1;



	switch (messageNumber) {

		case 1:
			whaleFactOrJoke = "Did you know? A blue whale's tongue alone weighs as much as an elephant! 🐋";
			break;

		case 2:
			whaleFactOrJoke = "Did you know? Sperm whales sleep vertically, floating near the surface like giant logs! 🐋";
			break;

		case 3:
			whaleFactOrJoke = "Did you know? Blue whales have hearts the size of a small car — and you can hear it beating from 2 metres away! 🐋";
			break;

		case 4:
			whaleFactOrJoke = "What do whales eat for dinner? Fish and ships! 🐋";
			break;

		case 5:
			whaleFactOrJoke = "Did you know? Sperm whales produce the loudest sound of any animal on Earth — their clicks can reach 230 decibels, loud enough to stun or even kill prey! 🐋";
			break;

		case 6:
			whaleFactOrJoke = "Did you know? Sperm whales hunt in complete darkness using echolocation, firing rapid clicks that bounce off squid up to 500 metres away! 🐋";
			break;

		case 7:
			whaleFactOrJoke = "Did you know? Whales can communicate with each other across entire ocean basins — their songs can travel thousands of kilometres! 🐋";
			break;

		case 8:
			whaleFactOrJoke = "Did you know? Whales are one of the only animals besides humans known to sing for pleasure! 🐋";
			break;

		case 9:
			whaleFactOrJoke = "Why did the whale cross the ocean? To get to the other tide! 🐋";
			break;

		case 10:
			whaleFactOrJoke = "Why did the whale get good grades? Because it was always blowing the competition out of the water! 🐋";
			break;

		default:
			whaleFactOrJoke = "ERROR - Whale Fact or Joke not found";
			break;

	}// END of switch whaleFactOrJoke



	consoleDivider("🌊  WHALE FACT / JOKE  🌊");
	console.log(whaleFactOrJoke);
	alert(whaleFactOrJoke);

}// end of randomWhaleFactOrJoke





//HTML/CSS FUNCTIONS
/*
* Summary: Appears and disappears the navbar when scrolling up and down
* @params: none
* @return: none
*/
function handleNavbarScroll() { // Summary: Appears and disappears the navbar when scrolling up and down
	let currentScroll = window.pageYOffset;



	if (currentScroll > lastScroll) {
		navbar.classList.add("hide");
		
	} else {
		navbar.classList.remove("hide");
		
	}// end of if-else



	lastScroll = currentScroll;

}// end of handleNavbarScroll





/*
* Summary: Sets the HTML to the last translation
* @params: none
* @return: none
*/
function setLastTranslation(inputPhrase, translatedPhrase) { 

	document.getElementById('lastMessage').innerText = inputPhrase;
	document.getElementById('lastTranslation').innerText = translatedPhrase;

}// end of setLastTranslation()





/*
* Summary: Sets the HTML to the translation history and shows its corresponding table
* @params: none
* @return: none
*/
function makeHtmlHistory() { // Summary: Sets the HTML to the translation history and shows its corresponding table
	let i;



	for (i = 0; i < translatedPhraseHistory.length; i++) {
		document.getElementById(`input${i}`).textContent = inputPhraseHistory[i];
		document.getElementById(`output${i}`).textContent = translatedPhraseHistory[i];
	}// end of setting history in html for loop



	document.getElementById('historyTable').style.display = 'flex';

}// end of makeHtmlHistory





/*
* Summary: Reset the translation history arrays to empty arrays
* @params: none
* @return: none
*/
function clearTranslationHistory() { // Summary: Reset the translation history arrays to empty arrays
	let i;



	for (i = 0; i < translatedPhraseHistory.length; i++) {
		document.getElementById(`input${i}`).textContent = '';
		document.getElementById(`output${i}`).textContent = '';
	}// end of clearing text of history in html for loop



	inputPhraseHistory = [];
	translatedPhraseHistory = [];
	console.log("Translation history has been cleared! The slate is clean and the whales are ready for a fresh start. Dive back in whenever you're ready! 🐋");
	alert("Translation history has been cleared! The slate is clean and the whales are ready for a fresh start. Dive back in whenever you're ready! 🐋");

}//end of clearTranslationHistory





//UI/UX FUNCTIONS---------------------------------------------------------------

/*
* Summary: Prints a styled divider with a section label to visually separate console output sections
* @params: sectionTitle — the label to display in the divider
* @return: none
*/
function consoleDivider(sectionTitle) { // Summary: Prints a styled divider with a section label to visually separate console output sections
	const dividerStyle = "color: #89CFF0; font-weight: bold; font-family: monospace;";
	console.log(" ");
	console.log(`%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`, dividerStyle);
	console.log(`%c  ${sectionTitle}`, dividerStyle);
	console.log(`%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`, dividerStyle);
	console.log(" ");
}// end of consoleDivider





/*
* Summary: Clears the console and displays the Whale Talk ASCII art title.
* @params: none
* @return: none
*/
function title() { // Summary: Clears the console and displays the Whale Talk ASCII art title
	const asciiTitleStyle = "color: white; background-color: #89CFF0; font-weight: bold; font-family: monospace;";
	const subtitleStyle = "color: white; background-color: #89CFF0; font-family: monospace; font-size: 10px;";

	console.clear();

	console.log("%c██╗    ██╗██╗  ██╗ █████╗ ██╗     ███████╗    ████████╗ █████╗ ██╗     ██╗  ██╗", asciiTitleStyle);
	console.log("%c██║    ██║██║  ██║██╔══██╗██║     ██╔════╝       ██╔══╝██╔══██╗██║     ██║ ██╔╝", asciiTitleStyle);
	console.log("%c██║ █╗ ██║███████║███████║██║     █████╗         ██║   ███████║██║     █████╔╝ ", asciiTitleStyle);
	console.log("%c██║███╗██║██╔══██║██╔══██║██║     ██╔══╝         ██║   ██╔══██║██║     ██╔═██╗ ", asciiTitleStyle);
	console.log("%c╚███╔███╔╝██║  ██║██║  ██║███████╗███████╗       ██║   ██║  ██║███████╗██║  ██╗", asciiTitleStyle);
	console.log("%c ╚══╝╚══╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚══════╝       ╚═╝   ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝", asciiTitleStyle);
	console.log("%c", asciiTitleStyle);
	console.log("%c  By Google", subtitleStyle);

}// end of title





/*
* Summary: Displays a personalized welcome message to the user.
* @params: none
* @return: none
*/
function welcomeAlert() { // Summary: Displays a personalized welcome message to the user

	consoleDivider("🌊  WELCOME  🌊");
	alert(` 🐋 Welcome to Whale Talk — your personal translator to the language of the ocean! Simply enter any phrase and we'll extract the vowels to reveal your message in whale talk. Dive in and see what the whales have to say!`);
	console.log(` 🐋 Welcome to Whale Talk — your personal translator to the language of the ocean! Simply enter any phrase and we'll extract the vowels to reveal your message in whale talk. Dive in and see what the whales have to say!`);

}// end of welcomeAlert





/*
* Summary: Introduces the purpose of the program to the user.
* @params: none
* @return: none
*/
function introAlert() { // Summary: Introduces the purpose of the program to the user

	alert("Whale Talk works by taking your phrase and extracting only the vowels — because that's how whales communicate! Uppercase vowels are also included to really make those whale calls pop. Enter any phrase and we'll show you what it sounds like beneath the waves!");
	console.log("Whale Talk works by taking your phrase and extracting only the vowels — because that's how whales communicate! Uppercase vowels are also included to really make those whale calls pop. Enter any phrase and we'll show you what it sounds like beneath the waves!");

}// end of introAlert





/*
* Summary: Explains to the user how to interact with the program and what to expect.
* @params: none
* @return: none
*/
function instructionsAlert() { // Summary: Explains to the user how to interact with the program and what to expect

	alert("Using Whale Talk is simple! When prompted, type in any phrase you'd like translated and hit OK; we'll handle the rest and show you your phrase in whale language. Hit Cancel at any time if you'd like to stop, and make sure your phrase isn't empty or the whales won't know what to say!");
	console.log("Using Whale Talk is simple! When prompted, type in any phrase you'd like translated and hit OK; we'll handle the rest and show you your phrase in whale language. Hit Cancel at any time if you'd like to stop, and make sure your phrase isn't empty or the whales won't know what to say!");

}// end of instructionsAlert





/*
* Summary: Displays a friendly thank-you message and encourages the user to return next week.
* @params: none
* @return: none
*/
function thankYou() { // Summary: Displays a friendly thank-you message and encourages the user to return next week

	consoleDivider("🌊  THANK YOU  🌊");
	alert("🐋 Thanks for using Whale Talk — the whales appreciated your visit! We hope you enjoyed communicating in the language of the ocean, and we'll see you next time. Until then, Uooooo! 🌊");
	console.log("🐋 Thanks for using Whale Talk — the whales appreciated your visit! We hope you enjoyed communicating in the language of the ocean, and we'll see you next time. Until then, Uooooo! 🌊");

}// end of thankYou



//Start of program ---------------------------------------------------------------------------------------------------------------

//Variables
let currentTranslatedPhrase = "";
let inputPhraseHistory = [];
let translatedPhraseHistory = [];

//HTML/CSS Variables
let lastScroll = 0;
let navbar;



window.onload = function() { // Summary: Waits for the DOM to load before assigning DOM elements and registering event listeners

	navbar = document.getElementById("navbar");
	window.addEventListener("scroll", handleNavbarScroll);

	//Beginning of MAIN
	runWhaleTalk();//Contains MAIN translatePhraseWhale function - translates user input into whale language
	//END of MAIN

}// end of window.onload



//end of program

/*
* Notes:
* Useful Regexs for code correcting: \)$, brackets without anything behind --- \}(?!/). curly braces without / immediately behind ---
*
*
*
*
*
*
*
* Test Code:
*
*
*
*
*
*
*
*
*/
