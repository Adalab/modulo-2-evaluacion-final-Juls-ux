'use strict';

//Seccion variables
const characterUl = document.querySelector('.js_characterUl ');

let AllCharachters = [];



//Seccion Funciones
const renderOneCharacter = (characterObj) =>{
    const html = `
        <li class="main__li">
        <img class="main__character-img" src="${characterObj.imageUrl}" alt="imagen Achilles">
        <h2 class="main__header-2">${characterObj.name}</h2>
        </li>`

    return html;
}

const renderAllCharacters = () => {
    let html ='' ;
    for (const characterObj of AllCharachters ) {
        html += renderOneCharacter(characterObj);
    
    }
    
    characterUl.innerHTML = html;
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
   
