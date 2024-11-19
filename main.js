"use strict";

initialiserJeu();
//Choisir lettre sur écran avec la souris
choixLettre.addEventListener('click', cliquerLettre);
//Ecrire avec le clavier
document.addEventListener('keydown', taperLettre);

//Bouton "Réinitialiser"
reset.addEventListener('click', reinitialiser);
reset2.addEventListener('click', reinitialiser);

