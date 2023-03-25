import React from 'react';
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useState, createContext } from "react";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Book from "./components/Book/Book";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import NotFound from "./components/NotFound/NotFound";
import SnackBar from "./components/SnackBar/SnackBar";

export const LoggedUserContext = createContext();
const App = () => {
  const [loggedUser, setLoggedUser] = useState({});
  const [message, setMessage] = useState({});
return (
  <LoggedUserContext.Provider value={[loggedUser,setLoggedUser, message, setMessage]}>
  <SnackBar/>
   <Header/>  
    <Routes >
       <Route path="/" element={<Home/>}/>
       <Route path="/login" element={<Login/>}/>
       
       <Route element={<PrivateRoute isAllowed={!!loggedUser.username}/>}>
          <Route path="/book" element={<Book/>}/>
          <Route path="/book/:bedType" element={<Book/>}/>
       </Route>
       <Route path="*" element={<NotFound />}/>
       
    </Routes>
  </LoggedUserContext.Provider>
);
};

export default App;