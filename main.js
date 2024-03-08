import axios from 'axios';

const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');

const charactersSection = document.querySelector('.characters-section');

const characterName = document.querySelector('.character-name');
const characterLocation = document.querySelector('.character-location');
const characterStatus = document.querySelector('.character-status');
const characterImage = document.querySelector('.character-box-image');

let firstCharacterId = 1;
let lastCharacterId = 5;

async function getCharacters(firstCharacterId, lastCharacterId) {
    try {
        for(let i = firstCharacterId; i <= lastCharacterId; i++){
            const response = await axios.get(`https://rickandmortyapi.com/api/character/${i}`);
            console.log(response.data);
        }
    } catch (error) {
        console.log(error.response.status);
        console.log(error.response.data.detail);
        throw error;
    }
}

function showPrevButton(lastCharacterId) {
    if(lastCharacterId > 5) {
        prevButton.style.display = 'block';
    } else {
        prevButton.style.display = 'none';
    }
}

showPrevButton();
getCharacters(firstCharacterId, lastCharacterId);
nextButton.addEventListener('click', () => {
    firstCharacterId += 5;
    lastCharacterId += 5;
    getCharacters(firstCharacterId, lastCharacterId);
    showPrevButton(lastCharacterId);

});

prevButton.addEventListener('click', () => {
    if (firstCharacterId <= 5) {
        getCharacters(firstCharacterId, lastCharacterId);
    } else {
        firstCharacterId -= 5;
        lastCharacterId -= 5;
        getCharacters(firstCharacterId, lastCharacterId);
    }
    showPrevButton(lastCharacterId);
});
