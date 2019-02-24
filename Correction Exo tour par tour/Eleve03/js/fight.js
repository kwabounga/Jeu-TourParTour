// ======= Fonctions attaque =======//

// attaque un personnage cible
function fight(perso1, perso2, perso_actuel) 
{
	// déclaration des perso
  	if (perso_actuel === perso1) 
	{
    	this.cible = perso2;
  	} 
	else if (perso_actuel === perso2) 
	{
		this.cible = perso1;
	}
  	// variable choix => 2 choix possibles = attaquer ou défendre
  	let choix;
  	while (this.cible.sante > 0 && perso_actuel.sante > 0)
	{
		// boucle qui test les points de vie des persos 1 et 2
	  	let choix = prompt(perso_actuel.nom + " : Pressez 1 pour attaquer ou 2 pour défendre : ");
	  	// déroulement de l' attaque
	  	function attaquer()
		{
			// posture de la cible
			if (perso_actuel.posture == 1) 
			{
				this.cible.degat = this.cible.degat * 2;
				perso_actuel.posture = 0;
			}
			if (this.cible.sante > 0) 
			{
				// la cible à des points de vie
				alert(perso_actuel.nom + " attaque " + this.cible.nom + " et lui fait " + perso_actuel.degat + " points de dégâts");
				this.cible.sante = this.cible.sante - perso_actuel.degat; 
				// les points de vie de la cible sont diminué de la valeur des dégâts de l'arme
				if (this.cible.sante > 0) 
				{
					// gérer ici le changement de perso
					alert(this.cible.nom + " a encore " + this.cible.sante + " points de vie");
				} 
				else 
				{
					this.cible.sante = 0; // si la cible n'a plus de point de vie
					alert(this.cible.nom + " est mort !");
				}
			}
			if (this.cible.sante <= 0) 
			{ 
				// permet de recommencer la partie
				alert(this.cible.nom + " ne peut pas attaquer : il est mort! La partie est terminé. Pour rejouer rafraîchissez la page !"); 
			}
			perso_actuel.updateInfo();
		};
    	// déroulement de la défense
    	function defendre() 
		{
			// posture de notre perso
			if (perso_actuel.posture == 0) 
			{
				// si notre perso est en posture d' attaque
				perso_actuel.posture = 1; // on la passe en posture de défense
				this.cible.degat = this.cible.degat / 2; // les dégats de la cible sont divisé par 2
				alert(perso_actuel.nom + " passe en posture défensif, les dégats de " + this.cible.nom + " sont réduit de 50%.")
				//console.log(this.cible.degat);
				perso_actuel.updateInfo();
			}
    	};
		if (choix == 1) 
		{
			// si choix 1 on attaque
			attaquer();
		}
		if (choix == 2) 
		{ 
			// si choix 2 on défend
			defendre();
		}
		// intervertir les 2 variables
		[perso_actuel, this.cible] = [this.cible, perso_actuel]
		//console.log(perso_actuel);
		//console.log("Alien PV " + perso1.sante + " " + "Predator PV " + perso2.sante)
	};
  	perso_actuel.updateInfo();
}