// ¡OJO! Nada de title/short/long aquí.
// Solo info neutral que no cambia por idioma.
import planin1 from "../../../assets/img/ChatGPT Image 13 ago 2025, 03_59_07 p.m..png"
import planin2 from "../../../assets/img/Planning.jpg"
import scuti1 from "../../../assets/img/scuti1.png"
import scuti2 from "../../../assets/img/scuti2.png"
import scuti3 from "../../../assets/img/scuti3.png"
import scuti4 from "../../../assets/img/scuti4.png"
import scuti5 from "../../../assets/img/scuti5.png"
import iahostel1 from "../../../assets/img/iahostel1.png"
import iahostel2 from "../../../assets/img/iahostel2.png"
import iahostel3 from "../../../assets/img/iahostel3.png"
import iahostel4 from "../../../assets/img/iahostel4.png"
import iahostel5 from "../../../assets/img/iahostel4.png"
import aether1 from "../../../assets/img/aether1.png"
import aether2 from "../../../assets/img/aether2.png"
import aether3 from "../../../assets/img/aether3.png"
import aether4 from "../../../assets/img/aetherf2.png"


import eatherF3 from "../../../assets/img/eatherf3.png"
import portafolio from "../../../assets/img/portafolio.png"
import portafolio2 from "../../../assets/img/portafolio2.png"
import portafolio3 from "../../../assets/img/portafolio3.png"


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
  id: 2, // Asegúrate de que este ID sea único en tu array de proyectos
  slug: "scuti",
  category: "web3-ai", // Categoría que refleja IA y Blockchain
  year: 2025,
  role: ["Frontend", "UI/UX", "Web3 Integration"],
  tech: [
    "React",
    "Next.js", // Común en proyectos Web3/AI modernos
    "Tailwind CSS",
    "Solidity", // Por la validación en Blockchain
    "Ethers.js", // Para conectar con la billetera/blockchain
    "OpenAI API", // Por el componente de IA mencionado
    "Framer Motion", // Para las animaciones fluidas que suele tener Scuti
    "TypeScript"
  ],
  image: scuti1, // Asegúrate de importar estas variables de imagen
  images: [
    scuti2,
    scuti3,
    scuti4,
    scuti5
  ],
  repo: "https://github.com/Whilmis/ScutiV1", // Ajusta si el repo tiene otro nombre
  demo: "https://joinscuti.com",
},

{
  id: 3, // Asegúrate de que este ID siga la secuencia de tus proyectos
  slug: "iahostel",
  category: "ai-hospitality",
  year: 2025,
  role: ["Fullstack Developer", "AI Integration", "UI/UX"],
  tech: [
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Node.js",
    "OpenAI API",
    "WhatsApp Cloud API",
    "Framer Motion",
    "Google Maps API"
  ],
  image: iahostel1, // Variable para la imagen principal
  images: [
    iahostel2,
    iahostel3,
    iahostel4,
    iahostel5
  ],
  repo: "https://github.com/Whilmis/IAHostel", // Ajusta el enlace a tu repositorio
  demo: "https://iahostel.com",
},
  {
  id: 4,
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
   // enlace de diseño (si aplica)
 {
  id: 5,
  slug: "aether-uif",
  category: "ux-ui",
  year: 2025,
  role: ["UI", "UX"],
  tech: ["Figma"],
  image: aether4, // Asegúrate de que esta imagen esté disponible en tu proyecto
  images: [
    eatherF3,
    aether2,
    aether3
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
