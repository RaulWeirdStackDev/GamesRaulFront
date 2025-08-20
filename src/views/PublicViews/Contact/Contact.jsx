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
    <div className="flex justify-center items-center mt-10 mb-10 min-h-[70vh]">
      <div className="w-full max-w-lg">
        <form
          id="contact-form"
          ref={form}
          onSubmit={enviarEmail}
          className="p-6 border rounded-2xl shadow-lg bg-white"
        >
          {/* Nombre */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-semibold mb-1">
              Nombre
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Nombre"
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-semibold mb-1">
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Correo electrónico"
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
            />
          </div>

          {/* Teléfono */}
          <div className="mb-4">
            <label htmlFor="phone" className="block text-sm font-semibold mb-1">
              Teléfono
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Teléfono"
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
            />
          </div>

          {/* Asunto */}
          <div className="mb-4">
            <label
              htmlFor="subject"
              className="block text-sm font-semibold mb-1"
            >
              Asunto
            </label>
            <select
              id="subject"
              name="subject"
              defaultValue=""
              className="w-full px-3 py-2 border rounded-lg bg-white focus:outline-none focus:ring focus:ring-blue-400"
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
              className="block text-sm font-semibold mb-1"
            >
              Mensaje
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              placeholder="Escribe tu mensaje aquí"
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
            />
          </div>

          {/* Botón */}
          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition"
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
