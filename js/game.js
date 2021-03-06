"use strict";
var Game = (function () {
    function Game() {
        this.addEvents();
        this.randomizer();
        this.addEventListenerToSubmit();
    }
    // apply click event for selection
    Game.prototype.addEvents = function () {
        for (var i = 0; i < constants.allDie.length; i++) {
            constants.allDie[i].addEventListener('click', this.selectDie);
            if (i % 2 == 0) {
                constants.allDie[i].classList.add('animated', 'bounceInLeft');
            }
            else {
                constants.allDie[i].classList.add('animated', 'bounceInRight');
            }
        }
    };
    // build random dice generator
    Game.prototype.randomizer = function () {
        for (var i = 0; i < constants.dice.length; i++) {
            // get each die
            var currentDie = constants.dice[i].split('');
            // random die side
            var diceRoll = Math.floor(Math.random() * 6);
            // set die innerHTML to current charactor
            var diceLetter = currentDie[diceRoll].toUpperCase();
            // console.log(diceLetter);
            if (diceLetter == 'Q') {
                constants.allDie[i].innerHTML = "Qu";
            }
            else {
                constants.allDie[i].innerHTML = currentDie[diceRoll].toUpperCase();
            }
            // constants.allDie[i].innerHTML = currentDie[diceRoll].toUpperCase();
        }
        ;
    };
    // toggle class and add current letter to word
    Game.prototype.selectDie = function () {
        globals.currentSelection = Number(this.id);
        // console.log(this.id);
        //to check where the die belong: corner, middle or somewhere else
        var selectionArray = TypeFinder.findTheTypeOfDie(globals.currentSelection);
        globals.selectionArrays.push(selectionArray);
        Validator.validate(globals.currentSelection, globals.selectionArrays[globals.selectionArrays.length - 2], this);
    };
    // reset word after submit
    Game.resetWord = function () {
        var row = constants.table.insertRow(1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        globals.currentSelection = 0;
        globals.lastSelection = undefined;
        globals.validSelections = [];
        globals.selectionArrays = [];
        cell1.innerHTML = globals.currentWord.join('').toLowerCase();
        cell2.innerHTML = globals.score;
        constants.totalScoreHolder.innerHTML = globals.totalScore;
        globals.currentWord = [];
        constants.showCurrentWord.innerHTML = '';
        for (var i = 0; i < constants.allDie.length; i++) {
            constants.allDie[i].removeAttribute("class", "selected");
        }
    };
    ;
    Game.prototype.addEventListenerToSubmit = function () {
        constants.submitBtn.addEventListener('click', this.addScore);
    };
    Game.prototype.addScore = function () {
        var x = globals.currentWord.length;
        if (globals.currentWord.includes('Qu')) {
            x += 1;
        }
        switch (true) {
            case (x === 0):
                alert("Please select at least one letter");
                break;
            case (x < 3):
                globals.score = 0;
                break;
            case (x === 3 || x === 4):
                globals.score = 1;
                globals.totalScore += globals.score;
                break;
            case (x === 5):
                globals.score = 2;
                globals.totalScore += globals.score;
                break;
            case (x === 6):
                globals.score = 3;
                globals.totalScore += globals.score;
                break;
            case (x === 7):
                globals.score = 5;
                globals.totalScore += globals.score;
                break;
            case (x > 7):
                globals.score = 11;
                globals.totalScore += globals.score;
                break;
            default:
                globals.score = 0;
        }
        if (globals.currentWord.length > 0) {
            Game.resetWord();
        }
    };
    ;
    return Game;
}());
