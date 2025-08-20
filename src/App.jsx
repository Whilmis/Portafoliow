import { Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header/Header";
import Hero from "./components/sections/Hero/Hero";
import Services from "./components/sections/Services/Services";
import About from "./components/sections/About/About";
import Skills from "./components/sections/Skills/Skills";
import Portfolio from "./components/sections/Portfolio/Portfolio";
import ProjectDetail from "./pages/ProjectDetail/ProjectDetail";
import Tools from "./components/sections/Tools/Tools";
import Contact from "./components/sections/Contact/Contact";
import Footer from "./components/layout/Footer/Footer";
import Nav from "./components/layout/Header/Nav";

function Home() {
  return (
    <>
    
      <Nav/>
      <main>
        <Hero />
        <Services />
        <About />
        <Tools />
        <Skills />
        <Portfolio />
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
