var objBoard = {
  //Numerical representation of board grid usin 2 dimentions array board[Y][X]; (cf:jeu.js)
  // legend:
  // 0: empty Tiles
  // 1 Solid tiles
  // 2>5 Weapons tiles
  board: [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 2, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ],
  // randomize the grid board with Empty n Solid Tiles
  shuffle: function(_percent = 20) {
    // add Solid tiles at the middle of the map to have the sides free to move
    for (var i = 1; i < this.board.length-1; i++) {

      for (var j = 1; j < this.board[i].length-1; j++) {
        // generate a pseudo random Boolean (cf:tools.js) to put (or not) an obstacle on the tile
        this.board[i][j] = randomBoolean(_percent);

      }
    }
    // trace simples road on the map
    // make the weapons accessibles
    // and have a way to move and fight
    for (var k =0; k <10; k++) {
        this.board[2][k] = 0;
        this.board[7][k] = 0;
        this.board[k][3] = 0;
        this.board[k][6] = 0;
    }
  }
}
// Display the board with board tiles ID
function createBoard() {
  // Generate Obstacles and roads
  objBoard.shuffle(70);
  // display board grid if test mode is true
  if(testMode)$("#board .line .tile").addClass('tileHighLight');
  // fill the board with lines and tiles
  // Duplicate Tile code in a line
  var lineContent = $("#board .line").html();
  for (var i = 1; i < objBoard.board.length; i++) {
    $("#board .line").append(lineContent);
  }
  // Duplicate the tiles line  in a grid
  var boardContent = $("#board").html();
  for (var i = 1; i < objBoard.board.length; i++) {
    $("#board").append(boardContent);
  }

  // define content for each tiles
  for (var i = 1; i <= objBoard.board.length; i++) {
    for (var j = 1; j <= objBoard.board[i - 1].length; j++) {
      // debug('Line #' + i + ' tile #' + j);
      var hasGrass = randomBoolean(30);
      var hasWeapon = (i == 3 && j == 3) || (i == 3 && j == 8) || (i == 8 && j == 3) || (i == 8 && j == 8);
      if (hasWeapon) {
        debug('Has weapon' + 'Line #' + i + ' tile #' + j);
      }
      // if the tild id is 1 the tils is solid else its empty
      var isSolid = (objBoard.board[i - 1][j - 1] == 1) ? true : false;
      // to displaying solid tile random
      var obstacles = [/*'rock', 'wood', 'metal', */'water', 'car', 'barak', 'tree']; // comment or uncomment to add remove a obstacle type
      // to randomize directions tiles for more better than good render!
      var directions = ['upDir', 'rightDir', 'downDir', 'leftDir'];
      // if the current tile id is a weapon display it
      if (hasWeapon) {
        var weaponID = randomFloored(4) + 2;
        objBoard.board[i - 1][j - 1] = weaponID;
        $('#board .line:nth-child(' + i + ') .tile:nth-child(' + j + ') .weapons').addClass('weaponLayer' + weaponID);
      }else if (isSolid) {// if the current tile is solid randomize img tile and display
        var obstacle = obstacles[randomFloored(obstacles.length)];
        $('#board .line:nth-child(' + i + ') .tile:nth-child(' + j + ') .obstacle').addClass(obstacle);
        $('#board .line:nth-child(' + i + ') .tile:nth-child(' + j + ') .obstacle').addClass(directions[randomFloored(directions.length)]);

      } else { // if the tile is empty and grass sometimes
        if (hasGrass) {
          $('#board .line:nth-child(' + i + ') .tile:nth-child(' + j + ')').addClass('grass');
        }

      }


    }
  }


}

function win() {
  playSound("grenade");// to the sky! we win we have right

  // hide the fight area  and display win panel
  $("#ring").addClass("invisible");
  $("#finalPanel").removeClass("invisible");

  $("#finalPanel .title").html(allPlayers[currentPlayer].name + " win !");
  $("#visualWinner").addClass("perso" + (currentPlayer + 1) + weapon.getName(allPlayers[currentPlayer].weapon))
  $("#restart").click(function() {
    //refresh the navigator to play an other time
    history.go(0);
  });
}
// set the buttons accessibles or grey it
function updateFightBoard(_cP) {

  $("#visualPlayer1").removeClass("waitForFight");
  $(`#action-player1`).removeClass("waitForFight");
  $("#visualPlayer2").removeClass("waitForFight");
  $(`#action-player2`).removeClass("waitForFight");

  $("#visualPlayer1").addClass(_cP + 1 == 1 ? '' : "waitForFight");
  $(`#action-player1`).addClass(_cP + 1 == 1 ? '' : "waitForFight");
  $("#visualPlayer2").addClass(_cP + 1 == 2 ? '' : "waitForFight");
  $(`#action-player2`).addClass(_cP + 1 == 2 ? '' : "waitForFight");
}

