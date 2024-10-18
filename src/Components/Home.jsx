import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { baseUrl, headers } from "../utils/constants";
import MoviesSwiper from "./MoviesSwiper";
import Header from "./Header";
import { Box, CircularProgress } from "@mui/material";
import TrailerModal from "./TrailerModal";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [movieId, setMovieId] = useState(null);

  const { isPending, data } = useQuery({
    queryKey: ["getPopularMovies"],
    queryFn: () =>
      fetch(`${baseUrl}/movie/popular`, {
        headers: headers,
      }).then((res) => res.json()),
  });

  function openModal(id) {
    setOpen(true);
    setMovieId(id);
  }

  return (
    <div>
      <Header />
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
        <MoviesSwiper movies={data.results} openModal={openModal} />
      )}
      <TrailerModal open={open} setOpen={setOpen} movieId={movieId} />
    </div>
  );
}
