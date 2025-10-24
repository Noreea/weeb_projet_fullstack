import React from "react";
import Button from "../components/Button";

function Login() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md space-y-8">
        {/* Titre principal de la page */}
        <h1 className="text-5xl md:text-7xl font-bold text-center text-white">
          Se connecter
        </h1>

        {/* Formulaire de connexion */}
        <form className="space-y-6">
          {/* Champ Email */}
          <div className="flex flex-col items-center justify-center">
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Email"
              className="text-center border-b border-purple_text bg-transparent p-2 text-2xl placeholder-purple_text text-white focus:outline-none focus:ring-1 focus:ring-purple_text focus:border-purple_text transition-colors"
            />
          </div>

          {/* Champ Password + Bouton */}
          <div className="flex flex-col items-center justify-center">
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              className="text-center border-b border-purple_text bg-transparent p-2 text-2xl placeholder-purple_text text-white focus:outline-none focus:ring-1 focus:ring-purple_text focus:border-purple_text transition-colors"
            />

            {/* Bouton de connexion */}
            <Button type="submit" className="mt-8">
              Se connecter
            </Button>
          </div>

          {/* Lien mot de passe oublié */}
          <div className="text-center mt-4">
            <a
              href="#"
              className="text-white hover:underline transition-colors"
            >
              Mot de passe oublié ?
            </a>
          </div>

          {/* Lien création de compte */}
          <div className="text-center text-white">
            Vous n'avez pas de compte ? Vous pouvez en{" "}
            <a
              href="#"
              className="underline underline-offset-4 font-bold hover:text-purple_text transition-colors"
            >
              créer un
            </a>
          </div>
        </form>
      </div>
    </main>
  );
}

export default Login;
