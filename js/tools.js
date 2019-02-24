// return a pseudo randomBoolean with a pseudo percentage of 'true'
function randomBoolean(_percent = 20) {
  var rdBoo = Math.floor(Math.random() * 100);
  return (rdBoo > _percent) ? 0 : 1;
}

// return a random integer
function randomFloored(_num) {
  return Math.floor(Math.random() * _num);
}

// print debug
// the debug output on the web page is for mobile dev issues ( like no dev panel on chrome mobile)
function debug(message, special = false) {
  if (testMode) {
    console.log(message);
    $("#output").append("</br>");
    // for visual log confort
    $("#output").append(String((special ? '//// ' : '// ') + message));
    // always reset the textfield focus on the last log
    var element = document.getElementById("output");
    element.scrollTop = element.scrollHeight;
  } else {
    // hide the out put if testMode is set to false
    $("#output").addClass("invisible");
    $("#output").html('');

  }
}