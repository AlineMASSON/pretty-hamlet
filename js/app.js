const app = {
    state: {
        // Images de 15 x 15 cases
        // ==== sizeBox ===>
        // 70vh (hauteur totale de l'image)
        // 15 (nb de case dans une colone et une ligne)
        sizeBox: (70/15),
        currentX: 2,
        currentY: 14,
        x: 1,
        y: 1,
        allowed: [
            // 1ère ligne verticale
            {
                x: 2,
                y: 14,
            },
            {
                x: 2,
                y: 13,
            },
            {
                x: 2,
                y: 12,
            },
            {
                x: 2,
                y: 11,
            },
            {
                x: 2,
                y: 10,
            },
            {
                x: 2,
                y: 9,
            },
            { // Arrivée 1ère maison
                x: 2,
                y: 8,
            },
            // 1ère ligne horizontale
            {
                x: 3,
                y: 8,
            },
            {
                x: 4,
                y: 8,
            },
            {
                x: 5,
                y: 8,
            },,
            // 2ème ligne verticale
            {
                x: 5,
                y: 7,
            },
            {
                x: 5,
                y: 6,
            },
            // 2ème ligne horizontale
            {
                x: 6,
                y: 6,
            },
            {
                x: 7,
                y: 6,
            },
            {
                x: 8,
                y: 6,
            },
            // 3ème ligne verticale
            { // Arrivée 2ème maison
                x: 8,
                y: 5,
            },
            // 4ème ligne verticale
            {
                x: 7,
                y: 7,
            },
            {
                x: 7,
                y: 8,
            },
            {
                x: 7,
                y: 9,
            },
            {
                x: 7,
                y: 10,
            },
            {
                x: 7,
                y: 11,
            },
            {
                x: 7,
                y: 12,
            },
            {
                x: 7,
                y: 13,
            },
            // 3ème ligne horizontale
            {
                x: 8,
                y: 13,
            },
            {
                x: 9,
                y: 13,
            },
            {
                x: 10,
                y: 13,
            },
            {
                x: 11,
                y: 13,
            },
            {
                x: 12,
                y: 13,
            },
            // 5ème ligne verticale
            { // Arrivée 3ème maison
                x: 12,
                y: 12,
            }
        ],

        doors: [
            { //Arrivée 1ère maison
                x: 2,
                y: 8,
                recipe: 1,
                title: "Burger végan : raclette végétale, chanterelles et crème de céleri",
                href: "burger",
                download: "burger_vegan_raclette_chanterelles_céleri",
            },
            { // Arrivée 2ème maison
                x: 8,
                y: 5,
                recipe: 2,
                title: "Flammekueche végane",
                href: "flammekueche",
                download: "flammekueche_vegane",
            },
            { // Arrivée 3ème maison
                x: 12,
                y: 12,
                recipe: 3,
                title: "Salade de \"chèvre\" chaud végétal au romarin, jeunes pousses d'épinards et cerneaux de noix",
                href: "chevreChaud",
                download: "salade_chevre_chaud_vegetal",
            }
        ],
    },

    init: function () {
        // === PAGE D'ACCCUEIL
        app.welcome = document.querySelector('.welcome');
        app.go = document.querySelector('#start');
        // Commencer le jeu
        app.go.addEventListener('click', () => {app.welcome.classList.add('none')})

        // === AVATAR 
        app.avatar = document.querySelector('#avatar');
        // initialisation de l'avatar
        app.moveAvatar(app.state.currentX, app.state.currentY);

        // === BOUTONS
        // Avancer
        app.front = document.querySelector('#front');
        app.front.addEventListener('click', () => {
            app.CanMove(0, -app.state.y);
        });

        // Gauche
        app.left = document.querySelector('#left');
        left.addEventListener('click', () => {
            app.CanMove(-app.state.x, 0);
        });
        
        // Reculer
        app.back = document.querySelector('#back');
        back.addEventListener('click',  () => {
            app.CanMove(0, app.state.y);
        });
    
        // Droite
        app.right = document.querySelector('#right');
        right.addEventListener('click',  () => {
            app.CanMove(app.state.x, 0);
        });
    
        // Frapper à la porte
        app.knock = document.querySelector('#knock');
        knock.addEventListener('click', app.handleClickKnock);

        // === RECETTES
        app.recipes = document.querySelector('.recipes');
        app.recipeClose = document.querySelector('.recipe-close');

        app.recipeTitle = document.querySelector('.recipe-title');
        app.dowloadRecipe = document.querySelector('#dowloadRecipe');
        app.seeRecipe = document.querySelector('#seeRecipe');
    },

    // === Deplacer l'avatar
    moveAvatar: function(currentX, currentY) {
        const newX = currentX * app.state.sizeBox;
        const newY = currentY * app.state.sizeBox;
        avatar.setAttribute('style', `left: ${newX}vh; top: ${newY}vh`);
        return ( currentX, currentY );
    },

    // 
    CanMove: function(x, y) {
        const nextX = app.state.currentX + x;
        const nextY = app.state.currentY + y;

        // Vérifie si les coordonnées du chemin sont valides
        const coordinatesFiltered = app.state.allowed.filter( (coordinates) => {
            return (coordinates.x === nextX && coordinates.y === nextY);
        } );
        if (coordinatesFiltered.length !== 0) {
            app.state.currentX += x;
            app.state.currentY += y;
            app.moveAvatar(app.state.currentX, app.state.currentY);
            return ( app.state.currentX, app.state.currentY )
        };
    },

    handleClickKnock: function () {
        // Vérifie si les coordonnées des portes sont valides
        const coordinatesFiltered = app.state.doors.filter( (coordinates) => {
            return (coordinates.x === app.state.currentX && coordinates.y === app.state.currentY);
        } );
        console.log(coordinatesFiltered);
        if (coordinatesFiltered.length !== 0) {
            app.recipes.classList.remove('none');
            const { recipe, title, href, download } = coordinatesFiltered[0];
            app.recipeTitle.textContent = title;
            app.dowloadRecipe.setAttribute("href", `download/${href}.pdf`);
            app.dowloadRecipe.setAttribute("download", `${download}.pdf`);
            app.seeRecipe.setAttribute("href", `download/${href}.pdf`);
            const star = document.querySelector(`.star${recipe}`);
            star.classList.remove('none');
            // Fermer la page recette
            app.recipeClose.addEventListener('click', () => {app.recipes.classList.add('none')});
        };
    }
}

document.addEventListener('DOMContentLoaded', app.init);