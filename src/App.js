import AddMovie from "./components/AddMovie";
import MovieListing from "./components/MovieListing";
import { Routes, Route, Navigate } from 'react-router-dom';
import SignUp from "./components/SignUp"; 

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
          element={<PrivateRoute element={AddMovie} />}
        />
      </Routes>
    </div>
  );
}

export default App;

