// Global Variables
let isOnWatchlist = false;
const addToWLBtn = document.getElementById('add-btn');

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', () => {
    /* Event Listeners */
    
    addToWLBtn.addEventListener('click', () => addToWatchlist());

    /* Fetch Commands */
    // Fetch Cowboy Bebop and display on site load
    fetch('https://api.jikan.moe/v4/anime/1')
    .then((response) => response.json())
    .then((data) => displayOnCard(data.data));
})


/* DOM Manipulation*/
// Display Card Manipulation
function displayOnCard(animeData){
    // console.log(animeData)
    /* POSTER SIDE */
    // Set #anime-poster
    const animePoster = document.getElementById('anime-poster');
    animePoster.setAttribute('src', animeData.images.jpg.large_image_url);

    /* RIGHT SIDE */
    // Set #title
    const animeTitle = document.getElementById('title');
    animeTitle.innerText = animeData.title_english;
    animeTitle.setAttribute('alt', animeData.mal_id);

    // Set #jap-title
    const animeJapTitle = document.getElementById('jap-title');
    animeJapTitle.innerText = animeData.title_japanese;

    // Set #anime-synopsis
    const animeSynopsis = document.getElementById('anime-synopsis');
    animeSynopsis.innerText = animeData.synopsis;
}

// Watchlist Manipulation
function populateWatchlist(){
    // Check db.json and update each list item based on the watchlist content
}

function addToWatchlist(){
    // POST request to local server

    // Create list item
    disableWatchlistItems();
    createWatchlistItem();
}

function createWatchlistItem(){
    // Create list item that uses the CSS selectors and has the structure of a list item
    const listItem = document.createElement('li');

    listItem.addEventListener('click', ()=> {
        // Set this list item active and disable others
        disableWatchlistItems()
        listItem.setAttribute('class', 'item active');

        // Display the anime's information

        console.log(listItem)
    })

    listItem.setAttribute('id', document.getElementById('title').getAttribute('alt'));
    listItem.setAttribute('class', 'item active');
    listItem.innerText = document.getElementById('title').innerText;
    // listItem.innerText = capitaliseFirstLetter(document.getElementById('title').innerText);


    (document.getElementById('watchlist')).appendChild(listItem);
}

// Disable all the watchlist items
function disableWatchlistItems(){
    Array.from(document.getElementsByClassName('item')).forEach(item => console.log(item.setAttribute('class', 'item')))
}
// Capitalise only the first letter of every word in the title
// function capitaliseFirstLetter(string){
//     const capitalisedString = string.charAt(0).toUpperCase() + string.toLowerCase().slice(1);
//     return capitalisedString;
// }

// Comments Manipulation
function createComment(){
    // Create list item that uses the CSS selectors and has the structure of a list item
}

function deleteComment(){
    // Delete comment and its parent node
}