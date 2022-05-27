import React, { createContext } from "react";
import { useReducer } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Signup from "./components/Signup";
import Login from "./components/Login";
import Logout from './components/Logout';
import Errorpage from './components/Errorpage';

import { initialState, reducer } from "./reducer/useReducer";

// ContextAPI
export const UserContext = createContext();

const App = () => {

  const [state, dispatch] = useReducer(reducer, initialState)

  return (

    <>
      <UserContext.Provider value={{state, dispatch}}>
      <Navbar />
      <Routes>
            <Route path='/' element={<Home />} />
            {/* <Route path='/home' element={<Home />} /> */}
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<Login />} />
            <Route path='/logout' element={<Logout/>} />
            <Route path='*' element={<Errorpage/>} />
            {/* <Route path="*" element={<Home />} /> */}
        </Routes>
      </UserContext.Provider>
    </>

  );
}

export default App