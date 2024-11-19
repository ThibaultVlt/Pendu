"use strict";

//Mise en place du tableau de mots à trouver
/** @type {Arr} */
const listeMots = ["admonesterions", "alluvionneriez", "bouffonnassent", "bureaucratiser", "empapilloterez", "frigorifugeant", "grossissements", "hypertrophique", "lyophilisantes", "minutieusement", "nomadisassions", "outrepasseriez", "valeureusement", "quadrangulaire", "transitionnels", "superfinissent", "ovationnerions", "divertissement", "ophtalmoscopie", "retranscriviez", "traumatisantes", "croustillasses", "transnationale", "juxtaposerions"];

//Déclaration des variables
/** @type {OBJ} */
let alphabet;
/** @type {function} */
let decoupeAlphabet;
/** @type {str} */
let motATrouve;
/** @type {Obj} */
let decoupeMotATrouve = [];
/** @type {Int} */
let compteurTentative;
/** @type {bool} */
let finPartie;

//Variable son
/** @type {audio} */
const sonGagne = new Audio('HORNCele_Langue de belle mere 4 (ID 1556)_LS.mp3');
/** @type {audio} */
const sonPerdu = new Audio('TOONBoing_Boing cartoon 4 (ID 2280)_LS.mp3');

//Récupération des ID du HTML
/** @type {Obj} */
let choixLettre = document.querySelector('#choix-lettre');
/** @type {Obj} */
let nbTentative = document.querySelector('#nb-tentative'); // max 9 décrémentation
/** @type {Obj} */
let lettreChoisi = document.querySelector('#lettre-choisi');
/** @type {Obj} */
let message = document.querySelector('#message');
/** @type {Obj} */
let reset = document.querySelector('#reset');
/** @type {Obj} */
let reset2 = document.querySelector('#reset2');


/**
 *Initialisation jeu
 *
 */
function initialiserJeu(){
    //Vider le tableau des lettres pour ne pas qu'il apparaisse une autre fois au moment du reset
    alphabet = [];
    //Génération du mot
    motATrouve = motChoisiAleatoire();
    decoupeMotATrouve = decouperMotAleatoire(motATrouve);
    //Affichage du mot recherché
    afficherMotATrouve(decoupeMotATrouve);
    //Génération de l'alphabet
    alphabet = genererAlphabet();
    decoupeAlphabet = decouperAlphabet(alphabet);
    //Affichage des lettres
    afficherAlphabet(decoupeAlphabet);
    //Affichage des tentatives
    compteurTentative = 9;
    afficherTentatives();
    //Mise a 0 du message
    message.innerHTML = '';
    //Mise à 0 des sons
    sonGagne.currentTime = 0;
    sonPerdu.currentTime = 0;
    //Bouton reset non cliquable
    reset.disabled = true;
    reset2.disabled = true;
    finPartie = false;
}

/**
 *Choix mot aléatoire
 *
 * @returns {arr}
 */
function motChoisiAleatoire() {
    return listeMots[Math.floor(Math.random() * listeMots.length)];
}

/**
 * Fonction pour créer un objet lettre non visible
 *
 * @param {Obj} lettre
 * @returns {Obj, bool}
 */
function creerLettreInvisible(lettre) {
    return { lettre, isVisible: false };
}


/**
 *Découpe du mot à trouver
 *
 * @param {Str} motATrouve
 * @returns {Obj}
 */
function decouperMotAleatoire(motATrouve) {
    let arrayMotATrouve = motATrouve.split('');
    decoupeMotATrouve = arrayMotATrouve.map(creerLettreInvisible);
    return decoupeMotATrouve;
}



/**
 *Affichage du mot à trouver
 *
 * @param {Obj} decoupeMotATrouve
 */
function afficherMotATrouve(decoupeMotATrouve) {
    const motATrouveHtml = decoupeMotATrouve.map(afficherLettreOuTiret);
    lettreChoisi.innerHTML = motATrouveHtml.join('');
}

// Fonction pour afficher la lettre ou un tiret
/**
 *
 *
 * @param {*} decoupeLettre
 * @returns {*}
 */
function afficherLettreOuTiret(decoupeLettre) {
    if (decoupeLettre.isVisible) {
        return `<p class="m-2 d-inline-block">${decoupeLettre.lettre}</p>`;
    } else {
        return `<p class="m-2 d-inline-block">_</p>`;
    }
}

/**
 *Générer Lettres de l'alphabet et les afficher
 *
 * @returns {Obj}
 */
function genererAlphabet() {
    for (let i = 97; i <= 122; i++) {
        alphabet.push(String.fromCharCode(i));
    }
    return alphabet;
}

/**
 *Découpe de l'alphabet
 *
 * @param {Obj} alphabet
 * @returns {Obj}
 */
function decouperAlphabet(alphabet) {
    return alphabet.map(creerLettreChoisie);
}

/**
 *Fonction pour créer une lettre choisie par défaut
 *
 * @param {Obj} lettre
 * @returns {Obj, bool}
 */
