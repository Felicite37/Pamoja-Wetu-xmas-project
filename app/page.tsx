"use client";
import { useState } from "react";

export default function Page() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus("Message sent successfully!");
        setForm({ name: "", email: "", message: "" });
        setShowModal(true);
      } else {
        const data = await res.json();
        setStatus(`Error: ${data.error}`);
      }
    } catch (err) {
      setStatus("Error sending message.");
    }
  };

  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center text-white py-32 px-6"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1543589077-47d81606c1bf?auto=format&fit=crop&w=1600&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-green-800/70"></div>
        <div className="relative z-10 text-center">
          <h1 className="text-5xl font-bold mb-4">
            🎄 Pamoja Wetu Christmas Support 🎄
          </h1>
          <p className="text-lg max-w-2xl mx-auto">
            Let’s bring joy to <strong>100 children</strong> this Christmas.
            Together, we can make their season brighter with love, gifts, and
            smiles.
          </p>
          <a
            href="#donate"
            className="inline-block mt-6 bg-yellow-400 text-green-900 font-semibold py-3 px-6 rounded-full shadow hover:bg-yellow-300 transition"
          >
            🎁 Support Now
          </a>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-6 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-semibold mb-4 text-green-800">
          About Pamoja Wetu
        </h2>
        <p className="text-lg leading-relaxed">
          <strong>Pamoja Wetu</strong> is a community-driven project created to
          support children during Christmas. Our goal is to show compassion,
          unity, and hope by providing food, gifts, and love to those who need
          it most.
        </p>
      </section>

      {/* Founder Section */}
      <section className="bg-gray-100 py-16 px-6 text-center">
        <h2 className="text-3xl font-semibold mb-4 text-green-800">
          Meet the Founder
        </h2>
        <p className="text-lg mb-4">
          Founded by <strong>Faith Yvonne UWIMANA</strong>, whose dedication to
          helping children and communities continues to inspire everyone around
          her.
        </p>
        <p className="italic text-gray-600">
          “Together we can bring light to little hearts.”
        </p>
      </section>

      {/* Contact Form Section */}
      <section id="donate" className="py-16 px-6 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-semibold mb-4 text-green-800">
          Contact Us
        </h2>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 max-w-md mx-auto"
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded px-4 py-2"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded px-4 py-2"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={form.message}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded px-4 py-2"
          />
          <button
            type="submit"
            className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 transition"
          >
            Send Message
          </button>
        </form>
        {status && <p className="mt-4 text-green-700">{status}</p>}
      </section>

      {/* Thank You Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-lg p-8 max-w-sm text-center shadow-lg">
            <h3 className="text-2xl font-bold mb-4 text-green-800">
              Thank You! 🎄
            </h3>
            <p className="mb-6">
              Your message has been sent successfully. Faith Yvonne UWIMANA will
              reach out soon!
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="bg-green-700 text-white px-6 py-2 rounded hover:bg-green-800 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-green-800 text-white py-6 text-center">
        <p>📍 Kigali, Rwanda</p>
        <p className="text-sm mt-2">
          © {new Date().getFullYear()} Pamoja Wetu — All Rights Reserved 
        </p>
      </footer>
    </main>
  );
}
