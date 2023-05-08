import React from "react";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router";

const CharacterCard = ({ character, id }) => {
  const navigate = useNavigate();
  const { name, gender, birth_year, skin_color, films } = character;
  return (
    <Card
      style={{ cursor: "pointer" }}
      onClick={() => navigate(`/character/${id}`)}
    >
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>
          <b>Gender:</b> {gender}
        </Card.Text>
        <Card.Text>
          <b>Birth Year:</b> {birth_year}
        </Card.Text>
        <Card.Text>
          <b>Skin Color:</b> {skin_color}
        </Card.Text>
        <Card.Text>
          <b>Number of Films:</b> {films.length}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default CharacterCard;
