import { useEffect, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Logo from "@/components/Logo";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { openCookiePreferences } from "@/lib/cookieConsent";

const LAST_UPDATED = "10 octobre 2026";

const Section = ({ title, children }: { title: string; children: ReactNode }) => (
  <section className="space-y-3">
    <h2 className="text-xl md:text-2xl font-semibold text-foreground">{title}</h2>
    <div className="space-y-3 text-muted-foreground leading-relaxed">{children}</div>
  </section>
);

const cookies = [
  {
    name: "misad-cookie-consent",
    provider: "Misad (stockage local du navigateur)",
    purpose: "Mémoriser votre choix concernant les cookies.",
    category: "Strictement nécessaire",
    duration: "Jusqu'à suppression par vous",
  },
  {
    name: "NID, AEC, SOCS et autres",
    provider: "Google (carte Google Maps)",
    purpose: "Afficher la carte interactive et mémoriser vos préférences Google.",
    category: "Service tiers — avec votre accord",
    duration: "Fixée par Google (jusqu'à 13 mois)",
  },
];

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    const previousTitle = document.title;
    document.title = "Politique de confidentialité et cookies - Misad";
    return () => {
      document.title = previousTitle;
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-border bg-background">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <Link to="/" aria-label="Accueil Misad">
            <Logo size="sm" />
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-hover"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour à l'accueil
          </Link>
        </div>
      </header>

      <main className="flex-1 py-12 md:py-16 px-4">
        <article className="container mx-auto max-w-3xl space-y-10">
          <div className="space-y-3">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              Politique de confidentialité et cookies
            </h1>
            <p className="text-sm text-muted-foreground">Dernière mise à jour : {LAST_UPDATED}</p>
            <p className="text-muted-foreground leading-relaxed">
              La protection de vos données personnelles est importante pour nous. Cette page
              explique quelles données sont traitées lorsque vous consultez le site misad.ch ou
              nous contactez, et comment vous pouvez exercer vos droits. Elle est établie
              conformément à la loi fédérale sur la protection des données (LPD) et, lorsqu'il
              s'applique, au Règlement général sur la protection des données de l'Union
              européenne (RGPD).
            </p>
          </div>

          <Section title="1. Responsable du traitement">
            <p>
              Misad — Mon infirmier soins à domicile
              <br />
              Avenue Louis-Casaï 81, 1216 Cointrin, Genève, Suisse
              <br />
              E-mail :{" "}
              <a href="mailto:info@misad.ch" className="text-primary underline underline-offset-2">
                info@misad.ch
              </a>
              <br />
              Téléphone : 022 788 65 95
            </p>
          </Section>

          <Section title="2. Données traitées">
            <p>
              <strong className="text-foreground">Consultation du site.</strong> Lors de chaque
              visite, notre hébergeur enregistre automatiquement des données techniques (adresse
              IP, date et heure, page consultée, type de navigateur). Ces données servent
              uniquement à assurer le fonctionnement et la sécurité du site et ne sont pas
              utilisées pour vous identifier.
            </p>
            <p>
              <strong className="text-foreground">Formulaire de contact et e-mail.</strong> Le
              formulaire de contact n'enregistre aucune donnée sur notre site : il ouvre votre
              propre logiciel de messagerie avec un message pré-rempli. Les données que vous nous
              envoyez par e-mail ou par téléphone (nom, coordonnées, message) sont utilisées
              uniquement pour répondre à votre demande et organiser nos prestations. Nous vous
              recommandons de ne pas transmettre d'informations médicales détaillées par e-mail ;
              nous les recueillerons avec vous de manière confidentielle.
            </p>
            <p>
              <strong className="text-foreground">WhatsApp et Google.</strong> Les liens vers
              WhatsApp, Google Maps ou les avis Google vous dirigent vers des services tiers. Leur
              propre politique de confidentialité s'applique dès que vous les utilisez.
            </p>
          </Section>

          <Section title="3. Cookies et technologies similaires">
            <p>
              Notre site n'utilise <strong className="text-foreground">aucun cookie de mesure
              d'audience, de publicité ni de suivi</strong>. Les polices de caractères sont
              hébergées sur notre propre serveur, sans appel à Google Fonts.
            </p>
            <p>
              La carte de la section « Contact » est fournie par Google Maps. Elle ne se charge
              qu'après votre accord, car Google dépose alors des cookies et reçoit votre adresse
              IP. Sans accord, la carte est remplacée par un lien « Ouvrir dans Google Maps ».
            </p>

            <div className="overflow-x-auto rounded-lg border border-border">
              <table className="w-full text-sm text-left">
                <thead className="bg-muted text-foreground">
                  <tr>
                    <th className="p-3 font-semibold">Nom</th>
                    <th className="p-3 font-semibold">Fournisseur</th>
                    <th className="p-3 font-semibold">Finalité</th>
                    <th className="p-3 font-semibold">Catégorie</th>
                    <th className="p-3 font-semibold">Durée</th>
                  </tr>
                </thead>
                <tbody>
                  {cookies.map((cookie) => (
                    <tr key={cookie.name} className="border-t border-border align-top">
                      <td className="p-3 font-mono text-xs text-foreground">{cookie.name}</td>
                      <td className="p-3">{cookie.provider}</td>
                      <td className="p-3">{cookie.purpose}</td>
                      <td className="p-3">{cookie.category}</td>
                      <td className="p-3">{cookie.duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p>
              Vous pouvez modifier ou retirer votre consentement à tout moment. Vous pouvez aussi
              supprimer les cookies dans les réglages de votre navigateur.
            </p>
            <Button variant="outline" onClick={openCookiePreferences}>
              Gérer les cookies
            </Button>
          </Section>

          <Section title="4. Transfert de données à l'étranger">
            <p>
              Si vous acceptez la carte Google Maps, des données peuvent être transmises à Google
              Ireland Limited (Irlande) et à Google LLC (États-Unis). Google LLC est certifiée
              au Data Privacy Framework Suisse–États-Unis et UE–États-Unis, reconnu par le
              Conseil fédéral et la Commission européenne comme garantissant un niveau de
              protection adéquat. Plus d'informations :{" "}
              <a
                href="https://policies.google.com/privacy?hl=fr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline underline-offset-2"
              >
                règles de confidentialité de Google
              </a>
              .
            </p>
          </Section>

          <Section title="5. Durée de conservation">
            <p>
              Nous conservons vos données uniquement le temps nécessaire au traitement de votre
              demande ou à l'exécution de nos prestations, puis pendant la durée imposée par les
              obligations légales (notamment comptables et de tenue du dossier de soins).
            </p>
          </Section>

          <Section title="6. Vos droits">
            <p>
              Vous pouvez à tout moment demander l'accès à vos données, leur rectification ou
              leur effacement, vous opposer à leur traitement ou demander leur remise dans un
              format courant. Écrivez-nous à{" "}
              <a href="mailto:info@misad.ch" className="text-primary underline underline-offset-2">
                info@misad.ch
              </a>
              . Nous pourrons vous demander une preuve d'identité.
            </p>
            <p>
              Vous pouvez également adresser une réclamation au Préposé fédéral à la protection
              des données et à la transparence (PFPDT,{" "}
              <a
                href="https://www.edoeb.admin.ch"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline underline-offset-2"
              >
                www.edoeb.admin.ch
              </a>
              ) ou, si vous résidez dans l'Union européenne, à l'autorité de protection des
              données de votre pays.
            </p>
          </Section>

          <Section title="7. Sécurité">
            <p>
              Le site est accessible via une connexion chiffrée (HTTPS). Nous prenons des mesures
              techniques et organisationnelles appropriées pour protéger vos données contre la
              perte et l'accès non autorisé.
            </p>
          </Section>

          <Section title="8. Modifications">
            <p>
              Nous pouvons adapter cette politique, notamment si nos services ou la loi évoluent.
              La version en vigueur est celle publiée sur cette page.
            </p>
          </Section>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
