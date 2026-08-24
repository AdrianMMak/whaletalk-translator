function runWhaleTalk() { 
	
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

				}

			}



		} while ((keepTranslating === true));

	}

}






function getUserPhrase() { 
	
	let inputPhrase;

	

	do {
		inputPhrase = prompt("Please enter a phrase to be translated into whale language:");



		if ((cancellationCheck(inputPhrase))) { return false; }


		if ((inputPhrase.trim() === "")) {
			alert("Oops! What do you want the whales to say? Your phrase can't be empty — give it another try! The whales are waiting to hear from you. 🐋");
			console.log("Oops! What do you want the whales to say? Your phrase can't be empty — give it another try! The whales are waiting to hear from you. 🐋");
		}// end of if



	} while ((inputPhrase.trim() === ""));



	inputPhraseHistory.unshift(inputPhrase);

	consoleDivider("🐋  PHRASE INPUT  🐋");
	alert(`So you want to hear the whales say '${inputPhrase}'? Let's see what they have to say!`);
	console.log(`So you want to hear the whales say '${inputPhrase}'? Let's see what they have to say!`);

	return inputPhrase;

}





function translatePhraseWhale(inputPhraseArray, activeTranslationMatrix) {
	let translatedPhrase;
	let i;
	let v;
	let currentCharacter;
	let currentTranslationCharacter;

	translatedPhrase = [];


	for (i = 0; i < inputPhraseArray.length; i++) {
		currentCharacter = inputPhraseArray[i];


		for (v = 0; v < activeTranslationMatrix.length; v++) {
			currentTranslationCharacter = activeTranslationMatrix[v];

			if (currentCharacter === currentTranslationCharacter) {
				translatedPhrase.push(currentCharacter);
				console.log(`${currentCharacter} is a vowel!`)
				
				break;
		

			} else {
				console.log(`${currentCharacter} is not a vowel!`)
			}



		}

	}


	translatedPhrase = translatedPhrase.join('');
	translatedPhraseHistory.unshift(translatedPhrase);



	if (translatedPhraseHistory.length > 6) {

		translatedPhraseHistory.pop();

	}

	return translatedPhrase;
	
}





function translatePhraseHumpback(inputPhraseArray, activeTranslationMatrix) { 
	
	let translatedPhrase;
	let i;
	translatedPhrase = [];



	for (i = 0; i < inputPhraseArray.length; i++) {

		if ((activeTranslationMatrix.includes(inputPhraseArray[i]))) {
			translatedPhrase.push(inputPhraseArray[i]);
		}

	}

	translatedPhrase = translatedPhrase.join('');
	translatedPhraseHistory.unshift(translatedPhrase);



	if (translatedPhraseHistory.length > 6) {
		translatedPhraseHistory.pop();

	}

	return translatedPhrase;
	
}





function traverseBlueWhaleVowels(currentCharacter, vowelIndex, currentTranslation, activeTranslationMatrix) {
	
	let currentVowel;


	if (vowelIndex >= activeTranslationMatrix.length) {

		return currentTranslation;

	}

	currentVowel = activeTranslationMatrix[vowelIndex].toLowerCase();


	if ((currentVowel === ' ') || (currentVowel === '!') || (currentVowel === '?') || (currentVowel === '.') || (currentVowel === ',') || (currentVowel === ':')) {

		return traverseBlueWhaleVowels(currentCharacter, vowelIndex + 1, currentTranslation, activeTranslationMatrix);

	}

	if (currentCharacter === currentVowel) {

		if (currentCharacter === "u") {

			currentTranslation += "UU";

		} else if (currentCharacter === "e") {

			currentTranslation += "EEE";

		} else {

			currentTranslation += currentCharacter.toUpperCase();

		}

	}



	return traverseBlueWhaleVowels(currentCharacter, vowelIndex + 1, currentTranslation, activeTranslationMatrix);

}





function traverseBlueWhaleCharacters(inputString, charIndex, translatedString, activeTranslationMatrix) {
	let currentCharacter;

	if (charIndex >= inputString.length) {

		return translatedString;

	}

	currentCharacter = inputString[charIndex].toLowerCase();
	translatedString = traverseBlueWhaleVowels(currentCharacter, 0, translatedString, activeTranslationMatrix);

	return traverseBlueWhaleCharacters(inputString, charIndex + 1, translatedString, activeTranslationMatrix);

}





