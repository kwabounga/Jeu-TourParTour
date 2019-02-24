/* Start the sound loop*/
function addSoundLoop() {
  // load all sounds
  $('.audio').trigger('load');
  // start loop
  if (!testMode) $("#ambiance").trigger('play');
  // loop the loop
  $("#ambiance").prop("loop", true);
  // set the volume
  $("#ambiance").prop("volume", 0.5);
}



// the sounds name are the weapons names : rocket, pompe, kalash
// the reload sound is used when the player get a weapon  reload_rocket, reload_pompe

// for ex:
// allPlayers[currentPlayer] // is a instance of the player Object model so:
// var weaponID = allPlayers[currentPlayer].weapon; // the current weapon ID
// var weaponName = weapon.getName(weaponID); // Use weapon model to get the name of the weapons
// playSound(weaponName)  // play the good weapon sound
// playSound('reload_' + weaponName)  // play the reload associated sound


/* play an fx sound */
function playSound(sound) {
  // replace the sound at the beginning
  $('#' + String(sound)).prop("currentTime", 0);
  // start sound
  $('#' + String(sound)).trigger('play');
  // set the volume
  if (testMode){
    $('#' + String(sound)).prop("volume", 0.05);

  }else{
    $('#' + String(sound)).prop("volume", 0.2);
  }

}
