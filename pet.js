import inquirer from "inquirer";

let pet = {
	name: "",
	type: "",

	health: 4,
	energy: 3,
	hunger: 7,
	happy: 3,

	sleeping: false,

	age: 0,
	smarts: 0,
	arts: 0,
	strength: 0,
};

// create stat check

let actions = {
	// basic actions
	petPlay: function () {
		pet.hunger += 1;
		pet.energy -= 1;
		pet.happy += 2;
		console.clear();
	},
	feedPet: function () {
		pet.hunger -= 2;
		pet.health += 1;
		console.clear();
	},
	nap: function () {
		pet.energy = 10;
		console.clear();
	},
	showStats: function () {
		console.log(
			`\nHunger: ${pet.hunger}\nHealth: ${pet.health}\nEnergy: ${pet.energy}\nHappiness: ${pet.happy}\nAge: ${pet.age}\nSmarts: ${pet.smarts}\nCreativity: ${pet.arts}\nStrength: ${pet.strength}`
		);
	},
	// stat check
	statCheck: function () {
		return new Promise((reject, resolve) => {
			if ((pet.sleeping = true)) {
				reject(`${pet.name} is sleeping!`);
			} else if (pet.hunger > 8) {
				reject(`${pet.name} is too hungry to do that.`);
			} else if (pet.energy < 2) {
				reject(`${pet.name} is too tired to do that.`);
			} else if (pet.happy < 2) {
				reject(`${pet.name} is too sad to do that.`);
			} else {
				resolve(true);
			}
		});
	},
	// Level actions
	read: async function () {
		let response = await actions.statCheck();
		if (response.includes("hungry")) {
			console.log(response);
		} else if (response.includes("sad")) {
			console.log(response);
		} else if (response.includes("tired")) {
			console.log(response);
		} else {
			pet.smarts++;
			pet.energy--;
			pet.happy--;
		}
		console.clear();
	},
	exercisePet: function () {
		pet.strength++;
		pet.hunger++;
		pet.energy--;
		console.clear();
	},
	paint: function () {
		pet.arts++;
		pet.energy--;
		pet.happy++;
		console.clear();
	},
};

const questionTime = () => {
	inquirer
		.prompt([
			{
				type: "list",
				name: "petType",
				message: "Hello! What sort of pet would you like?",
				choices: ["Ferret", "Snake", "Pig"],
			},
			{
				type: "input",
				name: "petName",
				message: "And what name would you like to give it?",
			},
		])
		.then((answer) => {
			pet.name = answer.petName;
			console.log(pet.name);
			pet.type = answer.petType;
			console.log(pet.type);
		})
		.then(() => gameLoop());
};

const gameLoop = () => {
	// code function to check stats - eg. if too tired, refuse to play etc, if energy < 2 prompt nap
	pet.age += 0.5;
	if (pet.age > 10) {
		endGame();
		return;
	}

	inquirer
		.prompt([
			{
				type: "list",
				name: "actions",
				message: "What would you like to do with your pet?",
				choices: ["Play", "Feed", "Nap", "Exercise", "Read", "Paint"],
			},
		])
		.then((answer) => {
			console.log(answer);
			if (answer.actions === "Play") {
				actions.petPlay();
			} else if (answer.actions === "Feed") {
				actions.feedPet();
			} else if (answer.actions === "Nap") {
				actions.nap();
			} else if (answer.actions === "Exercise") {
				actions.exercisePet();
			} else if (answer.actions === "Read") {
				actions.read();
			} else if (answer.actions === "Paint") {
				actions.paint();
			}
			actions.showStats();
		})
		.then(() => gameLoop());
};

const endGame = () => {
	if (pet.health < 3 || pet.happy < 3 || pet.energy < 3) {
		console.log("Your pet is sickly. Bad ending");
		badEnd();
	} else if (pet.smarts > 9) {
		smartEnd();
	} else if (pet.arts > 9) {
		artsEnd();
	} else if (pet.strength > 9) {
		jockEnd();
	} else {
		averageEnd();
	}
};

// Functions for different endings
// (Put into object?)

const badEnd = () => {
	console.log("You mistreated your pet. You lose.");
	restart();
};

const smartEnd = () => {
	console.log(
		`Congratulations! ${pet.name} is a very smart ${pet.type}.\nThey will go on to become a burned out wreck by the end of twenty five, retrain, and spend the rest of their miserable life coding.`
	);
	restart();
};

const artsEnd = () => {
	console.log(
		`Congratulations! ${pet.name} is a very creative ${pet.type}.\nThey will go to university, get way too into drugs, drop out, and end up working in a bar.`
	);
	restart();
};

const jockEnd = () => {
	console.log(
		`Congratulations! ${pet.name} is a very strong ${pet.type}.\nThey go on to get a job working in a warehouse, where their strong body is eventually ruined by the physical work, long hours, and low pay.`
	);
	restart();
};

const averageEnd = () => {
	console.log(
		`Well! You kept your pet alive. They never really specialised in anything, but that's alright.\nWith their array of skills, they go on to get an average job at an average office, and live an averagely happy life.`
	);
	restart();
};

const resetStats = () => {
	pet.energy = 3;
	pet.health = 4;
	pet.hunger = 7;
	pet.happy = 3;
	pet.name = "";
	pet.type = "";
	pet.sleeping = false;
	pet.age = 0;
	pet.smarts = 0;
	pet.arts = 0;
	pet.strength = 0;
};

// Restart function

const restart = () => {
	console.clear;
	resetStats();
	console.log("You have finished the game.");
	inquirer
		.prompt([
			{
				name: "restartQ",
				type: "confirm",
				message: "Would you like to play again?",
			},
		])
		.then((answer) => {
			console.log(answer.restartQ);
			if (answer.restartQ === true) {
				console.clear();
				questionTime();
			} else {
				console.clear();
			}
		});
};

questionTime();
