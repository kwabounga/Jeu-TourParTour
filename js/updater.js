// i can't see the $() comand anymore :)
// use less ? maybe  but in the train on my phone it's difficult to tape the $ -_- so !
function htmlUpdater(_cssSelector, _value) {
  $(_cssSelector).html(_value);
}

function htmlAppender(_cssSelector, _value) {
  $(_cssSelector).append(_value);
}

function htmlClassAdder(_cssSelector, _class) {
  $(_cssSelector).addClass(_class);
}

function htmlClassRemover(_cssSelector, _class) {
  $(_cssSelector).removeClass(_class);
}
// for acces tiles more easily
function htmlTilesClassAdder(_y, _x, _accessor, _value) {
  $('#board .line:nth-child(' + _y + ') .tile:nth-child(' + _x + ') .' + _accessor).addClass(_value);
}

function htmlTilesClassRemover(_y, _x, _accessor, _value) {
  $('#board .line:nth-child(' + _y + ') .tile:nth-child(' + _x + ') .' + _accessor).removeClass(_value);
}