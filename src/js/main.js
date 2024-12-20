'use strict';

//Seccion variables
const characterUl = document.querySelector('.js_characterUl ');

const characterObj = {
    "_id": 112,
    "films": [
        "Hercules (film)"
    ],
    "shortFilms": [],
    "tvShows": [
        "Hercules (TV series)"
    ],
    "videoGames": [
        "Kingdom Hearts III"
    ],
    "parkAttractions": [],
    "allies": [],
    "enemies": [],
    "sourceUrl": "https://disney.fandom.com/wiki/Achilles_(Hercules)",
    "name": "Achilles",
    "imageUrl": "https://static.wikia.nocookie.net/disney/images/d/d3/Vlcsnap-2015-05-06-23h04m15s601.png",
    "createdAt": "2021-04-12T01:31:30.547Z",
    "updatedAt": "2021-12-20T20:39:18.033Z",
    "url": "https://api.disneyapi.dev/characters/112",
    "__v": 0

}

characterUl.innerHTML = `
<li class="main__li">
      <img src="${characterObj.imageUrl}" alt="imagen Achilles">
      <h2 class="main__header-2">${characterObj.name}</h2>
    </li>`