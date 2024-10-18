import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { imageUrl } from "../utils/constants";

export default function MovieCard({ el }) {
  return (
    <Card sx={{ width: "100%", height: 600 }}>
      <CardMedia
        component={"img"}
        sx={{ height: 350, objectFit: "contain", marginTop: 5 }}
        image={`${imageUrl}${el.poster_path}`}
        title={el.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {el.title}
        </Typography>
        <Typography
          className="typography"
          variant="body2"
          sx={{ color: "text.secondary" }}
        >
          {el.overview}
        </Typography>
      </CardContent>
      <CardActions>
        <Link to={`/movies/${el.id}`}>
          <Button size="small">Watch</Button>
        </Link>
      </CardActions>
    </Card>
  );
}
