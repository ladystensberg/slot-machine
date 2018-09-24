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

/*----- event listeners -----*/

addFundsButton.addEventListener("click", addFunds);
cashOutButton.addEventListener("click", cashOut);
spinSlotsButton.addEventListener("click", spinSlots);

/*----- functions -----*/

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

    displayMsgs();
}

function addSlotsImgs(symbol, slot) {
    slot = "slot" + slot;
    var newSlot = document.getElementById(slot);
    var image = document.createElement('img');
    image.src = symbols[symbol];
    newSlot.appendChild(image);
    
}

function removeSlotsImgs() {
    var images = document.getElementsByTagName('img');
    if (images.length > 0) {
       for (let image of images) {
            image.src = "";
        }
    }
}

function addFunds() {
    var funds = prompt("How many credits do you want to add?");
    credits.totalCredits = parseInt(funds);
    displayMsgs();
}

function cashOut() {
    var receipt = alert(`You won ${credits.totalWin}. 
    You lost ${credits.totalLoss}. Your cash-out amount is ${credits.totalCredits}`);
    initGame();
}


function initGame() {

    removeSlotsImgs();

    credits = {
        totalWin: 0,
        totalLoss: 0,
        lastSpinWin: 0,
        currentSpinWin: 0,
        totalCredits: 0
    }

    symbols = {
        cherries: "img/cherries.svg",
        seven: "img/seven.svg",
        crown: "img/crown.svg",
        bell: "img/bell.svg",
        bars: "img/bars.svg",
        diamond: "img/diamond.svg"
    }

    displayMsgs();
}

initGame();

// possible win combos:
    // 7 is wild > it can take the place of any other symbol
        // and help form another win combo
    // 7X3 = jackpot - 3000 credits
    // crownX3 = 400 credits
    // diamondX3 = 300 credits
    // bellsX3 = 200 credits
    // barX3 = 50 credits
    // cherriesX3 = 5 credits
    // 1 cherry = 1 credit
    // 2 cherries = 2 credits