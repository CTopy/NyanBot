***** NYANBOT *****

** TRELLO **

1) Créer une fonctionnalité.
Ex : L'utilisateur peut lister les commandes.
L'admin peut ajouter des objets dans la boutique.

2) Lui associer une difficulté estimée
{0, 1, 2, 3, 5, 8, 13, 21, 34, 40}
Ex : 3 - L'utilisateur peut...
13 - L'admin peut...

3) Lui associer une importance.
Dans les étiquettes de Trello, cocher Haut/Moyen/Faible

Lors du passage en "sélectionné pour le dev", ajouter la personne chargée de le faire.
-> Créer une nouvelle branche git à partir du master

Lors du passage en "à valider", c'est l'autre qui doit tester, et créer un nouveau ticket si ça ne fonctionne pas bien

** RÈGLES GIT **

!! - ON NE DEVELOPPE JAMAIS SUR LE MASTER - !!

Pour chaque fonctionnalité ou modif, on crée une nouvelle branche, on code dessus, et la personne en charge de valider fera un merge vers le master

Règles de nommage : 
- Branche de fonctionnalité
feat/<nom-en-kebab-case>

- Branche de réparation d'un bug majeur (fonctionnalité à reprendre etc.)
fix/<nom-en-kebab-case>

- Branche de réparation d'un bug mineur (faute d'orthographe, petites erreurs minimes)
hotfix/<nom-en-kebab-case>

- Autres (ajout d'images etc.)
other/<faire-ceci-ou-cela>

** CHARTE TECHNIQUE (bonnes pratiques) **
Tous les noms de variables, fonctions etc. sont en camelCase (ex : maVariable) en anglais (myVar).

Utiliser const et let uniquement, pas var.
const correspond à une constante, let à une variable

Utiliser les fonctions flechées :
à la place de 
function(arg, arg2) { ... }
on a 
(arg, arg2) => { ... }

Utiliser la syntaxe ES6 pour les chaines de caractères contenant des variables
à la place de 
'Ceci est mon '+textType+' et il est moche';
on a 
`Ceci est mon ${textType} et il est beau`; (attention, ce sont des backticks, càd Alt Gr + 7)
