// Weapon Object

// Kalash ID 0, Pompe ID 1 etc..
// access with  names[weaponID] // damagesPts[weaponID]
// BUt i'm using the objBoard.board Object to place the weapon
// on the board so :
//
// 0:empty tiles and 1: solid tiles
//
// In game the weaponIDs are 2, 3, 4, 5
// the player weapon id by default is 0 its a knife

var weapon = {

  names: [

    "Kalash",
    "Pompe",
    "Grenade",
    "Rocket"

  ],

  damagesPts: [25, 40, 50, 100],

  getName: function(_id) {
    if (_id == 0) return 'Knife';
    // soustract 2 to get the real weaponID
    return this.names[_id - 2];
  },

  getDamagesPts: function(_id) {
    // soustract 2 to get the real weaponID
    return this.damagesPts[_id - 2];
  }
}