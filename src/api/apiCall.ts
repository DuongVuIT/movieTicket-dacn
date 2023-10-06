const apikey: string = 'dea5389c8498913c84289c0f7c94bde8';

export const nowPlaying: string = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apikey}`;
export const upComming: string = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apikey}`;
export const popular: string = `https://api.themoviedb.org/3/movie/popular?api_key=${apikey}`;
export const topRated: string = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apikey}`;
export const searchMovies = (keyword: string) => {
  return `https://api.themoviedb.org/3/search/movie?api_key=${apikey}&query=${keyword}`;
};
export const movieDetails = (id: number) => {
  return `https://api.themoviedb.org/3/movie/${id}?api_key=${apikey}`;
};
export const castPeoples = (id: number) => {
  return `https://api.themoviedb.org/3/person/${id}?api_key=${apikey}`;
};
export const castDetails = (id: number) => {
  return `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apikey}`;
};
export const baseImagePath = (size: string, path: string) => {
  return `https://image.tmdb.org/t/p/${size}${path}`;
};
export const movieSimilar = (id: number) => {
  return `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${apikey}`;
}
export const castCredits = (id: number) => { 
  return `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${apikey}`;
}