import React from "react";
import { Box, Button, Grid, Typography, IconButton } from "@mui/material";

const EmptyMovieList = () => {
  return (
    <Box
      height={"100vh"}
      px={2}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
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
  );
};

export default EmptyMovieList;