function translateBlueWhale(inputString, activeTranslationMatrix) {
	let translatedPhrase = traverseBlueWhaleCharacters(inputString, 0, "", activeTranslationMatrix);

	translatedPhraseHistory.unshift(translatedPhrase);



	if (translatedPhraseHistory.length > 6) {
		translatedPhraseHistory.pop();

	}

	return translatedPhrase;

}





function outputWhaleTalk(inputPhrase, translatedPhrase) { 
	
	consoleDivider("🐋  TRANSLATION RESULT  🐋");

	if ((translatedPhrase === '')) {
		alert(`Hmm, the whales went silent on that one! It seems '${inputPhrase}' has no sounds in the current dialect — try a different phrase or dialect! 🐋`);
		console.log(`Hmm, the whales went silent on that one! It seems '${inputPhrase}' has no sounds in the current dialect — try a different phrase or dialect! 🐋`);

	} else {
		alert(`Translation complete!\nThe humans say: ${inputPhrase}\nThe Whales say: ${translatedPhrase}`);
		console.log(`Translation complete!\nThe humans say: ${inputPhrase}\nThe Whales say: ${translatedPhrase}`);
	}

}





function cancellationCheck(userInput) { 

	if ((userInput === null)) {
		alert("No worries — the program has been cancelled. Us whales will be waiting for you! Uooooo!");
		console.log("No worries — the program has been cancelled. Us whales will be waiting for you! Uooooo!");
		return true;

	} else {
		return false;

	}

}





function determineWhaleDialect() { 
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



		if ((cancellationCheck(whaleDialectNumber))) { return false; }



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

		}



	} while ((!validDialectChosen));

	return { whaleDialectNumber, activeTranslationMatrix };

}





function translateAgain() {
	
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

		}


		return { keepTranslating: true, dialectData: dialectData };

	} else {

		alert("Done speaking with the whales? That's all right! 🐋");
		console.log("Done speaking with the whales? That's all right! 🐋");

		thankYou();

		return { keepTranslating: false, dialectData: false };

	}

}





function playSequential(words, whaleSoundMap, index) { 
	let firstChar;
	let sound;

	if ((index >= words.length)) {
		console.log("🐋 The whales have finished speaking! We hope you enjoyed the translation. Until next time, Uooooo! 🌊");
		return;
	}


	if ((words[index] === "")) {
		playSequential(words, whaleSoundMap, index + 1);
		return;

	}

	firstChar = words[index][0];
	sound = whaleSoundMap[firstChar];

	if ((sound)) {
		sound.play();

		sound.onended = function() {
			playSequential(words, whaleSoundMap, index + 1);

		}

	} else {
		playSequential(words, whaleSoundMap, index + 1);
		
	}

}





function speakWhaleTalk(translatedPhrase) {
	let whaleSoundMap;
	let words;

	whaleSoundMap = { 'a': new Audio('WhaleSounds/WhaleA.mp3'), 'e': new Audio('WhaleSounds/WhaleE.mp3'), 'i': new Audio('WhaleSounds/WhaleI.mp3'), 'o': new Audio('WhaleSounds/WhaleO.mp3'), 'u': new Audio('WhaleSounds/WhaleU.mp3'), 'A': new Audio('WhaleSounds/WhaleA.mp3'), 'E': new Audio('WhaleSounds/WhaleE.mp3'), 'I': new Audio('WhaleSounds/WhaleI.mp3'), 'O': new Audio('WhaleSounds/WhaleO.mp3'), 'U': new Audio('WhaleSounds/WhaleU.mp3') };

	words = translatedPhrase.split(' ');
	playSequential(words, whaleSoundMap, 0);
}





function randomWhaleFactOrJoke() { 
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

	}

	consoleDivider("🌊  WHALE FACT / JOKE  🌊");
	console.log(whaleFactOrJoke);
	alert(whaleFactOrJoke);

}





