import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Movies from '../Movies/Movies';
import Profile from '../Profile/Profile';
import SavedMovies from '../SavedMovies/SavedMovies';
import PageNotFound from '../PageNotFound/PageNotFound';
import mainApi from '../../utils/MainApi';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Preloader from '../Preloader/Preloader';
import InfoTooltip from '../InfoTooltip/InfoTooptip';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedin, setLoggedin] = useState(false);
  const [savedMovies, setSavedMovies] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isPopupOpen, setPopupOpen] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedin) {
      mainApi.getSavedMovies()
        .then((apiSavedMovies) => {
          setSavedMovies(apiSavedMovies.data.filter((movie) => movie.owner === currentUser.data._id));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isLoggedin]);

  useEffect(() => {
    checkToken();
  }, []);

  function handleSignOut() {
    localStorage.clear();
    mainApi
      .signOut()
      .then(() => {
        setLoggedin(false);
      })
      .catch((error) => {
        console.log('Ошибка выхода из аккаунта:', error);
      });
  }

  const handleClosePopup = () => {
    setPopupOpen(false);
  }

  function checkToken() {
    mainApi
      .getUserInfo()
      .then((data) => {
        if (!data) {
          setLoggedin(false);
        } else {
          setLoggedin(true);
          setCurrentUser(data);
        }
      })
      .catch((error) => {
        console.log('Ошибка при проверке токена:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const handleRegister = (name, email, password) => {
    mainApi
      .register(name, email, password)
      .then(() => {
        navigate('/signin');
        setPopupOpen(true);
      })
      .catch((error) => {
        console.error('Ошибка регистрации:', error);
      });
  };

  const handleLogin = (email, password) => {
    mainApi
      .login(email, password)
      .then(() => {
        setLoggedin(true);
        navigate('/movies');
      })
      .catch((error) => {
        console.error('Ошибка логина:', error);
      });
  };

  return (
    <CurrentUserContext.Provider value={{ currentUser, savedMovies, setSavedMovies }}>
      <div className="app">
        {isLoading ? (
          <Preloader />
        ) : (
          <Routes>
            <Route path="/signup" element={<Register handleRegister={handleRegister} />} />
            <Route path="/signin" element={<Login handleLogin={handleLogin} />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute isLoggedin={isLoggedin}>
                  <Header isLoggedin={isLoggedin} />
                  <Profile onSignOut={handleSignOut} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/movies"
              element={
                <ProtectedRoute isLoggedin={isLoggedin}>
                  <Header isLoggedin={isLoggedin} />
                  <Movies />
                  <Footer />
                </ProtectedRoute>
              }
            />
            <Route
              exact
              path="/saved-movies"
              element={
                <ProtectedRoute isLoggedin={isLoggedin}>
                  <Header isLoggedin={isLoggedin} />
                  <SavedMovies />
                  <Footer />
                </ProtectedRoute>
              }
            />
            <Route
              exact
              path="/"
              element={
                <>
                  <Header isLoggedin={isLoggedin} />
                  <Main />
                  <Footer />
                </>
              }
            />
            <Route
              exact
              path="*"
              element={
                <>
                  <PageNotFound />
                </>
              }
            />
          </Routes>
        )}
        <InfoTooltip
          isOpen={isPopupOpen}
          onClose={handleClosePopup}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
