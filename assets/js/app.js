////////////////////////////////////////////////////////////////////
// Global Variables For App
////////////////////////////////////////////////////////////////////
const global = {
    currentPage: window.location.pathname,
    search: {
        term: '',
        type: '',
        page: 1,
        totalPages: 1
    },
    api: {
        apiKey: 'ac428061577a1f4a80910af3ccf8610f',
        apiUrl: 'https://api.themoviedb.org/3/'
    }
};
////////////////////////////////////////////////////////////////////
// Crud Functions For App (GET - API)
////////////////////////////////////////////////////////////////////
const displayPopularMovies = async () => {
    const {results} = await fetchAPIData('movie/popular');
    results.forEach((movie) => {
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = `<div class="card">
          <a href="movie-details.html?id=${movie.id}">
            ${
                movie.poster_path ?
                `<img
                    src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" 
                    class="card-img-top"
                    alt="${movie.title}"/>` : 
                `<img 
                    src="../img/no-image.jpg" 
                    class="card-img-top" 
                    alt="${movie.title}"/>`
            }
          </a>
          <div class="card-body">
            <h5 class="card-title">${movie.title}</h5>
            <p class="card-text">
              <small class="text-muted">Release: ${movie.release_date}</small>
            </p>
          </div>
        </div>`;
        document.querySelector('#popular-movies').appendChild(div);
    });
}
const displayPopularTvShows = async () => {
    const {results} = await fetchAPIData('tv/popular');
    results.forEach((show) => {
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = `<div class="card">
          <a href="tv-details.html?id=${show.id}">
            ${
                show.poster_path ?
                `<img
                    src="https://image.tmdb.org/t/p/w500/${show.poster_path}" 
                    class="card-img-top"
                    alt="${show.name}"/>` : 
                `<img 
                    src="../img/no-image.jpg" 
                    class="card-img-top" 
                    alt="${show.name}"/>`
            }
          </a>
          <div class="card-body">
            <h5 class="card-title">${show.name}</h5>
            <p class="card-text">
              <small class="text-muted">Air Date:  ${show.first_aired_date}</small>
            </p>
          </div>
        </div>`;
        document.querySelector('#popular-shows').appendChild(div);
    });
}
const displayMovieDetails = async () => {
    const movieId = window.location.search.split('=')[1];
    const movie = await fetchAPIData(`movie/${movieId}`);
    displayBackgroundImage('movie', movie.backdrop_path);
    const div = document.createElement('div');
    div.innerHTML = `
        <div class="details-top">
          <div>
            ${
                movie.poster_path ?
                `<img
                    src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" 
                    class="card-img-top"
                    alt="${movie.title}"/>` : 
                `<img 
                    src="../img/no-image.jpg" 
                    class="card-img-top" 
                    alt="${movie.title}"/>`
            }
          </div>
          <div>
            <h2>${movie.title}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${movie.vote_average.toFixed(1)} / 10
            </p>
            <p class="text-muted">Release Date: ${movie.release_date}</p>
            <p>
              ${movie.overview}
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
              ${movie.genres.map((genre) => `<li>${genre.name}</li>`).join('')}
            </ul>
            <a href="${movie.homepage}" target="_blank" class="btn">Visit Movie Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Movie Info</h2>
          <ul>
            <li><span class="text-secondary">Budget:</span> $${addCommasToNumber(movie.budget)}</li>
            <li><span class="text-secondary">Revenue:</span> $${addCommasToNumber(movie.revenue)}</li>
            <li><span class="text-secondary">Runtime:</span> ${movie.runtime} minutes</li>
            <li><span class="text-secondary">Status:</span> ${movie.status}</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">${movie.production_companies.map((company) => `<span>${company.name}</span>`).join(', ')}</div>
        </div>
    `;
    document.querySelector('#movie-details').appendChild(div);
}
const displayShowDetails = async () => {
    const showId = window.location.search.split('=')[1];
    const show = await fetchAPIData(`tv/${showId}`);
    displayBackgroundImage('tv', show.backdrop_path);
    const div = document.createElement('div');
    div.innerHTML = `
        <div class="details-top">
          <div>
            ${
                show.poster_path ?
                `<img
                    src="https://image.tmdb.org/t/p/w500/${show.poster_path}" 
                    class="card-img-top"
                    alt="${show.name}"/>` : 
                `<img 
                    src="../img/no-image.jpg" 
                    class="card-img-top" 
                    alt="${show.name}"/>`
            }
          </div>
          <div>
            <h2>${show.name}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${show.vote_average.toFixed(1)} / 10
            </p>
            <p class="text-muted">Release Date: ${show.last_air_date}</p>
            <p>
              ${show.overview}
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
              ${show.genres.map((genre) => `<li>${genre.name}</li>`).join('')}
            </ul>
            <a href="${show.homepage}" target="_blank" class="btn">Visit Show Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Show Info</h2>
          <ul>
            <li><span class="text-secondary">Number Of Episodes:</span> ${show.number_of_episodes}</li>
            <li>
              <span class="text-secondary">Last Episode To Air:</span> ${show.last_episode_to_air.name}
            </li>
            <li><span class="text-secondary">Status:</span> ${show.status}</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">${show.production_companies.map((company) => `<span>${company.name}</span>`).join(', ')}</div>
        </div>
    `;
    document.querySelector('#show-details').appendChild(div);
}
const fetchAPIData = async (endpoint) => {
    const API_KEY = global.api.apiKey;
    const API_URL = global.api.apiUrl;
    showSpinner();
    const response = await fetch(`${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`);
    const data = await response.json();
    hideSpinner();
    return data;
}
////////////////////////////////////////////////////////////////////
// Helper Functions For App
////////////////////////////////////////////////////////////////////
const showSpinner = () => {
    document.querySelector('.spinner').classList.add('show');
}
const hideSpinner = () => {
    document.querySelector('.spinner').classList.remove('show');
}
const searchMoviesShows = async () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    global.search.type = urlParams.get('type');
    global.search.term = urlParams.get('search-term');
    if(global.search.term !== '' && global.search.term !== null) {
        const {results, totalPages, page} = await searchAPIData();
        if(results.length === 0) {
            showAlert('No results found!', 'error');
            return;
        }
        displaySearchResults(results);
        document.querySelector('#search-term').value = '';
    } else {
        showAlert('Please enter a search term.', 'error');
    } 
}
const displaySearchResults = (results) => {
    results.forEach((result) => {
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = `<div class="card">
          <a href="${global.search.type}-details.html?id=${result.id}">
            ${
                result.poster_path ?
                `<img
                    src="https://image.tmdb.org/t/p/w500/${result.poster_path}" 
                    class="card-img-top"
                    alt="${global.search.type === 'movie' ? result.title : result.name}"/>` : 
                `<img 
                    src="../img/no-image.jpg" 
                    class="card-img-top" 
                    alt="${global.search.type === 'movie' ? result.title : result.name}"/>`
            }
          </a>
          <div class="card-body">
            <h5 class="card-title">${global.search.type === 'movie' ? result.title : result.name}</h5>
            <p class="card-text">
              <small class="text-muted">Release: ${global.search.type === 'movie' ? result.release_date : result.first_aired_date}</small>
            </p>
          </div>
        </div>`;
        document.querySelector('#search-results').appendChild(div);
    });
}
const searchAPIData = async () => {
    const API_KEY = global.api.apiKey;
    const API_URL = global.api.apiUrl;
    showSpinner();
    const response = await fetch(`${API_URL}search/${global.search.type}?api_key=${API_KEY}&language=en-US&query=${global.search.term}`);
    const data = await response.json();
    hideSpinner();
    return data;
}
const highlightActiveLink = () => {
    const links = document.querySelectorAll('.nav-link');
    links.forEach((link) => {
        if(link.getAttribute('href') === global.currentPage) {
            link.classList.add('active');
        }
    });
}
const showAlert = (message, className = 'error') => {
    const alertEl = document.createElement('div');
    alertEl.classList.add('alert', className);
    alertEl.appendChild(document.createTextNode(message));
    document.querySelector('#alert').appendChild(alertEl);
    setTimeout(() => alertEl.remove(), 3000);
}
const addCommasToNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
const displayBackgroundImage = (type, backgroundPath) => {
    const overlay = document.createElement('div');
    overlay.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${backgroundPath})`;
    overlay.style.backgroundSize = 'cover';
    overlay.style.backgroundPosition = 'center';
    overlay.style.backgroundRepeat = 'no-repeat';
    overlay.style.height = '100vh';
    overlay.style.width = '100vw';
    overlay.style.position = 'absolute';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.zIndex = '-1';
    overlay.style.opacity = '0.1';
    if(type === 'movie') {
        document.querySelector('#movie-details').appendChild(overlay);
    } else {
        document.querySelector('#show-details').appendChild(overlay);
    }
}
const displaySlider = async () => {
    const {results} = await fetchAPIData('movie/now_playing');
    results.forEach((movie) => {
        const div = document.createElement('div');
        div.classList.add('swiper-slide');
        div.innerHTML = `
            <a href="movie-details.html?id=${movie.id}">
              <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title}" />
            </a>
            <h4 class="swiper-rating">
              <i class="fas fa-star text-secondary"></i> ${movie.vote_average} / 10
            </h4>
        `;
        document.querySelector('.swiper-wrapper').appendChild(div);
        initSwiper();
    });
}
const initSwiper = () => {
    const swiper = new Swiper('.swiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        freeMode: true,
        loop: true,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false
        },
        breakpoints: {
            500: {
                slidesPerView: 2
            },
            700: {
                slidesPerView: 3
            },
            1200: {
                slidesPerView: 4
            }
        }
    });
}
////////////////////////////////////////////////////////////////////
// Initializer And Router For App
////////////////////////////////////////////////////////////////////
const init = () => {
    switch(global.currentPage) {
        case '/':
        case '/index.html':
            displaySlider();
            displayPopularMovies();
            break;
        case '/shows.html':
            displayPopularTvShows();
            break;
        case '/movie-details.html':
            displayMovieDetails();
            break;
        case '/tv-details.html':
            displayShowDetails();
            break;
        case '/search.html':
            searchMoviesShows();
            break;
    }
    highlightActiveLink();
}
document.addEventListener('DOMContentLoaded', init);
