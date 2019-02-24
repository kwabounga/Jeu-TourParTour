// Games Helpers




// in game this function is used to get the direction of the player picture by the position of the players on the grid
function whereIsChara(_persoID) {
  debug('(whereIsChara) whereIsChara(' + _persoID + ')');
  debug(allPlayers[_persoID].name + ' posX: ' + allPlayers[_persoID].posX + '  //' + allPlayers[otherPlayerID(_persoID)].name + ' posX: ' + allPlayers[otherPlayerID(_persoID)].posX);
  if (allPlayers[_persoID].posX <= allPlayers[otherPlayerID(_persoID)].posX) {
    return false;
  } else {
    return true;
  }

}
// return if  tile is empty (0,2,3,4,5) or if there is an obstacle (2)
function isMovable(_y, _x) {

  var id = objBoard.board[_y][_x];
  // 0: Empty
  // 1: obstacles
  // other: weapon so O:Empty
  return (Number(id) != 1) ? true : false;
}

// retrun 0 or 1 the other player
function otherPlayerID(_p = null) {

  var _ID;
  if (_p != null) {
    _ID = !Boolean(_p);
  } else {
    _ID = !Boolean(currentPlayer);
  }
  return Number(_ID);
}