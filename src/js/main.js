'use strict';

//Seccion variables
const characterUl = document.querySelector('.js_characterUl ');
const js_ulFav  = document.querySelector('.js_ulFav ');

const defaultImage = 'https://via.placeholder.com/210x295/ffffff/555555/?text=Disney'; 

let AllCharachters = []; 
let favourites = [];



//Seccion Funciones
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

const renderAllCharacters = () => {
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

const handleFavourite = (ev) => {
    console.log(ev.currentTarget.id);

    //Gancho y find
    const favouriteId = String(ev.currentTarget.id);
    ev.currentTarget.classList.toggle('main__favourite');

    console.log(favouriteId);
    console.log(AllCharachters);
    
    //Buscamos en todos
    const clickedCharacterFavourite = AllCharachters.find((eachCharacter) => String(eachCharacter._id) === favouriteId);

    console.log(clickedCharacterFavourite);

    //Buscamos en favoritos
    const favouritesCharacter = favourites.find((eachCharacter) => String(eachCharacter._id) === favouriteId);
    console.log('clickedCharacterFavouritessssssssss');

    if (favouritesCharacter === undefined){
            //Añadir al html
    const liFav = renderOneCharacter(clickedCharacterFavourite);
    js_ulFav.innerHTML+=liFav;

    favourites.push(clickedCharacterFavourite);

    }




}

//Seccion de eventos


//Cuando carga la página


fetch ('//api.disneyapi.dev/character?pageSize=50')
    .then((response) => response.json())
    .then((data) => {
        AllCharachters = data.data;
       
        console.log(data);

        renderAllCharacters();
    });
   
