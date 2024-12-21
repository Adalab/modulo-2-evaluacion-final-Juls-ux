'use strict';

//SECCIÓN DE VARIABLES
const characterUl = document.querySelector('.js_characterUl ');
const js_ulFav  = document.querySelector('.js_ulFav ');

const searchBtn = document.querySelector('.js_searchBtn');
const inputFilter  = document.querySelector('.js_inputFilter ');

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

const renderFavourites = ()=> {
    let html ='';
    for(const characterObj of favourites) {
        html += renderOneCharacter(characterObj);
    }
    js_ulFav.innerHTML = html;
    console.log('funciona al clikcar');
}


const handleFavourite = (ev) => {
    console.log(ev.currentTarget.id);

    //Gancho y find
    const favouriteId = parseInt(ev.currentTarget.id);
    ev.currentTarget.classList.toggle('main__favourite');

    console.log(favouriteId);
    console.log(AllCharachters);
    
    //Buscamos en todos
    const clickedCharacterFavourite = AllCharachters.find((eachCharacter) => (eachCharacter._id) === favouriteId);

    console.log(clickedCharacterFavourite);

    //Buscamos en favoritos
    const favouritesCharacter = favourites.find((eachCharacter) => (eachCharacter._id) === favouriteId);
    console.log('clickedCharacterFavouritessssssssss');

    if (favouritesCharacter === undefined){
            //Añadir al html
    //const liFav = renderOneCharacter(clickedCharacterFavourite);

    favourites.push(clickedCharacterFavourite);
   
    renderFavourites(); 

    } else {
        //Quitar array favoritos
        favourites.splice(favouritesCharacter, 1)
        //quitar del html
        renderFavourites(); 
    }
    localStorage.setItem('favouritesCharacter', JSON.stringify(favourites));
}




const renderfilteredCharacter = (filteredCharacter) => {
    let html ='' ;
    for (const characterObj of filteredCharacter ) {
        html += renderOneCharacter(characterObj);
    } 
    characterUl.innerHTML = html;

}

const filterCharacter = (ev) => {
    console.log('hola si funciona');   
    console.log(ev.currentTarget);  
    ev.preventDefault();

    const filterText = inputFilter.value.toLowerCase();

    const filteredCharacter = AllCharachters.filter((oneCharacter) =>
    oneCharacter.name.toLowerCase().includes(filterText)); 

    renderfilteredCharacter(filteredCharacter);
    
}

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
   

    favourites= JSON.parse(localStorage.getItem('favouritesCharacter'))
    renderFavourites(); 
  