function setFightBoard(_cP) {
  $("#ring").removeClass("invisible");
  // $("#finalPanel").removeClass("invisible");
  $("#board").addClass("invisible");
  $(`#action-player1 .name`).html(allPlayers[0].name);
  $(`#action-player2 .name`).html(allPlayers[1].name);


  updateFightBoard(_cP);

  $("#visualPlayer1").addClass("perso1" + weapon.getName(allPlayers[0].weapon));
  $("#visualPlayer2").addClass("perso2" + weapon.getName(allPlayers[1].weapon));

  $(`#action-player1 .attack`).click(function() {

    allPlayers[0].attack();
    nextFightTurn();
  });

  $(`#action-player1 .defend`).click(function() {

    allPlayers[0].defend();
    nextFightTurn();
  });

  $(`#action-player2 .attack`).click(function() {

    allPlayers[1].attack();
    nextFightTurn();
  });

  $(`#action-player2 .defend`).click(function() {

    allPlayers[1].defend();
    nextFightTurn();
  });

}



function refreshWeapons() {
  // check all the weapons tiles to update pictures if the weapon is changed
  debug('refreshWeapons');
  var id = Number(objBoard.board[2][2]);
  if (id >= 2) htmlTilesClassAdder(3, 3, "weapons", 'weaponLayer' + id);
  id = Number(objBoard.board[2][7]);
  if (id >= 2) htmlTilesClassAdder(3, 8, "weapons", 'weaponLayer' + id);
  id = Number(objBoard.board[7][2]);
  if (id >= 2) htmlTilesClassAdder(8, 3, "weapons", 'weaponLayer' + id);
  id = Number(objBoard.board[7][7]);
  if (id >= 2) htmlTilesClassAdder(8, 8, "weapons", 'weaponLayer' + id);


}

// refresh the texts fields of the ui
function refreshUi() {
  debug('NEDD TO REFRESH UI');
  $("#informations #infoPlayer1").removeClass('currentBlocUI');
  $("#informations #infoPlayer2").removeClass('currentBlocUI');
  $("#informations #infoPlayer" + (currentPlayer + 1)).addClass('currentBlocUI');

  $("#informations #infoPlayer1 .name").html(String(allPlayers[0].name));
  $("#informations #infoPlayer1 .life").html(stringLife + String(allPlayers[0].ptsLife));
  $("#informations #infoPlayer1 .defend").html('Defence: ' + String(allPlayers[0].ptsDef));
  $("#informations #infoPlayer1 .attack").html('Attack: ' + String(allPlayers[0].ptsAttack));
  $("#informations #infoPlayer1 .weapon").html(weapon.getName(allPlayers[0].weapon));
  $("#informations #infoPlayer1 .weaponImg").removeClass("weaponLayer0","weaponLayer2", "weaponLayer3", "weaponLayer4", "weaponLayer5");
  $("#informations #infoPlayer1 .weaponImg").addClass("weaponLayer" + allPlayers[0].weapon);


  $("#informations #infoPlayer2 .name").html(allPlayers[1].name);
  $("#informations #infoPlayer2 .life").html(stringLife + allPlayers[1].ptsLife);
  $("#informations #infoPlayer2 .defend").html('Defence: ' + allPlayers[1].ptsDef);
  $("#informations #infoPlayer2 .attack").html('Attack: ' + allPlayers[1].ptsAttack);
  $("#informations #infoPlayer2 .weapon").html(weapon.getName(allPlayers[1].weapon));
  $("#informations #infoPlayer1 .weaponImg").removeClass("weaponLayer0", "weaponLayer2", "weaponLayer3", "weaponLayer4", "weaponLayer5");
  $("#informations #infoPlayer2 .weaponImg").addClass("weaponLayer" + allPlayers[1].weapon);

}
