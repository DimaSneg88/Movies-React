import { debounce, TextField, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { baseUrl, headers, imageUrl } from "../utils/constants";
import { Link } from "react-router-dom";

export default function Search() {
  const [value, setValue] = useState("");
  const [search, setSearch] = useState("");
  const memoSearch = useCallback(
    debounce((value) => setSearch(value), 1000),
    []
  ); //функция отложенного действия

  const { data } = useQuery({
    queryKey: ["getSearch", search],
    enabled: !!search,
    queryFn: () =>
      fetch(`${baseUrl}/search/movie?query=${search}`, {
        headers: headers,
      }).then((res) => res.json()),
  });

  return (
    <div className="search">
      <TextField
        value={value}
        onChange={(event) => {
          setValue(event.target.value);
          memoSearch(event.target.value);
        }}
        fullWidth
        sx={{
          backgroundColor: "white",
          borderRadius: "10px",
          overflow: "hidden",
        }}
        variant="filled"
        id="outlined-search"
        label="Search field"
        type="search"
      />
      {data?.results && (
        <div className="search-result">
          {data.results.map((elem) => (
            <Link key={elem.id} to={`/movies/${elem.id}`}>
              <div className="search-item">
                <img src={`${imageUrl}${elem.poster_path}`} alt="" />
                <Typography color="black" variant="body2">
                  {elem.title}
                </Typography>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
