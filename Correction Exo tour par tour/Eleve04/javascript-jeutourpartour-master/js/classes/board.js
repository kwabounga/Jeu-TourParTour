//JavaScript Document
/**
 * @author <a href="https://encrypt.to/0x2191C1D8">LHUILLERY Matthieu</a> 
 */

/** @constructor Board
 * @desc L'objet Board représente un plateau de jeu dans la partie lancée
 * @param {number} height La hauteur du plateau
 * @param {number} width La Largeur du plateau
 * @return {Board}
 * @property {number} width - La largeur du plateau
 * @property {number} height - La hauteur du plateau
 * @property {any}  grid - La tableau contenant les cellules du plateau
 */
function Board(height, width) {

    //debug console
    console.log("%cconstructor Board(" + height + "," + width + ")", styleConstruc);

    this.height = height;
    this.width = width;
    this.grid = (function (height, width) {
        //debug console
        console.log("%cconstructor Grid(" + height + "," + width + ")", styleConstruc);
        var grid = new Array(new Array());
        for (var i = 1; i <= height; i++) {
            grid[i - 1] = [];
            for (var j = 1; j <= width; j++) {
                grid[i - 1][j - 1] = new Cell(i - 1, j - 1);
            };
        }
        return grid;
    })(height, width);

    // ##############################################################################

    /** @method Board#accessibleforweapon
     * @desc vérifie que la case est accessible pour une arme. Une arme ne doit pas pouvoir se placer sur une case
     * déjà occupée par un obstacle ou par une autre arme. 
     * @param {number[]} position - Position à tester
     * @return {Boolean}
     */
    this.accessibleforweapon = function (position) {
        //debug console
        console.log("%cmethode board.accessibleforweapon(" + position + ")", styleConstruc);
        if (this.grid[position[0]][position[1]].weaponOnCell != 0) {
            //debug console
            console.log("%cWeaponOnCell != 0 return false - Try Again", styleWarning);
            return false;
        } else if (this.grid[position[0]][position[1]].accessible === false) {
            //debug console
            console.log("%caccessible === false - return false - Try Again", styleWarning);
            return false;
        } else {
            //debug console
            console.log("%cPosition Accessible - return True", styleValide);
            return true;
        }
    };

    // ##############################################################################

    /** @method Board#accessibleforplayer
     * @desc Verifier que la case est accessible pour un joueur. Il ne doit pas pouvoir se placer sur une case 
     * déjà occupée par un obstacle, par un autre joueur, ou par une arme.      
     * @param {number[]} position  - Position à tester
     * @return {Boolean}   
     */
    this.accessibleforplayer = function (position) {
        //debug console
        console.log("%cmethode board.accessibleforplayer(" + position + ")", styleMethode);
        if (this.grid[position[0]][position[1]].playerOnCell != 0) {
            //debug console
            console.log("%cplayerOnCell != 0 -> Try Again", styleWarning);
            return false;
        } else if (this.grid[position[0]][position[1]].accessible === false) {
            //debug console
            console.log("%caccessible === false - return false -> Try Again", styleWarning);
            return false;
        } else if (this.grid[position[0]][position[1]].weaponOnCell != 0) {
            //debug console
            console.log("%cweaponOnCell != 0 - return false -> Try Again", styleWarning);
            return false;
        } else {
            //debug console
            console.log("%cPosition Accessible - return True", styleValide);
            return true;
        }
    };

    // ##############################################################################

    /** @method Board#putWeaponOnBoard
     * @desc Inserer les armes dans le plateau 
     * @param {number} id - ID de l'arme
     * @param {number[]} position - Position où placer l'arme
     */
    this.putWeaponOnBoard = function (id, position) {
        //debug console
        console.log("%cmethode board.putWeaponOnBoard(id:" + id + ",position:(" + position + "))", styleMethode);
        //modifie l'attribue "WeaponOnCell" de la case
        this.grid[position[0]][position[1]].weaponOnCell = id;
    };

    // ##############################################################################

    /** @method Board#checkPlayerMovementOptions
     * @desc Verifier les mouvements possibles d'un joueur verifier les mouvements possibles d'un joueur 
     * en fonction de sa position et de sa portée
     * @param {number[]} position - Position à tester
     * @param {number} range - Portée de déplacement du joueur
     */
    this.checkPlayerMovementOptions = function (position, range) {
        console.log("%cmethode board.checkPlayerMovementOptions()", styleMethode);
        var movementOptions = new Array(new Array());
        // La variable movementOptions représente un tableau contenant des tableaux...
        // Elle est utilisé pour contenir la liste des positions où le joueur peut prendre position lors du tour
        var nbOptions = 0;
        // la variable nbOptions sera utilisé pour compter le nombre de position jouable par le joueur

        /** 
         * La boucle TOP 
         */
        for (var top = position[0] - 1; top >= Math.max(position[0] - range, 0); top -= 1) {
            // Pour chacune des trois cases au dessus de la position du joueur
            if ((this.grid[top][position[1]].accessible === true) && (this.grid[top][position[1]].playerOnCell === 0)) {
                // Si cette position est accessible et si il n'y a pas de joueur dessus,
                // alors ajouter cette position à les listes des positions jouables par le joueur
                // et augmenter la valeur du nombre de positions jouables stocké dans la variable nbOptions
                movementOptions[nbOptions] = [top, position[1]];
                nbOptions += 1;
            } else {
                /** Sinon, sortir de la boucle TOP */
                break;
            }
        }
        /** 
         * La boucle BOTTOM 
         */
        for (var bottom = position[0] + 1; bottom <= Math.min(position[0] + range, this.height - 1); bottom += 1) {
            // Pour chacune des trois cases au dessous de la position du joueur
            if ((this.grid[bottom][position[1]].accessible === true) && (this.grid[bottom][position[1]].playerOnCell === 0)) {
                // Si cette position est accessible et si il n'y a pas de joueur dessus,
                // alors ajouter cette position à les listes des positions jouables par le joueur
                // et augmenter la valeur du nombre de positions jouables stocké dans la variable nbOptions
                movementOptions[nbOptions] = [bottom, position[1]];
                nbOptions += 1;
            } else {
                /** Sinon, sortir de la boucle BOTTOM */
                break;
            }
        }
        /** 
         * La boucle LEFT 
         */
        for (var left = position[1] - 1; left >= Math.max(position[1] - range, 0); left -= 1) {
            // Pour chacune des trois cases à gauche de la position du joueur
            if ((this.grid[position[0]][left].accessible === true) && (this.grid[position[0]][left].playerOnCell === 0)) {
                // Si cette position est accessible et si il n'y a pas de joueur dessus,
                // alors ajouter cette position à les listes des positions jouables par le joueur
                // et augmenter la valeur du nombre de positions jouables stocké dans la variable nbOptions
                movementOptions[nbOptions] = [position[0], left];
                nbOptions += 1;
            } else {
                /** Sinon, sortir de la boucle LEFT */
                break;
            }
        }
        /** 
         * La boucle RIGHT 
         */
        for (var right = position[1] + 1; right <= Math.min(position[1] + range, this.width - 1); right += 1) {
            // Pour chacune des trois cases à droite de la position du joueur
            if ((this.grid[position[0]][right].accessible === true) && (this.grid[position[0]][right].playerOnCell === 0)) {
                // Si cette position est accessible et si il n'y a pas de joueur dessus,
                // alors ajouter cette position à les listes des positions jouables par le joueur
                // et augmenter la valeur du nombre de positions jouables stocké dans la variable nbOptions
                movementOptions[nbOptions] = [position[0], right];
                nbOptions += 1;
            } else {
                /** Sinon, sortir de la boucle RIGHT */
                break;
            }
        }
        /** Renvoie la liste des positions où le joueur peut prendre position lors du tour*/
        return movementOptions;
    };

    // ##############################################################################

    /** @method Board#movePlayerOnBoard
     * @desc Déplacer un joueur sur le plateau
     * @param {number} id - ID du joueur
     * @param {number[]} lastPos - Dernière position du joueur
     * @param {number[]} newPos - Nouvelle position du joueur
     */
    this.movePlayerOnBoard = function (id, lastPos, newPos) {
        //debug console
        console.log("%cmethode board.movePlayerOnBoard()", styleMethode);
        console.log("%clastPos:(" + lastPos[0] + "," + lastPos[1] + ") - newPos:(" + newPos[0] + "," + newPos[1] + ")", styleInfo);

        if (lastPos !== 0) {
            console.log("%cMethode.toggleTriggerCombat = Off", styleWarning);
            this.grid[lastPos[0]][lastPos[1]].playerOnCell = 0;

            if (lastPos[0] > 0) {
                this.grid[lastPos[0] - 1][lastPos[1]].toggleTriggerCombat();
            }
            if (lastPos[0] < this.height - 1) {
                this.grid[lastPos[0] + 1][lastPos[1]].toggleTriggerCombat();
            }
            if (lastPos[1] > 0) {
                this.grid[lastPos[0]][lastPos[1] - 1].toggleTriggerCombat();
            }
            if (lastPos[1] < this.width - 1) {
                this.grid[lastPos[0]][lastPos[1] + 1].toggleTriggerCombat();
            }
        }

        this.grid[newPos[0]][newPos[1]].playerOnCell = id;
        console.log("%cnewPos:(" + newPos[0] + "," + newPos[1] + ") = Joueur " + this.grid[newPos[0]][newPos[1]].playerOnCell, styleInfo);

        (function (Pos, board) {
            console.log("%cMethode.toggleTriggerCombat = On", styleValide);
            if (Pos[0] > 0) {
                //
                board.grid[Pos[0] - 1][Pos[1]].toggleTriggerCombat();
            }
            if (newPos[0] < board.height - 1) {
                //
                board.grid[Pos[0] + 1][Pos[1]].toggleTriggerCombat();
            }
            if (newPos[1] > 0) {
                //
                board.grid[Pos[0]][Pos[1] - 1].toggleTriggerCombat();
            }
            if (newPos[1] < board.width - 1) {
                //
                board.grid[Pos[0]][Pos[1] + 1].toggleTriggerCombat();
            }
        })(newPos, this);
    };

    // ##############################################################################

    /** @type {function} 
     * @name displayCell
     * @desc Affiche les cellules dans le plateau
     * @memberof Board
     * @see Board#display
     */
    var displayCell = function () {
        //debug console
        console.log("%cfunction composeCell()", styleFunction)
        /** composition des cellules */
        var $row, $cell;
        /** Parcourir toute les lignes de la grille */
        for (var i = 0; i < currentGame.board.grid.length; i++) {
            // Composition d'une ligne de la grille

            $row = $("<div class='row'></div>").addClass("center-align");
            $row.attr("id", "row-" + i);
            // Parcourir toute les collones de la ligne
            for (var j = 0; j < currentGame.board.grid[i].length; j++) {

                var colorCell = function (cell, i, j) {
                    if (currentGame.board.grid[i][j].accessible) {
                        cell.addClass("cell-accessible");
                    } else {
                        cell.addClass("cell-inaccessible");
                        cell.css({
                            "background-color": '#424242',
                            'border-radius': "10%"
                        });
                    }
                }

                // Composition d'un cellule de la grille
                $cell = $("<div>");
                $cell.addClass("cell col s1");
                $cell.attr("id", "cell-" + currentGame.board.grid[i][j].row + "-" + currentGame.board.grid[i][j].col);
                $cell.css({
                    'border-radius': "5%"
                });

                colorCell($cell, i, j);
                $cell.appendTo($row);
            }

            console.log(currentGame.board.height + " " + i);

            // Affichage de la ligne sur le plateau
            $row.appendTo($("#board"));

            if (currentGame.board.height === 8) {
                $('#cell-' + i + "-0").addClass("offset-s2");
                console.log("#cell-" + i + "-0");
                console.log($($row[1]));
            } else if (currentGame.board.height === 10) {
                $('#cell-' + i + "-0").addClass("offset-s1");
            }
        };
    };

    // ##############################################################################

    /** @method Board#display
     * @desc Affiche le plateau sur la page
     * @see Page 
     * @see displayCell
     */
    this.display = function () {
        console.log("%cfunction displayBoard(board)", styleFunction);

        var board = (function () {
            //debug console
            console.log("%cfunction composeBoardSection()", styleFunction);

            var $main = $("main");

            var $BoardContainer = $('<div>').addClass('col s12 m12 l8 center-align');
            /** composition des éléments HTML de la section "board" */
            var $Board = $("<div>").attr('id', 'board').addClass("container");
            $Board.css({
                'border': '15px solid #5cb85c'
            });
            $Board.appendTo($BoardContainer);
            return $BoardContainer;
        })();

        if ($("#board").length) {
            console.log("$(#board).remove()");
            $("#board").remove();
        }
        board.appendTo('main');
        displayCell();
    };

    // ##############################################################################

}