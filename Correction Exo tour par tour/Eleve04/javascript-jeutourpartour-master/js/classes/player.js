//JavaScript Document
/**
 * @author <a href="https://encrypt.to/0x2191C1D8">LHUILLERY Matthieu</a> 
 */

/** @constructor Player
 * @desc Représente un joueur dans la partie en cours
 * @param {number} id - L'ID du joueur
 * @param {string} name - Le nom du joueur
 * @param {Object} weapon - L'arme du joueur
 * @param {*} picture - L'image du joueur
 * @param {Object} board - Le plateau sur lequel sera placé le joueur
 * @property {number} id - L'ID du joueur
 * @property {string} name - Le nom du joueur
 * @property {Object} weapon - L'arme du joueur
 * @property {number} hp - La valeur des points de vie du joueur
 * @property {string} posture - La posture du joueur
 * @property {Boolean} defensePosture - Le trigger pour la posture défensive
 * @property picture - L'image du joueur
 * @property lastposition - Les coordonnées de la derniere position du joueur
 * @property {number} movement - La valeur maximum du nombre de case parcourues lors d'un mouvement du joueur
 * @property position - Les coordonnées du joueur sur le plateau
 * @return {Player} 
 */
function Player(id, name, weapon, picture, board) {
    //debug console
    console.log("%cconstructor Player(" + id + ")", styleConstruc);

    // ##############################################################################

    this.id = id;
    this.name = name;
    this.weapon = weapon;
    this.hp = 100;
    this.posture = "Arme au poing";
    this.defensePosture = false;
    this.picture = picture;
    this.lastposition = 0;
    this.movement = 3;

    // ##############################################################################

    /** @name Player#position
     * @type {function}
     * @desc Definir la position initiale du joueur sur le plateau 
     * Le joueur ne doit pas pouvoir se placer sur une case déjà occupée par un obstacle, 
     * par un autre joueur, ou par une arme. Ces conditions sont vérifiées par la méthode Board.accessibleforplayer()
     * @see Board#accessibleforplayer
     * @param {number} id - L'ID de du joueur
     * @param {string} name - Le nom du joueur
     * @param {number[]} last - Les coordonnées de la dernière position du joueur
     * @param {Object} board - Le plateau sur lequel placer le joueur
     */
    this.position = (function (id, name, last, board) {

        //debug console
        console.log("%cmethode player.position() -> " + name, styleMethode);

        var rndpos, accessible = false;
        // Tant que la position n'est pas accessible, alors...
        while (accessible === false) {
            // generer une nouvelle position aléatoire               
            rndpos = rdnposition(board);
            // Verifier si la position est accessible pour le joueur
            accessible = board.accessibleforplayer(rndpos);
        }
        // Si une position accessible est trouvée, alors placer le joueur sur le plateau
        board.movePlayerOnBoard(id, last, rndpos);

        //debug console
        console.log("%cNouvelle position de " + name + " = (" + rndpos + ")", styleInfo);

        // Retourne un tableau contenant de nouvelle coordonnés du joueur sur le plateau
        return rndpos;
    })(this.id, this.name, this.lastposition, board);

    // ##############################################################################

    /** @method Player#makeMovement 
     * @desc Changer la position du joueur sur le plateau
     * @param {number[]} newPos - Les coordonnées de la position où placer le joueur
     * @param {Object} board - Le plateau sur lequel placer le joueur
     * @return {function}
     */
    this.makeMovement = function (newPos, board) {

        //debug console
        console.log("%cmethode " + this.name + ".makeMovement()", styleMethode)

        // Avant toute modification, la "position actuelle" est copiée vers la "position précédente"
        this.lastPosition = this.position;
        // Placer le joueur sur le plateau en fonction de sa nouvelle position
        board.movePlayerOnBoard(this.id, this.lastPosition, newPos);
        // Definir la position actuelle du joueur en fonction de sa nouvelle position
        this.position = newPos;
        // Afficher le joueur sur le plateau
        displayPlayerOnBoard();
    };

    // ##############################################################################

    /** @method Player#lastMovementCells
     * @desc Lister les cases que le joueur vient de parcourir lors de son déplacement sur le plateau.
     */
    this.lastMovementCells = function () {
        //debug console
        console.log('%cmethode lastMovementCells()', styleMethode);
        var lastMovement = new Array(new Array()),
            deltaRow, deltaCol;

        // Définir l'amplitude et l'orientation du déplacement réalisé par le joueur 
        deltaRow = this.position[0] - this.lastPosition[0];
        deltaCol = this.position[1] - this.lastPosition[1];


        (function (player, lastMovement, deltaRow, deltaCol) {
            // Selon l'orientation du déplacement, lister les cases parcourues selon l'amplitude du mouvement
            if (deltaRow > 0) {
                for (var right = 1; right <= deltaRow; right += 1) {
                    lastMovement[right - 1] = [player.lastPosition[0] + right, player.lastPosition[1]];
                }
            } else if (deltaRow < 0) {
                for (var left = 1; left <= Math.abs(deltaRow); left += 1) {
                    lastMovement[left - 1] = [player.lastPosition[0] - left, player.lastPosition[1]];
                }
            } else if (deltaCol > 0) {
                for (var bottom = 1; bottom <= deltaCol; bottom += 1) {
                    lastMovement[bottom - 1] = [player.lastPosition[0], player.lastPosition[1] + bottom];
                }
            } else if (deltaCol < 0) {
                for (var top = 1; top <= Math.abs(deltaCol); top += 1) {
                    lastMovement[top - 1] = [player.lastPosition[0], player.lastPosition[1] - top];
                }
            }
            // retourne la liste des positions parcourues par le joueur lors de son déplacement
            return lastMovement;
        })(this, lastMovement, deltaRow, deltaCol);

        //debug console
        console.log(lastMovement);
        return lastMovement;
    };

    // ##############################################################################

    /** @method Player#takeDamages 
     * @desc Diminuer les points de vie du joueur en fonction de la puissance de l'attaque de son adversaire.
     * @param {number} damages - La puissance d'attaque de son adversaire
     */
    this.takeDamages = function (damages) {
        
        //debug console
        console.log("%cmethode player.takeDamages()", styleMethode);
        
        if (this.defensePosture === true) {
            //debug console
            console.log("%cthis.defensePosture === true", styleValide);


            // Si le joueur est en posture defensive, 
            // alors diminer ses points de vie en fonction de la moitié de la puissance d'attaque de son adversaire
            this.hp -= (damages / 2);
        } else {
            //debug console
            console.log("%cthis.defensePosture !== true", styleWarning);

            // sinon, diminer ses points de vie en fonction de la puissance d'attaque de son adversaire
            this.hp -= damages;
        }
    }

    // ##############################################################################

}