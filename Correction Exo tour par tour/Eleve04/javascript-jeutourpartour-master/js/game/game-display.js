//JavaScript Document
/**
 * @author <a href="https://encrypt.to/0x2191C1D8">LHUILLERY Matthieu</a> 
 */

/** @namespace GameDisplay */

/** @function displayGame
 * @memberof GameDisplay
 * @desc Afficher la partie
 * @param {Game} game - La partie à afficher
 * @param {string} difficulty - La diffculté selectionnée
 * @returns {function}
 */
function displayGame(game, difficulty) {
    //debug console
    console.log("%cfunction displayGame()", styleFunction);
    //Ingame Console
    currentpage.gameConsole.showmsg(message = "msg_start");
    toggleGameControls(); // présentation des contrôles du jeu
    toggleBtnStart(difficulty); // transformation du bouton START
    game.board.display(); // afficher le plateau de la partie
    displayPlayerOnBoard(); // afficher les joueurs sur le plateau
    displayWeaponOnBoard(); //
    RefreshInfoPlayers(); // présentation des informations sur les joueurs
    resizeCell();
}

// ##############################################################################

/** @function displayWeaponOnBoard 
 * @memberof GameDisplay
 * @desc Afficher les armes sur le plateau 
 * @returns {function}
 */
function displayWeaponOnBoard() {
    //debug console
    for (var x = 0; x < currentGame.bonusWeapons.length; x++) {
        console.log('%cfunction displayWeaponOnBoard(' + currentGame.bonusWeapons[x].position[0] + "." + currentGame.bonusWeapons[x].position[1] + ")" + currentGame.bonusWeapons[x].name, styleFunction);
        var $cellwep = $("#cell-" + currentGame.bonusWeapons[x].position[0] + "-" + currentGame.bonusWeapons[x].position[1]);
        $cellwep.addClass("cell-weapon-" + currentGame.bonusWeapons[x].name);
    }
}

// ##############################################################################

/** @function toggleBtnStart
 * @memberof GameDisplay
 * @desc Transformer le bouton "Start" par "Restart"
 * @param {string} difficulty - La diffculté selectionnée
 */
function toggleBtnStart(difficulty) {
    //debug console
    console.log("%cfunction toggleBtnStart()", styleFunction);
    $("#button_start_easy").addClass('hide');
    $("#button_start_medium").addClass('hide');
    $("#button_start_hard").addClass('hide');
    // Remplace le contenu du bouton "Start" par "Restart"
    var $button_start = $('#button_start_' + difficulty);
    $button_start.removeClass('hide');
    $button_start.html("Restart");
}

// ##############################################################################

/** @function toggleGameControls 
 * @memberof GameDisplay
 * @desc Présenter les boutons de contrôles
 */
function toggleGameControls() {
    //debug console
    console.log("%cfunction toggleGameControls()", styleFunction);

    // création et affichage du bouton Attaque
    if (!$("#button_attack").length) {
        var $button_attack = $('<button>');
        $button_attack.attr('id', 'button_attack').attr('type', 'button');
        $button_attack.addClass("btn btn-danger").text('Attaquer');
        $button_attack.appendTo($("#game_controls"));
    }
    // création et affichage du bouton Defendre
    if (!$("#button_defend").length) {
        var $button_defend = $('<button>');
        $button_defend.attr('id', 'button_defend').attr('type', 'button');
        $button_defend.addClass("btn btn-primary").text('Defendre');
        $button_defend.appendTo($("#game_controls"));
    }
}

// ##############################################################################

/** @function displayPlayerOnBoard
 * @memberof GameDisplay
 * @desc Afficher le joueur sur le plateau 
 */
function displayPlayerOnBoard() {
    //debug console
    console.log("%cfunction displayPlayerOnBoard()", styleFunction);
    currentGame.players.forEach(
        function (player) {
            if ($('.pictureonboard').length === 2) {
                $('.pictureonboard').remove();
            }
            $playerpiconboard = $("<img>").addClass("pictureonboard valign-wrapper").attr("style", "vertical-align:baseline;");
            $playerpiconboard.css({
                "width": "100%",
                "heigth": "100%",
                "border": "1px solid red"
            });
            $playerpiconboard.attr("src", "./images/" + player.picture + ".png");
            $playerpiconboard.appendTo($("#cell-" + player.position[0] + "-" + player.position[1]));
        }, this);
}

// ##############################################################################

/** @function displayWeapon
 * @memberof GameDisplay
 * @desc Afficher les armes sur le plateau
 * @param {Object} oldWeapon - L'ancienne arme 
 * @param {Object} newWeapon - La nouvelle arme
 */
