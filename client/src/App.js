import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './components/layout/Home';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import './App.css';
import { Provider } from 'react-redux'
import store from "./store";

function App() {
    return (
        <Provider store={store}>
        <Router>
            <div className='App'>
                <Navbar />
                <Routes>
                    <Route exact path='/' element={<Home />} />
                    <section className='container'>
                    <Route exact path='/register' element={<Register />} />
                    <Route exact path='/login' element={<Login />} />
                    </section>
                </Routes>
            </div>
        </Router>
        </Provider>
    );
}

export default App;
