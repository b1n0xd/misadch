import { Card, CardContent, CardHeader } from "@/components/ui/card";
import serviceGeneral from "@/assets/service-general.jpg";
import serviceBasic from "@/assets/service-basic.jpg";
import serviceFollowup from "@/assets/service-paramedical.jpg";
import serviceCoordination from "@/assets/service-followup.jpg";

const ServicesSection = () => {
  const services = [
    {
      image: serviceGeneral,
      title: "Soins techniques",
      activities: [
        "Injectioins sous-cutané et intramusculaire",
        "Perfusion à domicile",
        "Nutrition entérale et parentérale",
        "Soins de plaie simple et complexe",
        "Soins de stomies (iléostomie, colostomie et éducation)",
        "Vaccins, contrôle INR, prélèvements à domicile",
      ],
    },
    {
      image: serviceBasic,
      title: "Soins de base",
      activities: [
        "Aide à la toilette et hygiène personnelle",
        "Aide à l'habillage",
        "Aide à la mobilisation",
        "Prévention des escarres",
        "Aide aux repas",
        "Accompagnement du quotidien",
      ],
    },
    {
      image: serviceCoordination,
      title: "Coordination",
      activities: [
        "Travail en équipe avec votre médecin et les autres professionnels de santé",
        "Organisation des soins adaptés à votre situation",
        "Soutien pour vous et vos proches tout au long du parcours de soins",
        "Partage clair et régulier des informations essentielles",
        "Suivi attentif de votre état de santé au quotidien",
        "Mise en place rapide de solutions en cas de besoin",
      ],
    },
    {
      image: serviceFollowup,
      title: "Suivi paramédical",
      activities: [
        "Surveillance et accompagnement des pathologies chroniques",
        "Bilan de santé régulier",
        "Éducation thérapeutique",
        "Détection précoce des complications potentielles et ajustement des soins",
        " Examen clinique infirmier : auscultation, palpation et percussion",
        "Gestion des médicaments",
        "Transmissions ciblées et directes avec le médecin traitant",
      ],
    },
  ];

  return (
    <section id="services" className="py-20 px-4 bg-muted">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Nos services
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Nous intervenons dans tout le canton de Genève, 7 j/7, pour des soins sûrs, efficaces et adaptés.
          </p>
        </div>

        {/* Coordination Card - Full Width */}
        <div className="mb-8">
          <Card 
            className="overflow-hidden border-none shadow-soft hover:shadow-strong transition-all duration-500 hover:-translate-y-2 bg-card animate-scale-in group max-w-4xl mx-auto"
            style={{ animationDelay: '0ms' }}
          >
            <div className="md:flex h-full">
              <div className="md:w-[45%] h-full min-h-64 overflow-hidden">
                <img
                  src={services[2].image}
                  alt={services[2].title}
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="md:w-[55%] p-8 flex flex-col justify-center">
                <h3 className="text-2xl font-semibold text-foreground mb-4">
                  {services[2].title}
                </h3>
                <ul className="space-y-3">
                  {services[2].activities.map((activity, actIndex) => (
                    <li key={actIndex} className="flex items-start gap-2 text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-secondary mt-2 flex-shrink-0" />
                      <span>{activity}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        </div>

        {/* Other Services - 3 columns */}
        <div className="grid md:grid-cols-3 gap-8">
          {services.filter((_, idx) => idx !== 2).map((service, index) => (
            <Card 
              key={index}
              className="overflow-hidden border-none shadow-soft hover:shadow-strong transition-all duration-500 hover:-translate-y-2 bg-card animate-scale-in group"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="h-72 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <CardHeader>
                <h3 className="text-2xl font-semibold text-foreground">
                  {service.title}
                </h3>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {service.activities.map((activity, actIndex) => (
                    <li
                      key={actIndex}
                      className="flex items-start gap-2 text-muted-foreground"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-secondary mt-2 flex-shrink-0" />
                      <span>{activity}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
