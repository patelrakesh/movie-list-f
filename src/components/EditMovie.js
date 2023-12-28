import React, { useState } from "react";
import {
  Box,
  FormControl,
  Grid,
  Card,
  CardMedia,
  Typography,
  OutlinedInput,
  Button,
  FormHelperText,
} from "@mui/material";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const EditMovie = () => {
  const location = useLocation();
  const { movieData } = location?.state;
  const navigate = useNavigate();

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFormData({ ...formData, poster: file });
      setFormErrors({ ...formErrors, poster: false });
    }
  };

  const [formData, setFormData] = useState({
    title: movieData ? movieData.title : "",
    publishYear: movieData ? movieData.publishYear : "",
    poster: movieData ? movieData.poster : "",
  });

  const [formErrors, setFormErrors] = useState({
    title: false,
    publishYear: false,
    poster: false,
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setFormErrors({
      ...formErrors,
      [e.target.name]: false,
    });
  };
  const handleCancel = (e) => {
    navigate("/movies");
  };

  const handleSubmit = () => {
    const errors = {};

    if (formData.title === "") {
      errors.title = true;
    }
    if (formData.publishYear === "") {
      errors.publishYear = true;
    }
    if (formData.poster === "") {
      errors.poster = true;
    }
    setFormErrors(errors);
    postMovieList();
  };

  const postMovieList = () => {
    const addMovieData = new FormData();
    addMovieData.append("title", formData.title);
    addMovieData.append("publishYear", formData.publishYear);
    addMovieData.append("poster", formData.poster);
    axios
      .put(
        `${process.env.REACT_APP_API_URL}/api/movie/${movieData._id}`,
        addMovieData
      )
      .then((response) => {
        navigate("/movies");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <Box
        position={"relative"}
        backgroundColor="#093545"
        sx={{
          ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
          pb: 15,
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
        <Box paddingLeft={{ xs: 0, sm: 0, md: 10 }}>
          <Box py={10}>
            <Typography
              sx={{
                color: "#FFFFFF",
                fontSize: { md: "48px", lg: "48px", xs: "28px", sm: "28px" },
                fontWeight: { md: 600, lg: 600, xs: 400, sm: 400 },
                fontFamily: "Montserrat",
                lineHeight: { md: "80px", xs: "25px", sm: "25px" },
                textAlign: { xs: "center", sm: "center", md: "left" },
              }}
            >
              Edit
            </Typography>
          </Box>
          <Box margin={{ xs: "0 30px", sm: "0 30px", md: "0" }}>
            <Grid container spacing={1}>
              <Grid
                item
                xs={12}
                md={6}
                sm={12}
                mb={{ xs: "40px", sm: "40px", md: "50px" }}
              >
                <Box
                  sx={{
                    flexGrow: 1,
                    height: { xs: "340px", sm: "340px", md: "504px" },
                    width: { xs: "100%", sm: "100%", md: "473px" },
                    borderRadius: "10px",
                    border: "2px dashed #FFF",
                    background: "var(--input-color, #224957)",
                  }}
                >
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="100%"
                    position="relative"
                  >
                    <Grid
                      container
                      direction="column"
                      alignItems="center"
                      spacing={2}
                    >
                      <Grid item>
                        {formData.poster ? (
                          <>
                            <Card style={{ maxWidth: "300px" }}>
                              <CardMedia
                                component="img"
                                alt="Uploaded Image"
                                height="auto"
                                image={
                                  formData.poster instanceof File
                                    ? URL.createObjectURL(formData.poster)
                                    : formData.poster
                                }
                              />
                            </Card>
                            <Box
                              textAlign="center"
                              onClick={() =>
                                setFormData({ ...formData, poster: "" })
                              }
                            >
                              <Typography
                                variant="contained"
                                component="span"
                                sx={{
                                  fontFamily: "Montserrat",
                                  fontSize: "14px",
                                  fontWeight: 400,
                                  lineHeight: "24px",
                                  color: "#FFF",
                                  cursor: "pointer",
                                }}
                              >
                                Click to select another image
                              </Typography>
                            </Box>
                          </>
                        ) : (
                          <Box textAlign="center" onChange={handleImageUpload}>
                            <input
                              type="file"
                              accept="image/*"
                              style={{ display: "none" }}
                              id="image-upload-input"
                              name="poster"
                            />
                            <Box pb={5}>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                              >
                                <g clip-path="url(#clip0_3_346)">
                                  <path
                                    d="M18 15V18H6V15H4V18C4 19.1 4.9 20 6 20H18C19.1 20 20 19.1 20 18V15H18ZM17 11L15.59 9.59L13 12.17V4H11V12.17L8.41 9.59L7 11L12 16L17 11Z"
                                    fill="white"
                                  />
                                </g>
                                <defs>
                                  <clipPath id="clip0_3_346">
                                    <rect width="24" height="24" fill="white" />
                                  </clipPath>
                                </defs>
                              </svg>
                            </Box>
                            <label htmlFor="image-upload-input">
                              <Typography
                                variant="contained"
                                component="span"
                                sx={{
                                  fontFamily: "Montserrat",
                                  fontSize: "14px",
                                  fontWeight: 400,
                                  lineHeight: "24px",
                                  color: "#FFF",
                                  cursor: "pointer",
                                  position: "absolute",
                                  height: "100%",
                                  width: "100%",
                                  top: 0,
                                  right: 0,
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  pt: 2,
                                }}
                              >
                                Drop an image here
                              </Typography>
                            </label>
                          </Box>
                        )}
                        {formErrors.poster ? (
                          <FormHelperText sx={{ color: "#d32f2f" }}>
                            Please upload the image*
                          </FormHelperText>
                        ) : (
                          ""
                        )}
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <Box>
                  <FormControl
                    sx={{
                      m: { xs: 0, sm: 0, md: 1, lg: 0 },
                      mt: { xs: 1, sm: 1, md: 1, lg: 0 },
                      mb: { xs: 2, sm: 2, md: 3, lg: 3 },
                      width: { xs: "100%", sm: "100%", md: "365px" },
                      height: { xs: "42px", sm: "42px", md: "54px" },
                      fontSize: { xs: "12px", sm: "12px", md: "16px" },
                      fontWeight: 400,
                      color: "#FFFFFF",
                      background: "#224957",
                      borderRadius: "8px",
                    }}
                    variant="outlined"
                  >
                    <OutlinedInput
                      id="outlined-adornment-password"
                      placeholder="Title"
                      name="title"
                      fullWidth
                      value={formData.title}
                      onChange={handleInputChange}
                      error={formErrors.title}
                      sx={{
                        color: "#FFFFFF",
                        fontFamily: "Montserrat",
                        fontSize: { xs: "10px", sm: "10px", md: "14px" },
                      }}
                      required
                    />
                    {formErrors.title ? (
                      <FormHelperText sx={{ color: "#d32f2f" }}>
                        Title is required*
                      </FormHelperText>
                    ) : (
                      ""
                    )}
                  </FormControl>
                </Box>
                <Box>
                  <FormControl
                    sx={{
                      m: { xs: 0, sm: 0, md: 1, lg: 0 },
                      mt: { xs: 1, sm: 0, md: 1, lg: 0 },
                      mb: { xs: 5, sm: 5, md: 9, lg: 9 },
                      width: { xs: "100%", sm: "100%", md: "216px" },
                      height: { xs: "42px", sm: "42px", md: "54px" },
                      fontSize: { xs: "12px", sm: "12px", md: "14px" },
                      fontWeight: 400,
                      color: "#FFFFFF",
                      background: "#224957",
                      borderRadius: "8px",
                    }}
                    variant="outlined"
                  >
                    <OutlinedInput
                      id="outlined-adornment-password"
                      placeholder="Publishing year"
                      name="publishYear"
                      fullWidth
                      value={formData.publishYear}
                      onChange={handleInputChange}
                      error={formErrors.publishYear}
                      sx={{
                        color: "#FFFFFF",
                        fontFamily: "Montserrat",
                        fontSize: { xs: "10px", sm: "10px", md: "14px" },
                      }}
                      required
                    />
                    {formErrors.publishYear ? (
                      <FormHelperText sx={{ color: "#d32f2f" }}>
                        Publishing year is required*
                      </FormHelperText>
                    ) : (
                      ""
                    )}
                  </FormControl>
                </Box>
                <Box>
                  <Button
                    sx={{
                      borderRadius: "10px",
                      color: "#FFF",
                      width: { xs: "75px", sm: "75px", md: "167px" },
                      fontSize: { xs: "13px", sm: "13px", md: "16px" },
                      fontWeight: { xs: 400, sm: 400, md: 700 },
                      marginRight: "20px",
                      padding: {
                        xs: "8px 12px",
                        sm: "8px 12px",
                        md: "16px 12px",
                        border: "1px solid #FFF",
                      },
                      height: { xs: "36px", sm: "36px", md: "56px !important" },
                      textTransform: "math-auto",
                      fontFamily: "Montserrat",
                      "&:hover": {
                        border: "1px solid #FFF",
                        color: "#FFF",
                      },
                      ".css-i4bv87-MuiSvgIcon-root": {
                        height: "18px",
                        width: "18px",
                        ml: 0.5,
                      },
                    }}
                    onClick={handleCancel}
                  >
                    <Box component={"span"}>Cancel</Box>
                  </Button>
                  <Button
                    sx={{
                      borderRadius: "10px",
                      color: "#FFF",
                      width: { xs: "75px", sm: "75px", md: "167px" },
                      background: "var(--primary, #2BD17E)",
                      fontSize: { xs: "13px", sm: "13px", md: "16px" },
                      fontWeight: { xs: 400, sm: 400, md: 700 },
                      padding: {
                        xs: "8px 12px",
                        sm: "8px 12px",
                        md: "16px 12px",
                      },
                      height: { xs: "36px", sm: "36px", md: "56px !important" },
                      textTransform: "math-auto",
                      fontFamily: "Montserrat",
                      "&:hover": {
                        border: "1px solid #FFF",
                        color: "#FFF",
                      },
                      ".css-i4bv87-MuiSvgIcon-root": {
                        height: "18px",
                        width: "18px",
                        ml: 0.5,
                      },
                    }}
                    onClick={handleSubmit}
                  >
                    <Box component={"span"}>Update</Box>
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default EditMovie;