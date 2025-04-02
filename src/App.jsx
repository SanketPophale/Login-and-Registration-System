import React from "react";
import { BrowserRouter as Router, Route, Routes, } from "react-router-dom";
import Header from "./components/Header";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProtectedPage from "./pages/ProtectedPage";
import HomePage from "./pages/HomePage";


const App = () => {
 

  

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/protected" element={<ProtectedPage />} />
        
      </Routes>
    </Router>
  );
};

export default App;
