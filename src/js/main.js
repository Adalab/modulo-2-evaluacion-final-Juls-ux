'use strict';

//Seccion variables
const characterUl = document.querySelector('.js_characterUl ');
const defaultImage = 'https://via.placeholder.com/210x295/ffffff/555555/'; 

let AllCharachters = []; 



//Seccion Funciones
const renderOneCharacter = (characterObj) =>{
    const imageUrl = characterObj.imageUrl ? characterObj.imageUrl : defaultImage;

    const html = `
        <li class="js_mainList main__li __favourite">           
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

    ev.currentTarget.classList.toggle('main__favourite');

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
   
