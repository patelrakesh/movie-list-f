import React, { useState } from "react";
import {
  Box,
  FormControl,
  Grid,
  Typography,
  OutlinedInput,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
  FormHelperText,
} from "@mui/material";
import { BrowserRouter as Router, useNavigate } from "react-router-dom";
import axios from "axios";
const SignUp = () => {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({
    email: false,
    password: false,
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    const errors = {};

    if (formData.email === "") {
      errors.email = true;
    }
    if (formData.password === "") {
      errors.password = true;
    } else if (
      !formData.email.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)
    ) {
      errors.email = true;
    }
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/auth/login`,
          {
            email: formData.email,
            password: formData.password,
          }
        );
        if (response.data.status === "Success") {
          localStorage.setItem("token", response.data.token);
          navigate("/movies");
        } else {
          setLoginError(response.data.message);
        }
      } catch (error) {
        console.error("Error fetching data:", error.response.data.error);
        setLoginError(error.response.data.error);
      }
    }
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
          ".css-fbj545-MuiTypography-root":{
            fontFamily: "Montserrat",
          },
          fontFamily: "Montserrat"
        }}
      >
        <Box
          sx={{
            maxWidth: { xs: "375px", sm: "375px", md: "690px" },
            minHeight: "100vh",
            margin: "auto",
            top: "135px",
            borderRadius: "5px",
            background: "#093545",
            display: "flex",
            alignItems: "center",
            pb: 5,
          }}
        >
          <Box p={3}>
            <Typography
              sx={{
                color: "#FFFFFF",
                fontSize: { md: "64px", lg: "64px", xs: "28px", sm: "28px" },
                fontWeight: { md: 600, lg: 600, xs: 400, sm: 400 },
                marginBottom: "40px",
                lineHeight: { md: "80px", xs: "25px", sm: "25px" },
                textAlign: "center",
              }}
            >
              Sign in
            </Typography>
            <Grid
              container
              paddingY={{ xs: 0, sm: 0, md: 2, lg: 1 }}
              spacing={{ xs: 1, sm: 1, md: 1, lg: 2 }}
            >
              <Grid
                item
                xs={12}
                sm={6}
                md={12}
                lg={12}
                mb={{ xs: 1, sm: 1, md: 3 }}
              >
                <FormControl
                  sx={{
                    m: { xs: 0, sm: 0, md: 1, lg: 0 },
                    mt: { xs: 1, sm: 0, md: 1, lg: 0 },
                    width: "100%",
                    height: { xs: "42px", sm: "42px", md: "54px" },
                    fontSize: { xs: "10px", sm: "10px", md: "14px" },
                    fontWeight: 400,
                    backgroundColor: "var(--input-color, #224957)",
                    borderRadius: "8px",
                  }}
                  variant="outlined"
                >
                  <OutlinedInput
                    id="outlined-adornment-password"
                    placeholder="Email"
                    name="email"
                    fullWidth
                    value={formData.email}
                    onChange={handleInputChange}
                    error={formErrors.email}
                    sx={{
                      color: "#FFFFFF",
                      fontFamily: "Montserrat",
                      fontSize: { xs: "10px", sm: "10px", md: "14px" },
                    }}
                    required
                  />
                </FormControl>
                {formErrors.email && (
                  <FormHelperText sx={{ color: "#d32f2f" }}>
                    {formData.email
                      ? "Please enter a valid Email address*"
                      : "Email is required*"}
                  </FormHelperText>
                )}
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                md={12}
                lg={12}
                mb={{ xs: 1, sm: 1, md: 3 }}
              >
                <FormControl
                  sx={{
                    m: { xs: 0, sm: 0, md: 1, lg: 0 },
                    mt: { xs: 1, sm: 0, md: 1, lg: 0 },
                    width: "100%",
                    height: { xs: "42px", sm: "42px", md: "54px" },
                    fontSize: { xs: "10px", sm: "10px", md: "14px" },
                    fontWeight: 400,
                    backgroundColor: "var(--input-color, #224957)",
                    borderRadius: "8px",
                  }}
                  variant="outlined"
                >
                  <OutlinedInput
                    id="outlined-adornment-password"
                    placeholder="Password"
                    name="password"
                    fullWidth
                    value={formData.password}
                    onChange={handleInputChange}
                    error={formErrors.password}
                    sx={{
                      color: "#FFFFFF",
                      fontFamily: "Montserrat",
                      fontSize: { xs: "10px", sm: "10px", md: "14px" },
                    }}
                    required
                  />
                </FormControl>
                {formErrors.password ? (
                  <FormHelperText sx={{ color: "#d32f2f" }}>
                    Password is required*
                  </FormHelperText>
                ) : (
                  ""
                )}
              </Grid>

              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={12}
                sx={{
                  paddingTop: "0 !important",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Box pt={2}>
                  <FormControl>
                    <FormGroup
                      sx={{
                        marginBottom: { xs: "10px", sm: "10px", md: "20px" },
                      }}
                    >
                      <FormControlLabel
                        control={
                          <Checkbox
                            sx={{
                              "& .MuiSvgIcon-root": {
                                borderRadius: "0",
                                border: "none",
                                color: "#FFFFFF",
                              },
                              svg: {
                                border: "none",
                              },
                            }}
                          />
                        }
                        label={
                          <Box>
                            <Typography
                              sx={{
                                fontSize: "14px !important",
                                color: "#FFFFFF",
                                fontWeight: 400,
                                textAlign: "center",
                                fontFamily: "Montserrat",
                              }}
                            >
                              Remember me
                            </Typography>
                          </Box>
                        }
                      />
                    </FormGroup>
                  </FormControl>
                </Box>
              </Grid>
              {loginError ? (
                <Typography color={"red"}>{loginError}</Typography>
              ) : (
                ""
              )}
              <Grid item xs={12}>
                <Button
                  sx={{
                    borderRadius: "10px",
                    mb: 3,
                    color: "#FFF",
                    background: "var(--primary, #2BD17E)",
                    fontSize: { xs: "14px", sm: "14px", md: "16px" },
                    fontWeight: { xs: 400, sm: 400, md: 700 },
                    padding: {
                      xs: "8px 12px",
                      sm: "8px 12px",
                      md: "16px 12px",
                    },
                    width: "100%",
                    height: { xs: "36px", sm: "36px", md: "50px !important" },
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
                  Login
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
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
      </Box>
    </>
  );
};

export default SignUp;
