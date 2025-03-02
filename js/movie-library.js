const BASE_URL = "https://api.themoviedb.org/3/";
const ENDPOINT = "trending/movie/day";
const API_KEY = "345007f9ab440e5b86cef51be6397df1";
const list = document.querySelector(".js-list");

function getTrending() {
  return fetch(`${BASE_URL}${ENDPOINT}?api_key=${API_KEY}&page=20`).then(
    (resp) => {
      if (!resp.ok) {
        throw new Error(resp.statusText);
      }

      return resp.json();
    }
  );
}
getTrending()
  .then((data) => console.log(data))
  .catch((err) => console.log(err));

function createMarkup(arr) {
  return arr
    .map(
      ({ poster_path, title }) => `<li>
        <img src="https://image.tmdb.org/t/p/w500${poster_path}" alt="${title}">
        <h2>${title}</h2>
      </li>`
    )
    .join("");
}
