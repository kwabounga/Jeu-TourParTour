var player = {
  // all player specificities
  name: 'playertest',
  ptsLife: 100,
  ptsDef: 25, // i don't use this finally
  ptsAttack: 10,
  weapon: 0,
  actionRange: 3,
  posX: 0,
  posY: 0,
  defence: false,
  // range of the player (cf: jeu.js (line28) for explanations)
  range: [
    ['1-1', '1-1', '1-1'], //up <
    ['1-1', '1-1', '1-1'], //right <
    ['1-1', '1-1', '1-1'], //down <
    ['1-1', '1-1', '1-1'] //left <
  ],
  //Use to Remove other player life
  defend: function() {
    playSound("defence");
    this.defence = true;
    //remove life


  },
  // Use to attack player
  attack: function() {

    // get the current player weaponID: allPlayers[currentPlayer].weapon
    // get the weaponName with the weapon Object : weapon.getName(weaponID)
    // and play the sound of the good weapon playSound(weaponName)
    playSound(weapon.getName(allPlayers[currentPlayer].weapon).toLowerCase());
    // targeting the other player
    var target = otherPlayerID(currentPlayer);
    // substract the life with the damages Points  relative to the current weapon
    // only 50% if the player defend itself
    debug(this.name + ' attack!! target: ' + allPlayers[target].name);
    var removedLife = allPlayers[target].defence ? Math.floor(Number(this.ptsAttack) / 2) : Number(this.ptsAttack);
    allPlayers[target].ptsLife -= removedLife;
    // reset defence var for the next turn
    allPlayers[target].defence = false;
    // Update UI texts
    var _cssAccessor = `#perso0${target+1}Life`;
    var _value = 'life: ' + String(allPlayers[target].ptsLife);
    htmlUpdater(_cssAccessor, _value);

  },
  // return the ID of the player object based on allPlayers[] position index
  getID: function() {
    return Number(allPlayers.indexOf(this));
  },
  // initialize player , name, and position on the board grid
  init: function(_name, _positionX, _positionY) {

    debug('init: ' + _name + ' character');

    //Set obj vars
    this.name = _name;
    this.posX = _positionX;
    this.posY = _positionY;

    // Add player to allPlayers array
    allPlayers.push(this);

    // Get player img direction
    if (this.getID() == 1) this.updateImg();

    //Set the player on the board tile
    var _cssAccessor = '#board .line:nth-child(' + (Number(this.posY) + 1) + ') .tile:nth-child(' + (Number(this.posX) + 1) + ') .player';
    var _value = "perso" + (Number(this.getID()) + 1);
    htmlClassAdder(_cssAccessor, _value);
    // if (this.getID() == 1) htmlClassAdder(_cssAccessor, "back");

  },
  // Check if the enemy is close to Fight
  isNearOfEnemy: function() {

    debug("// isNearOfEnemy");
    // Get all tiles around the player
    var up = [Number(this.posY) - 1, Number(this.posX)]; // get the near tile position UP
    var right = [Number(this.posY), Number(this.posX) + 1]; // get the near tile position RIGHT
    var down = [Number(this.posY) + 1, Number(this.posX)]; // get the near tile position DOWN
    var left = [Number(this.posY), Number(this.posX) - 1]; // get the near tile position LEFT
    // Stock into array
    var arNear = [];

    arNear.push(up);
    arNear.push(right);
    arNear.push(down);
    arNear.push(left);

    //Use the array to Test near Tiles
    for (var i = 0; i < arNear.length; i++) {
      debug('test ' + arNear[i][0] + '/' + allPlayers[otherPlayerID(currentPlayer)].posY + " && " + arNear[i][1] + "/" + allPlayers[otherPlayerID(currentPlayer)].posX);
      if (arNear[i][0] == allPlayers[otherPlayerID(currentPlayer)].posY && arNear[i][1] == allPlayers[otherPlayerID(currentPlayer)].posX) {
        debug(">  Near!");
        return true;
      }
    }
    // Test if the two players are on the same tile
    if(allPlayers[currentPlayer].posY == allPlayers[otherPlayerID(currentPlayer)].posY && allPlayers[currentPlayer].posX == allPlayers[otherPlayerID(currentPlayer)].posX) {
      return true;
    }

    debug(">  not near...");
    return false;
  },

  // to check tiles around player at -3 to +3 tiles in all directions for find player movements
  isInRange: function(_y, _x) {
    for (var i = 0; i < this.range.length; i++) {
      for (var j = 0; j < this.range[i].length; j++) {
        if ((_y + '' + _x) == this.range[i][j]) return true;
      }
    }
    return false;
  },

  // To show player movements possibilities (if _show == false : force to hide current range)
  showRange: function(_show = true) {
    //Recalculate the current range and show it
    if (_show) {
      for (var i = 0; i < this.range.length; i++) {
        for (var j = 0; j < this.range[i].length; j++) {
          var xx = Number(this.posX);
          var yy = Number(this.posY);

          switch (i) {

            case 0: //up
              yy -= 1 + j;
              break;
            case 1: // right
              xx += 1 + j;
              break;
            case 2: // down
              yy += 1 + j;
              break;
            case 3: // left
              xx -= 1 + j;
              break;
            default:

          } // End of switch
          this.range[i][j] = yy + '' + xx;
        } //End for i
      } //End for j
      debug('range >> ' + this.range);
    }

    // Test if range meet obstacle
    for (var k = 0; k < this.range.length; k++) {
      var obstacle = false;
      for (var l = 0; l < this.range[k].length; l++) {

        var pos = this.range[k][l];
        var rg = String(pos).split('');

        var _cssAccessor = '#board .line:nth-child(' + (Number(rg[0]) + 1) + ') .tile:nth-child(' + (Number(rg[1]) + 1) + ') .attainable';
        // debug('HERE:'+ rg[0]+'//'+rg[1]+ ">>" + _cssAccessor);
        var _value = `attainable0${ Number(currentPlayer) + 1}`;

        if (rg.length < 3) { // excludes the "-12" the "2-1" and the "212"  out of grid
          if (_show) {
            debug(rg[0] + ':' + rg[1] + '>' + objBoard.board[rg[0]][rg[1]]);
            if (objBoard.board[rg[0]][rg[1]] == 1 || allPlayers[otherPlayerID(currentPlayer)].posY == rg[0] && allPlayers[otherPlayerID(currentPlayer)].posX == rg[1]) {
              obstacle = true;
            } else {
              if (obstacle == false) {
                htmlClassAdder(_cssAccessor, _value);
                switch (k) {
                  //case0: is upDir but its allready up
                  case 1:
                    htmlClassAdder(_cssAccessor, 'rightDir');
                    break;
                  case 2:
                    htmlClassAdder(_cssAccessor, 'downDir');
                    break;
                  case 3:
                    htmlClassAdder(_cssAccessor, 'leftDir');
                    break;
                  default:
                } // End of switch
              } else {
                this.range[k][l] = '---'; //Set the range impossible
              }
            }
          } else {
            //free tile
            htmlClassRemover(_cssAccessor, _value);
            htmlClassRemover(_cssAccessor, "upDir");
            htmlClassRemover(_cssAccessor, "downDir");
            htmlClassRemover(_cssAccessor, "rightDir");
            htmlClassRemover(_cssAccessor, "leftDir");
          }
        }
      }
    }
  },
  // To get the player direction beside other player
  updateImg: function() {

    debug('(updateImg)  ' + this.name + ' current position X: ' + this.posX);

    if (whereIsChara(this.getID())) {
      htmlClassAdder('#board .line:nth-child(' + (Number(this.posY) + 1) + ') .tile:nth-child(' + (Number(this.posX) + 1) + ') .player', 'back')
    } else {
      htmlClassRemover('#board .line:nth-child(' + (Number(this.posY) + 1) + ') .tile:nth-child(' + (Number(this.posX) + 1) + ') .player', 'back')

    }
  },
  // Move the player on the grid
  move: function(_newY, _newX) {
    // play sound steps fx
    playSound('steps');
    // hide the player
    var _cssAccessor = '#board .line:nth-child(' + (Number(this.posY) + 1) + ') .tile:nth-child(' + (Number(this.posX) + 1) + ') .player';
    var _value = "perso" + (Number(this.getID()) + 1);
    htmlClassRemover(_cssAccessor, _value);
    // hide the range of the player
    this.showRange(false);
    // Set nex position
    this.posX = _newX;
    this.posY = _newY;
    // display the plyer on the new tile
    var _cssAccessor = '#board .line:nth-child(' + (Number(this.posY) + 1) + ') .tile:nth-child(' + (Number(this.posX) + 1) + ') .player';
    var _value = "perso" + (Number(this.getID()) + 1);
    htmlClassAdder(_cssAccessor, _value);
    debug('(>>>MOVE<<<)');
    // oriente the player img
    this.updateImg();
    // check if the new tile contain a weapons.
    var newWeaponID = Number(objBoard.board[this.posY][this.posX]);
    if (newWeaponID >= 2) {
      // Add new weapon
      debug(this.name + " find a weapon !");
      this.addWeapon(newWeaponID);
      htmlClassRemover('#board .line:nth-child(' + (Number(this.posY) + 1) + ') .tile:nth-child(' + (Number(this.posX) + 1) + ') .weapons', ('weaponLayer' + this.weapon));
      refreshWeapons();
    };
  },

  addWeapon: function(_weaponID) {
    // Set the id of the currentWeapon on the grid  0: free tile;  2>5 swap weapon
    objBoard.board[this.posY][this.posX] = this.weapon;
    // Set the id of the new weapon
    this.weapon = _weaponID;
    // Set the damage pts with weapon model
    this.ptsAttack = weapon.getDamagesPts(_weaponID);
    debug("// weapon added : " + weapon.getName(_weaponID));
    // play un sound to alert the player 
    playSound('reload_' + weapon.getName(_weaponID).toLowerCase());
  }

} // End of perso Object;
