import axios from 'axios';

const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');

const charactersSection = document.querySelector('.characters-section');

const characterName = document.querySelector('.character-name');
const characterLocation = document.querySelector('.character-location');
const characterStatus = document.querySelector('.character-status');
const characterImage = document.querySelector('.character-box-image');

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

getCharacters(1, 5);
