import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { baseUrl, headers, imageUrl } from "../utils/constants";
import Header from "./Header";
import {
  Box,
  CircularProgress,
  Paper,
  Rating,
  Typography,
} from "@mui/material";
import TrailerModal from "./TrailerModal";
import MoviesSwiper from "./MoviesSwiper";
import Grid from "@mui/material/Grid2";
import { styled } from "@mui/material/styles";
import { Person } from "@mui/icons-material";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

export default function Info() {
  const { id, credit_id } = useParams();
  const [open, setOpen] = useState(false);
  const [movieId, setMovieId] = useState(null);

  const { isPending, data } = useQuery({
    queryKey: ["getInfo", id],
    enabled: !!id,
    queryFn: () =>
      fetch(`${baseUrl}/movie/${id}`, {
        headers: headers,
      }).then((res) => res.json()),
  });

  const { data: content } = useQuery({
    queryKey: ["getCastInfo", credit_id],
    enabled: !!id,
    queryFn: () =>
      fetch(`${baseUrl}/movie/${id}/credits`, {
        headers: headers,
      }).then((res) => res.json()),
  });
  const cast = content?.cast ?? [];
  const crew = content?.crew ?? [];

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
        <MoviesSwiper movies={[data]} openModal={openModal} />
      )}
      <Box sx={{ flexGrow: 1, marginTop: "50px" }}>
        <Grid container spacing={2}>
          <Grid size={6}>
            <Item>
              <Typography variant="h6">Budget:</Typography>
              <Typography variant="subtitle1">
                {data?.budget.toLocaleString()} $
              </Typography>
            </Item>
          </Grid>
          <Grid size={6}>
            <Item>
              <Typography variant="h6">Release date:</Typography>
              <Typography variant="subtitle1">{data?.release_date}</Typography>
            </Item>
          </Grid>
          <Grid size={6}>
            <Item>
              <Typography variant="h6">Genres:</Typography>
              <Typography variant="subtitle1">
                {data?.genres.map((el) => el.name).join(", ")}
              </Typography>
            </Item>
          </Grid>
          <Grid size={6}>
            <Item>
              <Typography variant="h6">Rating:</Typography>
              <Rating
                name="read-only"
                precision={0.5}
                max={10}
                value={Math.round(data?.vote_average * 100) / 100}
                readOnly
              />
            </Item>
          </Grid>
        </Grid>
      </Box>
      <Typography sx={{ marginTop: 10 }} variant="h6">
        Starring :
      </Typography>
      <Grid container spacing={4}>
        {cast.map((el) => (
          <Grid sx={{ height: 300 }} key={el.id} size={2}>
            <Item>
              {el.profile_path ? (
                <img
                  className="cast-img"
                  src={`${imageUrl}${el.profile_path}`}
                  alt=""
                />
              ) : (
                <Person
                  sx={{ width: "100%", height: "100%", marginBottom: "75px" }}
                />
              )}
              <Typography
                sx={{
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: "1",
                  overflow: "hidden",
                }}
                variant="subtitle2"
              >
                {el.name}
              </Typography>
              <Typography
                sx={{
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: "1",
                  overflow: "hidden",
                }}
                variant="body2"
              >
                {el.character}
              </Typography>
            </Item>
          </Grid>
        ))}
      </Grid>
      <Typography sx={{ marginTop: 10 }} variant="h6">
        Crew :
      </Typography>
      <Grid container spacing={4}>
        {crew.map((el) => (
          <Grid sx={{ height: 300 }} key={el.credit_id} size={2}>
            <Item>
              {el.profile_path ? (
                <img
                  className="cast-img"
                  src={`${imageUrl}${el.profile_path}`}
                  alt=""
                />
              ) : (
                <Person
                  sx={{ width: "100%", height: "100%", marginBottom: "75px" }}
                />
              )}
              <Typography
                sx={{
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: "1",
                  overflow: "hidden",
                }}
                variant="subtitle2"
              >
                {el.name}
              </Typography>
              <Typography
                sx={{
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: "1",
                  overflow: "hidden",
                }}
                variant="body2"
              >
                {el.job}
              </Typography>
            </Item>
          </Grid>
        ))}
      </Grid>

      <TrailerModal open={open} setOpen={setOpen} movieId={movieId} />
    </div>
  );
}
