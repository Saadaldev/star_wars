import axios from "./axios";

export const getCharacters = async (page = 1) => {
  const response = await axios.get(`/people/?page=${page}`);
  return response.data;
};
export const getFirst20Characters = async () => {
  const [first10, next10] = await Promise.all([
    getCharacters(1),
    getCharacters(2),
  ]);
  return { 1: first10.results, 2: next10.results };
};

export const getFilms = async () => {
  const response = await axios.get(`/films/`);
  return response.data.results;
};
export const getSpecies = async () => {
  const allSpecies = [];
  const response = await axios.get(`/species/`);
  for (
    let i = 1;
    i <= Math.ceil(response.data.count / response.data.results.length);
    i++
  ) {
    const pageResponse = await axios.get(
      `https://swapi.dev/api/species/?page=${i}`
    );
    allSpecies.push(...pageResponse.data.results);
  }
  return allSpecies;
};
export const getData = async (Urls) => {
  const speciesData = await Promise.all(
    Urls.map(async (e) => {
      const response = await axios.get(e);
      return response.data;
    })
  );

  return speciesData;
};
export const getCharacterById = async (id) => {
  let response = await axios.get(`/people/${id}/`);
  const speciesData = await getData(response.data.species);
  const filmsData = await getData(response.data.films);
  const StarShipsData = await getData(response.data.starships);
  response.data.species = speciesData;
  response.data.films = filmsData;
  response.data.films = StarShipsData;
  return response.data;
};
