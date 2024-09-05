////////////////////////////////////////////////////////////////////
// Variables For App
////////////////////////////////////////////////////////////////////
require('dotenv').config();
const global = {
    currentPage: window.location.pathname,
};
////////////////////////////////////////////////////////////////////
// Functions For App
////////////////////////////////////////////////////////////////////
const fetchAPIData = async (endpoint) => {
    const API_KEY = process.env.API_KEY;
}
const highlightActiveLink = () => {
    const links = document.querySelectorAll('.nav-link');
    links.forEach((link) => {
        if(link.getAttribute('href') === global.currentPage) {
            link.classList.add('active');
        }
    });
}
////////////////////////////////////////////////////////////////////
// Initializer For App
////////////////////////////////////////////////////////////////////
const init = () => {
    switch(global.currentPage) {
        case '/':
        case '/index.html':
            console.log('Home');
            break;
        case '/shows.html':
            console.log('Shows');
            break;
        case '/movie-details.html':
            console.log('Details');
            break;
        case '/tv-details.html':
            console.log('Details');
            break;
        case '/search.html':
            console.log('Search');
            break;
    }
    highlightActiveLink();
}
document.addEventListener('DOMContentLoaded', init);