import React, { useEffect, useState } from "react";
import { Box, Button, Grid, Typography, IconButton } from "@mui/material";
import axios from "axios";
import { BrowserRouter as Router, useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import AddIcon from "../icons/AddIcon";
import LogoutIcon from "../icons/LogoutIcon";
import ListingSkeleton from "./ListingSkeleton";
import EmptyMovieList from "./EmptyMovieList";

const MovieListing = () => {
  const navigate = useNavigate();
  const [moviesList, setMoviesList] = useState([]);
  const [totalPages, setTotalPages] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const [page, setPage] = React.useState(1);

  const getMovieList = async (newPage) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/movie?page=${newPage}&limit=${8}`
      );
      setMoviesList(response.data.data.data);
      setTotalPages(response.data?.data?.pagination?.totalPages);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
      setLoading(false);
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

  const handleEdit = (movieData) => {
    navigate("/editmovie", { state: { movieData } });
  };

  const handlePrevClick = () => {
    handleChange("", page - 1);
  };

  const handleNextClick = () => {
    handleChange("", page + 1);
  };

  const logout = () => {
    navigate("/");
    localStorage.setItem("token", "");
  };
  return (
    <>
      <Box height={"100%"}>
        {loading ? (
          <Box height={{ xs: "100%", md: "100vh" }}>
            <Grid
              container
              spacing={{ xs: 2, md: 6 }}
              justifyContent={"center"}
              sx={{
                marginTop: "0 !important",
                ".css-exfl4s-MuiGrid-root": {
                  width: "100%",
                },
              }}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <Grid key={i} item xs={12} sm={6} md={4} lg={3}>
                  <ListingSkeleton />
                </Grid>
              ))}
            </Grid>
          </Box>
        ) : moviesList && moviesList.length > 0 ? (
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
                <Box
                  sx={{
                    color: "#FFF",
                    fontSize: { xs: "14px", sm: "16px" },
                    fontWeight: 600,
                    display: "flex",
                    gap: "5px",
                    alignItems: "center",
                    svg: {
                      height: { xs: "18px", md: "22px" },
                      width: { xs: "18px", md: "22px" },
                    },
                    cursor: 'pointer'
                  }}
                  onClick={handleRoute}
                >
                  <Typography>My movies </Typography>
                  <AddIcon />
                </Box>
                <Box
                  sx={{
                    color: "#FFF",
                    fontSize: { xs: "14px", sm: "16px" },
                    fontWeight: 600,
                    display: "flex",
                    gap: "5px",
                    alignItems: "center",
                    svg: {
                      height: { xs: "18px", md: "22px" },
                      width: { xs: "18px", md: "22px" },
                    },
                    cursor: 'pointer'
                  }}
                  onClick={logout}
                >
                  <Typography>Logout </Typography>
                  <LogoutIcon />
                </Box>
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
                        position: "relative",
                        maxWidth: "280px",
                        borderRadius: "12px",
                        backgroundColor: "#092C39",
                        my: 2,
                        mx: 2,
                        justifyContent: "center",
                        textAlign: "center",
                        margin: "auto",
                        "&:hover img": {
                          opacity: 0.8,
                        },
                        "&:hover .editButton": {
                          display: "block",
                        },
                      }}
                    >
                      <Box px={1} position="relative">
                        <Box
                          component="img"
                          src={movie.poster || "./movie1.png"}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "./movie1.png";
                          }}
                          py={1}
                          width={"100%"}
                          height={"400px"}
                          borderRadius="12px"
                          transition="opacity 0.3s ease-in-out"
                        />
                        <IconButton
                          aria-label="edit"
                          className="editButton"
                          sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            display: "none",
                            color: "#fff",
                            "&:hover": {
                              backgroundColor: "rgba(0, 0, 0, 0.6)",
                            },
                          }}
                          onClick={() => handleEdit(movie)}
                        >
                          <EditIcon />
                        </IconButton>
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
                            color: "#fff !important",
                            background: "transparent !important",
                            fontSize: "16px",
                            fontWeight: 700,
                            "&.Mui-disabled": {
                              opacity: 0.7,
                            },
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
                            color: "#fff !important",
                            background: "transparent !important",
                            fontSize: "16px",
                            fontWeight: 700,
                            "&.Mui-disabled": {
                              opacity: 0.7,
                            },
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
          <EmptyMovieList />
        )}
      </Box>
    </>
  );
};

export default MovieListing;
