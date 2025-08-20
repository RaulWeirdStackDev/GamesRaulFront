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
          alert("Message sent successfully");
          form.current.reset();
        },
        (error) => {
          alert("An error occurred while sending the message");
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
          {/* Name */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-semibold mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="user_name"
              placeholder="Name"
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-semibold mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="user_email"
              placeholder="Email"
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
            />
          </div>

          {/* Phone */}
          <div className="mb-4">
            <label htmlFor="phone" className="block text-sm font-semibold mb-1">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="user_phone"
              placeholder="Phone"
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
            />
          </div>

          {/* Subject */}
          <div className="mb-4">
            <label
              htmlFor="subject"
              className="block text-sm font-semibold mb-1"
            >
              Subject
            </label>
            <select
              id="subject"
              name="user_subject"
              defaultValue=""
              className="w-full px-3 py-2 border rounded-lg bg-white focus:outline-none focus:ring focus:ring-blue-400"
            >
              <option value="" disabled hidden>
                How can I help you today?
              </option>
              <option value="FeedbackGame">
                I’d like to give feedback about a game
              </option>
              <option value="BuyGame">
                I’d like to purchase one of your games
              </option>
              <option value="CustomGame">
                I’d like to request a custom game
              </option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Message */}
          <div className="mb-4">
            <label
              htmlFor="message"
              className="block text-sm font-semibold mb-1"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              placeholder="Message"
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
            />
          </div>

          {/* Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
