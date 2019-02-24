function addBoardEvents() {

  debug("// addBoardEvents");
  // Set the click on all tiles
  for (var i = 0; i < 10; i++) {
    for (var j = 0; j < 10; j++) {
      // Users action click
      $('#board .line:nth-child(' + (i + 1) + ') .tile:nth-child(' + (j + 1) + ')').click(function() {
        // TODO : find the tile id ..
        var xx = $(this).index();
        var yy = $($(this).parent()).index();
        // founded!
        debug("yy" + yy);
        debug("xx" + xx);
        // test if there is an obstacle and if the player can move on it
        debug(' position: ' + yy + ' ' + xx + ' there is ' + objBoard.board[yy][xx]);
        if (isMovable(yy, xx) && allPlayers[currentPlayer].isInRange(yy, xx)) {
          // hide the current range
          allPlayers[currentPlayer].showRange(false);
          // move the player
          allPlayers[currentPlayer].move(yy, xx);
          // pass the turn
          nextTurn(); // << follow this
        }
      });
    } //End For i
  } //End For j
}
// when a player meet an other the boards event are removed
// (useless )
function remBoardEvents() {

  debug("// remBoardEvents");

  for (var i = 0; i < objBoard.board.length; i++) {
    for (var j = 0; j < objBoard.board[i].length; j++) {

      var x = j;
      var y = i;

      $(`#tile${i + '' + j}`).unbind("click");
    } //End For i
  } //End For j
}
