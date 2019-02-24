//JavaScript Document
/**
 * @author <a href="https://encrypt.to/0x2191C1D8">LHUILLERY Matthieu</a> 
 */

/** @constructor playerinfo
 * @desc Représente une section de la page qui affiche les informations sur un joueur
 * @return {playerinfo}
 */
function playerinfo() {

    /** @method playerinfo#display
     * @desc Affiche les infos du joueurs sur la page
     * @param {Object} player - Le joueur pour qui afficher les informations
     * @see Page
     * @return {JQuery}
     */
    this.display = function (player) {
        var $playerinfo = $('<div>');
        $playerinfo.attr("id", "infoPlayer" + player.id);
        $playerinfo.css({
            'justify-content': 'center',
            'text-align': 'center'
        });
        $playerinfo.addClass("playerInfo flow-text col s6 m6 l12 card");

        // ##############################################################################

        var $playername = $('<div>').addClass('row');
        $playername.addClass("player-name").text(" " + player.name);
        $playername.appendTo($playerinfo);

        // ##############################################################################

        var $playerHP = $("<div>");
        $playerHP.html("Santé: " + player.hp + "/100").addClass("row");
        $playerHP.appendTo($playerinfo);

        // ##############################################################################

        var $playerweapon = $("<div>");
        $playerweapon.html("Arme: " + player.weapon.name).addClass("row");
        $playerweapon.appendTo($playerinfo);

        // ##############################################################################

        var $playerweaponpicture = $("<img>");
        $playerweaponpicture.attr("width", "20").attr("heigth", "20");
        $playerweaponpicture.attr("src", "images/" + player.weapon.picture + ".png");
        $playerweaponpicture.appendTo($playerweapon);

        // ##############################################################################

        var $playerdamages = $("<div>");
        $playerdamages.html("Dégâts: " + player.weapon.damages).addClass("row ");
        $playerdamages.appendTo($playerinfo);

        // ##############################################################################

        var $playerposture = $("<div>");
        $playerposture.html("Posture: " + player.posture).addClass("row");
        $playerposture.appendTo($playerinfo);

        // ##############################################################################

        // à faire ! - ajouter l'image du joueur et celle de son arme
        var $playerpicture = $("<img>");
        $playerpicture.attr("width", "20").attr("heigth", "20").addClass('card-image');
        $playerpicture.attr("src", "images/" + player.picture + ".png");
        $playerpicture.prependTo($playername);

        // ##############################################################################

        $("#game-console").removeClass("offset-s3");

        $playerinfo.insertAfter($("#game-console"));
    }
}