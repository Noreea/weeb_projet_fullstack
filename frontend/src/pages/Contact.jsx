import { useState } from 'react';
import Button from '../components/Button';
import { reviewsAPI } from '../services/api';

function Contact() {
  const [form, setForm] = useState({
    lastname: '',
    firstname: '',
    tel: '',
    email: '',
    message: '',
  });

  const handleChange = (event) => {
    const { id, value } = event.target;
    setForm((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Save review to database (prediction is calculated automatically)
      await reviewsAPI.createReview({
        first_name: form.firstname,
        last_name: form.lastname,
        email: form.email,
        phone: form.tel,
        message: form.message,
      });

      // Simple reset after successful submit
      setForm({
        lastname: '',
        firstname: '',
        tel: '',
        email: '',
        message: '',
      });

      // Show success message
      alert('Merci pour votre retour !');
    } catch (error) {
      // Minimal error handling: log to console
      console.error('Error while sending contact form', error);
      alert('Une erreur est survenue. Veuillez réessayer.');
    }
  };

  return (
    <main className="text-white px-6 py-16">
      <h1 className="text-4xl md:text-6xl font-bold text-center mb-4">
        Votre avis compte !
      </h1>
      <p className="text-center max-w-2xl mx-auto text-gray-300 mb-12">
        Votre retour est essentiel pour nous améliorer ! Partagez votre expérience,
        dites-nous ce que vous aimez et ce que nous pourrions améliorer.
        Vos suggestions nous aident à faire de ce blog une ressource toujours plus
        utile et enrichissante.
      </p>

      <form
        className="bg-purple-10 border border-purple-500 rounded-xl p-8 max-w-3xl mx-auto space-y-6"
        onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Last name */}
          <div>
            <label htmlFor="lastname" className="sr-only">
              Nom
            </label>
            <input
              id="lastname"
              type="text"
              placeholder="Nom"
              required
              className="w-full border-b border-purple-400 bg-transparent p-2 text-2xl focus:outline-none focus:ring-1 focus:ring-purple_text focus:border-purple_text transition-colors placeholder-purple_text text-center"
              value={form.lastname}
              onChange={handleChange}
            />
          </div>

          {/* First name */}
          <div>
            <label htmlFor="firstname" className="sr-only">
              Prénom
            </label>
            <input
              id="firstname"
              type="text"
              placeholder="Prénom"
              required
              className="w-full border-b border-purple-400 bg-transparent p-2 text-2xl focus:outline-none focus:ring-1 focus:ring-purple_text focus:border-purple_text transition-colors placeholder-purple_text text-center"
              value={form.firstname}
              onChange={handleChange}
            />
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="tel" className="sr-only">
              Téléphone
            </label>
            <input
              id="tel"
              type="tel"
              placeholder="Téléphone"
              pattern="^(\+33|0)[1-9]\d{8}$"
              title="Format attendu : +33XXXXXXXXX ou 0XXXXXXXXX (10 chiffres)"
              className="w-full border-b border-purple-400 bg-transparent p-2 text-2xl focus:outline-none focus:ring-1 focus:ring-purple_text focus:border-purple_text transition-colors placeholder-purple_text text-center"
              value={form.tel}
              onChange={handleChange}
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Email"
              required
              className="w-full border-b border-purple-400 bg-transparent p-2 text-2xl focus:outline-none focus:ring-1 focus:ring-purple_text focus:border-purple_text transition-colors placeholder-purple_text text-center"
              value={form.email}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="sr-only">
            Message
          </label>
          <textarea
            id="message"
            placeholder="Message"
            required
            className="w-full border-b border-purple-400 bg-transparent p-2 text-2xl h-24 resize-none focus:outline-none focus:ring-1 focus:ring-purple_text focus:border-purple_text transition-colors placeholder-purple_text text-center"
            value={form.message}
            onChange={handleChange}
          />
        </div>

        {/* Submit button */}
        <div className="text-center pt-4">
          <Button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors duration-200"
          >
            Envoyer
          </Button>
        </div>
      </form>
    </main>
  );
}

export default Contact;