import { useRef } from "react";
import emailjs from "@emailjs/browser";

export const Contacto = () => {
  const form = useRef();

  const enviarEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          alert("Mensaje enviado correctamente");
          form.current.reset();
        },
        (error) => {
          alert("Ocurrió un error al enviar el mensaje");
          console.error(error);
        }
      );
  };

  return (
    <div className="flex justify-center items-center min-h-[70vh] bg-gray-900">
      <div className="w-full max-w-lg mb-4 mt-4">
        <h2 className="text-2xl font-semibold mb-6 text-center bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
          Contáctame
        </h2>
        <form
          id="contact-form"
          ref={form}
          onSubmit={enviarEmail}
          className="p-6 border border-gray-600/20 rounded-2xl shadow-lg bg-white/10 backdrop-blur-xl"
        >
          {/* Nombre */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-semibold mb-1 text-white">
              Nombre
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Nombre"
              required
              className="w-full px-3 py-2 border border-gray-600/20 rounded-lg bg-gray-800/50 text-gray-300 focus:outline-none focus:ring focus:ring-blue-600/50"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-semibold mb-1 text-white">
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Correo electrónico"
              required
              className="w-full px-3 py-2 border border-gray-600/20 rounded-lg bg-gray-800/50 text-gray-300 focus:outline-none focus:ring focus:ring-blue-600/50"
            />
          </div>

          {/* Teléfono */}
          <div className="mb-4">
            <label htmlFor="phone" className="block text-sm font-semibold mb-1 text-white">
              Teléfono
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Teléfono"
              required
              className="w-full px-3 py-2 border border-gray-600/20 rounded-lg bg-gray-800/50 text-gray-300 focus:outline-none focus:ring focus:ring-blue-600/50"
            />
          </div>

          {/* Asunto */}
          <div className="mb-4">
            <label
              htmlFor="subject"
              className="block text-sm font-semibold mb-1 text-white"
            >
              Asunto
            </label>
            <select
              id="subject"
              name="subject"
              defaultValue=""
              className="w-full px-3 py-2 border border-gray-600/20 rounded-lg bg-gray-800/50 text-gray-300 focus:outline-none focus:ring focus:ring-blue-600/50"
            >
              <option value="" disabled hidden>
                ¿Cómo puedo ayudarte hoy?
              </option>
              <option value="FeedbackGame">
                Me gustaría dar feedback sobre un juego
              </option>
              <option value="BuyGame">
                Me gustaría comprar uno de tus juegos
              </option>
              <option value="CustomGame">
                Me gustaría solicitar un juego personalizado
              </option>
              <option value="Other">Otro</option>
            </select>
          </div>

          {/* Mensaje */}
          <div className="mb-4">
            <label
              htmlFor="message"
              className="block text-sm font-semibold mb-1 text-white"
            >
              Mensaje
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              placeholder="Escribe tu mensaje aquí"
              required
              className="w-full px-3 py-2 border border-gray-600/20 rounded-lg bg-gray-800/50 text-gray-300 focus:outline-none focus:ring focus:ring-blue-600/50"
            />
          </div>

          {/* Botón */}
          <div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-700 to-gray-700 text-white font-semibold py-2 px-4 rounded-lg hover:from-blue-800 hover:to-gray-800 transition-all duration-300 shadow-lg hover:shadow-blue-600/25"
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};