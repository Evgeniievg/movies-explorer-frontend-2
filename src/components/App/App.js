import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer'
import Register from '../Register/Register';
import Login from '../Login/Login';
import Movies from '../Movies/Movies';
import Profile from '../Profile/Profile';
import SavedMovies from '../SavedMovies/SavedMovies';
import PageNotFound from '../PageNotFound/PageNotFound';

function App() {
  const [isLoggedin, setLoggedin] = useState(false);
  return (
    <div className="app">
      <Routes>
        <Route path='/signup' element={<Register />} />
        <Route path='/signin' element={<Login />} />
        <Route path='/profile' element={
          <>
            <Header isLoggedin={isLoggedin} />
            <Profile />
            </>
          }
        />
        <Route
            exact path='/movies'
            element={
              <>
                <Header isLoggedin={isLoggedin} />
                <Movies />
                <Footer />
              </>
            }
          />
          <Route
            exact path='/saved-movies'
            element={
              <>
                <Header isLoggedin={isLoggedin} />
                <SavedMovies />
                <Footer />
              </>
            }
          />
        <Route
            exact path='/'
            element={
              <>
                <Header isLoggedin={isLoggedin} />
                <Main />
                <Footer />
              </>
            }
          />
          <Route
            exact path='*'
            element={
              <>
                <PageNotFound />
              </>
            }
          />
      </Routes>

    </div>
  );
}

export default App;
