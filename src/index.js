// Global Variables
let isOnWatchlist = false;
const addToWLBtn = document.getElementById('add-btn');

/* INITIAL RENDER */
document.addEventListener('DOMContentLoaded', () => {
    console.log('page loaded')
    /* Event Listeners */
    addToWLBtn.addEventListener('click', () => addToWatchlist());

    disableWatchlistItems();

    // Fetch and display Cowboy Bebop
    fetchFromJikan('https://api.jikan.moe/v4/random/anime?&sfw')

    // Fetch and display an anime from the watchlist 
    // fetchFromLocal('http://localhost:3000/watchlist/1')
    populateWatchlist();
})

/* FETCH REQUESTS */
function fetchFromJikan(URL){
    fetch(URL)
    .then((response) => response.json())
    .then((data) => displayFromJikanOnCard(data.data));
}

function fetchFromLocal(URL){
    fetch(URL)
    .then((response) => response.json())
    .then((data) => displayFromLocalOnCard(data));
}

/* DOM MANIPULATION*/
// Display Card Manipulation
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
}

// Watchlist Manipulation
function populateWatchlist(){
    // Check db.json and create each list item based on the watchlist content
    fetch('http://localhost:3000/watchlist/')
    .then((response) => response.json())
    .then((data) => data.forEach(anime => createWatchlistItem(anime)))
}

function addToWatchlist(){
    disableWatchlistItems();

    // Create list item that uses the CSS selectors and has the structure of a list item
    const listItem = document.createElement('li');
    listItem.setAttribute('id', document.getElementById('title').getAttribute('alt'));

    listItem.addEventListener('click', ()=> {
        // Set this list item active and disable others
        disableWatchlistItems()
        listItem.setAttribute('class', 'item active');

        // Display the anime's information
        // Fetch from local db, then call displayOnCard based on id
        // fetchFromLocal(`http://localhost:3000/watchlist/`)
    })

    
    listItem.setAttribute('class', 'item active');
    listItem.innerText = document.getElementById('title').innerText;

    (document.getElementById('watchlist')).appendChild(listItem);

    // Create object of information to store
    const animeDetails = {
        animePoster: document.getElementById('anime-poster').getAttribute('src'),
        animeTitle: document.getElementById('title').innerText,
        animeJapTitle: document.getElementById('jap-title').innerText,
        animeSynopsis: document.getElementById('anime-synopsis').innerText,
    }

    // POST request to local server (save only the information you display)
    // fetch("http://localhost:3000/watchlist", {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         Accept: 'application/json'
    //     },
    //     body: JSON.stringify(animeDetails)
    // })
    // .then((response) => response.json()).then((data) => console.log(data))
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

// Comments Manipulation
function createComment(){
    // Create list item that uses the CSS selectors and has the structure of a list item
}

function deleteComment(){
    // Delete comment and its parent node
}