function creerLettreChoisie(lettre) {
    return { lettre, isChosen: true };
}


/**
 *Affichage de l'alphabet
 *
 * @param {function} decoupeAlphabet
 */
function afficherAlphabet(decoupeAlphabet) {
    const alphabetHtml = decoupeAlphabet.map(afficherLettreAvecEtat);
    choixLettre.innerHTML = alphabetHtml.join('');
}

/**
 *Fonction pour afficher une lettre en fonction de son état
 *
 * @param {*} decoupeLettre
 * @returns {*}
 */
function afficherLettreAvecEtat(decoupeLettre) {
    if (decoupeLettre.isChosen) {
        return `<p class="m-2 d-inline-block">${decoupeLettre.lettre}</p>`;
    } else {
        return `<p class="m-2 opacity-50 d-inline-block">${decoupeLettre.lettre}</p>`;
    }
}

/**
 *Affichage des tentatives
 *
 */
function afficherTentatives() {
    nbTentative.innerHTML = `<p class="text-center text-bg-warning">Nombre de tentatives restantes: ${compteurTentative}</p>`;
}

/**
 *Fonction prenant la cible choisie
 *
 * @param {event} e
 */
function cliquerLettre(e) {
    const target = e.target;
    if (target.matches('p')) {
        verifierLettre(target.innerHTML);
    }
}


/**
 *Taper la lettre au clavier
 *
 * @param {event} e
 */
function taperLettre(e) {
    const keyCode = e.keyCode;
    const lettre = String.fromCharCode(keyCode).toLowerCase();
    if (keyCode >= 65 && keyCode <= 90) {
        verifierLettre(lettre);
    }
}

/**
 *Comparer les lettres
 *
 * @param {*} decoupeLettre
 * @param {*} lettre
 * @returns {bool}
 */
function comparerLettres(decoupeLettre, lettre) {
    if (decoupeLettre.lettre.toLowerCase() === lettre.toLowerCase()) {
        decoupeLettre.isVisible = true;
        return true;
    }
    return false;
}

/**
 *Fonction pour désactiver la lettre dans l'alphabet
 *
 * @param {*} lettreCourante
 * @param {Obj} lettre
 */
function desactiverLettreDansAlphabet(lettreCourante, lettre) {
    if (lettreCourante.lettre.toLowerCase() === lettre.toLowerCase()) {
        lettreCourante.isChosen = false;
    }
}


/**
 *Vérification si toutes les lettres sont visibles
 *
 * @param {*} decoupeLettre
 * @returns {bool}
 */
function toutesLettresVisibles(decoupeLettre) {
    return decoupeLettre.isVisible;
}

/**
 *Trouver la lettre dans l'alphabet
 *
 * @param {Obj} lettre
 * @param {*} lettreCourante
 * @returns {bool}
 */
function trouverLettreDansAlphabet(lettre, lettreCourante) {
    return lettreCourante.lettre.toLowerCase() === lettre.toLowerCase();
}


/**
 *COEUR DU JEU DU PENDU
 *Vérification de la lettre choisie par rapport au mot à trouver
 * @param {string} lettre
 * @returns {str}
 */
function verifierLettre(lettre) {
    if (finPartie) {
        return;
    }

    // Vérifier si la lettre a déjà été choisie
    let lettreTrouvee = decoupeAlphabet.find(trouverLettreDansAlphabet.bind(null, lettre));
    if (!lettreTrouvee || !lettreTrouvee.isChosen) {
        message.innerHTML = `<p class="text-center text-warning fw-bold">La lettre "${lettre}" a déjà été choisie.</p>`;
        return;
    }

    let isLettreDansMot = false;

    decoupeMotATrouve.forEach(function(decoupeLettre) {
        if (comparerLettres(decoupeLettre, lettre)) {
            isLettreDansMot = true;
        }
    });

    if (!isLettreDansMot) {
        compteurTentative--;
        message.innerHTML = `<p class="text-danger text-center fw-bolder">La lettre "${lettre}" n'est pas dans le mot.</p>`;
    }

    afficherMotATrouve(decoupeMotATrouve);
    afficherTentatives();
    reset.disabled = false;
    reset2.disabled = false;

    if (compteurTentative === 0) {
        message.innerHTML = `<p class="text-center text-bg-danger fw-bold clignotant">Vous avez perdu ! Le mot était :  ${motATrouve}</p>`;
        sonPerdu.play();
        finPartie = true;
    }

    if (decoupeMotATrouve.every(toutesLettresVisibles)) {
        message.innerHTML = `<p class="text-center text-bg-success fw-bold clignotant">Félicitations, vous avez trouvé le mot !</p>`;
        sonGagne.play();
        finPartie = true;
    }

    decoupeAlphabet.forEach(function(lettreCourante) {
        desactiverLettreDansAlphabet(lettreCourante, lettre);
    });

    afficherAlphabet(decoupeAlphabet);
}

/**
 *Recommencer
 *
 */
function reinitialiser() {
    initialiserJeu();
}
