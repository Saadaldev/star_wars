import React, { useEffect, useState, useContext } from "react";
import { getAllCharacters, getFilms, getSpecies } from "../../utils/Api";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CharacterCard from "./CharacterCard";
import Pagination from "../../utils/Pagination";
import Loader from "../../utils/Loader";
import Form from "react-bootstrap/Form";
import StarWarsContext from "../../Context/StarWarsContext";
const Home = () => {
  const { data, setData } = useContext(StarWarsContext);
  const [characters, setCharacters] = useState({});
  const [filteredCharacters, setFilteredCharacters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [episodes, setEpisodes] = useState([]);
  const [species, setSpecies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState("");
  const [selectedSpecies, setSelectedSpecies] = useState("");
  const [birthDay, setBirthday] = useState({ from: 0, to: 0 });
  useEffect(() => {
    if (!isObjEmpty(data)) updateData();
    else fetchData();
  }, [data]);
  useEffect(() => {
    if (birthDay.from || birthDay.to || selectedMovie || selectedSpecies)
      handleSeach();
  }, [birthDay.from, birthDay.to, selectedMovie, selectedSpecies]);
  const handleSeach = () => {
    const { from, to } = birthDay;
    if (selectedMovie && selectedSpecies && to) {
      let movies = filterByMovies(filteredCharacters, selectedMovie);
      let BD = filterByBirthYear(movies, from, to);
      setCharacters(filterBySpecies(BD, selectedSpecies));
    } else if (selectedMovie && selectedSpecies) {
      let movies = filterByMovies(filteredCharacters, selectedMovie);
      setCharacters(filterBySpecies(movies, selectedSpecies));
    } else if (selectedMovie && to) {
      let movies = filterByMovies(filteredCharacters, selectedMovie);
      setCharacters(filterByBirthYear(movies, from, to));
    } else if (selectedSpecies && to) {
      let species = filterBySpecies(filteredCharacters, selectedSpecies);
      let BD = filterByBirthYear(species, from, to);
      setCharacters(BD);
    } else if (selectedMovie) {
      setCharacters(filterByMovies(filteredCharacters, selectedMovie));
    } else if (selectedSpecies) {
      setCharacters(filterBySpecies(filteredCharacters, selectedSpecies));
    } else if (to) {
      let BD = filterByBirthYear(filteredCharacters, from, to);
      setCharacters(BD);
    } else setCharacters(filteredCharacters);
  };
  const updateData = () => {
    setCharacters({ ...data.fetchedCharacters });
    setFilteredCharacters({ ...data.fetchedCharacters });
    setCurrentPage(1);

    setEpisodes(data.fetchedFilms);
    setSpecies(data.fetchedSpecies);
  };
  const fetchData = async () => {
    setLoading(true);
    let fetchedCharacters = null,
      fetchedFilms = null,
      fetchedSpecies = null;
    fetchedCharacters = await getAllCharacters();
    fetchedFilms = await getFilms();
    fetchedSpecies = await getSpecies();
    setData({ fetchedCharacters, fetchedFilms, fetchedSpecies });

    setCharacters({ ...fetchedCharacters });
    setFilteredCharacters({ ...fetchedCharacters });
    setCurrentPage(1);

    setEpisodes(fetchedFilms);
    setSpecies(fetchedSpecies);
    setLoading(false);
  };
  const RenderSearches = () => {
    return (
      <Row className="pb-5">
        <Col lg={3} md={3} sm={6} xs={12} className="my-2">
          <label htmlFor="movie">Movies</label>
          <Form.Select
            id="movie"
            value={selectedMovie}
            onChange={(e) =>
              setSelectedMovie(
                e.target.value === "All Movies" ? "" : e.target.value
              )
            }
            className="my-2"
          >
            <option value="All Movies">All Movies</option>
            {episodes?.map((movie, index) => (
              <option value={movie?.url} key={index}>
                {movie?.title}
              </option>
            ))}
          </Form.Select>
        </Col>
        <Col lg={3} md={3} sm={6} xs={12} className="my-2">
          <label htmlFor="species">Species</label>
          <Form.Select
            id="species"
            value={selectedSpecies}
            onChange={(e) =>
              setSelectedSpecies(
                e.target.value === "All Species" ? "" : e.target.value
              )
            }
            className="my-2"
          >
            <option value="All Species">All Species</option>
            {species?.map((specie, index) => (
              <option value={specie?.url} key={index}>
                {specie?.name}
              </option>
            ))}
          </Form.Select>
        </Col>
        <Col lg={3} md={3} sm={6} xs={12} className="my-2">
          <label htmlFor="from">Birth Date From</label>
          <Form.Control
            id="movie"
            value={birthDay.from}
            onChange={(e) => setBirthday({ ...birthDay, from: e.target.value })}
            className="my-2"
          />
        </Col>
        {birthDay.from > 0 && (
          <Col lg={3} md={3} sm={6} xs={12} className="my-2">
            <label htmlFor="to">Birth Date To</label>
            <Form.Control
              id="movie"
              value={birthDay.to}
              onChange={(e) => setBirthday({ ...birthDay, to: e.target.value })}
              className="my-2"
            />
          </Col>
        )}
      </Row>
    );
  };
  if (loading) return <Loader />;
  return (
    <Container fluid>
      <Container>
        <h1 className="text-center pt-5 pb-3">Star Wars Characters</h1>
        <h4 className="pt-1">Filter Characters</h4>
        {RenderSearches()}
        <h4 className="pt-1">Characters</h4>
        <Row>
          {characters[currentPage] &&
            characters[currentPage]?.map((character) => (
              <Col
                lg={3}
                md={3}
                sm={6}
                xs={12}
                className="my-2"
                key={character.name}
              >
                <CharacterCard
                  character={character}
                  id={character?.url?.match(/\/(\d+)\//)[1]} 
                />
              </Col>
            ))}
        </Row>
        {characters[currentPage]?.length > 0 && (
          <Pagination
            characters={characters}
            currentPage={currentPage}
            setCurrentPage={(page) => setCurrentPage(page)}
          />
        )}
      </Container>
    </Container>
  );
};

export default Home;

const groupItemsByTen = (items) => {
  const groups = {};
  const numGroups = Math.ceil(items.length / 10);

  for (let i = 1; i <= numGroups; i++) {
    const start = (i - 1) * 10;
    const end = i * 10;
    groups[i] = items.slice(start, end);
  }

  return groups;
};
const filterByMovies = (data, value) => {
  if (value === "All Movies") return data;
  let movies = [];
  for (const obj in data) {
    const arr = data[obj];
    for (const character of arr) {
      if (character?.films?.includes(value)) {
        movies.push(character);
      }
    }
  }
  return groupItemsByTen(movies);
};
const filterBySpecies = (data, value) => {
  if (value === "All Species") return data;
  let movies = [];
  for (const obj in data) {
    const arr = data[obj];
    for (const character of arr) {
      if (character?.species?.includes(value)) {
        movies.push(character);
      }
    }
  }

  return groupItemsByTen(movies);
};
const filterByBirthYear = (data, from, to) => {
  const filteredData = [];
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      data[key].forEach((item) => {
        const birthYear = parseInt(item.birth_year.slice(0, -3));
        if (birthYear >= from && birthYear <= to) {
          filteredData.push(item);
        }
      });
    }
  }
  return groupItemsByTen(filteredData);
};
const isObjEmpty = (obj) => Object.keys(obj).length === 0;
