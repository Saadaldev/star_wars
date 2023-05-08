import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";
function Index() {
  const navigate = useNavigate();
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>Logo</Navbar.Brand>
        <Nav className="me-auto">
          <div onClick={() => navigate("/")}>
            <Nav.Link>Home</Nav.Link>
          </div>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Index;
