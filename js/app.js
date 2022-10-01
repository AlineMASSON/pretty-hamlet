const app = {
    state: {
        currentX: 100,
        currentY: 700,
        x: 50,
        y: 50,
        allowed: [
            // 1ère ligne verticale
            {
                x: 100,
                y: 700,
            },
            {
                x: 100,
                y: 650,
            },
            {
                x: 100,
                y: 600,
            },
            {
                x: 100,
                y: 550,
            },
            {
                x: 100,
                y: 500,
            },
            {
                x: 100,
                y: 450,
            },
            { // Arrivée 1ère maison
                x: 100,
                y: 400,
            },
            // 1ère ligne horizontale
            {
                x: 150,
                y: 400,
            },
            {
                x: 200,
                y: 400,
            },
            {
                x: 250,
                y: 400,
            },,
            // 2ème ligne verticale
            {
                x: 250,
                y: 350,
            },
            {
                x: 250,
                y: 300,
            },
            // 2ème ligne horizontale
            {
                x: 300,
                y: 300,
            },
            {
                x: 350,
                y: 300,
            },
            {
                x: 400,
                y: 300,
            },
            // 3ème ligne verticale
            { // Arrivée 2ème maison
                x: 400,
                y: 250,
            },
            // 4ème ligne verticale
            {
                x: 350,
                y: 350,
            },
            {
                x: 350,
                y: 400,
            },
            {
                x: 350,
                y: 450,
            },
            {
                x: 350,
                y: 500,
            },
            {
                x: 350,
                y: 550,
            },
            {
                x: 350,
                y: 600,
            },
            {
                x: 350,
                y: 650,
            },
            // 3ème ligne horizontale
            {
                x: 400,
                y: 650,
            },
            {
                x: 450,
                y: 650,
            },
            {
                x: 500,
                y: 650,
            },
            {
                x: 550,
                y: 650,
            },
            {
                x: 600,
                y: 650,
            },
            // 5ème ligne verticale
            { // Arrivée 3ème maison
                x: 600,
                y: 600,
            }
        ],

        doors: [
            { //Arrivée 1ère maison
                x: 100,
                y: 400,
                recipe: 1,
                title: "Burger végan : raclette végétale, chanterelles et crème de céleri",
                href: "burger",
                download: "burger_vegan_raclette_chanterelles_céleri",
            },
            { // Arrivée 2ème maison
                x: 400,
                y: 250,
                recipe: 2,
                title: "Flammekueche végane",
                href: "flammekueche",
                download: "flammekueche_vegane",
            },
            { // Arrivée 3ème maison
                x: 600,
                y: 600,
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
        avatar.setAttribute('style', `left: ${currentX}px; top: ${currentY}px`);
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