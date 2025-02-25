// ************* Кнопка 'Load more' ***********
const selectors = {
  container: document.querySelector(".js-movie-list"),
  loadMore: document.querySelector(".js-losd-more"),
};

serviceMovie().then((result) => {
  console.log(createMarkup(result.results));
});

// makes request

function serviceMovie() {
  const API_KEY = "345007f9ab440e5b86cef51be6397df1";
  const BASE_URL = "https://api.themoviedb.org/3";
  const END_RESOURSE = "/discover/movie";

  return fetch(`${BASE_URL}${END_RESOURSE}?api_key=${API_KEY}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }

      return response.json();
    })
    .catch((error) => console.log(error));
}

function createMarkup(movieArr) {
  return movieArr
    .map(
      ({ poster_path, release_date, original_title, vote_average }) =>
        `<img src = "https://image.tmdb.org/t/p/w500${poster_path}" alt ="${original_title}" />
            <div class ="movie-info>
            <h2>${original_title}</h2>
            <p>Release date : ${release_date}</p>
            <p>Vote average : ${vote_average}</p>
            </div > `
      //   console.log(poster_path, release_date, original_title, vote_average)
    )
    .join(" ");
}
