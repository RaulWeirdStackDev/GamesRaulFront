import { motion } from "framer-motion";

export const Timeline = () => {
  const events = [
    {
      year: "2025",
      details: [
        "Comencé un Master en Desarrollo de Videojuegos con Unity, C# y Python (Casta Tutors).",
        "Desarrollé el prototipo de Real Fighters 2D en Unity 6.",
        "Me gradué como Desarrollador Full Stack JavaScript y TNS Analista Programador.",
      ],
    },
    {
      year: "2024",
      details: [
        "Estudié en el Bootcamp de Desarrollo Full Stack JavaScript en Desafío Latam.",
        "Estudié un Diplomado en UX/UI Aplicado al Desarrollo Web en SENCE.",
        "Desarrollé proyectos personales y clientes para sitios web.",
        "Comencé el prototipo de Out of Eden en Phaser 3.",
      ],
    },
    {
      year: "2023",
      details: [
        "Ingresé al Técnico de Nivel Superior Analista Programador en CFT Cenco.",
        "Aprendí HTML y CSS mediante cursos en línea y autoaprendizaje.",
      ],
    },
    {
      year: "2019-2024",
      details: [
        "Fui director, Fundador y Docente en el Instituto de Inglés Online Radical English.",
        "Gané experiencia en emprendimiento, gamificación y tecnologías educativas.",
        "Me titulé como Magister en Enseñanza del Inglés como Lengua Extranjera (2020).",
      ],
    },
    {
      year: "2016-2019",
      details: [
        "Ejercí como profesor de inglés en distintos contextos públicos y privados en Chile.",
        "Experiencia en enseñanza con metodologías gradualmente más innovadoras.",
        "Comencé a estudiar en el Magister en Enseñanza del Inglés como Lengua Extranjera de la Universidad Andrés Bello (2018).",
      ],
    },
    {
      year: "2012-2016",
      details: [
        "Estudié Pedagogía en Inglés en la Pontificia Universidad Católica de Valparaíso",
        "Formación en educación, linguistica y habilidades comunicativas en inglés.",
      ],
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 bg-gray-900">
      <h2 className="text-2xl font-semibold mb-6 text-center bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
        Mi Camino como Desarrollador Web y de Videojuegos
      </h2>
      <div className="space-y-8">
        {events.map((event, index) => (
          <motion.div
            key={index}
            className={`p-4 border-l-4 bg-white/10 backdrop-blur-xl rounded-lg shadow-lg hover:shadow-blue-600/25 ${
              index % 2 === 0 ? "border-blue-600/30" : "border-gray-600/30"
            }`}
            initial={{ x: index % 2 === 0 ? -100 : 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="font-semibold text-white">{event.year}</h3>
            {event.details.map((detail, i) => (
              <p key={i} className="text-gray-300">{detail}</p>
            ))}
          </motion.div>
        ))}
      </div>
    </div>
  );
};