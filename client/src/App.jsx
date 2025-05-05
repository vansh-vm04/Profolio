import React from "react";
import "./styles/App.css";
import { useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Navbar from "./components/layout/Navbar";
import Signup from "./pages/Signup";
import Footer from "./components/layout/Footer";
import Sidebar from "./components/layout/Sidebar";
import Heading from "./components/resume/Heading";
import { Routes, Route } from "react-router-dom";
import Education from "./components/resume/Education";
import Experience from "./components/resume/Experience";
import Projects from "./components/resume/Projects";
import Skills from "./components/resume/Skills";
import Finalise from "./components/resume/Finalise";
import Templates from "./components/resume/Templates";
import Dashboard from "./pages/Dashboard";
import { ToastContainer } from "react-toastify";

function App() {
  const location = useLocation();
  const noSidebarRoutes = ["/", "/login", "/signup","/dashboard"];
  const showSidebar = !noSidebarRoutes.includes(location.pathname);
  return (
    <>
      <div className="">
        {!showSidebar && <Navbar />}
        <div className="flex">
          {showSidebar && <Sidebar />}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/heading" element={<Heading />} />
            <Route path="/education" element={<Education />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/finalise" element={<Finalise />} />
            <Route path="/templates" element={<Templates />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
        {!showSidebar && <Footer />}
      </div>
      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
}

export default App;
