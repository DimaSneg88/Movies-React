import Header from "./Header";
import { baseUrl, headers } from "../utils/constants";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Box, Button, CircularProgress } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { ArrowBack } from "@mui/icons-material";
import MovieCard from "./MovieCard";

export default function MoviesInGenre() {
  const { id, name } = useParams();

  const { isPending, data } = useQuery({
    queryKey: ["getMovieInGenre"],
    queryFn: () =>
      fetch(`${baseUrl}/discover/movie?with_genres=${id}`, {
        headers: headers,
      }).then((res) => res.json()),
  });

  const arr = data?.results ?? [];

  return (
    <div>
      <Header />
      <Link to="/genres">
        <Button variant="outlined" startIcon={<ArrowBack />}>
          {name}
        </Button>
      </Link>
      <Box sx={{ flexGrow: 1 }}>
        {isPending ? (
          <Box
            sx={{
              display: "flex",
              minHeight: "500px",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={2}>
            {arr.map((el) => (
              <Grid key={el.id} size={4}>
                <MovieCard el={el} />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </div>
  );
}
