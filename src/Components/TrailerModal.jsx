import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import ReactPlayer from "react-player";
import { useQuery } from "@tanstack/react-query";
import { baseUrl, headers } from "../utils/constants";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 750,
  bgcolor: "background.paper",
  borderRadius: "20px",
  boxShadow: 24,
  p: 2,
};

export default function TrailerModal({ open, setOpen, movieId }) {
  const handleClose = () => setOpen(false);

  const { data } = useQuery({
    queryKey: ["getMovieVideo", movieId],
    enabled: !!movieId,
    queryFn: () =>
      fetch(`${baseUrl}/movie/${movieId}/videos`, {
        headers: headers,
      }).then((res) => res.json()),
  });

  const teaser = data?.results.filter((el) => el.type === "Teaser")[0];

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography align="center" variant="h6" component="h2">
          {teaser?.name}
        </Typography>
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${teaser?.key}`}
          playing={false}
          controls={true}
          // volume={null}
          // muted={false}
          width="100%"
          height="350px"
        />
      </Box>
    </Modal>
  );
}
