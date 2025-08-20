// ¡OJO! Nada de title/short/long aquí.
// Solo info neutral que no cambia por idioma.
import planin1 from "../../../assets/img/ChatGPT Image 13 ago 2025, 03_59_07 p.m..png"
import planin2 from "../../../assets/img/Planning.jpg"
import domibyte1 from "../../../assets/img/Header.png"
import domibyte2 from "../../../assets/img/about.jpg"
import domibyte3 from "../../../assets/img/services.jpg"  
import aether1 from "../../../assets/img/aether1.png"
import aether2 from "../../../assets/img/aether2.png"
import aether3 from "../../../assets/img/aether3.png"
import eatherF from "../../../assets/img/Main.jpg"
import eatherF2 from "../../../assets/img/aetherf2.png"
import eatherF3 from "../../../assets/img/eatherf3.png"
import portafolio from "../../../assets/img/portafolio.png"
import portafolio2 from "../../../assets/img/portafolio2.png"
import portafolio3 from "../../../assets/img/portafolio3.png"
import emaus1 from "../../../assets/img/pantalla1.png"
import emaus2 from "../../../assets/img/Pantalla2.jpg"
import emaus3 from "../../../assets/img/pantalla4.jpg"

export const projects = [
{
  id: 1,
  slug: "planning-scheduling",
  category: "react-node",
  year: 2022,
  role: ["Frontend"],
  tech: ["React", "Redux", "React DnD", "C# (.NET) API", "Azure DevOps"],
  image: planin1,
  images: [planin1,planin2],
  repo: "https://github.com/Whilmis/Planning-Scheduling",
   demo: "https://dev.azure.com/ab-inbev-maz/MAZ_Supply_P_and_S/_git/plan-scheduling-frontend/pullrequest/5655",
  // (sin demo/figma; es interno)
},
 {
  id: 2, // cámbialo si ya lo usas
  slug: "domibyte",
  category: "react-node",
  year: 2025,
  role: ["Frontend", "UI/UX"],
  tech: [
    "React",
    "Vite",
    "CSS",
    "EmailJS",
    "Context API",
    "i18n (custom)",
    "IntersectionObserver",
    "Smooth Scroll (custom)"
  ],
  image:domibyte1 ,
  images: [
    domibyte1,
    domibyte2,
    domibyte3
  ],
  repo: "https://github.com/Whilmis/DomiByte",
   demo: "https://domibyte.tech", // privado o aún no publicado
  // sin demo pública por ahora
},
  {
  id: 3,
  slug: "aether-ui",
  category: "react-node",
  year: 2025,
  role: ["Frontend", "UI/UX", "Docs"],
  tech: ["React", "Vite", "CSS", "i18next", "ESLint", "Figma"],
  image: aether1,
  images: [
    aether1,
    aether2,
    aether3
  ],
  repo: "https://github.com/Whilmis/Aether",  // Puedes colocar el repo público si lo tienes
  demo: "https://eather.tech",  // Puedes colocar la URL del sistema en vivo si la tendrás
  
},
{
  id: 4, // ajusta según tu lista
  slug: "Emaus-platform",
  category: "react-node",
  year: 2025,
  role: ["Full Stack"],
  tech: ["React", "Node.js", "Express", "JWT", "MongoDB", "Docker"],
  image: emaus1,
  images: [
    emaus1,
    emaus2,
    emaus3
  ],
  repo: null,      // si hay repo público, pon la URL
  demo: null,      // demo pública (si aplica)
  figma: null      // enlace de diseño (si aplica)
},
 {
  id: 5,
  slug: "aether-uif",
  category: "ux-ui",
  year: 2025,
  role: ["UI", "UX"],
  tech: ["Figma"],
  image: eatherF, // Asegúrate de que esta imagen esté disponible en tu proyecto
  images: [
    eatherF,
    eatherF2,
    eatherF3
  ],
  figma: "https://www.figma.com/design/uKoAyqW1CLqzK7ArzoKZHA/W-Kit-de-UI-para-design-system?node-id=0-1&m=dev&t=vMgP4vX8KGgFL6Os-1", // Reemplaza con el enlace real a tu archivo en Figma
  name: "Aether UI",
  description:
    "Sistema de diseño creado en Figma que combina estructura, claridad y elegancia visual. Aether UI está diseñado para aplicaciones web modernas con un enfoque en accesibilidad, escalabilidad y estética funcional."
},
{
  id: 6,
  slug: "developer-portfolio",
  category: "ux-ui",
  year: 2025,
  role: ["UI", "UX"],
  tech: ["Figma"],
  image: portafolio,
  images: [
    portafolio,
    portafolio2,
    portafolio3
  ],
  figma: "https://www.figma.com/design/la0ZkwVc0ZTPw1XBX96sQO/Portafolio?node-id=118-85&m=dev&t=8Es8zeueRs2XH7x6-1", // Enlace a tu archivo Figma si lo tienes
 
  name: "Web Developer Portfolio",
  description:
    "Personal portfolio design focused on presenting web development services, technical skills, and direct contact. It includes an introductory section, professional bio, services, skills, contact form, and social media integration."
}

];
