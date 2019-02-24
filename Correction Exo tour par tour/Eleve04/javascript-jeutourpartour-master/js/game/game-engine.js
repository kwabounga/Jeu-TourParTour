//JavaScript Document
/**
 * @author <a href="https://encrypt.to/0x2191C1D8">LHUILLERY Matthieu</a> 
 */

/** @namespace GameEngine */
var GameEngine = {};

/** @constructor Game 
 * @memberof GameEngine
 * @desc Représente une partie lancée dans le jeu.
 * @param {number} boardWidth - La valeur du nombre de ligne dans le plateau du jeu
 * @param {number} boardHeight - La valeur du nombe de colonne dans le plateau du jeu
 * @property {string} difficulty - La difficulté de la partie
 * @property {Board} board - creation d'un nouvel objet Board en fonction de boardWith et boardHeight
 * @property {Weapon[]} baseWeapons - Liste les armes par défault des deux joueurs
 * @property {Weapon[]} bonusWeapons - Liste de nouveau objets Weapon pour les armes bonus
 * @property {Weapon[]} weapons - Liste toutes les armes de la partie
 * @property {Player[]} players - Liste les joueurs de la partie
 * @property {Player} currentPlayer - Le joueur à qui c'est le tour de joueur
 * @property {Boolean} continueMovementPhase - Permet de définir si le tour du joueur continue
 * @return {Game}
 */
