// ¡OJO! Nada de title/short/long aquí.
// Solo info neutral que no cambia por idioma.
import planin1 from "../../../assets/img/ChatGPT Image 13 ago 2025, 03_59_07 p.m..png"
import planin2 from "../../../assets/img/Planning.jpg"
import scuti1 from "../../../assets/img/scuti1.png"
import scuti2 from "../../../assets/img/scuti2.png"
import scuti3 from "../../../assets/img/scuti3.png"
import scuti4 from "../../../assets/img/scuti4.png"
import scuti5 from "../../../assets/img/scuti5.png"
import scutiBeta from "../../../assets/img/scutiBeta.png"
import scutiBeta1 from "../../../assets/img/scutiBeta1.png"
import scutiBeta2 from "../../../assets/img/scutiBeta2.png"
import scutiBeta3 from "../../../assets/img/scutiBeta3.png"
import scutiBeta4 from "../../../assets/img/scutiBeta4.png"
import scutiBeta5 from "../../../assets/img/scutiBeta5.png"
import iahostel1 from "../../../assets/img/iahostel1.png"
import iahostel2 from "../../../assets/img/iahostel2.png"
import iahostel3 from "../../../assets/img/iahostel3.png"
import iahostel4 from "../../../assets/img/iahostel4.png"
import iahostel5 from "../../../assets/img/iahostel5.png"
import hormesis1 from "../../../assets/img/hormesis1.png"
import hormesis2 from "../../../assets/img/hormesis2.png"
import hormesis3 from "../../../assets/img/hormesis3.png"
import hormesis4 from "../../../assets/img/hormesis4.png"
import hormesis5 from "../../../assets/img/hormesis5.png"
import aether1 from "../../../assets/img/aether1.png"
import aether2 from "../../../assets/img/aether2.png"
import aether3 from "../../../assets/img/aether3.png"
import Coatline1 from "../../../assets/img/Coatline1.png"
import Coatline2 from "../../../assets/img/Coatline2.png"
import Coatline3 from "../../../assets/img/Coatline3.png"
import Coatline4 from "../../../assets/img/Coatline4.png"
import Coatline55 from "../../../assets/img/Coatline5.png"





export const projects = [
  {
    id: 7,
    slug: "grupo-hormesis",
    category: "ai-hospitality",
    year: 2026,
    role: ["Fullstack Architect", "AI Automation Lead"],
    tech: [
      "React 19",
      "TypeScript",
      "Vite",
      "Node.js",
      "Express",
      "Prisma",
      "PostgreSQL",
      "Google Places API",
      "Google Gemini AI",
      "Cloudinary",
      "Railway"
    ],
    image: hormesis1,
    images: [hormesis1, hormesis2, hormesis3, hormesis4, hormesis5],
    demo: "https://grupohormesis.es",
    repo: "https://github.com/Whilmis/GrupoHormesis-front",
  },
  {
    id: 4,
    slug: "iahostel",
    category: "ai-hospitality",
    year: 2026,
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
    image: iahostel1,
    images: [
      iahostel2,
      iahostel3,
      iahostel4,
      iahostel5
    ],
    repo: "https://github.com/Whilmis/IAHostel",
    demo: "https://iahostel.com",
  },
  {
    id: 6,
    slug: "coastline-crm",
    category: "react-node",
    year: 2026,
    role: ["Backend Architect", "API Developer"],
    tech: ["Node.js", "Express", "TypeScript", "PostgreSQL", "Prisma", "JWT", "Puppeteer", "ExcelJS", "Resend"],
    image: Coatline1,
    images: [Coatline1, Coatline2, Coatline3, Coatline4, Coatline55],
    repo: "https://github.com/CoatlineES/coastline-frontend",
    demo: "https://coastline-frontend.vercel.app/",
  },
  {
    id: 3,
    slug: "scuti",
    category: "react-node",
    year: 2025,
    role: ["Fullstack Architect", "UI/UX", "Backend Lead"],
    tech: [
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Vite",
      "Node.js",
      "Express.js",
      "Prisma",
      "PostgreSQL",
      "Socket.io",
      "AWS S3"
    ],
    image: scutiBeta2,
    images: [
      scutiBeta1,
      scutiBeta,
      scutiBeta3,
      scutiBeta4,
      scutiBeta5
    ],
    repo: "https://github.com/Whilmis/scutiFrontBeta",
    demo: "https://scutiai.com/",
  },
  {
    id: 2,
    slug: "scuti-v1",
    category: "web3-ai",
    year: 2025,
    role: ["Frontend", "UI/UX", "Web3 Integration"],
    tech: [
      "React",
      "Next.js",
      "Tailwind CSS",
      "Solidity",
      "Ethers.js",
      "OpenAI API",
      "Framer Motion",
      "TypeScript"
    ],
    image: scuti1,
    images: [
      scuti2,
      scuti3,
      scuti4,
      scuti5
    ],
    repo: "https://github.com/Whilmis/ScutiV1",
    demo: "https://joinscuti.com",
  },
  {
    id: 5,
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
    repo: "https://github.com/Whilmis/Aether",
    demo: "https://eather.tech",
  },
  {
    id: 1,
    slug: "planning-scheduling",
    category: "react-node",
    year: 2022,
    role: ["Frontend"],
    tech: ["React", "Redux", "React DnD", "C# (.NET) API", "Azure DevOps"],
    image: planin1,
    images: [planin1, planin2],
    repo: "https://github.com/Whilmis/Planning-Scheduling",
    demo: "https://dev.azure.com/ab-inbev-maz/MAZ_Supply_P_and_S/_git/plan-scheduling-frontend/pullrequest/5655",
    // (sin demo/figma; es interno)
  },
];
