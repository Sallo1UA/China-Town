const startUrl = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=20";
const xhr = new XMLHttpRequest();
const nav = document.getElementById("nav");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const result = document.getElementById("result");

let state;

listRequest(startUrl);

function listRequest(url) {
    xhr.open("GET", url);
    xhr.responseType = "json";
    xhr.send();
    xhr.onload = function () {
        state = xhr.response;
        drawList();
    }
}
function drawList() {
    let pokemonElement = document.createElement("ul");
    pokemonElement.classList.add("pokemon-list");
    for (const pokemon of state.results) {
        pokemonElement.innerHTML += `
            <li>${pokemon.name}</li>
        `
    }
    result.innerHTML = null
    result.appendChild(pokemonElement)
}

function prev() {
    listRequest(state.previous);
}

function next() {
    listRequest(state.next);
}

prevBtn.addEventListener("click", prev);
nextBtn.addEventListener("click", next);

function setButtonState() {
    if (state.previous) { 
        prevBtn.disabled = false; 
    } 
    else { 
        prevBtn.disabled = true;
    }

    if (state.previous) { 
        nextBtn.disabled = false; 
    } 
    else { 
        nextBtn.disabled = true;
    }
}