function Game(boardWidth, boardHeight) {

    // ##############################################################################

    this.difficulty = (function (boardWidth) {
        if (boardWidth == 8) {
            return "Hard (8x8)";
        } else if (boardWidth == 12) {
            return "Easy (12x12)";
        } else {
            return "Medium (10x10)";
        }
    })(boardWidth);

    //debug
    console.log("%cconstructor Game(" + boardWidth + "," + boardHeight + ")", styleConstruc);

    this.board = new Board(boardWidth, boardHeight);

    // ##############################################################################

    this.baseWeapons = [
        new Weapon(1, "Poing", 10, "punch"),
        new Weapon(2, "Poing", 10, "punch")
    ];

    this.bonusWeapons = [
        new Weapon(3, "Axe", 20, "axe"),
        new Weapon(4, "Hoe", 15, "hoe"),
        new Weapon(5, "Pickaxe", 25, "pickaxe"),
        new Weapon(6, "Sword", 30, "sword")
    ];

    this.weapons = this.baseWeapons.concat(this.bonusWeapons);

    //debug console
    console.log(this.weapons);
    console.log("%cloop for (var weapon in this.bonusWeapons)", styleInfo);

    for (var weapon in this.bonusWeapons) {
        this.bonusWeapons[weapon].initializePositionOnBoard(this.board);
    }

    // ##############################################################################

    this.players = [
        new Player(1, "Paladin", this.baseWeapons[0], "player1", this.board),
        new Player(2, "Squelette", this.baseWeapons[1], "player2", this.board)
    ];

    this.currentPlayer = this.players[0];

    this.continueMovementPhase = true;

    // ##############################################################################

    /** @method Game#nextMovementTurn 
     * @desc Lancer le prochain tour du jeu
     */
    this.nextMovementTurn = function () {
        //debug console
        console.log("%cmethode game.nextMovementTurn(" + this.currentPlayer.name + ")", styleMethode);
        //InGame Console
        currentpage.gameConsole.showmsg("msg_turn_mov", this.currentPlayer.name);

        if (this.continueMovementPhase === true) {
            console.log("%cgame.continueMovementPhase === true", styleValide);
            // tout verifier à partir d'ici
            var movementOptions = this.board.checkPlayerMovementOptions(this.currentPlayer.position, this.currentPlayer.movement);
            console.log("%cmovementOptions.length = " + movementOptions.length, styleInfo);
            if (movementOptions.length > 0) {
                // si le nombre de mouvement possible est supérieur à 0, alors afficher et activer les cellules accessibles
                setupMovementOptions(movementOptions);
            } else {
                // sinon annoncer la fin de la partie
                this.endGame();
                console.log("endgame");
            }
        } else {
            // sinon annoncer le début du combat ! 
            this.nextCombatTurn();

        }
    };

    // ##############################################################################

    /** @method Game#nextCombatTurn
     * @desc Lancer le prochain tour du combat
     */
    this.nextCombatTurn = function () {
        console.log("%cmethode game.nextCombatTurn()", styleMethode);
        console.log("%c" + this.currentPlayer.name + "  hp=" + this.currentPlayer.hp, styleInfo);

        if (this.currentPlayer.hp > 0) {
            //InGame Console
            currentpage.gameConsole.showmsg("msg_turn_combat", this.currentPlayer.name, "fast");
            setupCombatOptions();
        } else {
            this.endGame();
        }
    };

    // ##############################################################################

    /** @method Game#makeCombatTurn
     * @desc Réaliser une action de combat lors d'un tour de jeux
     * @param {event} event Le joueur clic sur attaquer ou défendre
     */
    this.makeCombatTurn = function (event) {

        //debug console
        console.log("%cmethode game.makeCombatTurn()", styleMethode);
        var option = event.data.option;
        unsetCombatOptions();
        if (option === "atk") {
            var ennemy = currentGame.getNextPlayer();
            currentGame.currentPlayer.defensePosture = false;

            currentGame.currentPlayer.posture = "Arme au poing"
            ennemy.takeDamages(currentGame.currentPlayer.weapon.damages);
            //Ingame console
            currentpage.gameConsole.showmsg("msg_atk", currentGame.currentPlayer.name);
        } else if (option === "def") {
            currentGame.currentPlayer.defensePosture = true;
            currentGame.currentPlayer.hp += 10;
            currentGame.currentPlayer.posture = "Prêt à parer !"
            //Ingame console
            currentpage.gameConsole.showmsg("msg_def", currentGame.currentPlayer.name);
        }

        //displayHP(ennemy);
        RefreshInfoPlayers();

        currentGame.setNextPlayer();
        currentGame.nextCombatTurn();
    };

    // ##############################################################################

    /** @method Game#makeMovementTurn
     * @desc Réaliser un déplacement du joueur lors de son tour
     * @param {event} event Le joueur click sur une case où il peut se déplacer
     */
    this.makeMovementTurn = function (event) {
        //debug console        
        console.log("%cmethode game.makeMovementTurn()", styleMethode);
        //
        var position = [event.data.row, event.data.col];
        //
        currentGame.currentPlayer.makeMovement(position, currentGame.board);
        //
        unsetMovementOptions();
        //
        var weaponSwitchOptions = currentGame.currentPlayer.lastMovementCells();

        //debug console
        console.log("%cfunction weaponSwitchOptions() length= " + weaponSwitchOptions.length, styleFunction);
        //InGame console
        currentpage.gameConsole.showmsg("msg_mov" + weaponSwitchOptions.length, currentGame.currentPlayer.name);

        for (option in weaponSwitchOptions) {
            currentGame.switchPlayerWeapon(weaponSwitchOptions[option], currentGame.currentPlayer);
        }
        if (currentGame.board.grid[currentGame.currentPlayer.position[0]][currentGame.currentPlayer.position[1]].triggerCombat === true) {
            currentGame.continueMovementPhase = false;
        } else {
            currentGame.continueMovementPhase = true;
        }
        RefreshInfoPlayers();
        currentGame.setNextPlayer();
        currentGame.nextMovementTurn();
    };

    // ##############################################################################

    /** @method Game#getNextPlayer
     * @desc Trouver le prochain joueur qui doit joueur
     */
    this.getNextPlayer = function () {
        //debug console
        console.log('%cmethode game.getNextPlayer()', styleMethode);
        if (this.currentPlayer.id === this.players.length) {
            return this.players[0];
        } else {
            return this.players[this.currentPlayer.id];
        }
    };

    // ##############################################################################

    /** @method Game#setNextPlayer 
     * @desc Définir le prochain joueur qui doit jouer
     */
    this.setNextPlayer = function () {
        //debug console
        console.log("%cmethode game.setNextPlayer()", styleMethode);
        if (this.currentPlayer.id === this.players.length) {
            // si ...
            this.currentPlayer = this.players[0];
        } else {
            // sinon ...
            this.currentPlayer = this.players[this.currentPlayer.id];
        }
    };

    // ##############################################################################

    /** @method Game#switchPlayerWeapon 
     * @desc Remplacer l'arme d'un joueur
     * @param {number[]} pos - Les coordonnées de la position où placer l'arme
     * @param {Objets} player - Le joueur à qui remplacer la l'arme
     */
    this.switchPlayerWeapon = function (pos, player) {

        //debug console
        console.log("%cmethode game.switchPlayerWeapon()", styleMethode);

        var oldWeaponId = player.weapon.id;

        //debug console
        console.log("%coldWeaponId = " + oldWeaponId, styleInfo);

        var newWeaponId = this.board.grid[pos[0]][pos[1]].weaponOnCell;

        //debug console
        console.log("%cnewWeaponId = " + newWeaponId, styleInfo);

        if (newWeaponId > 0) {

            //debug console
            console.log("%cnewWeaponId > 0", styleWarning);

            var oldWeapon, newWeapon;
            for (var i = 0; i < this.weapons.length; i += 1) {
                if (this.weapons[i].id === oldWeaponId) {
                    oldWeapon = this.weapons[i];

                    //debug console                    
                    console.log('%cthis.weapons[i].id === oldWeaponId', styleInfo);
                    console.log("%coldWeapon.name = " + oldWeapon.name, styleInfo);

                } else if (this.weapons[i].id === newWeaponId) {
                    newWeapon = this.weapons[i];

                    //debug console                    
                    console.log('%cthis.weapons[i].id === newWeaponId', styleInfo);
                    console.log("%cnewWeapon.name = " + newWeapon.name, styleInfo);
                }
            }
            //debug console
            console.log("%cplayer.id = " + player.id, styleInfo);

            newWeapon.position = "player" + player.id;
            oldWeapon.position = pos;
            this.board.grid[pos[0]][pos[1]].weaponOnCell = oldWeaponId;
            player.weapon = newWeapon;

            //InGame console
            currentpage.gameConsole.showmsg("msg_switch", player.name, "fast", player.weapon.name);
            displayWeapon(oldWeapon, newWeapon);
        }
        //debug console
        console.log("%cPlayer" + player.id + " weapon.id = " + player.weapon.name + player.weapon.id, styleInfo);

    };

    // ##############################################################################

    /** @method Game#endGame
     * @desc Définir le vainqueur et annoncer la fin
     */
    this.endGame = function () {
        var winner = this.getNextPlayer().name;
        $("#button_attack").remove();
        $("#button_defend").remove();
        //InGame Console
        currentpage.gameConsole.showmsg("msg_end", winner, "fast");
        // alert("Victoire du Joueur " + winner + " !");
    };

    // ##############################################################################

}

// ##############################################################################

/** @function rdnposition 
 * @memberof GameEngine
 * @desc Générer une position aléatoire dans une grille
 * @param {Object} board Le plateau où chercher une position
 * @see Board
 */
function rdnposition(board) {
    var rdnposition = [Math.floor(Math.random() * board.width), Math.floor(Math.random() * board.height)];
    //debug console
    console.log('%cfunction rdnposition(' + rdnposition + ')', styleFunction);
    return rdnposition;
}

// ##############################################################################

/** @function sleep
 * @memberof GameEngine
 * @desc Petite fonction bien utile pour faire une pause
 * @see gameConsole#showmsg
 * @param {number} milliseconds La valeur du temps en millisecondes
 */
function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}

// ##############################################################################