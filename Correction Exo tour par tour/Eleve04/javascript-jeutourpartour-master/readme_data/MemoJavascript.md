# MemoJavacript

## Voici la syntaxe générale de création et d'utilisation d'un objet.

```javascript
var monObjet = {
    propriete1: valeur1,
    propriete2: valeur2,
    // ... ,
    methode1: function(/* ... */) {
        // ...
    },
    methode2: function(/* ... */) {
        // ...
    },
    // ...
};

console.log(monObjet.propriete1); // Affiche la propriété propriete1 de monObjet

console.log(monObjet.methode1(...)); // Affiche le résultat de l'appel de la méthode methode1 de monObjet
```

- Voici la syntaxe générale de la déclaration d'une fonction acceptant des paramètres. Leur nombre n'est pas limité, mais il est rarement nécessaire de dépasser 3 ou 4 paramètres.

```javascript
// Déclaration de la fonction maFonction
function maFonction(param1, param2, ...) {
    // Instructions pouvant utiliser param1, param2, ...
}

// Appel de la fonction maFonction
// param1 reçoit la valeur de arg1, param2 la valeur de arg2, ...
maFonction(arg1, arg2, ...);
```

## Avec JavaScript, on peut stocker dans un tableau des éléments de différents types, comme dans l'exemple ci-dessous.

```javascript 
var tab = ["Bonjour", 7, true];
```

## On renvoie un nombre aléatoire entre 0 (inclus) et 1 (exclus)

```javascript 
function getRandom() {
  return Math.random();
}
```


## Le schéma d'une boucle for est le suivant :

```javascript 
for (initialisation; condition; incrémentation) {
    instruction_1;
    instruction_2;
    instruction_3;
}
```
Dans les parenthèses de la boucle ne se trouve plus juste la condition, mais trois blocs : initialisation, condition, et incrémentation. Ces trois blocs sont séparés par un point-virgule ; c'est un peu comme si les parenthèses contenaient trois instructions distinctes.

Dans l'exemple suivant, on va afficher cinq fois une boîte de dialogue à l'aide de alert(), qui affichera le numéro de chaque itération :

```javascript
for (var iter = 0; iter < 5; iter++) {
    alert('Itération n°' + iter);
}
```

for, la boucle conçue pour l'incrémentation. La boucle for possède donc trois blocs qui la définissent. Le troisième est le bloc d'incrémentation qu'on va utiliser pour incrémenter une variable à chaque itération de la boucle. De ce fait, la boucle for est très pratique pour compter ainsi que pour répéter la boucle un nombre défini de fois.



## Voici la syntaxe d'une boucle do while :

```javascript
do {
    instruction_1;
    instruction_2;
    instruction_3;
} while (condition);
```

## Voici un exemple de la syntaxe d'une boucle while :

```javascript
while (condition) {
    instruction_1;
    instruction_2;
    instruction_3;
}
```

## Petit intermède : la fonction confirm()

Afin d'aller un petit peu plus loin dans le cours, nous allons apprendre l'utilisation d'une fonction bien pratique : confirm() ! Son utilisation est simple : on lui passe en paramètre une chaîne de caractères qui sera affichée à l'écran et elle retourne un booléen en fonction de l'action de l'utilisateur ; vous allez comprendre en essayant :

```javascript
if (confirm('Voulez-vous exécuter le code JavaScript de cette page ?')) {
    alert('Le code a bien été exécuté !');
}
```

## Avec les ternaires vous pouvez vous permettre de simplifier votre code de façon substantielle :

```javascript
var startMessage = 'Votre catégorie : ',
    endMessage,
    adult = confirm('Êtes-vous majeur ?');

endMessage = adult ? '18+' : '-18';

alert(startMessage + endMessage);
```

## La fonction Math.max() renvoie le plus grand nombre d'une série de 0 ou plusieurs nombres.

```javascript
Math.max(10, 20);   //  20
Math.max(-10, -20); // -10
Math.max(-10, 20);  //  20
```