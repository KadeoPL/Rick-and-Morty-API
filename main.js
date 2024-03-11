import axios from 'axios';

const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const errorButton = document.getElementById('errorPage');

const charactersSection = document.querySelector('.characters-section');

let firstCharacterId;
let lastCharacterId;
let firstId = '';

async function getCharacters(firstCharacterId, lastCharacterId) {
    try {
        for (let i = firstCharacterId; i <= lastCharacterId; i++) {
            try {
                const response = await axios.get(`https://rickandmortyapi.com/api/character/${i}`);
                const { name, location, status, image } = response.data;
                const characterData = {
                    name: name,
                    location: location.name,
                    status: status,
                    image: image
                };
                renderCharacter(characterData);
            } catch (error) {
                renderError(error.response.status, error.message);
            }
        }
    } catch (error) {
        renderError(error.response.status, error.message);
    }
}

function showPrevButton(lastCharacterId) {
    if(lastCharacterId > 5) {
        prevButton.style.display = 'block';
    } else {
        prevButton.style.display = 'none';
    }
}

function createHtmlElement(tagName, textContent, className) {
    const element = document.createElement(tagName);
    element.classList.add(className);
    element.textContent = textContent;
    return element;
}

function renderCharacter(characterData) {
    const characterBox = createHtmlElement('div', '', 'character-box');
    
    const characterImage = createHtmlElement('div', '', 'character-box-image');
    characterImage.style.backgroundImage = `url(${characterData.image})`;

    const characterDescription = createHtmlElement('div', '', 'character-box-description');
    const characterName = createHtmlElement('h1', characterData.name, 'character-name');
    const characterLocation = createHtmlElement('h2', 'Location: ' + characterData.location, 'character-location');
    const characterStatus = createHtmlElement('h2',  'Status: ' + characterData.status, 'character-status');

    characterDescription.appendChild(characterName);
    characterDescription.appendChild(characterLocation);
    characterDescription.appendChild(characterStatus);

    characterBox.appendChild(characterImage);
    characterBox.appendChild(characterDescription);

    charactersSection.appendChild(characterBox);
}

function renderError(errorStatus, errorMessage) {
    const errorBox = createHtmlElement('div', '', 'character-box');
    
    const errorImage = createHtmlElement('div', '', 'character-box-image');
    errorImage.style.backgroundImage = `url('img/error_image.jpg')`;

    const errorDescription = createHtmlElement('div', '', 'character-box-description');
    const errorStatusElement = createHtmlElement('h1', 'Status: ' + errorStatus, 'character-name');
    const errorMessageElement = createHtmlElement('h2', 'Message: ' + errorMessage, 'character-location');

    errorDescription.appendChild(errorStatusElement);
    errorDescription.appendChild(errorMessageElement);

    errorBox.appendChild(errorImage);
    errorBox.appendChild(errorDescription);

    charactersSection.appendChild(errorBox);
}

nextButton.addEventListener('click', () => {
    charactersSection.textContent = '';
    firstCharacterId += 5;
    lastCharacterId += 5;
    getCharacters(firstCharacterId, lastCharacterId);
    showPrevButton(lastCharacterId);

});

prevButton.addEventListener('click', () => {
    if (firstCharacterId <= 5) {
        charactersSection.textContent = '';
        getCharacters(firstCharacterId, lastCharacterId);
    } else {
        charactersSection.textContent = '';
        firstCharacterId -= 5;
        lastCharacterId -= 5;
        getCharacters(firstCharacterId, lastCharacterId);
    }
    showPrevButton(lastCharacterId);
});

errorButton.addEventListener('click', () => {
    charactersSection.textContent = '';
    if(lastCharacterId > 862) {
        errorButton.textContent = 'Error Page';
        firstCharacterId = 1;
        lastCharacterId = 5;
        getCharacters(firstCharacterId, lastCharacterId);
    } else {
        errorButton.textContent = 'Return';
        firstCharacterId = 900;
        lastCharacterId = firstCharacterId + 4;
        getCharacters(firstCharacterId, lastCharacterId);
    }
    showPrevButton(lastCharacterId);
});

window.addEventListener('beforeunload', () => {
    localStorage.setItem('savedFirstCharacterId', firstCharacterId);
});

document.addEventListener("DOMContentLoaded", (event) => {
    if (localStorage.getItem('savedFirstCharacterId') === null){
        firstCharacterId = 1;
        lastCharacterId = 5;
        getCharacters(firstCharacterId, lastCharacterId);
        showPrevButton(lastCharacterId);
    } else {
        firstCharacterId = parseInt(localStorage.getItem('savedFirstCharacterId'));
        lastCharacterId = firstCharacterId + 4;
        getCharacters(firstCharacterId, lastCharacterId);
        showPrevButton(lastCharacterId);
    }
  });

