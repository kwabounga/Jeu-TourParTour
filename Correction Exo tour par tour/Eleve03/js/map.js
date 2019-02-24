// ======= Objet Map =======//
function map(nombre_case_X, nombre_case_Y) 
{
	this.nombre_case_X = nombre_case_X;
  	this.nombre_case_Y = nombre_case_Y;
  	this.perso1_sur_la_map = false;
  	this.perso2_sur_la_map = false;
  	this.nb_arme_sur_la_map = 0;
  	this.perso1 = '';
  	this.perso2 = '';
  	this.arsenal = [];
	
  	this.getPerso1 = function() 
	{
    	return this.perso1;
  	}
  	this.getPerso2 = function() 
	{
    	return this.perso2;
  	}
  	// fonction qui permet la création de la map
  	this.genere_carte_aleat = function() 
	{
    	for (let i = 0; i < this.nombre_case_X; i++) 
		{
      		for (let j = 0; j < this.nombre_case_Y; j++) 
			{
				const random = nb_aleat(20); // fonction nb_aleat avec en paramètre 20 pour que le rendu soit plus aléatoire
        		if (random == 1 && this.perso1_sur_la_map == false) 
				{
					// si random est égal à 1 et que le perso1 n'est pas encore sur la map
          			$carte.append("<img src='../img/perso1.png' class='persoClass' id='perso1' style='left:" + 100 * j + "px; top:" + 100 * i + "px'>"); // on ajoute la div Sangoku
          			$carte.append("<div class='casevideClass'></div>"); // on ajoute une div casevide sous la div Alien
          			this.perso1_sur_la_map = true; //la valeur false devient true
          			tab_position.push(3); // 3 est l' id SAngoku
          			this.perso1 = new Perso(); // function Perso() perso_v2.js
          			this.perso1.initPerso("Sangoku", 100, 10, $("#perso1"), 0); // initialise sangoku à partir du constructor Perso
        		}
				else if (random == 12 && this.perso2_sur_la_map == false) 
				{
					// si random est égal à 12 et que le perso2 n'est pas encore sur la map
          			$carte.append("<img src='../img/perso2.png' class='persoClass' id='perso2' style='left:" + 100 * j + "px; top:" + 100 * i + "px'>"); // on ajoute la div Freezer
          			$carte.append("<div class='casevideClass'></div>"); // on ajoute une div casevide sous la div Freezer
          			this.perso2_sur_la_map = true;
          			tab_position.push(4); // 4 est l'id de Predator
          			this.perso2 = new Perso();
          			this.perso2.initPerso("Freezer", 100, 10, $("#perso2"), 0); // initialise Freezer
        		} 
				else if (random == 3 && this.nb_arme_sur_la_map < 1) 
				{ 
					// si random est égal à 3 et que l' arme1 n'est pas encore sur la map
          			$carte.append("<div id='arme1' class='arme1Class'></div>"); // on ajoute la div arme 1
          			this.nb_arme_sur_la_map++; // on ajoute 1 au nombre d'arme sur la map
          			tab_position.push("arme1Class"); // 2 est l' id des armes
          			this.arme1 = new Arme(); // function Arme() arme_v2.js
          			this.arme1.initArme("lanceur de bisoux intergalactique", 15, "arme1"); // initialise l' arme 1 à partir du constructor Arme
          			this.arsenal["arme1Class"] = this.arme1;
        		} 
				else if (random == 3 && this.nb_arme_sur_la_map < 2) 
				{
					// si random est égal à 3 et que l' arme2 n'est pas encore sur la map
          			$carte.append("<div id='arme2' class='arme2Class'></div>"); // on ajoute la div arme 2
          			this.nb_arme_sur_la_map++;
          			tab_position.push("arme2Class");
          			this.arme2 = new Arme();
          			this.arme2.initArme("lanceur de cailloux intergalactique", 20, "arme2"); // initialise l' arme 2
          			this.arsenal["arme2Class"] = this.arme2;
				} 
				else if (random == 3 && this.nb_arme_sur_la_map < 3) 
				{
					// si random est égal à 3 et que l' arme3 n'est pas encore sur la map
          			$carte.append("<div id='arme3' class='arme3Class'></div>"); // on ajoute la div arme 3
          			this.nb_arme_sur_la_map++;
          			tab_position.push("arme3Class");
          			this.arme3 = new Arme();
          			this.arme3.initArme("patator intergalactique", 25, "arme3"); // initialise l' arme 3
          			this.arsenal["arme3Class"] = this.arme3;
        		} 
				else if (random == 3 && this.nb_arme_sur_la_map < 4) 
				{
					// si random est égal à 3 et que l' arme4 n'est pas encore sur la map
          			$carte.append("<div id='arme4' class='arme4Class'></div>"); // on ajoute la div arme 4
          			this.nb_arme_sur_la_map++;
          			tab_position.push("arme4Class");
          			this.arme4 = new Arme();
          			this.arme4.initArme("headshotter intergalactique", 30, "arme4"); // initialise l' arme 4
          			this.arsenal["arme4Class"] = this.arme4;
        		} 
				else if ((random == 7 || random == 13 || random == 9 || random == 15)) 
				{
					// si random est égal à 7 ou si random est égal à 13 on insert un bloc
          			$carte.append("<div class='blockClass'></div>"); // on ajoute la div bloc
          			tab_position.push(1); // 1 est l' id du bloc
        		} 
				else 
				{
					// pour tout autre valeur de random on insert systématiquement une case vide
          			$carte.append("<div class='casevideClass'></div>"); // on ajoute une case vide
          			tab_position.push(0); // 0 est l' id de la case vide
        		}
      		}
    	}
  	};

}