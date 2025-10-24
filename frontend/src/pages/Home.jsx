import React from "react";
import * as FramerMotion from 'framer-motion';
import Button from "../components/Button";

function Home() {
  return (
    <main className="text-white">
      <div className="mx-auto px-6 sm:px-8 lg:px-24 py-12 space-y-24">

        {/* Héros */}
        <FramerMotion.motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-between gap-10 mt-8 mx-6 md:mx-12 lg:mx-24"
        >
          <div className="max-w-7xl flex-1 space-y-6 text-center px-6">
            <h1 className="text-3xl md:text-7xl font-bold leading-tight">
              Explorez le <span className="text-purple_text font-thin tracking-wider">Web</span> sous toutes ses <span className="underline underline-offset-8 decoration-purple_text decoration-4">facettes</span>
            </h1>
            <p className="text-base md:text-lg text-gray-300">
              Le monde du web évolue constamment, et nous sommes là pour vous guider à travers ses tendances, technologies et meilleures pratiques.
              Que vous soyez développeur, designer ou passionné du digital, notre blog vous offre du contenu de qualité pour rester à la pointe.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <FramerMotion.motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button>Découvrir les articles</Button>
              </FramerMotion.motion.div>
              <FramerMotion.motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button>S’abonner à la newsletter</Button>
              </FramerMotion.motion.div>
            </div>
          </div>

          <FramerMotion.motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="w-full"
          >
            <img src="/assets/hero.png" alt="Illustration Web" className="w-full h-auto object-contain" />
          </FramerMotion.motion.div>
        </FramerMotion.motion.section>

        {/* Logos */}
        <FramerMotion.motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true }}
        >
          <p className="text-3xl text-center pb-8 md:text-5xl font-bold">
            Ils nous font confiance
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6">
            {[{ src: "/assets/smart_finder.svg", alt: "SmartFinder" },
              { src: "/assets/zoomerr.svg", alt: "Zoomerr" },
              { src: "/assets/shells.svg", alt: "SHELLS" },
              { src: "/assets/waves.svg", alt: "WAVES" },
              { src: "/assets/art_venue.svg", alt: "ArtVenue" }].map((logo, idx) => (
                <FramerMotion.motion.div
                  key={idx}
                  whileHover={{ scale: 1.1, rotate: 2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="flex items-center gap-2"
                >
                  <img src={logo.src} alt={logo.alt} className="h-8" />
                  <span className="font-semibold text-base md:text-xl">{logo.alt}</span>
                </FramerMotion.motion.div>
              ))}
          </div>
        </FramerMotion.motion.section>

        {/* Apprenez et progressez */}
        <FramerMotion.motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="rounded-xl p-6 sm:p-10 flex flex-col-reverse lg:flex-row items-center gap-10">
            <div className="w-full lg:w-1/2 space-y-4">
              <p className="text-lg uppercase tracking-widest font-bold">Des ressources pour tous les niveaux</p>
              <p className="text-3xl md:text-6xl font-bold">
                <span className="text-purple_text">Apprenez</span> et <span className="text-purple_text">progressez</span>
              </p>
              <p>
                Que vous débutiez en développement web ou que vous soyez un expert cherchant à approfondir vos connaissances,
                nous vous proposons des tutoriels, guides et bonnes pratiques pour apprendre efficacement.
              </p>
              <FramerMotion.motion.a
                href="#"
                whileHover={{ scale: 1.05 }}
                className="inline-block mt-4 font-semibold hover:underline"
              >
                Explorer les ressources ➔
              </FramerMotion.motion.a>
            </div>

            <FramerMotion.motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
              className="w-full lg:w-1/2"
            >
              <img src="/assets/desktop_mini.png" alt="Apprendre et progresser" className="w-full h-auto object-contain" />
            </FramerMotion.motion.div>
          </div>
        </FramerMotion.motion.section>

        {/* Tendances */}
        <FramerMotion.motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
          viewport={{ once: true }}
          className="py-20"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col-reverse lg:flex-row items-center gap-10">
            <FramerMotion.motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
              className="w-full lg:w-1/2"
            >
              <img src="/assets/shapes.svg" alt="Tendances Web" className="w-full max-w-sm mx-auto lg:mx-0" />
            </FramerMotion.motion.div>

            <div className="w-full lg:w-1/2 space-y-4">
              <p className="text-lg uppercase tracking-widest font-bold">Le web, un écosystème en constante évolution</p>
              <p className="text-3xl pb-8 md:text-6xl font-bold">
                Restez informé des dernières <span className="text-purple_text">tendances</span>
              </p>
              <p className="text-gray-300">
                Chaque semaine, nous analysons les nouveautés du web : frameworks émergents, bonnes pratiques SEO, accessibilité, et bien plus encore. Ne manquez aucune actualité du digital !
              </p>
              <FramerMotion.motion.a
                href="#"
                whileHover={{ scale: 1.05 }}
                className="inline-block mt-4 font-semibold hover:underline"
              >
                Lire les articles récents ➔
              </FramerMotion.motion.a>
            </div>
          </div>
        </FramerMotion.motion.section>

      </div>
    </main>
  );
}

export default Home;
