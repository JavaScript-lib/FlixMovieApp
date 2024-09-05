////////////////////////////////////////////////////////////////////
// Variables For App
////////////////////////////////////////////////////////////////////
const global = {
    currentPage: window.location.pathname,
};
////////////////////////////////////////////////////////////////////
// Functions For App
////////////////////////////////////////////////////////////////////
const highlightActiveLink = () => {
    const links = document.querySelectorAll('.nav-link');
    links.forEach((link) => {
        if(link.getAttribute('href') === global.currentPage) {
            link.classList.add('active');
        }
    });
}
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
////////////////////////////////////////////////////////////////////
// Initializer For App
////////////////////////////////////////////////////////////////////
document.addEventListener('DOMContentLoaded', init);