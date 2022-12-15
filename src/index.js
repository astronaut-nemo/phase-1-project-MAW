document.addEventListener('DOMContentLoaded', () => {
    fetch('https://api.jikan.moe/v4/anime/1')
    .then((response) => response.json())
    .then((data) => displayOnCard(data.data));
})

// Fetch commands


// DOM manipulation
function displayOnCard(animeData){
    console.log(animeData.images.jpg.small_image_url)
    /* POSTER SIDE */
    // Set #anime-poster
    const animePoster = document.getElementById('anime-poster');
    animePoster.setAttribute('src', animeData.images.jpg.large_image_url)

    /* RIGHT SIDE */
    // Set #title

    // Set #jap-title

    // Set #anime-synopsis
}

function addToWatchlist(){
    // Create list item that uses the CSS selectors and has the structure of a list item
}

function createComment(){
    // Create list item that uses the CSS selectors and has the structure of a list item
}