import React, { useEffect, useState } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import axios from "axios";
import Pagination from "@mui/material/Pagination";
import { useNavigate } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import PaginationItem from '@mui/material/PaginationItem';
// import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
// import NavigateNextIcon from '@mui/icons-material/NavigateNext';
const MovieListing = () => {
  const navigate = useNavigate();
  const [moviesList, setMoviesList] = useState([]);
  const [page, setPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);

  const getMovieList = async (newPage) => {
    try {
      const response = await axios.get(
        `https://movie-list-b.vercel.app/api/movie?page=${newPage}&limit=${8}`
      );
      console.log("console_movieData", response.data);
      setMoviesList(response.data.data.data);
      setTotalPages(response.data?.data?.pagination?.totalPages);
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };

  useEffect(() => {
    getMovieList(page);
  }, []);

  const handleRoute = () => {
    navigate("/addmovie");
  };

  const handleChange = (event, value) => {
    setPage(value);
    getMovieList(value);
  };

  const handlePrevClick = () => {
    handleChange(page - 1);
  };

  const handleNextClick = () => {
    handleChange(page + 1);
  };

  return (
    <>
      <Box
        sx={{
          backgroundColor: "#093545",
          maxWidth: "100%",
          position: "relative",
        }}
      >
        <Box
          component={"img"}
          src="./pagevector.png"
          position={"absolute"}
          bottom={0}
          width={"100%"}
        ></Box>
        <Box
          component={"img"}
          src="./pageVector2.png"
          position={"absolute"}
          bottom={0}
          width={"100%"}
        ></Box>
        {moviesList && moviesList.length > 0 ? (
          <>
            <Box
              sx={{
                maxWidth: "1440px",
                margin: "auto",
                padding: { xs: 4, md: 9 },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  px: { xs: 0, sm: 6, md: 3 },
                  pb: 5,
                }}
              >
                <Typography
                  sx={{
                    color: "#FFF",
                    fontSize: { xs: "14px", sm: "16px" },
                    fontWeight: 600,
                  }}
                >
                  My movies{" "}
                  <Box
                    component={"span"}
                    onClick={handleRoute}
                    sx={{
                      verticalAlign: "middle",
                      svg: {
                        height: { xs: "18px", md: "32px" },
                        width: { xs: "18px", md: "32px" },
                      },
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 32 32"
                      fill="none"
                    >
                      <g clip-path="url(#clip0_3_196)">
                        <path
                          d="M17.3334 9.33332H14.6667V14.6667H9.33342V17.3333H14.6667V22.6667H17.3334V17.3333H22.6667V14.6667H17.3334V9.33332ZM16.0001 2.66666C8.64008 2.66666 2.66675 8.63999 2.66675 16C2.66675 23.36 8.64008 29.3333 16.0001 29.3333C23.3601 29.3333 29.3334 23.36 29.3334 16C29.3334 8.63999 23.3601 2.66666 16.0001 2.66666ZM16.0001 26.6667C10.1201 26.6667 5.33341 21.88 5.33341 16C5.33341 10.12 10.1201 5.33332 16.0001 5.33332C21.8801 5.33332 26.6667 10.12 26.6667 16C26.6667 21.88 21.8801 26.6667 16.0001 26.6667Z"
                          fill="white"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_3_196">
                          <rect width="32" height="32" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </Box>
                </Typography>
                <Typography
                  sx={{
                    color: "#FFF",
                    fontSize: { xs: "14px", sm: "16px" },
                    fontWeight: 700,
                  }}
                >
                  Logout
                  <Box
                    component={"span"}
                    ml={{ xs: 1, md: 2 }}
                    sx={{
                      verticalAlign: "middle",
                      svg: {
                        height: { xs: "18px", md: "32px" },
                        width: { xs: "18px", md: "32px" },
                      },
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 32 32"
                      fill="none"
                    >
                      <g clip-path="url(#clip0_7_232)">
                        <path
                          d="M22.6667 10.6667L20.7867 12.5467L22.8933 14.6667H12V17.3333H22.8933L20.7867 19.44L22.6667 21.3333L28 16L22.6667 10.6667ZM6.66667 6.66667H16V4H6.66667C5.2 4 4 5.2 4 6.66667V25.3333C4 26.8 5.2 28 6.66667 28H16V25.3333H6.66667V6.66667Z"
                          fill="white"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_7_232">
                          <rect width="32" height="32" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </Box>
                </Typography>
              </Box>

              <Grid
                container
                spacing={{ xs: 2, md: 6 }}
                justifyContent={"center"}
                sx={{
                  ".css-exfl4s-MuiGrid-root": {
                    width: "100%",
                  },
                }}
              >
                {moviesList.map((movie, index) => (
                  <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                    <Box
                      sx={{
                        maxWidth: "280px",
                        borderRadius: "12px",
                        backgroundColor: "#092C39",
                        my: 2,
                        mx: 2,
                        justifyContent: "center",
                        textAlign: "center",
                        margin: "auto",
                      }}
                    >
                      <Box px={1}>
                        <Box
                          component="img"
                          src={movie.poster || "./movie1.png"}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "./movie1.png";
                          }}
                          py={1}
                          width={"100%"}
                        />
                      </Box>
                      <Typography
                        sx={{
                          color: "#FFF",
                          fontSize: "20px",
                          fontWeight: 500,
                          textAlign: "left",
                          pl: 2,
                        }}
                      >
                        {movie.title}
                      </Typography>
                      <Typography
                        sx={{
                          color: "#FFF",
                          fontSize: "14px",
                          textAlign: "left",
                          fontWeight: 400,
                          pl: 2,
                          pt: 1,
                          pb: 2,
                        }}
                      >
                        {movie.publishYear}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
              <Box my={15}>
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={handleChange}
                  variant="outlined"
                  shape="rounded"
                  color="primary"
                  renderItem={(item) => {
                    if (item.type === "previous") {
                      return (
                        <IconButton
                          onClick={handlePrevClick}
                          disabled={page === 1}
                          sx={{
                            color: '#fff !important',
                            background: "transparent !important",
                            fontSize: "16px",
                            fontWeight: 700,
                            '&.Mui-disabled': {
                              opacity: .7
                            }
                          }}
                        >
                          Prev
                        </IconButton>
                      );
                    }
                    if (item.type === "next") {
                      return (
                        <IconButton
                          onClick={handleNextClick}
                          disabled={page === totalPages}
                          sx={{
                            color: '#fff !important',
                            background: "transparent !important",
                            fontSize: "16px",
                            fontWeight: 700,
                            '&.Mui-disabled': {
                              opacity: .7
                            }
                          }}
                        >
                          Next
                        </IconButton>
                      );
                    }
                    return <PaginationItem {...item} />;
                  }}
                  sx={{
                    ".MuiButtonBase-root": {
                      color: "#FFF",
                      border: "none",
                      background: "#092C39",
                      "&.Mui-selected": {
                        background: " #2BD17E",
                        border: "none",
                        color: "#fff",
                      },
                    },
                    ".MuiPagination-ul": {
                      justifyContent: "center",
                    },
                  }}
                />
              </Box>
            </Box>
          </>
        ) : (
          <>
            <Box height={"100vh"} margin={"auto"} position={"relative"}>
              <Box
                position={"absolute"}
                sx={{
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  textAlign: "center",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "48px",
                    fontWeight: 600,
                    color: "#FFF",
                  }}
                >
                  Your movie list is empty
                </Typography>
                <Button
                  sx={{
                    borderRadius: "10px",
                    background: " var(--primary, #2BD17E)",
                    padding: "16px 28px",
                    color: "#FFF",
                    fontSize: "16px",
                    fontWeight: 700,
                    mt: 3,
                    "&:hover": {
                      border: "1px solid #2BD17E",
                    },
                  }}
                >
                  Add a new movie
                </Button>
              </Box>
            </Box>
          </>
        )}
      </Box>
    </>
  );
};

export default MovieListing;
