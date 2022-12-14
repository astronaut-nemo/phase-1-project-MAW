// Global Variables
let isOnWatchlist = false;
const addToWLBtn = document.getElementById('add-btn');
const removeFromWLBtn = document.getElementById('remove-btn');


/* INITIAL RENDER */
document.addEventListener('DOMContentLoaded', () => {
    console.log('page loaded')
    /* Get Elements*/
    const searchBtn = document.getElementById('search-btn')

    /* Event Listeners */
    document.getElementById('random-btn').addEventListener('click', () => fetchFromJikan('https://api.jikan.moe/v4/random/anime?q=&sfw'));

    searchBtn.addEventListener('click', ()=> searchAnime());
    addToWLBtn.addEventListener('click', () => addToWatchlist());
    removeFromWLBtn.addEventListener('click', () => removeFromWatchlist());
      

    disableWatchlistItems();
    populateWatchlist();

    // Fetch and display random anime
    fetchFromJikan('https://api.jikan.moe/v4/random/anime?q=&sfw');
})


/* FETCH REQUESTS */
function fetchFromJikan(URL){
    fetch(URL)
    .then((response) => response.json())
    .then((data) => displayFromJikanOnCard(data.data));
}

function searchJikan(input){
    fetch(`https://api.jikan.moe/v4/anime?q=${input}&sfw&limit=5`)
    .then((response) => response.json())
    .then((data) => console.log(data));
}

function fetchFromLocal(URL){
    fetch(URL)
    .then((response) => response.json())
    .then((data) => displayFromLocalOnCard(data));
}

function deleteFromLocal(id){
    // POST request to local server (save only the information you display)
    fetch(`http://localhost:3000/watchlist/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
    })
}


/* EVENT HANDLERS */ 
function searchAnime(){
    const searchInput = document.getElementById('search-input').value;
    console.log(searchInput)
    // searchAnime(searchInput);
}

/* DOM MANIPULATION*/
/* Display Card Manipulation */
function displayFromJikanOnCard(animeData){
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

    // Action buttons
    addToWLBtn.style.display = "";
    removeFromWLBtn.style.display = "none";

    disableWatchlistItems();

}

function displayFromLocalOnCard(animeData){
    // console.log(animeData)
    /* POSTER SIDE */
    // Set #anime-poster
    const animePoster = document.getElementById('anime-poster');
    animePoster.setAttribute('src', animeData.animePoster);

    /* RIGHT SIDE */
    // Set #title
    const animeTitle = document.getElementById('title');
    animeTitle.innerText = animeData.animeTitle;
    animeTitle.setAttribute('alt', animeData.id);

    // Set #jap-title
    const animeJapTitle = document.getElementById('jap-title');
    animeJapTitle.innerText = animeData.animeJapTitle;

    // Set #anime-synopsis
    const animeSynopsis = document.getElementById('anime-synopsis');
    animeSynopsis.innerText = animeData.animeSynopsis;

    // Actions buttons
    addToWLBtn.style.display = "none";
    removeFromWLBtn.style.display = "";
}


/* Watchlist Manipulation */
function populateWatchlist(){
    // Check db.json and create each list item based on the watchlist content
    fetch('http://localhost:3000/watchlist/')
    .then((response) => response.json())
    .then((data) => data.forEach(anime => createWatchlistItem(anime)))
}

function addToWatchlist(){
    disableWatchlistItems();

    // Create object to store the displayed anime's relevant information
    const animeDetails = {
        animePoster: document.getElementById('anime-poster').getAttribute('src'),
        animeTitle: document.getElementById('title').innerText,
        animeJapTitle: document.getElementById('jap-title').innerText,
        animeSynopsis: document.getElementById('anime-synopsis').innerText,
    }
    // console.log(animeDetails)

    // POST request to local server (save only the information you display)
    fetch("http://localhost:3000/watchlist", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify(animeDetails)
    })

    populateWatchlist();
}

function removeFromWatchlist(){
    const deleteId = document.getElementById('title').getAttribute('alt');

    // Delete Request
    deleteFromLocal(deleteId);
    populateWatchlist();
}

function createWatchlistItem(anime){
    // Create list item that uses the CSS selectors and has the structure of a list item
    const listItem = document.createElement('li');
    listItem.setAttribute('id', anime.id);

    listItem.addEventListener('click', ()=> {
        // Set this list item active and disable others
        disableWatchlistItems()
        listItem.setAttribute('class', 'item active');

        // Display the anime's information
        fetchFromLocal(`http://localhost:3000/watchlist/${listItem.getAttribute('id')}`)
    })

    
    listItem.setAttribute('class', 'item');
    listItem.innerText = anime.animeTitle;

    (document.getElementById('watchlist')).appendChild(listItem);
    isOnWatchlist = true;
}

// Disable all the watchlist items
function disableWatchlistItems(){
    Array.from(document.getElementsByClassName('item')).forEach(item => item.setAttribute('class', 'item'))
}
// Capitalise only the first letter of every word in the title
// function capitaliseFirstLetter(string){
//     const capitalisedString = string.charAt(0).toUpperCase() + string.toLowerCase().slice(1);
//     return capitalisedString;
// }

/* Comments Manipulation */
function createComment(){
    // Create list item that uses the CSS selectors and has the structure of a list item
}

function deleteComment(){
    // Delete comment and its parent node
}