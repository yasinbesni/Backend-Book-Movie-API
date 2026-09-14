import { movies } from "./movieData.js";
import { getFirstMovie, getMovieCount } from "./movieUtils.js";
import createMessage from "./createMessage.js";

console.log(createMessage());

console.log(movies);
console.log("Film sayısı:", getMovieCount(movies));
console.log("İlk film:", getFirstMovie(movies));