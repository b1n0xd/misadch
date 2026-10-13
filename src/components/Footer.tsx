import { Phone, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "@/components/Logo";
import { openCookiePreferences } from "@/lib/cookieConsent";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-12 px-4">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <div className="brightness-0 invert">
              <Logo size="sm" />
            </div>
            <p className="text-background/80 leading-relaxed">
              Forts d’une expérience globale de vingt ans, nos infirmier·ère·s diplômé·e·s conjuguent compétence, écoute et engagement pour veiller sur votre santé à domicile.
            </p>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact</h4>
            <div className="space-y-3 text-background/80">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>022 788 65 95</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>info@misad.ch</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-1" />
                <span>
                  Av. Louis-Casaï 81<br />
                  1216 Cointrin, Genève, Suisse
                </span>
              </div>
            </div>
          </div>

          {/* Useful Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Liens utiles</h4>
            <ul className="space-y-2 text-background/80">
              <li>
                <a 
                  href="https://www.ge.ch/soins-domicile-financement-residuel#:~:text=A%20Gen%C3%A8ve%2C%20la%20contribution%20obligatoire,%C3%A0%2010%20francs%20par%20jour" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-background transition-all duration-300 hover:translate-x-1 inline-block"
                >
                  Prestations soins OPAS Art 7
                </a>
              </li>
              <li>
                <a 
                  href="https://www.curacasa.ch" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-background transition-all duration-300 hover:translate-x-1 inline-block"
                >
                  Curacasa
                </a>
              </li>
              <li>
                <a 
                  href="https://www.asi-ge.ch" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-background transition-all duration-300 hover:translate-x-1 inline-block"
                >
                  ASI Genève
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-background/20 text-center text-background/60 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
          <p>© 2025 Misad. Tous droits réservés.</p>
          <span className="hidden sm:inline" aria-hidden="true">·</span>
          <Link to="/confidentialite" className="hover:text-background transition-colors">
            Politique de confidentialité
          </Link>
          <span className="hidden sm:inline" aria-hidden="true">·</span>
          <button
            type="button"
            onClick={openCookiePreferences}
            className="hover:text-background transition-colors"
          >
            Gérer les cookies
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
