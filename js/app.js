/*----- constants -----*/

const SPIN_COST = 3;

/*----- app's state (variables) -----*/

var totalWin;
var totalLoss;
var lastSpinWin;
var totalCredits;
var symbols;

/*----- cached element references -----*/

var jackpotMsg = document.getElementById("headline");
var addFundsButton = document.getElementById("add-funds-side-button");
var cashOutButton = document.getElementById("cash-out-side-button");
var spinSlotsButton = document.getElementById("spin-slots-side-button");
var totalCreditsMsg = document.querySelector("#total-creds-msg");
var lastWinCreditMsg = document.querySelector("#last-win-msg");
var slot1 = document.getElementById("slot1");
var slot2 = document.getElementById("slot2");
var slot3 = document.getElementById("slot3");
var slotContainer = document.getElementById("slot-container");
var images = slotContainer.getElementsByTagName("img");
var winningComboGuide = document.getElementById("winning-combo-guide");
var addFundsForm = document.getElementById("add-funds-input");
var cashOutReceipt = document.getElementById("cash-out-receipt");
var helperImage = document.getElementById("helper-image");
var inputFunds = document.querySelector("input");
var inputFundsButton = document.querySelector("button");

/*----- event listeners -----*/

helperImage.addEventListener("click", function() {
    addFundsForm.classList.remove("toggle-show");
    cashOutReceipt.classList.remove("toggle-show");
    winningComboGuide.classList.toggle("toggle-show");
});

addFundsButton.addEventListener("click", addFundsToggle);

cashOutButton.addEventListener("click", cashOut);

inputFundsButton.addEventListener("click", addFunds);


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

function setCredits(number) {
    credits.totalWin += number;
    credits.totalCredits += number;
    credits.lastSpinWin = number;
}

function checkForWin() {
    let symbol1 = slot1.firstChild.id;
    let symbol2 = slot2.firstChild.id;
    let symbol3 = slot3.firstChild.id;
    credits.totalCredits -= SPIN_COST;
    credits.totalLoss += SPIN_COST;
    if (symbol1 === symbol2 && symbol2 === symbol3) {
        slot1.classList.add("winningSymbolBorder");
        slot2.classList.add("winningSymbolBorder");
        slot3.classList.add("winningSymbolBorder");
        var symbolToCheck = symbol3;
        switch(symbolToCheck) {
            case "seven":
                setCredits(3000);
                jackpotMsg.classList.add("jackpot");
                break;
            case "crown":
                setCredits(400);
                break;
            case "diamond":
                setCredits(300);
                break;
            case "bell":
                setCredits(200);
                break;
            case "bars":
                setCredits(50);
                break;
            case "cherries":
                setCredits(5);
                break;
        }
    } else if (symbol1 === "cherries" && symbol2 === "cherries") {
        setCredits(2)
        slot1.classList.add("winningSymbolBorder");
        slot2.classList.add("winningSymbolBorder");
    } else if (symbol1 === "cherries" && symbol3 === "cherries") {
        setCredits(2);
        slot1.classList.add("winningSymbolBorder");
        slot3.classList.add("winningSymbolBorder");
    } else if (symbol1 === "cherries" || symbol2 === "cherries" || symbol3 === "cherries") {
        setCredits(1);
        if (symbol1 === "cherries") {
            slot1.classList.add("winningSymbolBorder");
        } else if (symbol2 === "cherries") {
            slot2.classList.add("winningSymbolBorder");
        } else {
            slot3.classList.add("winningSymbolBorder");
        }
    } else if (symbol1 === "seven" && symbol2 === "seven") {
        slot1.classList.add("winningSymbolBorder");
        slot2.classList.add("winningSymbolBorder");
        slot3.classList.add("winningSymbolBorder");
        if (symbol3 === "crown") {
            setCredits(400);
        } else if (symbol3 === "diamond") {
            setCredits(300);
        } else if (symbol3 === "bell") {
            setCredits(200);
        } else if (symbol3 === "bar") {
            setCredits(50);
        } else if (symbol3 === "cherries") {
            setCredits(5);
        }
    } else if (symbol1 === symbol2 && (symbol2 !== symbol3 && symbol2 !== "cherries") && symbol2 !== "seven") {
        slot1.classList.add("winningSymbolBorder");
        slot2.classList.add("winningSymbolBorder");
        if (symbol2 === "crown") {
            setCredits(200);
        } else if (symbol2 === "diamond") {
            setCredits(150);
        } else if (symbol2 === "bell") {
            setCredits(100);
        } else if (symbol2 === "bar") {
            setCredits(25);
        }
    } else if (symbol1 === "bar" && symbol3 === "bar") {
        slot1.classList.add("winningSymbolBorder");
        slot3.classList.add("winningSymbolBorder");
        if (symbol2 === "seven") {
            setCredits(50);
        } else if (symbol2 === "crown") {
            setCredits(100);
        } else if (symbol2 === "diamond") {
            setCredits(150);
        } else if (symbol3 === "bell") {
            setCredits(50);
        }
    }
}

function addSlotsImgs(symbol, slot) {
    removeStylingClasses();
    slot = "slot" + slot;
    var newSlot = document.getElementById(slot);
    var image = document.createElement("img");
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

function addFundsToggle() {
    cashOutReceipt.classList.remove("toggle-show");
    winningComboGuide.classList.remove("toggle-show");
    addFundsForm.classList.toggle("toggle-show");
}

function addFunds() {
    var inputVal = inputFunds.value;
    credits.totalCredits += parseFloat(inputVal);
    inputFunds.value = "";
    checkForFunds();
    displayMsgs();
    addFundsForm.classList.remove("toggle-show");
}

function cashOut() {
    addFundsForm.classList.remove("toggle-show");
    winningComboGuide.classList.remove("toggle-show");
    cashOutReceipt.classList.toggle("toggle-show");
    document.getElementById("total-cred-win").textContent = credits.totalWin;
    document.getElementById("total-cred-loss").textContent = credits.totalLoss;
    document.getElementById("total-creds").textContent = credits.totalCredits;
    initGame();
}

function removeStylingClasses() {
    jackpotMsg.classList.remove("jackpot");
    slot1.classList.remove("winningSymbolBorder");
    slot2.classList.remove("winningSymbolBorder");
    slot3.classList.remove("winningSymbolBorder");
    setTimeout(function() {
        addFundsForm.classList.remove("toggle-show");
        cashOutReceipt.classList.remove("toggle-show");
        winningComboGuide.classList.remove("toggle-show");
    }, 3000);

}

function initGame() {
    removeSlotsImgs();
    removeStylingClasses();
    credits = {
        totalWin: 0,
        totalLoss: 0,
        lastSpinWin: 0,
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