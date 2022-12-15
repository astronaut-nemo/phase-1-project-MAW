document.addEventListener('DOMContentLoaded', () => {
    /* Event Listeners */

    /* Fetch Commands */
    fetch('https://api.jikan.moe/v4/anime/1')
    .then((response) => response.json())
    .then((data) => displayOnCard(data.data));
})


/* DOM Manipulation*/
function displayOnCard(animeData){
    console.log(animeData.images.jpg.small_image_url)
    /* POSTER SIDE */
    // Set #anime-poster
    const animePoster = document.getElementById('anime-poster');
    animePoster.setAttribute('src', animeData.images.jpg.large_image_url);

    /* RIGHT SIDE */
    // Set #title
    const animeTitle = document.getElementById('title');
    animeTitle.innerText = animeData.title_english;

    // Set #jap-title
    const animeJapTitle = document.getElementById('jap-title');
    animeJapTitle.innerText = animeData.title_japanese;

    // Set #anime-synopsis
    const animeSynopsis = document.getElementById('anime-synopsis');
    animeSynopsis.innerText = animeData.synopsis;
}

function addToWatchlist(){
    // Create list item that uses the CSS selectors and has the structure of a list item
}

function createComment(){
    // Create list item that uses the CSS selectors and has the structure of a list item
}