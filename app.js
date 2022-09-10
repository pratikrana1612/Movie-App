const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="'

const form = document.querySelector('form');
const search = document.querySelector('input');
const main = document.querySelector('main');

getMovies(API_URL)
const showMovies = (data) =>{
    main.innerHTML= '';
    for(d of data)
    {
        const div = document.createElement('div');
        div.className='movie';
        div.innerHTML=`
        <div class="img" style="background:url('${IMG_PATH + d.poster_path}'); background-position: center; background-size:cover;" alt="${d.title}"></div>
            <div class="movie_info">
                <h3>${d.title}</h3>
                <span class="${rating(d.vote_average)}">${d.vote_average}</span>
            </div>
            <div class="movie_overview">
                <h3>OverView</h3>
                <p>${d.overview}</p>
            </div>
        `;
        main.append(div);
    }
}

function rating(number)
{
    if(number >= 8)
    {
        return 'green';
    }
    else if(number <8 && number>=5)
    {
        return 'orange';
    }
    else{
        return 'red';
    }
}
async function getMovies(url) {
    const res = await fetch(url)
    const data = await res.json()
    showMovies(data.results)
}

form.addEventListener('submit',(e) =>
{
    e.preventDefault()
    const searchValue = search.value;
    if(searchValue && searchValue !== '')
    {
        getMovies(SEARCH_API + searchValue);
        search.value = '';
    }
    else{
        window.location.reload();
    }
})