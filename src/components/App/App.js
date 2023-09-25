import React, { useState, useEffect } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
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

  useEffect(() => {
    if (isLoggedin) {
      mainApi.getSavedMovies()
        .then((apiSavedMovies) => {
          setSavedMovies(apiSavedMovies.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isLoggedin]);

  const handleRegister = (name, email, password) => {
    mainApi
      .register(name, email, password)
      .then(() => {
        handleLogin(email, password)
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
        checkToken();
      })
      .catch((error) => {
        console.error('Ошибка логина:', error);
      });
  };

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser, savedMovies, setSavedMovies }}>
      <div className="app">
        {isLoading ? (
          <Preloader />
        ) : (
          <Routes>
            <Route path="/signup" element={isLoggedin ? <Navigate to ='/movies'/> : <Register handleRegister={handleRegister} />} />
            <Route path="/signin" element={isLoggedin ? <Navigate to='/movies'/> : <Login handleLogin={handleLogin} />} />
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
