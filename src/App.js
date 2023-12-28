import MovieListing from "./components/MovieListing";
import { Routes, Route, Navigate } from 'react-router-dom';
import SignUp from "./components/SignUp"; 
import CreateMovieList from "./components/CreateMovieList";
import EditMovie from "./components/EditMovie";

function PrivateRoute({ element: Element, ...rest }) {
  const token = localStorage.getItem('token');
  return token ? <Element {...rest} /> : <Navigate to="/" />;
}

function App() {
  return (
    <div className="App">
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
    </div>
  );
}

export default App;

