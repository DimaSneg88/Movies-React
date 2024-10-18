import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper/modules";
import { Button, Typography } from "@mui/material";
import { imageUrl } from "../utils/constants";

export default function MoviesSwiper({ movies, openModal }) {
  const topMovies = movies.slice(0, 5);

  return (
    <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
      {topMovies.map((elem) => (
        <SwiperSlide key={elem.id}>
          <img src={`${imageUrl}${elem.backdrop_path}`} alt="" />
          <div className="slide-info">
            <div>
              <Typography mb={"20px"} color="white" variant="h4">
                {elem.title}
              </Typography>
              <Typography color="white" variant="subtitle1">
                {elem.overview}
              </Typography>
            </div>

            <Button variant="contained" onClick={() => openModal(elem.id)}>
              Watch
            </Button>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
