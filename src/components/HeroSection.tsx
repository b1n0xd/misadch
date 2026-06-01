import { Button } from "@/components/ui/button";
import { Phone, Mail } from "lucide-react";
import heroImage from "@/assets/hero-nurse-patient.jpg";

const HeroSection = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="accueil" className="pt-32 pb-20 px-4">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-6 animate-slide-in-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              <span className="text-primary font-bold">MISAD</span> – Soins et maintien à domicile à Genève
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Nos prestations sont personnalisées et adaptées à vos besoins. Chez <span className="text-primary font-bold">MISAD</span>, nous plaçons l'humain au cœur du soin. Notre équipe d'infirmières et d'infirmiers vous accompagne à domicile avec chaleur, écoute et professionnalisme.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href="tel:+41227886595"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-6 py-2 shadow-soft transition-all duration-300 hover:scale-105 hover:shadow-strong text-base"
              >
                <Phone className="h-5 w-5" />
                Appeler maintenant
              </a>
              <a 
                href="mailto:info@misad.ch"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium border-2 border-primary text-primary hover:bg-primary-light h-11 px-6 py-2 transition-all duration-300 hover:scale-105 text-base"
              >
                <Mail className="h-5 w-5" />
                Nous contacter
              </a>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative animate-slide-in-right">
            <div className="relative rounded-2xl overflow-hidden shadow-strong transition-all duration-500 hover:shadow-xl hover:scale-[1.02]">
              <img
                src={heroImage}
                alt="Infirmière professionnelle prodiguant des soins à domicile à Genève"
                className="w-full h-auto object-cover"
                width={1200}
                height={800}
                sizes="(max-width: 768px) 100vw, 50vw"
                loading="eager"
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                  objectFit: 'cover',
                  objectPosition: 'center center'
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
