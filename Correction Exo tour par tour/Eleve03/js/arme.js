// ======= Objet Arme =======//
function Arme() 
{
	// Initialise les armes
	this.initArme = function(nom, degat, elm) 
	{
		this.nom = nom;
		this.degat = degat;
		this.elm = elm;
	},
	// Renvoie la description de l'arme
	this.decrireArme = function() 
	{
		const description = this.nom + " fait " + this.degat + " points de dégâts";
		return description;
	}
};