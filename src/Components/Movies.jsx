import Header from "./Header";
import { baseUrl, headers } from "../utils/constants";
import { useQuery } from "@tanstack/react-query";
import { Box, CircularProgress } from "@mui/material";
import Grid from "@mui/material/Grid2";
import MovieCard from "./MovieCard";

export default function Movies() {
  const { isPending, data } = useQuery({
    queryKey: ["getMovies"],
    queryFn: () =>
      fetch(`${baseUrl}/movie/now_playing`, {
        headers: headers,
      }).then((res) => res.json()),
  });

  const arr = data?.results ?? [];

  return (
    <div>
      <Header />
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
