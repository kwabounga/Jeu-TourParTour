//JavaScript Document
/**
 * @author <a href="https://encrypt.to/0x2191C1D8">LHUILLERY Matthieu</a> 
 */

/** @namespace GameController */

// probablement pas là où il faudrait
var currentGame;
var currentpage = new Page();
var generatorCSS = new generator();
var GameController = {};


/** @function playGame
 * @memberof GameController
 * @desc Lancer une nouvelle partie 
 * @param {string} difficulty - La difficulté selectionnée
 * @see displayGame
 * @see Game#nextMovementTurn
 */
function playGame(difficulty) {
    
    //debug console
    console.log("%cfunction playGame(" + difficulty + ")", styleFunction);

    // définie la taille du plateau de jeu par rapport au niveau de difficulté selectionné
    var GameSize = (function (difficulty) {
        if (difficulty === "easy") {
            console.log("%ceasy -> GameSize = 12x12", styleInfo);
            return 12;
        } else if (difficulty === "medium") {
            console.log("%cmedium -> GameSize = 10x10", styleInfo);
            return 10;
        } else if (difficulty === "hard") {
            console.log("%chard -> GameSize = 8x8", styleInfo);
            return 8;
        }
    })(difficulty);

    currentGame = new Game(GameSize, GameSize); // création d'une nouvelle partie    
    displayGame(currentGame, difficulty); // affichage de la nouvelle partie

    // lancement du prochain tour
    currentGame.nextMovementTurn();
}

// ##############################################################################

/** @function setupMovementOptions
 * @memberof GameController
 * @desc Activer les mouvements possibles sur le plateau 
 * @param movementOptions
 * @see toggleMovement
 * @see currentMovements
 * @returns {function}
 */
function setupMovementOptions(movementOptions) {
    //debug console
    console.log("%cfunction setupMovementOptions()", styleFunction);

    // currentMovements représente la liste des positions accessibles pour le joueur durant ce tour de jeu
    currentMovements = movementOptions;
    for (option in currentMovements) {
        // pour chaque position dans la liste des positions, selectionner la cellule par rapport à son ID
        var $cellMov = $("#cell-" + currentMovements[option][0] + "-" + currentMovements[option][1]);
        // et lui créer une fonction click()...
        $cellMov.bind("click", {
            row: currentMovements[option][0],
            col: currentMovements[option][1]
        }, currentGame.makeMovementTurn);
        // 
        toggleMovement(currentMovements[option]);

    }
}

// ##############################################################################

/** @function unsetMovementOptions
 * @memberof GameController
 * @desc Désactiver les mouvements possibles sur le plateau 
 * @param movementOptions
 * @return {function}
 * @see toggleMovement
 * @see currentMovements
 */
function unsetMovementOptions(movementOptions) {

    //debug console
    console.log('%cfunction unsetMovementOptions()', styleFunction);

    for (option in currentMovements) {
        //
        var $cellMov = $("#cell-" + currentMovements[option][0] + "-" + currentMovements[option][1]);
        //
        $cellMov.unbind("click");
        //
        toggleMovement(currentMovements[option]);
    }
    movementOptions = null;
}

// ##############################################################################

/** @function setupCombatOptions
 * @memberof GameController
 * @desc Activer les options de combat pour le joueur
 * @see Game#makeCombatTurn
 * @return {function}
 */
function setupCombatOptions() {

    //debug console
    console.log("%cfunction setupCombatOptions()", styleFunction);
    $("#button_attack").bind("click", {
        option: "atk"
    }, currentGame.makeCombatTurn);
    $("#button_defend").bind("click", {
        option: "def"
    }, currentGame.makeCombatTurn);
}

// ##############################################################################

/** @function unsetCombatOptions 
 * @memberof GameController
 * @desc Désactiver les options de combat pour le joueur
 * @returns {function}
 */
function unsetCombatOptions() {

    //debug console
    console.log("%cfunction unsetCombatOptions()", styleFunction);

    $("#button_attack").unbind("click");
    $("#button_defend").unbind("click");
}

// ##############################################################################

/** @function setDifficulty
 * @memberof GameController
 * @desc Détermine la difficulté de la partie en fonction du choix selectionné
 * @return {function} 
 * @see playGame 
 * @see Game
 */
function setDifficulty() {


    $("#button_start_easy").click(
        function () {
            playGame("easy");
        }
    );
    $("#button_start_medium").click(
        function () {
            playGame("medium");
        }
    );
    $("#button_start_hard").click(
        function () {
            playGame("hard");
        }
    );
}

// ##############################################################################

/* La fonction playGame() est appelé lorsque un clic est
 * détecté sur le bouton avec l'attribut name="playGame"
 * à partir du moment où le document html est entiérement chargé
 */

$(document).ready(function () {
    currentpage.display();
    setDifficulty();
});

// ##############################################################################