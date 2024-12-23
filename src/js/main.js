'use strict';

//SECCIÓN DE VARIABLES
const characterUl = document.querySelector('.js_characterUl');
const ulFav = document.querySelector('.js_ulFav');

const searchBtn = document.querySelector('.js_searchBtn');
const inputFilter  = document.querySelector('.js_inputFilter');

const defaultImage = 'https://via.placeholder.com/210x295/ffffff/555555/?text=Disney'; 

let AllCharachters = []; 
let favourites = [];



//SECCIÓN DE FUNCIONES
const renderOneCharacter = (characterObj) =>{
        
    let imageUrl;

    if (characterObj.imageUrl) {
        imageUrl = characterObj.imageUrl;
    } else {
        imageUrl = defaultImage;
    }


    const html = `
        <li class="js_mainList main__li __favourite" id="${characterObj._id}" >           
        <img class="main__character-img" src="${imageUrl}" alt="imagen ${characterObj.name}">
        <h3 class="main__header-3">${characterObj.name}</h2>
        </li>`

    return html;
}

const renderAllCharacters = (charactersToRender = AllCharachters) => {
    let html ='' ;
    for (const characterObj of AllCharachters ) {
        html += renderOneCharacter(characterObj);
    
    } 
    characterUl.innerHTML = html;


    //Crear evento para marcar favoritas. Importante crear la funcion
    const AllCharacterList  = document.querySelectorAll('.js_mainList');
    for(const li of AllCharacterList) {

        li.addEventListener('click', handleFavourite);
    }
}

const renderFavourites = () => {
    let html = '';
    for (const characterObj of favourites) {
        html += renderOneCharacter(characterObj);
    }
    ulFav.innerHTML = html;

    console.log('Favoritos renderizados:', favourites); // Debugging
};



const handleFavourite = (ev) => {
    console.log(ev.currentTarget.id);

    //Gancho y find
    const favouriteId = parseInt(ev.currentTarget.id);
    ev.currentTarget.classList.toggle('main__favourite');

    console.log(favouriteId);

    
    //Buscamos en todos
    const clickedCharacterFavourite = AllCharachters.find((eachCharacter) => parseInt(eachCharacter._id) === favouriteId);
    console.log(clickedCharacterFavourite);

    //Buscamos en favoritos

    const favouritesIndex = favourites.findIndex((eachCharacter) => parseInt(eachCharacter._id)=== favouriteId);
    

    if (favouritesIndex === -1) {
            //Añado el li de favoritas al html
            //const liFav = renderOneCharacter(clickedCharacterFavourite);
            //js_ulFav.innerHTML += liFav;
            favourites.push(clickedCharacterFavourite);   
            renderFavourites();

        } else {
        favourites.splice(favouritesIndex, 1);
        renderFavourites();
    }
    localStorage.setItem('favouritesCharacter', JSON.stringify(favourites));
    renderFavourites();

};


const renderfilteredCharacter = (filterText) => {
    let html = '';

    fetch ('https://api.disneyapi.dev/character?pageSize=50&name=${encodeURIComponent(filterText)}')
    .then((response) => response.json())
    .then((data) => {
        AllCharachters = data.data;
        console.log('Personajes filtrados:', data);

        renderAllCharacters();
    })
    .catch((error) => {
        console.error('Error al realizar la búsqueda:', error);
    });
}

const filterCharacter = (ev) => {
    console.log('hola si funciona');   

    ev.preventDefault();

    const filterText = inputFilter.value.toLowerCase().trim();
    if (filterText) {
        renderfilteredCharacter(filterText); // Pasar el texto ingresado para filtrar
    } else {
        renderAllCharacters(); // Si el input está vacío, renderizar todos los personajes
    }
};

//SECCION DE EVENTOS
searchBtn.addEventListener('click', filterCharacter);

//AL CARGAR LA PÁGINA


fetch ('//api.disneyapi.dev/character?pageSize=50')
    .then((response) => response.json())
    .then((data) => {
        AllCharachters = data.data;
       
        console.log(data);

        renderAllCharacters();
    });

   
    localStorage.setItem('favouritesCharacter', JSON.stringify(favourites));
    renderFavourites(); 
  
  