function handleNavbarScroll() { 
	let currentScroll = window.pageYOffset;



	if (currentScroll > lastScroll) {
		navbar.classList.add("hide");
		
	} else {
		navbar.classList.remove("hide");
		
	}

	lastScroll = currentScroll;

}





function setLastTranslation(inputPhrase, translatedPhrase) { 

	document.getElementById('lastMessage').innerText = inputPhrase;
	document.getElementById('lastTranslation').innerText = translatedPhrase;

}





function makeHtmlHistory() { 
	let i;

	for (i = 0; i < translatedPhraseHistory.length; i++) {
		document.getElementById(`input${i}`).textContent = inputPhraseHistory[i];
		document.getElementById(`output${i}`).textContent = translatedPhraseHistory[i];
	}

	document.getElementById('historyTable').style.display = 'flex';

}





function clearTranslationHistory() { 
	let i;

	for (i = 0; i < translatedPhraseHistory.length; i++) {
		document.getElementById(`input${i}`).textContent = '';
		document.getElementById(`output${i}`).textContent = '';
	}

	inputPhraseHistory = [];
	translatedPhraseHistory = [];
	console.log("Translation history has been cleared! The slate is clean and the whales are ready for a fresh start. Dive back in whenever you're ready! 🐋");
	alert("Translation history has been cleared! The slate is clean and the whales are ready for a fresh start. Dive back in whenever you're ready! 🐋");

}





function consoleDivider(sectionTitle) { 
	const dividerStyle = "color: #89CFF0; font-weight: bold; font-family: monospace;";
	console.log(" ");
	console.log(`%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`, dividerStyle);
	console.log(`%c  ${sectionTitle}`, dividerStyle);
	console.log(`%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`, dividerStyle);
	console.log(" ");
}





function title() { 
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

}





function welcomeAlert() { 

	consoleDivider("🌊  WELCOME  🌊");
	alert(` 🐋 Welcome to Whale Talk — your personal translator to the language of the ocean! Simply enter any phrase and we'll extract the vowels to reveal your message in whale talk. Dive in and see what the whales have to say!`);
	console.log(` 🐋 Welcome to Whale Talk — your personal translator to the language of the ocean! Simply enter any phrase and we'll extract the vowels to reveal your message in whale talk. Dive in and see what the whales have to say!`);

}





function introAlert() { 

	alert("Whale Talk works by taking your phrase and extracting only the vowels — because that's how whales communicate! Uppercase vowels are also included to really make those whale calls pop. Enter any phrase and we'll show you what it sounds like beneath the waves!");
	console.log("Whale Talk works by taking your phrase and extracting only the vowels — because that's how whales communicate! Uppercase vowels are also included to really make those whale calls pop. Enter any phrase and we'll show you what it sounds like beneath the waves!");

}





function instructionsAlert() { 

	alert("Using Whale Talk is simple! When prompted, type in any phrase you'd like translated and hit OK; we'll handle the rest and show you your phrase in whale language. Hit Cancel at any time if you'd like to stop, and make sure your phrase isn't empty or the whales won't know what to say!");
	console.log("Using Whale Talk is simple! When prompted, type in any phrase you'd like translated and hit OK; we'll handle the rest and show you your phrase in whale language. Hit Cancel at any time if you'd like to stop, and make sure your phrase isn't empty or the whales won't know what to say!");

}





function thankYou() { 

	consoleDivider("🌊  THANK YOU  🌊");
	alert("🐋 Thanks for using Whale Talk — the whales appreciated your visit! We hope you enjoyed communicating in the language of the ocean, and we'll see you next time. Until then, Uooooo! 🌊");
	console.log("🐋 Thanks for using Whale Talk — the whales appreciated your visit! We hope you enjoyed communicating in the language of the ocean, and we'll see you next time. Until then, Uooooo! 🌊");

}


let currentTranslatedPhrase = "";
let inputPhraseHistory = [];
let translatedPhraseHistory = [];


let lastScroll = 0;
let navbar;



window.onload = function() { 

	navbar = document.getElementById("navbar");
	window.addEventListener("scroll", handleNavbarScroll);
	
	runWhaleTalk();

}