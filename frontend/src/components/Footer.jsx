function Footer() {
  return (
    <footer className="w-full bg-white text-gray-800 text-sm">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex flex-col md:grid md:grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8">

          {/* Logo */}
          <div className="text-xl font-bold w-fit mx-auto md:mx-0 text-left">
            <p className="text-2xl font-bold">weeb</p>
          </div>

          {/* Product */}
          <div className="mx-auto">
            <p className="text-left font-medium text-gray_footer uppercase tracking-wide text-sm mb-4">Product</p>
            <ul className="space-y-4 text-gray-700">
              <li><a href="#" className="block">Pricing</a></li>
              <li><a href="#" className="block">Overview</a></li>
              <li><a href="#" className="block">Browse</a></li>
              <li><a href="#" className="block">Accessibility</a></li>
              <li><a href="#" className="block">Five</a></li>
            </ul>
          </div>

          {/* Solutions */}
          <div className="mx-auto">
            <p className="text-left font-medium text-gray_footer uppercase tracking-wide text-sm mb-4">Solutions</p>
            <ul className="space-y-4 text-gray-700">
              <li><a href="#">Brainstorming</a></li>
              <li><a href="#">Ideation</a></li>
              <li><a href="#">Wireframing</a></li>
              <li><a href="#">Research</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="mx-auto">
            <p className="text-left font-medium text-gray_footer uppercase tracking-wide text-sm mb-4">Resources</p>
            <ul className="space-y-4 text-gray-700">
              <li><a href="#">Help Center</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Tutorials</a></li>
            </ul>
          </div>

          {/* Company */}
          <div className="mx-auto">
            <p className="text-left font-medium text-gray_footer uppercase tracking-wide text-sm mb-4">Company</p>
            <ul className="space-y-4 text-gray-700">
              <li><a href="#">About</a></li>
              <li><a href="#">Press</a></li>
              <li><a href="#">Events</a></li>
              <li><a href="#">Careers</a></li>
            </ul>
          </div>
        </div>

        <hr className="my-10 border-gray-200" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-center md:text-left">@ 2025 Weeb, Inc. All rights reserved.</p>
          <div className="flex justify-center md:justify-start space-x-4 text-lg">
            <a href="#"><i className="fab fa-youtube"></i></a>
            <a href="#"><i className="fab fa-facebook-f"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-linkedin-in"></i></a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
