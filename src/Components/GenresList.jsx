import { baseUrl, headers } from "../utils/constants";
import { useQuery } from "@tanstack/react-query";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid2";
import { CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";

export const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

export default function GenresList() {
  const { isPending, data } = useQuery({
    queryKey: ["getMovieGenres"],
    queryFn: () =>
      fetch(`${baseUrl}/genre/movie/list`, {
        headers: headers,
      }).then((res) => res.json()),
  });

  const genres = data?.genres ?? [];

  return (
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
          {genres.map((el) => (
            <Grid key={el.id} size={4}>
              <Link to={`/genres/${el.id}/${el.name}`}>
                <Item>{el.name}</Item>
              </Link>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
