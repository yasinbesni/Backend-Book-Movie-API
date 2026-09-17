import { movies } from "./movieData.js";
import {
  getMovieCount,
  getFirstMovie,
} from "./movieUtils.js";
import createMessage from "./createMessage.js";

console.log(movies);
console.log(getMovieCount(movies));
console.log(getFirstMovie(movies));
console.log(createMessage());
