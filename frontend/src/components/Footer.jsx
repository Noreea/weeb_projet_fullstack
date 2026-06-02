function Footer() {
  return (
    <footer className="w-full bg-white text-gray-800 text-sm">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex flex-col md:grid md:grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8">

          {/* Logo */}
          <div className="text-xl font-bold w-fit mx-auto md:mx-0 text-left">
            <p className="text-2xl font-bold">weeb</p>
          </div>

          {/* Produit */}
          <div className="mx-auto">
            <p className="text-left font-medium text-gray_footer uppercase tracking-wide text-sm mb-4">Produit</p>
            <ul className="space-y-4 text-gray-700">
              <li><a href="#" className="block">Tarifs</a></li>
              <li><a href="#" className="block">Présentation</a></li>
              <li><a href="#" className="block">Explorer</a></li>
              <li><a href="#" className="block">Accessibilité</a></li>
              <li><a href="#" className="block">Fonctionnalités</a></li>
            </ul>
          </div>

          {/* Solutions */}
          <div className="mx-auto">
            <p className="text-left font-medium text-gray_footer uppercase tracking-wide text-sm mb-4">Solutions</p>
            <ul className="space-y-4 text-gray-700">
              <li><a href="#">Brainstorming</a></li>
              <li><a href="#">Idéation</a></li>
              <li><a href="#">Maquettage</a></li>
              <li><a href="#">Recherche</a></li>
            </ul>
          </div>

          {/* Ressources */}
          <div className="mx-auto">
            <p className="text-left font-medium text-gray_footer uppercase tracking-wide text-sm mb-4">Ressources</p>
            <ul className="space-y-4 text-gray-700">
              <li><a href="#">Centre d'aide</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Tutoriels</a></li>
            </ul>
          </div>

          {/* Entreprise */}
          <div className="mx-auto">
            <p className="text-left font-medium text-gray_footer uppercase tracking-wide text-sm mb-4">Entreprise</p>
            <ul className="space-y-4 text-gray-700">
              <li><a href="#">Presse</a></li>
              <li><a href="#">Événements</a></li>
              <li><a href="#">Carrières</a></li>
            </ul>
          </div>
        </div>

        <hr className="my-10 border-gray-200" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-center md:text-left">© 2025 Weeb, Inc. Tous droits réservés.</p>
          <div className="flex justify-center md:justify-start space-x-4 text-lg">
            <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-youtube"></i></a>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a>
            <a href="https://www.x.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin-in"></i></a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
