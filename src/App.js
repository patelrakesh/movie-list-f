import MovieListing from "./components/MovieListing";
import { Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./components/SignUp";
import CreateMovieList from "./components/CreateMovieList";
import EditMovie from "./components/EditMovie";
import { Box } from "@mui/material";

function PrivateRoute({ element: Element, ...rest }) {
  const token = localStorage.getItem("token");
  return token ? <Element {...rest} /> : <Navigate to="/" />;
}

function App() {
  return (
    <Box
      sx={{
        backgroundColor: "#093545",
        maxWidth: "100%",
        height: '100%',
        position: "relative",
        ".css-fbj545-MuiTypography-root,.css-z3mf8l-MuiTypography-root,.css-1sv4ooo-MuiTypography-root ,.css-lk5szp-MuiTypography-root,.css-1gol372-MuiTypography-root":
          {
            fontFamily: "Montserrat",
          },
        fontFamily: "Montserrat !important",
      }}
    >
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route
          path="/movies"
          element={<PrivateRoute element={MovieListing} />}
        />
        <Route
          path="/addmovie"
          element={<PrivateRoute element={CreateMovieList} />}
        />
        <Route
          path="/editmovie"
          element={<PrivateRoute element={EditMovie} />}
        />
      </Routes>
      <Box
        component={"img"}
        src="./pageVector.png"
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
  );
}

export default App;