function displayWeapon(oldWeapon, newWeapon) {

    //debug console
    console.log("%cfunction displayWeapon(" + oldWeapon.name + "," + newWeapon.name + ")", styleWarning);


    var $cellNewWep = $("#cell-" + newWeapon.position[0] + "-" + newWeapon.position[1]);
    var $cellOldWep = $("#cell-" + oldWeapon.position[0] + "-" + oldWeapon.position[1]);

    console.log("%cNewWep #cell-" + newWeapon.position[0] + "-" + newWeapon.position[1], styleWarning);
    console.log("%cOldWep #cell-" + oldWeapon.position[0] + "-" + oldWeapon.position[1], styleWarning);

    if ($cellOldWep.hasClass("cell-weapon-" + newWeapon.name)) {
        console.log('%chasClass', styleWarning);
        $cellOldWep.removeClass("cell-weapon-" + newWeapon.name);
        $cellOldWep.addClass("cell-weapon-" + oldWeapon.name);
    } else {
        console.log("%c!hasClass", styleWarning);
        $cellOldWep.addClass("cell-weapon-" + oldWeapon.name);
    }

}

// ##############################################################################

/** @function toggleMovement
 * @memberof GameDisplay
 * @desc Afficher les cases accessibles pour le joueur 
 * @param {any[]} movement La liste des mouvements possibles
 */
function toggleMovement(movement) {
    "use strict";
    if ($("#cell-" + movement[0] + "-" + movement[1]).hasClass("cell-movement")) {
        // si la cellule a la class "cell-movement", alors la class "cell-movement" est supprimée
        console.log("%cfunction toggleMovement() -> removeClass", styleFunction);
        $("#cell-" + movement[0] + "-" + movement[1]).removeClass("cell-movement");
    } else {
        // sinon la class "cell-movement" est ajoutée
        $("#cell-" + movement[0] + "-" + movement[1]).addClass("cell-movement");
        console.log("%cfunction toggleMovement() -> addClass", styleFunction);
    }
}

// ##############################################################################

/** @function RefreshInfoPlayers
 * @memberof GameDisplay
 * @desc Présenter les informations des joueurs
 */
function RefreshInfoPlayers() {
    //debug console
    console.log("%cfunction RefreshInfosPlayers()", styleFunction);
    /* Modification de #board_controls */
    if (!$(".playerInfo").length) {
        // si il n'y a pas de div avec la class '.playerInfo', alors on appel 'infoPlayer()'
        infoPlayers(currentGame.players);
    } else {
        // sinon, on supprime les div avec la class '.playerinfo', et on appel 'infoPlayer()'
        $(".playerInfo").remove();
        $("#infoPlayers").remove();
        infoPlayers(currentGame.players);
    };
}

// ##############################################################################

/** @function infoPlayers 
 * @memberof GameDisplay
 * @desc Afficher les infos des joueurs  
 * @param {Object[]} players - La liste des joueurs pour qui afficher les infos
 */
function infoPlayers(players) {
    //debug console
    console.log("%cfunction infoPlayers(" + players.length + ")", styleFunction);
    // Pour chaque 'player' dans le paramêtre 'players' de la partie en cours


    players.forEach(
        function (player) {
            var info = new playerinfo();
            info.display(player);
        }, this);
}

// ********************************************************************************

// CSS For debug console
var styleWarning = ['color: red', 'font-weight: bold'].join(';');
var styleInfo = ['color: blue', 'font-weight: bold'].join(';');
var styleValide = ['color: green', 'font-weight: bold'].join(';');
var styleFunction = ['font-style: italic', 'color: SteelBlue '].join(';');
var styleConstruc = ['font-style: italic', 'color: teal '].join(';');
var styleMethode = ['font-style: italic', 'color: olive '].join(';');

// ********************************************************************************

// Maintain aspect ratio of.cell
var aspect_ratio = 1;

// Resize .cell on browser resize
$(window).resize(function () {
    $(".cell").height($(".cell").width() * aspect_ratio);
});

/** @function resizeCell
 * @memberof GameDisplay
 * @desc Redimmensionner la hauteur des cellules en fonction de leur largeur
 * @see Cell
 */
function resizeCell() {
    console.log('resise');
    $(".cell").height($(".cell").width() * aspect_ratio);
    // $("#board").height($("#board").width()*aspect_ratio)
};

/** @function autoScrollConsole
 * @memberof GameDisplay
 * @desc Faire défiller la console InGame vers le dernier message
 * @see Console
 * @see Console#showmsg
 */
function autoScrollConsole(zone, speed) {
    if (speed == "fast") {
        zone.animate({
            scrollTop: zone.prop("scrollHeight") - zone.height()
        }, 250);
    } else if (speed == "slow") {
        zone.animate({
            scrollTop: zone.prop("scrollHeight") - zone.height()
        }, 5000);
    } else if (!speed) {
        zone.animate({
            scrollTop: zone.prop("scrollHeight") - zone.height()
        }, 1000);
    }

}