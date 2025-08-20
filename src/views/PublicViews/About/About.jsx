import {
  FaReact,
  FaNodeJs,
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaUnity,
} from "react-icons/fa";
import { SiMongodb, SiPostgresql } from "react-icons/si";
import { Timeline } from "./Timeline";

export const About = () => {
  return (
    <div className="w-screen max-w-screen overflow-x-hidden px-6 py-12">
      {/* Foto + Descripción */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-16">
        <img
          src="/raul.png"
          alt="Raúl"
          className="w-40 h-40 rounded-full shadow-lg"
        />
        <div>
          <h1 className="text-3xl font-bold mb-4">Sobre Mí</h1>
          <p className="text-2xl leading-relaxed text-gray-700">
            Soy Raúl Rodríguez Clavero, desarrollador Full Stack JavaScript y
            creador de videojuegos con Unity y Phaser 3, además de profesor de
            inglés. Apasionado por la tecnología, disfruto aprendiendo, creando
            y compartiendo mis proyectos.
          </p>
        </div>
      </div>

 {/* Skills */}
<h2 className="text-2xl font-semibold mb-6 text-center">Habilidades</h2>
<div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-8 text-center">
  {[{
    icon: <FaHtml5 className="text-orange-600 text-4xl mx-auto" />,
    name: "HTML5"
  },{
    icon: <FaCss3Alt className="text-blue-600 text-4xl mx-auto" />,
    name: "CSS3"
  },{
    icon: <FaJs className="text-yellow-500 text-4xl mx-auto" />,
    name: "JavaScript"
  },{
    icon: <FaReact className="text-cyan-500 text-4xl mx-auto" />,
    name: "React"
  },{
    icon: <FaNodeJs className="text-green-600 text-4xl mx-auto" />,
    name: "Node.js"
  },{
    icon: <SiMongodb className="text-green-700 text-4xl mx-auto" />,
    name: "MongoDB"
  },{
    icon: <SiPostgresql className="text-blue-800 text-4xl mx-auto" />,
    name: "PostgreSQL"
  },{
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" className="w-10 h-10 mx-auto">
        <circle cx="64" cy="64" r="64" fill="#2d2d2d" />
        <text x="50%" y="55%" textAnchor="middle" fill="#fff" fontSize="32" fontFamily="Arial, sans-serif" fontWeight="bold">P</text>
      </svg>
    ),
    name: "Phaser"
  },{
    icon: <FaUnity className="text-gray-800 text-4xl mx-auto" />,
    name: "Unity"
  },{
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" className="w-10 h-10 mx-auto">
        <path fill="#68217A" d="M64 0l55.4 32v64L64 128 8.6 96V32L64 0z" />
        <path fill="#fff" d="M88.1 79.1c-2.2 4-5.4 7-9.6 9.1-4.2 2-9.2 3.1-15 3.1-8.1 0-14.5-2.3-19.1-6.9s-6.9-11-6.9-19.2c0-5.2.8-9.6 2.4-13.2s3.9-6.6 6.9-8.8c3-2.3 6.4-3.9 10.4-4.9s8.2-1.5 13-1.5c2.9 0 5.8.2 8.6.7 2.8.5 5.3 1.2 7.6 2.2l-2.9 11.6c-1.8-.7-3.7-1.2-5.6-1.6-1.9-.4-3.9-.6-6-.6-4.6 0-8.3 1.2-11 3.6-2.7 2.4-4 6-4 10.8 0 4.7 1.3 8.3 3.8 10.8s6.1 3.8 10.6 3.8c2.5 0 4.7-.4 6.8-1.2 2-.8 3.8-2.1 5.4-4l8.8 5.4z" />
        <path fill="#fff" d="M107.6 57.6h-4.9l-.7 3.6h4.4l-.9 4.5h-4.4l-1.5 7.7h-5l1.5-7.7h-3.5l-1.5 7.7h-4.9l1.5-7.7H85l.9-4.5h4.4l.7-3.6h-4.4l.9-4.5h4.4l1.5-7.7h5l-1.5 7.7h3.5l1.5-7.7h4.9l-1.5 7.7h4.9l-.9 4.5z" />
      </svg>
    ),
    name: "C#"
  }].map((skill, index) => (
    <div key={index} className="p-2 rounded-lg transition transform hover:scale-110 hover:shadow-lg hover:bg-gray-100">
      {skill.icon}
      <p className="mt-2 text-sm font-medium text-gray-700">{skill.name}</p>
    </div>
  ))}
</div>


      <Timeline />
    </div>
  );
};
