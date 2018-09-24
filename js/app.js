/*----- constants -----*/

const SPIN_COST = 3;

/*----- app's state (variables) -----*/

var totalWin;
var totalLoss;
var lastSpinWin;
var currentSpinWin;
var totalCredits;

var symbols;
var winningCombos;

/*----- cached element references -----*/

var addFundsButton = document.getElementById("addFunds");
var cashOutButton = document.getElementById("cashOut");
var spinSlotsButton = document.getElementById("spinSlots");
var totalCreditsMsg = document.querySelector("#totalCreditsMsg");
var lastWinCreditMsg = document.querySelector("#lastSpinWinMsg");
var slot1 = document.getElementById("slot1");
var slot2 = document.getElementById("slot2");
var slot3 = document.getElementById("slot3");
var slotsContainer = document.getElementById("slotContainer");
var images = slotsContainer.getElementsByTagName('img');

/*----- event listeners -----*/

addFundsButton.addEventListener("click", addFunds);

/*----- functions -----*/

function checkForFunds() {
    if (credits.totalCredits < 3) {
        cashOutButton.removeEventListener("click", cashOut);
        spinSlotsButton.removeEventListener("click", spinSlots); 
        cashOutButton.classList.add("disabled");
        spinSlotsButton.classList.add("disabled");
    } else {
        cashOutButton.addEventListener("click", cashOut);
        spinSlotsButton.addEventListener("click", spinSlots);  
        cashOutButton.classList.remove("disabled");
        spinSlotsButton.classList.remove("disabled");
    }
}

function displayMsgs() {
    var totalCreds = credits.totalCredits;
    totalCreditsMsg.textContent = totalCreds;
    
    var lastWinCreds = credits.lastSpinWin;
    lastWinCreditMsg.textContent = lastWinCreds;
}

function spinSlots() {
    
    removeSlotsImgs();

    for (var i = 0; i < 3; i++) {
        var options = Object.keys(symbols);
        var rand = Math.floor(Math.random() * options.length);
        addSlotsImgs(options[rand], i+1);
    }

    checkForWin();
    displayMsgs();
}

function checkForWin() {
    let symbol1 = slot1.firstChild.id;
    let symbol2 = slot2.firstChild.id;
    let symbol3 = slot3.firstChild.id;
    credits.totalCredits -= SPIN_COST;
    credits.totalLoss += SPIN_COST;
    if (symbol1 === symbol2 && symbol2 === symbol3) {
        var symbolToCheck = symbol1;
        switch(symbolToCheck) {
            case "seven":
                credits.totalWin += 3000;
                credits.lastSpinWin = 3000;
                credits.totalCredits += 3000;
                break;
            case "crown":
                credits.totalWin += 400;
                credits.lastSpinWin = 400;
                credits.totalCredits += 400;
                break;
            case "diamond":
                credits.totalWin += 300;
                credits.lastSpinWin = 300;
                credits.totalCredits += 300
                break;
            case "bell":
                credits.totalWin += 200;
                credits.lastSpinWin = 200;
                credits.totalCredits += 200;
                break;
            case "bars":
                credits.totalWin += 50;
                credits.lastSpinWin = 50;
                credits.totalCredits += 50;
                break;
            case "cherries":
                credits.totalWin += 5;
                credits.lastSpinWin = 5;
                credits.totalCredits += 5;
                break;
        }
    } else if (symbol1 === "cherries" && symbol2 === "cherries" || 
               symbol2 === "cherries" && symbol3 === "cherries" ||
               symbol1 === "cherries" && symbol3 === "cherries") {
        credits.totalWin += 2;
        credits.lastSpinWin = 2;
        credits.totalCredits += 2;
    } else if (symbol1 === "cherries" || symbol2 === "cherries" || symbol3 === "cherries"){
        credits.totalWin += 1;
        credits.lastSpinWin = 1;
        credits.totalCredits += 1;
    }
}

function addSlotsImgs(symbol, slot) {
    slot = "slot" + slot;
    var newSlot = document.getElementById(slot);
    var image = document.createElement('img');
    image.src = symbols[symbol];
    image.id = symbol;
    newSlot.appendChild(image);
}

function removeSlotsImgs() {
    for (let i = 0; i < images.length; i++) {
        slot1.removeChild(images[i]);
        slot2.removeChild(images[i]);
        slot3.removeChild(images[i]);
    }
}

function addFunds() {
    var funds = prompt("How many credits do you want to add?");
    credits.totalCredits += parseInt(funds);
    checkForFunds();
    displayMsgs();
}

function cashOut() {
    var receipt = alert(`You won ${credits.totalWin}. 
    You lost ${credits.totalLoss}. Your cash-out amount is ${credits.totalCredits}`);
    initGame();
}


function initGame() {

    if (images.length > 0) {
        removeSlotsImgs();
    }

    credits = {
        totalWin: 0,
        totalLoss: 0,
        lastSpinWin: 0,
        currentSpinWin: 0,
        totalCredits: 0
    }

    symbols = {
        cherries: "img/symbols/cherries.svg",
        seven: "img/symbols/seven.svg",
        crown: "img/symbols/crown.svg",
        bell: "img/symbols/bell.svg",
        bars: "img/symbols/bars.svg",
        diamond: "img/symbols/diamond.svg"
    }

    checkForFunds();
    displayMsgs();
}

initGame();



