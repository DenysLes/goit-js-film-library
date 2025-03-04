const target = document.querySelector(".js-guard");
let options = {
  root: null,
  rootMargin: "200px",
  threshold: 1.0,
};

let observer = new IntersectionObserver(callback, options);

function callback(evt) {
  console.log(evt);
}

const BASE_URL = "https://api.themoviedb.org/3/";
const ENDPOINT = "trending/movie/day";
const API_KEY = "345007f9ab440e5b86cef51be6397df1";
const list = document.querySelector(".js-list");
const loadMore = document.querySelector(".js-load-more");
let currentPage = 1;

loadMore.addEventListener("click", onLoad);

function onLoad() {
  currentPage += 1;
  getTrending(currentPage)
    .then((data) => {
      list.insertAdjacentHTML("beforeend", createMarkup(data.results));

      if (data.page === data.total_pages) {
        loadMore.hidden = true;
      }
    })
    .catch((err) => console.log(err));
}

function getTrending(page = 1) {
  return fetch(`${BASE_URL}${ENDPOINT}?api_key=${API_KEY}&page=${page}`).then(
    (resp) => {
      if (!resp.ok) {
        throw new Error(resp.statusText);
      }

      return resp.json();
    }
  );
}
getTrending()
  .then((data) => {
    list.insertAdjacentHTML("beforeend", createMarkup(data.results));
    observer.observe(target);
    if (data.page !== data.total_pages) {
      loadMore.hidden = false;
    }
  })
  .catch((err) => console.log(err));

function createMarkup(arr) {
  return arr
    .map(
      ({ poster_path, title }) => `<li class="movie-card">
        <img src="https://image.tmdb.org/t/p/w400${poster_path}" alt="${title}">
        <h2>${title}</h2>
      </li>`
    )
    .join("");
}

// infinity scroll
let counter = 0;
document.addEventListener("scroll", onScroll);

function onScroll() {
  counter += 1;
  console.log(counter);
}
