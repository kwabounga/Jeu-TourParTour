//JavaScript Document
/**
 * @author <a href="https://encrypt.to/0x2191C1D8">LHUILLERY Matthieu</a> 
 */

/**  @constructor Weapon
 * @desc représente une arme dans la partie lancée
 * @param {number} id - L'ID de l'arme
 * @param {string} name - Le nom de l'arme
 * @param {number} damages - La valeur des dégâts de l'arme
 * @param picture - L'image de l'arme sur le plateau
 * @return {Weapon}
 * @property {number} id - L'ID de l'arme
 * @property {string} name - Le nom de l'arme
 * @property {number} damages - La valeur des dégâts de l'arme
 * @property picture - L'image de l'arme sur le plateau
 * @property position - les coordonnées de l'arme sur le plateau
 */
function Weapon(id, name, damages, picture) {

	// debug console
	console.log("%cconstructor Weapon()", styleConstruc);

	// ##############################################################################

	this.id = id;
	this.name = name;
	this.damages = damages;
	this.picture = picture;
	this.position = 0;

	// ##############################################################################

	/** @method Weapon#initializePositionOnPlayer
	 * @desc Initialiser la position de l'arme sur le joueur
	 * @param {Object} player Le joueur à qui attriber l'arme
	 */
	this.initializePositionOnPlayer = function (player) {
		//debug console
		console.log("%cmethode weapon.initializePositionOnPlayer(" + player.name + ")", styleMethode);
		this.position = "player" + player.id;
	};

	// ##############################################################################

	/** @method Weapon#initializePositionOnBoard
	 * @desc Initialiser la position de l'arme sur le plateau 
	 * @see Board#accessibleforweapon
	 * @see Board#putWeaponOnBoard
	 * @param {Object} board Le plateau de jeu sur lequel placer l'arme
	 * @return {JQuery}
	 */
	this.initializePositionOnBoard = function (board) {
		
		//debug console
		console.log("%cmethode " + this.name + ".initializePositionOnBoard()", styleMethode)
		
		var rndPos, suitable = false;
		// Tant que la position n'est pas accessible, alors...
		while (suitable === false) {
			// generer une nouvelle position aléatoire
			rndPos = rdnposition(board);
			// Verifier si la position est accessible pour l'arme
			suitable = board.accessibleforweapon(rndPos);
		}
		// Si une position accessible est trouvée, alors placer l'arme sur le plateau
		this.position = rndPos;
		board.putWeaponOnBoard(this.id, rndPos);
	};

	// ##############################################################################


}