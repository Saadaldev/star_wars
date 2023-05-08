import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Card, Container } from "react-bootstrap";
import { getCharacterById } from "../../utils/Api";
import Loader from "../../utils/Loader";
const Index = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(false);
  const getCharacter = async () => {
    setLoading(true);
    const response = await getCharacterById(id);
    if (response) {
      setCharacter(response);
    }
    setLoading(false);
  };
  useEffect(() => {
    getCharacter();
  }, []);
  if (loading) return <Loader />;
  return (
    <Container className="d-flex justify-content-center">
      <Card style={{ width: "25rem" }} className="mt-5">
        <Card.Body>
          <Card.Title className="text-center display-3">
            {character?.name}
          </Card.Title>
          <Card.Text>
            <b>Gender:</b> {character?.gender}
          </Card.Text>
          <Card.Text>
            <b>Birth Year:</b> {character?.birth_year}
          </Card.Text>
          <Card.Text>
            <b>Mass:</b> {character?.mass}
          </Card.Text>
          <Card.Text>
            <b>Eye Color:</b> {character?.eye_color}
          </Card.Text>
          <Card.Text>
            <b>Hair Color:</b> {character?.hair_color}
          </Card.Text>
          <Card.Text>
            <b>Skin Color:</b> {character?.skin_color}
          </Card.Text>
          <Card.Text>
            <b>Height:</b> {character?.height}
          </Card.Text>
          {character?.species?.length > 0 && (
            <>
              <Card.Text>
                <b>Species:</b>
              </Card.Text>
              <ul>
                {character?.species?.map((specie) => (
                  <li key={specie.name}>{specie.name}</li>
                ))}
              </ul>
            </>
          )}
          {character?.films.length > 0 && (
            <>
              <Card.Text>
                <b>Movies:</b>
              </Card.Text>
              <ul>
                {character?.films?.map((movie) => (
                  <li key={movie.name}>
                    <a href={movie.url} target="_blank">
                      {movie.name}
                    </a>
                  </li>
                ))}
              </ul>
            </>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Index;
const isObjEmpty = (obj) => Object.keys(obj).length === 0;
