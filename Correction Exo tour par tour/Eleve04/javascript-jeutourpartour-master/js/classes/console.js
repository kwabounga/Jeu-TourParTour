//JavaScript Document
/**
 * @author <a href="https://encrypt.to/0x2191C1D8">LHUILLERY Matthieu</a> 
 */

/** @constructor consoleGame
 * @return {consoleGame} 
 * 
 */
function consoleGame() {

    /** @name consoleGame#$boardcontrols 
     * @type {JQuery}
     */
    var $boardcontrols = $("#board_controls");

    /** @name consoleGame#$game_console
     * @type {JQuery}
     */
    var $game_console = $("<div>").attr("id", "game-console");
    $game_console.addClass("col l12 m12");
    $game_console.css({
        'border': "5px solid #5cb85c",
        'overflow': 'auto',
        'height': "18.5vw"
    });
    $info_console = $("<div>").attr("id", "infoGame").addClass("row flow-text");
    $info_console.css({
        'margin': 'auto'
    });

    /** @name consoleGame#$rowControle
     * @type {JQuery}
     */
    var $rowControle = $('<div>');
    $rowControle.addClass("row").attr("id", "gameConsoleRow")
    $info_console.appendTo($game_console);
    $game_console.appendTo($rowControle);
    $rowControle.prependTo($boardcontrols);

    // ##############################################################################

    /** @method consoleGame#display
     * @return {function}
     */
    this.display = function () {
        $rowControle.prependTo('#board_controls');
    };

    // ##############################################################################

    /** @method consoleGame#showmsg 
     * @desc Afficher les logs de la partie
     * @param {string} message
     * @param {Object} weapon
     * @param {string} player
     * @param {string} speed
     * @return {function}
     */
    this.showmsg = function (message, player, speed, weapon) {

        //console log
        console.log("%cfunction displayConsole(" + message + "," + player + "," + speed + "," + weapon + ")", styleFunction);

        var message = message;
        // messages pour la console InGame
        var msg_start, msg_bienvenue = "Bienvenue !<br>Choisissez un niveau de difficulté !";


        var $infoconsole = $("#infoGame");
        var $gameconsole = $("#game-console");

        switch (message) {
            case "msg_bienvenue":
                $infoconsole.html(msg_bienvenue);
                autoScrollConsole($gameconsole);
                break;
            case "msg_start":
                msg_start = "Niveau de difficulté selectionné: " + currentGame.difficulty + "<br>Une nouvelle partie est lancée !";
                $infoconsole.html("");
                $("<div>").html(msg_start).appendTo($infoconsole);
                autoScrollConsole($gameconsole);
                break;
            case "msg_turn_mov":
                var msg_turn_mov = "C'est au tour de " + player + " de jouer !";
                $("<div>").html(msg_turn_mov).appendTo($infoconsole);
                autoScrollConsole($gameconsole, "fast");
                break;
            case "msg_mov1":
                var msg_mov1 = player + " s'est déplacé de 1 case";
                $("<div>").html(msg_mov1).appendTo($infoconsole);
                autoScrollConsole($gameconsole, "fast");
                break;
            case "msg_mov2":
                var msg_mov2 = player + " s'est déplacé de 2 cases";
                $("<div>").html(msg_mov2).appendTo($infoconsole);
                autoScrollConsole($gameconsole, "fast");
                break;
            case "msg_mov3":
                var msg_mov3 = player + " s'est déplacé de 3 cases";
                $("<div>").html(msg_mov3).appendTo($infoconsole);
                autoScrollConsole($gameconsole, "fast");
                break;
            case "msg_turn_combat":
                var msg_turn_combat = "C'est au tour de " + player + " de combattre !";
                $("<div>").html(msg_turn_combat).appendTo($infoconsole);
                autoScrollConsole($gameconsole, "fast");
                break;
            case "msg_switch":
                var msg_switch = player + " prend possession d'une nouvelle arme: " + weapon;
                $("<div>").html(msg_switch).appendTo($infoconsole);
                autoScrollConsole($gameconsole, "fast");
                break;
            case "msg_end":
                var msg_end = player + " gagne la partie ! Bravo<br>#### GAME OVER ####<br>Press Restart !";
                $("<div>").html(msg_end).appendTo($infoconsole);
                autoScrollConsole($gameconsole, "slow");
                break;
            case "msg_def":
                var msg_def = player + " lève son bouclier et retrouve 10 HP<br>Les dommages qu'il subira seront réduits !";
                $("<div>").html(msg_def).appendTo($infoconsole);
                autoScrollConsole($gameconsole, "fast");
                break;
            case "msg_atk":
                if (currentGame.getNextPlayer().defensePosture === true) {
                    var msg_atk = "Blam! le bouclier encaisse !<br>" + player + " fait perdre " + (currentGame.currentPlayer.weapon.damages / 2) + " HP à son adversaire ! ";
                    $("<div>").html(msg_atk).appendTo($infoconsole);
                    autoScrollConsole($gameconsole, "fast");
                    break;
                } else {
                    var msg_atk = "Paf ! en pleine face !<br>" + player + " fait perdre  " + currentGame.currentPlayer.weapon.damages + " HP à son adversaire ! ";
                    $("<div>").html(msg_atk).appendTo($infoconsole);
                    autoScrollConsole($gameconsole, "fast");
                    break;
                }
            default:
                $infoconsole.html('');
        }
    };

    // ##############################################################################

};