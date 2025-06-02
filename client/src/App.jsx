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
import Templates from "./components/resume/Templates";
import Dashboard from "./pages/Dashboard";
import { ToastContainer } from "react-toastify";
import { Analytics } from '@vercel/analytics/react';
import DeployPage from "./components/resume/Deploy";
import Preview from "./components/resume/Preview";
import RenderPortfolio from "./pages/RenderPortfolio";

function App() {
  const location = useLocation();
  const pageRoutes = ["/","/login","/signup","/dashboard"]
  const SidebarRoutes = ["/heading", "/templates", "/deploy","/education","/experience","/skills","/projects","/preview"];
  const showSidebar = SidebarRoutes.includes(location.pathname);
  const showNavbar = pageRoutes.includes(location.pathname);
  return (
    <>
      <div className="">
        {showNavbar && <Navbar />}
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
            <Route path="/templates" element={<Templates />} />
            <Route path="/deploy" element={<DeployPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/preview" element={<Preview />} />
            <Route path="/:hash" element={<RenderPortfolio />} />
          </Routes>
        </div>
        {showNavbar && <Footer />}
      </div>
      <ToastContainer position="top-right" autoClose={2000} />
      <Analytics/>
    </>
  );
}

export default App;
