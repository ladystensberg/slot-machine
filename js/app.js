/*----- constants -----*/

const SPIN_COST = 3;

/*----- app's state (variables) -----*/

var currentSpinWinAmt;
var totalCredits;
var totalWinCredits;
var totalLossCredits;
var lastWinSpinAmt;

var symbols;
var winningCombos;

/*----- cached element references -----*/

var addFundsButton = document.getElementById("addFunds");
var cashOutButton = document.getElementById("cashOut");
var spinSlotsButton = document.getElementById("spinSlots");
var totalCreditsMsg = document.querySelector("#totalCreditMsg");
var lastWinCreditMsg = document.querySelector("#lastSpinWinMsg");

/*----- event listeners -----*/



/*----- functions -----*/

function initGame() {
    currentSpinWinAmt = 0;
    totalCredits = 0;
    totalWinCredits = 0;
    totalLossCredits = 0;
    lastWinSpinAmt = 0;

    symbols = {
        cherries: "img/cherries.svg",
        seven: "img/seven.svg",
        crown: "img/crown.svg",
        bell: "img/bell.svg",
        bars: "img/bars.svg",
        diamond: "img/diamond.svg"
    }
}


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