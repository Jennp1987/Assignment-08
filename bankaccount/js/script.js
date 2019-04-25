/*eslint-env browser*/


//GETS ELEMENT FROM DOM
var $ = function (id) {
    "use strict";
    return window.document.getElementById(id);
};
//ONE GLOBAL VAR
var bankAccountObj = null;

//GETS USER NAME 
function namePrompt() {
    "use strict";
    var userName = window.prompt("Please enter your name");
    bankAccountObj = new BankAccount(userName);
    financialInfoDisplay("Welcome to your new account.");
}

//GETS DEPOSIT AMOUNT
function depositAmountPrompt() {
    "use strict";
    if (bankAccountObj === null) {
        financialInfoDisplay("You must enter in a name to begin");
        return;
    }

    var depositAmount = parseInt(window.prompt("Please enter the amount of money you would like to deposit"), 10);
    bankAccountObj.deposit(depositAmount);

}

//GETS WITHDRAWAL AMOUNT
function withdrawalAmountPrompt() {
    "use strict";
    if (bankAccountObj === null) {
        financialInfoDisplay("You must enter in a name to begin");
        return;
    }
    var userWithdrawal = parseInt(window.prompt("Please enter the amount of money you would like to withdrawal from your account"), 10);
    bankAccountObj.withdraw(userWithdrawal);
}

//DISPLAYS THE PROMPTS WITHIN A DIV
function financialInfoDisplay(action) {
    "use strict";
    var s = action + "<br>";
    if (bankAccountObj !== null) {
        s += "Name: " + bankAccountObj.getOwnerName() + "<br>";
        s += "Balance: $" + bankAccountObj.getBalance() + "<br>";
    }
    window.document.getElementById('infoDisplay').innerHTML = s;
}

// CLOSURE
var BankAccount = function (ownerName) {
    "use strict";
    //PRIVATE VARIABLES
    var balance = 0,
        owner = ownerName;
    //RETURN AN OBJ. W/METHODS  
    return {
        deposit: function (depositAmount) {
            if (depositAmount <= 0) {
                financialInfoDisplay("Please enter a positive value");
                return;

            } else {
                balance = balance + depositAmount;
                financialInfoDisplay("Processed deposit of: $" + depositAmount);
            }

        },
        withdraw: function (withdrawalAmount) {
            if (withdrawalAmount > balance) {
                financialInfoDisplay("You don't have enough money");
                return;

            } else {
                balance = balance - withdrawalAmount;
                financialInfoDisplay("Processed withdrawal is: " + withdrawalAmount);
            }
        },
        getBalance: function () {
            return balance;
        },

        getOwnerName: function () {
            return owner;
        }

    };


};

//HANDLES ALL EVENT LISTENERS
function init() {
    "use strict";
    $('nameBtn').addEventListener("click", namePrompt);
    $('depositBtn').addEventListener("click", depositAmountPrompt);
    $('withdrawalBtn').addEventListener("click", withdrawalAmountPrompt);

}
window.addEventListener("load", init);
