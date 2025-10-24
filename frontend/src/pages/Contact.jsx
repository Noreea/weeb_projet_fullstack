import Button from '../components/Button';

function Contact() {
  return (
    <main className="text-white px-6 py-16">
      <h1 className="text-4xl md:text-6xl font-bold text-center mb-4">
        Votre avis compte !
      </h1>
      <p className="text-center max-w-2xl mx-auto text-gray-300 mb-12">
        Votre retour est essentiel pour nous améliorer ! Partagez votre expérience, dites-nous ce que vous aimez et ce que nous pourrions améliorer. Vos suggestions nous aident à faire de ce blog une ressource toujours plus utile et enrichissante.
      </p>

      <form className="bg-purple-10 border border-purple-500 rounded-xl p-8 max-w-3xl mx-auto space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Champ Nom */}
          <div>
            <label htmlFor="lastname" className="sr-only">Nom</label>
            <input
              id="lastname"
              type="text"
              placeholder="Nom"
              className="w-full border-b border-purple-400 bg-transparent p-2 text-2xl focus:outline-none focus:ring-1 focus:ring-purple_text focus:border-purple_text transition-colors placeholder-purple_text text-center"
            />
          </div>

          {/* Champ Prénom */}
          <div>
            <label htmlFor="firstname" className="sr-only">Prénom</label>
            <input
              id="firstname"
              type="text"
              placeholder="Prénom"
              className="w-full border-b border-purple-400 bg-transparent p-2 text-2xl focus:outline-none focus:ring-1 focus:ring-purple_text focus:border-purple_text transition-colors placeholder-purple_text text-center"
            />
          </div>

          {/* Champ Téléphone */}
          <div>
            <label htmlFor="tel" className="sr-only">Téléphone</label>
            <input
              id="tel"
              type="tel"
              placeholder="Téléphone"
              className="w-full border-b border-purple-400 bg-transparent p-2 text-2xl focus:outline-none focus:ring-1 focus:ring-purple_text focus:border-purple_text transition-colors placeholder-purple_text text-center"
            />
          </div>

          {/* Champ Email */}
          <div>
            <label htmlFor="email" className="sr-only">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Email"
              className="w-full border-b border-purple-400 bg-transparent p-2 text-2xl focus:outline-none focus:ring-1 focus:ring-purple_text focus:border-purple_text transition-colors placeholder-purple_text text-center"
            />
          </div>
        </div>

        {/* Zone de message */}
        <div>
          <label htmlFor="message" className="sr-only">Message</label>
          <textarea
            id="message"
            type="text"
            placeholder="Message"
            className="w-full border-b border-purple-400 bg-transparent p-2 text-2xl h-24 resize-none focus:outline-none focus:ring-1 focus:ring-purple_text focus:border-purple_text transition-colors placeholder-purple_text text-center"
          ></textarea>
        </div>

        {/* Bouton de soumission */}
        <div className="text-center pt-4">
          <Button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors duration-200"
          >
            Contact
          </Button>
        </div>
      </form>
    </main>
  );
}

export default Contact;
