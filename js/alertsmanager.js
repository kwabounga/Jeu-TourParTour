function hideAlert(realCombat = false) {

  $(`#alert`).addClass("invisible");
  $(`#alert`).removeClass("overAll");
  $(`#alert`).removeClass("yellow");
  $(`#alert`).removeClass("orange");
  // free timeout
  clearTimeout(idTimeOut);
}
// Pop Up's alert for game rytme
function alert(msg, realCombat = false) {
  // swap the alert color to current player's style
  $(`#alert`).addClass(Boolean(currentPlayer) ? "yellow" : "orange");
  // show the alert
  $(`#alert`).removeClass("invisible");
  // place the alert very high
  $(`#alert`).addClass("overAll");
  // display the msg
  $(`#alert`).html(String(msg));
  // Set a timer to close the alert 1 sec later
  idTimeOut = setTimeout(function() {
    hideAlert(realCombat);
  }, 1000);

}
