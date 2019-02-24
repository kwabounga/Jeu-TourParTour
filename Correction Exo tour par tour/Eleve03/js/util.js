// ======= Création des variables globales =======//

let tab_position = [];
const $carte = $("#map");
let ligne;
let colonne;
const longueur = 10;
this.cible = '';

// ======= Fonctions Globales =======//

// fonction qui retourne un entier aléatoire entre 1 et max, function utilisé dans game.js lancementJeu() et dans map.js genere_carte_alea()

function nb_aleat(max) 
{
	return Math.floor((Math.random() * max) + 1);
}

// returne l'index du perso passé en argument, function utilisé dans game.js toucheEnfonce()
function getIndexPerso(perso) 
{
	ligne = parseInt(perso.elm.css('top')) / 100; // position en x
  	colonne = parseInt(perso.elm.css('left')) / 100; // position en Y
  	return getIndex(ligne, colonne, longueur);
}

// retourne un index en prenant en argumant ligne / colonne / longueur, function utilisé dans game.js toucheEnfonce()
function getIndex(laLigne, laColonne, laLongueur) 
{
	laLongueur = longueur;
  	return (laLigne * laLongueur + laColonne);
}