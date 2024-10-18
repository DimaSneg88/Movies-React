import { Container } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Info from "./Components/Info";
import Movies from "./Components/Movies";
import Genres from "./Components/Genres";
import MoviesInGenre from "./Components/MoviesInGenre";

function App() {
  return (
    <>
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movies/:id" element={<Info />} />
          <Route path="/genres" element={<Genres />} />
          <Route path="/genres/:id/:name" element={<MoviesInGenre />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
