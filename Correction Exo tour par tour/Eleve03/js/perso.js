// ======= Objet Perso =======//
function Perso() 
{
	// initialise les personnages avec les paramètres nom santé dégât et elm qui correspond à l' élément html.
  	this.initPerso = function(nom, sante, degat, elm, posture) 
	{
		this.nom = nom;
		this.sante = sante;
		this.degat = degat;
		this.arme = "";
		this.armeDropped = [];
		this.elm = elm;
		this.posture = 0; // 0 correspond à la posture d' attaque, 1 à la posture de défense.
		if(this.nom == "Sangoku") 
		{
			this.html = 
				{
					sante:document.getElementById("recapSante1"),
					degat:document.getElementById("recapArme1"),
					posture:document.getElementById("recapPosture1"),
      			}
    	}
    	if(this.nom == "Freezer") 
		{
			this.html = 
			{
				sante:document.getElementById("recapSante2"),
				degat:document.getElementById("recapArme2"),
				posture:document.getElementById("recapPosture2"),
		  	}
    	}
	}
  	// renvoie la description des personnages
  	this.decrirePerso = function() 
	{
		const description = this.nom + "possède" + this.sante + "et fait " + this.degat + " points de dégâts avec son arme";
		return description;
  	}
  	// met à jour les inforamtions de santé, dégâts et posture en cas de combat
  	this.updateInfo = function() 
	{
		this.html.sante.innerHTML=this.sante;
		this.html.degat.innerHTML=this.degat;
		this.html.posture.innerHTML=this.posture;
  	}
  	// lance la fct mvt() si index n'est ni un bloc ni un perso
  	this.deplace = function(old_index, index, mvt, map) 
	{
		let self = this;
		if (tab_position[index] == 1) 
		{
			// 1 est l' id des blocs
		  	alert(self.nom + " fait face à un bloc.");
		}
		else if ((tab_position[index] == 0) || (tab_position[index] == "arme1Class") || (tab_position[index] == "arme2Class") || (tab_position[index] == "arme3Class") || (tab_position[index] == "arme4Class") || (tab_position[index] == 3) || (tab_position[index] == 4)) 
		{
			// si on est face à une case vide, une arme, sangoku ou freezer
			if ((tab_position[index] == "arme1Class") || (tab_position[index] == "arme2Class") || (tab_position[index] == "arme3Class") || (tab_position[index] == "arme4Class")) 
			{
				// id des armes
				this.degat = map.arsenal[tab_position[index]].degat;
				alert(self.nom +" s'équipe d'un item avec " + this.degat + " points de dégâts.");
				// déposé ici l'arme que l'on avait avant de s' équiper la nouvelle
				if (this.arme == "") 
				{
          			$carte.append("<div class='casevideClass' style='left:" + (index % 10) * 100 + "px; top:" + Math.floor(index / 10) * 100 + "px ;position: absolute;'></div>"); // on remplace la case de l'arme par une case vide
        		} 
				else 
				{
					arme = document.getElementById(tab_position[index].substring(0, 5)); // permet de retrouver l' elm html à partir de son ID (substring permet de retourner arme1 à la place de arme1Class...)
          			arme.className = this.arme;
          			arme.id = this.arme.substring(0, 5);
          			this.armeDropped[0] = index; // stock la valeur de l'index (index de la case ou je dois la déposer)
          			this.armeDropped[1] = this.arme; // stock le nom de l'arme (arme1Class...)
        		}
        		this.arme = tab_position[index];

        		if (mvt == "gauche") 
				{
					// déplacement à gauche
          			self.elm.css('left', parseInt(self.elm.css('left')) - 100);
        		} 
				else if (mvt == "droite") 
				{ 
					// déplacement à droite
          			self.elm.css('left', parseInt(self.elm.css('left')) + 100);
        		} 
				else if (mvt == "haut") 
				{ 
					// déplacement en haut
          			self.elm.css('top', parseInt(self.elm.css('top')) - 100);
        		} 
				else if (mvt == "bas") 
				{
					// déplacement en bas
          			self.elm.css('top', parseInt(self.elm.css('top')) + 100);
        		}
      		} 
			else if ((tab_position[index] == 3) || (tab_position[index] == 4)) 
			{
				// "Sangoku" et 4 sont les id des personnages
        		alert(self.nom + " attaque, FIGHT !!!!!!!");
        		fight(map.getPerso1(), map.getPerso2(), self); // ici fonction fight(), self = this.perso_actuel (ligne 25)
      		}
			else
			{
				// si on se dirige vers une case vide
        		if (mvt == "gauche") 
				{
					// déplacement à gauche
          			self.elm.css('left', parseInt(self.elm.css('left')) - 100);
        		}
				else if (mvt == "droite")
				{
					// déplacement à droite
          			self.elm.css('left', parseInt(self.elm.css('left')) + 100);
        		}
				else if (mvt == "haut")
				{
					// déplacement en haut
          			self.elm.css('top', parseInt(self.elm.css('top')) - 100);
        		}
				else if (mvt == "bas")
				{
					// déplacement en bas
          			self.elm.css('top', parseInt(self.elm.css('top')) + 100);
        		}
      		}
      		// maj index de la case suivante (contient maintenant le perso)
			if (self.nom == "Sangoku") 
			{
        		tab_position[index] = 3;
      		}
      		// maj index de la case suivante (contient maintenant le perso)
      		if (self.nom == "Freezer") 
			{
        		tab_position[index] = 4;
      		}
      		// maj index de la case suivante (contient id d'une arme ou d'une case vide), ramasser l'arme et lacher l'arme se font sur 2 mouvements.
      		if (this.armeDropped && this.armeDropped[0] == old_index) 
			{
				// vérifie si tu déposes une arme
				tab_position[old_index] = this.armeDropped[1]; // remet l'arme que l'on était entrain de déposer
				this.armeDropped[1] = null;
				this.armeDropped[0] = null;
      		}
			else
			{
				tab_position[old_index] = 0;
			}
      		if (self == map.getPerso1() && map.getPerso2().sante > 0 || self === map.getPerso2() && map.getPerso1().sante > 0) 
			{
        		game.verifieCompteur();
      		}
    	}
  	}
}