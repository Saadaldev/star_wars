import defaultAxios from "axios";

const axios = defaultAxios.create({  baseURL: "https://swapi.dev/api" });

export default axios