//JavaScript Document
/**
 * @author <a href="https://encrypt.to/0x2191C1D8">LHUILLERY Matthieu</a> 
 */

/** @constructor Cell
 * @desc Représente une case dans la grille du plateau
 * @param {number} rowIndex - Numéro d'index de la ligne
 * @param {number} colIndex - Numéro d'index de la colonne
 * @property {number} row - Numéro d'index de la ligne
 * @property {number} col - Numéro d'index de la colonne
 * @property {Boolean} triggerCombat - indique si la case est propice à la baston
 * @property {number} playerOnCell - ID du joueur sur la case
 * @property {number} weaponOnCell - ID de l'arme sur la case
 * @property {Boolean} accessible - 90% de chance que la case soit défini comme accessible
 * @return {Cell}
 */
function Cell(rowIndex, colIndex) {

    // ##############################################################################

    this.row = rowIndex;
    this.col = colIndex;
    this.triggerCombat = false;
    this.playerOnCell = 0;
    this.weaponOnCell = 0;
    this.accessible = (function () {
        if (Math.random() < 0.9) {
            return true;
        } else {
            return false;
        }
    })();

    // ##############################################################################

    /** @method Cell#toggleTriggerCombat
     * @desc Activer/désactiver l'ammorceur de combat
     */
    this.toggleTriggerCombat = function () {

        if (this.triggerCombat === true) {
            this.triggerCombat = false;
            $("#cell-" + this.row + "-" + this.col).removeClass("combat");
            console.log("%c(" + this.row + "," + this.col + ").triggerCombat = false", styleWarning);
        } else {
            this.triggerCombat = true;
            $("#cell-" + this.row + "-" + this.col).addClass("combat");
            console.log("%c(" + this.row + "," + this.col + ").triggerCombat = true", styleValide);
        }
    };

    // ##############################################################################

}