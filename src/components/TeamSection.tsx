import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import miguelImage from "@/assets/miguel.webp";
import marcusImage from "@/assets/marcus.webp";
import charleneImage from "@/assets/charlene.webp";
import anthonyImage from "@/assets/anthony.webp";

const TeamSection = () => {
  const team = [
    {
      name: "Miguel DUARTE",
      role: "Infirmier",
avatar: "MD",
      image: miguelImage,
      fullDescription: `Miguel Duarte, infirmier passionné, a eu l'opportunité d'exercer dans de nombreux services, notamment la maternité, la médecine générale, la pédiatrie, la chirurgie, la gériatrie, la psycho-gériatrie, la santé publique ainsi que les soins à domicile.

Cette diversité d'expériences lui a permis de développer des compétences solides, mais surtout une approche profondément humaine du soin.

Au fil des années, une conviction s'est imposée au cœur de sa pratique : prendre soin avant tout. Être à l'écoute, accompagner avec bienveillance, rassurer et instaurer une relation de confiance sont, pour lui, aussi essentiels que les actes techniques.

Chaque patient, chaque parcours, chaque rencontre donne du sens à son métier et nourrit sa motivation au quotidien.

C'est avec engagement, empathie et professionnalisme qu'il poursuit sa mission : offrir des soins attentionnés, adaptés et respectueux de chacun.`,
specializations: [
        "Gériatrie",
        "Soins palliatifs",
        "Gestion de la douleur",
        "Coordination d'équipe"
      ],
      certifications: [
        "Diplôme d'État d'Infirmier",
        "Certification en soins palliatifs",
        "Formation en gériatrie avancée"
      ],
      languages: ["Français", "Portugais", "Espagnol"]
    },
    {
      name: "Marcus CONCEICAO",
      role: "Infirmier",
avatar: "MF",
      image: marcusImage,
      fullDescription: "Marcus Conceicao est infirmier diplômé de la Haute École de Santé de Genève depuis 2015. Fort d’une expérience solide aux Hôpitaux Universitaires de Genève, il met aujourd’hui son expertise au service des soins à domicile en tant qu’indépendant.Son approche est centrée sur le patient et son entourage, avec un engagement fort pour des soins personnalisés, de qualité et empreints d’écoute, d’empathie et de respect. Marcus collabore étroitement avec les familles et les médecins pour assurer un accompagnement coordonné et adapté à chaque situation, du suivi post-opératoire aux soins palliatifs.Sa mission : offrir un soutien humain et professionnel à chaque étape du parcours de soin, pour le bien-être des patients et la sérénité de leurs proches.",
specializations: [
        "Soins post-opératoires",
        "Pansements complexes",
        "Médecine interne",
        "Suivi cardiovasculaire"
      ],
      certifications: [
        "Diplôme d'État d'Infirmier",
        "Certification en soins post-opératoires",
        "Formation en éducation thérapeutique"
      ],
      languages: ["Portugais", "Français", "Espagnol", "Anglais"]
    },
    {
      name: "Charlène ALBIACH",
      role: "Infirmière",
      avatar: "CA",
      image: charleneImage,
      fullDescription: "Infirmière passionnée, j’ai obtenu mon Bachelor en soins infirmiers à Paris, un diplôme reconnu par la Croix-Rouge suisse. Après deux années en réanimation à l’AP-HP, j’ai rejoint Genève en 2020 pour participer à la prise en charge des patients Covid-19 aux soins intensifs des HUG, où j’ai exercé plusieurs années.Ces expériences m’ont appris que la qualité des soins repose autant sur la maîtrise professionnelle que sur la bienveillance et l’écoute. Être présente, rassurante et attentive aux besoins de chacun est au cœur de ma pratique quotidienne. Aujourd’hui infirmière à domicile à Genève, j’ai à cœur d’offrir des soins personnalisés, respectueux et de qualité, tout en créant un lien de confiance avec chaque patient.",
specializations: [
        "Médecine aiguë",
        "Coordination des soins",
        "Réanimation",
        "Education thérapeutique"
      ],
      certifications: [
        "Diplôme d'État d'Infirmier",
        "Certification en diabétologie",
        "Formation en éducation thérapeutique"
      ],
      languages: ["Français"]
    },
    {
      name: "Anthony ANSARD",
      role: "Infirmier",
      avatar: "AA",
      image: anthonyImage,
      fullDescription: `Infirmier diplômé d'État, formé à Caen en France, je bénéficie d'une solide expérience clinique acquise sur plus de onze années. J'ai exercé pendant sept ans au sein d'un centre de lutte contre le cancer, principalement en chirurgie et en soins intermédiaires, ce qui m'a permis de développer une prise en charge rigoureuse de patients aux situations complexes. J'ai ensuite poursuivi mon parcours professionnel aux Hôpitaux universitaires de Genève (HUG), où j'ai exercé depuis quatre ans en chirurgie de la division privée.

Reconnu pour mon sens du respect, mon empathie et ma bienveillance, je place le patient au cœur de ma pratique. Dynamique et engagé, je veille au bien-être physique et psychologique des patients tout en accordant une attention particulière au confort et à l'accompagnement de l'entourage, dans une approche globale et humaine des soins.`,
      specializations: [
        "Diabétologie",
        "Chirurgie générale",
        "Oncologie",
        "Soins / pansements complexes"
      ],
      certifications: [
        "Diplôme d'État d'Infirmier"
      ],
      languages: ["Français", "Anglais"]
    },
  ];

  return (
    <section className="py-20 px-4 bg-muted">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Notre équipe
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Des professionnels qualifiés et dévoués à votre service
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {team.map((member, index) => (
            <TeamMemberCard key={index} member={member} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const TeamMemberCard = ({ member, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    if (isExpanded && cardRef.current) {
      setTimeout(() => {
        const headerOffset = 100;
        const elementPosition = cardRef.current.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }, 100);
    }
  }, [isExpanded]);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Card 
      ref={cardRef}
      className={`border-none shadow-soft hover:shadow-strong transition-all duration-500 bg-card animate-scale-in group ${isExpanded ? 'md:col-span-2 lg:col-span-4' : ''}`}
      style={{ animationDelay: `${index * 120}ms` }}
    >
      <CardContent className="p-6 space-y-4">
        {!isExpanded ? (
          // Collapsed View
          <div className="text-center space-y-4">
            <div className="w-32 h-32 rounded-full bg-gradient-hero mx-auto flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 overflow-hidden">
              {member.image ? (
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-full object-cover object-[center_10%]"
                />
              ) : (
                <span className="text-4xl font-bold text-white">
                  {member.avatar}
                </span>
              )}
            </div>
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-1">
                {member.name}
              </h3>
              <p className="text-secondary font-medium mb-3">
                {member.role}
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {member.bio}
              </p>
            </div>
          </div>
        ) : (
          // Expanded View
          <div className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              {/* Photo and Basic Info */}
              <div className="md:col-span-1 text-center space-y-4">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 rounded-xl object-cover object-[center_10%] shadow-md"
                />
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-1">
                    {member.name}
                  </h3>
                  <p className="text-secondary font-semibold mb-2">
                    {member.role}
                  </p>
                  <p className="text-xs text-muted-foreground font-medium">
                    {member.experience}
                  </p>
                </div>
              </div>

              {/* Description and Details */}
              <div className="md:col-span-2 space-y-6">
                {/* Full Description */}
                <div>
                  <h4 className="font-bold text-foreground mb-3 text-lg">
                    À propos
                  </h4>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    {member.fullDescription}
                  </p>
                </div>

                {/* Three Columns for Details */}
                <div className="grid md:grid-cols-3 gap-4">
                  {/* Specializations */}
                  <div>
                    <h4 className="font-semibold text-foreground mb-3 text-sm">
                      Expériences
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {member.specializations.map((spec, idx) => (
                        <span 
                          key={idx}
                          className="text-xs bg-primary-light text-primary px-2 py-1 rounded-full"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Certifications - Disabled
                  <div>
                    <h4 className="font-semibold text-foreground mb-3 text-sm">
                      Certifications
                    </h4>
                    <ul className="space-y-2">
                      {member.certifications.map((cert, idx) => (
                        <li key={idx} className="text-xs text-muted-foreground flex items-start gap-2">
                          <span className="text-secondary mt-0.5 font-bold">✓</span>
                          <span>{cert}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  */}

                  {/* Languages */}
                  <div>
                    <h4 className="font-semibold text-foreground mb-3 text-sm">
                      Langues
                    </h4>
                    <div className="space-y-2">
                      {member.languages.map((lang, idx) => (
                        <div key={idx} className="text-xs text-muted-foreground flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-secondary"></span>
                          {lang}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Toggle Button */}
        <Button
          onClick={handleToggle}
          variant="outline"
          size="sm"
          className="w-full transition-all duration-300 mt-4"
        >
          <ChevronDown 
            className={`h-4 w-4 mr-2 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
          />
          {isExpanded ? "Fermer" : "Plus d'infos"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default TeamSection;
