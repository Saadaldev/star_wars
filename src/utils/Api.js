import axios from "axios";

const API_BASE_URL = "https://swapi.dev/api";

const getCharacters = async (page = 1) => {
  const response = await axios.get(`${API_BASE_URL}/people/?page=${page}`);
  return response.data;
};
export const getAllCharacters = async (page = 1, allCharacters = {}) => {
  const data = await getCharacters(page);
  allCharacters[page] = data.results;
  if (data.next) {
    const nextPage = page + 1;
    return getAllCharacters(nextPage, allCharacters);
  }
  return allCharacters;
};
export const getFilms = async () => {
  const response = await axios.get(`${API_BASE_URL}/films/`);
  return response.data.results;
};
export const getSpecies = async () => {
  const allSpecies = [];
  const response = await axios.get(`${API_BASE_URL}/species/`);
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
  let response = await axios.get(`${API_BASE_URL}/people/${id}/`);
  const speciesData = await getData(response.data.species);
  const filmsData = await getData(response.data.films);
  const StarShipsData = await getData(response.data.starships);
  response.data.species = speciesData;
  response.data.films = filmsData;
  response.data.films = StarShipsData;
  return response.data;
};
