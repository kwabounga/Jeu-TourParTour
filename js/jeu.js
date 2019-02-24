// VISUAL HELP

/*
*
*   Board Description
*/
// the board tiles IDs are stock in two dimentional array[10][10]
// look like this:
// to access to the tiles ID values use objBoard.board[Y][X] => return 0(Empty),1(Solid),2>5(weapons)
//
/*
board: [
      [0,X,X,X,X,X,X,X,X,X],
      [Y,1, , , , , , , , ],  // example:
      [Y, ,2, , , , ,i, , ],  // i = board[Y2][X7]
      [Y, , ,3, , , , , , ],  // j = board[Y7][X3]
      [Y, , , ,4, , , , , ],
      [Y, , , , ,5, , , , ],
      [Y, , , , , ,6, , , ],
      [Y, , ,j, , , ,7, , ],
      [Y, , , , , , , ,8, ],
      [Y, , , , , , , , ,9]
    ]


*/


/* ID DEsCRiption : 26 : YX */


/* Range Description
*
* is the range of the player (P)
*
*
*
*             UP (0)
*            y-3
*            y-2
* -3 -2 -1   y-1    +1 +2 +3
   |  |  |          |  |  |
*  x  x  x   (P)    x  x  x
    Left (3)         Right (1)
*            y+1
*            y+2
*            y+3
*            Down (2)
*
*
range: [
                  [0,0,0],//up <
                  [0,0,0],//right <
                  [0,0,0],//down <
                  [0,0,0]//left <
              ]


*/

// Ok, BIG project finally!
// The beginning of the programe is in the $(document).ready() function
// At the end of this file (line 154)
//
// the real Core of the game is in the player.js Object
//
// GAMES VARS
// Set to true to show the debug, the grid  (...and stop the loop sound too! :)
var testMode = false;
//the current player Identifier : 0 or 1
var currentPlayer = 0;
// all players array to use the sames functions with currentPlayer ID >>  allPlayers[currentPlayer]
var allPlayers = [];


// Game loop functions //


// add player function
function addPlayer(_name, _posX = 0, _posY = 0) {

  debug("// addPerso");
  // create PLayer;
  var p = Object.create(player);
  // player initialisation
  p.init(_name, _posX, _posY);

}


/* board game next turn*/
function nextTurn() {
  //
  if (allPlayers[currentPlayer].isNearOfEnemy()) {
    debug('FIGHT !!!');
    remBoardEvents();
    setFightBoard(currentPlayer);// << follow this
  } else {
    changePlayer();// << follow this
    refreshUi();
  }
}

/*swap player*/
function changePlayer(forcePlayer = -1) {


  debug("// changePlayer");
  debug("    > " + allPlayers[currentPlayer].name);
  debug("    > current player updateImg and hide current range");

  // hide the current range
  allPlayers[currentPlayer].showRange(false);
  allPlayers[currentPlayer].updateImg();

  debug("    > changePlayer");
  // change the player ID
  if (forcePlayer == -1) {
    currentPlayer = Number(!Boolean(currentPlayer));
  } else {
    currentPlayer = forcePlayer;
  }


  debug("    > new player is now:");
  debug("    > " + allPlayers[currentPlayer].name);
  debug("    > current player updateImg and hide current range");

  // Show the current player range
  allPlayers[currentPlayer].showRange();
  allPlayers[currentPlayer].updateImg();
  // indicate the next turn
  alert(allPlayers[currentPlayer].name + ' GO!');

}

/* ring game next turn */
function nextFightTurn() {

  if (allPlayers[otherPlayerID(currentPlayer)].ptsLife <= 0) {
    // if the current target life is négative the current player win
    debug('>>>>>>> '+(otherPlayerID(currentPlayer)+1));
    $("#infoPlayer"+(otherPlayerID(currentPlayer)+1)).addClass("waitForFight");
    refreshUi();
    win();// << follow this

  } else {
    // change player
    debug("the turn of " + allPlayers[currentPlayer].name + " is over.");
    currentPlayer = Number(!Boolean(currentPlayer));
    debug("let's go " + allPlayers[currentPlayer].name);
    //Refresh the interface with the new current player
    refreshUi();
    updateFightBoard(currentPlayer);// << follow this
    // Alert the player
    alert(allPlayers[currentPlayer].name + ' FIGHT!', true);
  }

}



/* pseudo constructor*/
$(document).ready(function() {
  debug("Welcome to the GAME of the death of the underground: ", true);

  // game board initialisation
  createBoard();
  // adding players
  addPlayer("swarzzy", Math.floor(Math.random()*10),0 );
  addPlayer("stalone", Math.floor(Math.random()*10), 9);

  // So at this point, the two player objects are stocked in the allPlayers array
  // i use the player index position on the array to accessing players
  // allPlayers[0]: player1 & allPlayers[1]: player2
  // with currentPlayer var we access to the good player anytime

  // initialize the current player
  changePlayer(currentPlayer);
  // Add Events
  addBoardEvents(); // << follow this
  // Add sounds
  addSoundLoop();
  // Set Players UI informations
  refreshUi();

});
