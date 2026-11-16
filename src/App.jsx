import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header/Header";
import Hero from "./components/sections/Hero/Hero";
import Marquee from "./components/common/Marquee/Marquee";
import Services from "./components/sections/Services/Services";
import Packages from "./components/sections/Packages/Packages";
import About from "./components/sections/About/About";
import Skills from "./components/sections/Skills/Skills";
import Portfolio from "./components/sections/Portfolio/Portfolio";
import AiPuzzle from "./components/sections/AiPuzzle/AiPuzzle";
import ProjectDetail from "./pages/ProjectDetail/ProjectDetail";
import Tools from "./components/sections/Tools/Tools";
import Contact from "./components/sections/Contact/Contact";
import Footer from "./components/layout/Footer/Footer";

function Home() {
  useEffect(() => {
    const cursor = document.getElementById("custom-cursor");
    if (!cursor) return;
    
    const moveCursor = (e) => {
      cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
    };
    
    const handleHover = () => cursor.classList.add("hover");
    const handleLeave = () => cursor.classList.remove("hover");
    
    window.addEventListener("mousemove", moveCursor);
    
    const interactives = document.querySelectorAll("a, button, input, textarea, h1, h2, h3, .name-highlight, .stat-item, .hero-photo, .logo");
    interactives.forEach(el => {
      el.addEventListener("mouseenter", handleHover);
      el.addEventListener("mouseleave", handleLeave);
    });
    
    return () => {
      window.removeEventListener("mousemove", moveCursor);
      interactives.forEach(el => {
        el.removeEventListener("mouseenter", handleHover);
        el.removeEventListener("mouseleave", handleLeave);
      });
    };
  }, []);

  return (
    <>
      <div id="custom-cursor" className="custom-cursor"></div>
      <Header/>
      <main>
        <Hero />
        <Marquee />
        <Services />
        <Packages />
        <Tools />
        <Portfolio />
        <About />
        <AiPuzzle />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/project/:slug" element={<ProjectDetail />} />
    </Routes>
  );
}
