import { Clock, Users, Shield, Award, MapPin, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const ValuePropositions = () => {
  const values = [
    {
      icon: Clock,
      title: "Disponible 7j/7",
      description: "Notre équipe est à votre service tous les jours de la semaine pour répondre à vos besoins.",
    },
    {
      icon: Users,
      title: "Équipe expérimentée et constante",
      description: "Bénéficiez d'un suivi personnalisé avec les mêmes professionnels de santé.",
    },
    {
      icon: Shield,
      title: "Couvert par l'assurance",
      description: "Nos prestations bénéficient d'une prise en charge complète par les assurances maladie suisses.",
    },
    {
      icon: Award,
      title: "20+ ans d'expérience",
      description: "Notre équipe est composée d'infirmier·ère·s diplômé·e·s à différentes périodes, cumulant ensemble plus de 20 ans d'expérience en soins infirmiers.",
    },
    {
      icon: MapPin,
      title: "Canton de Genève",
      description: "Soins et interventions à domicile partout dans le canton de Genève et ses environs.",
    },
    {
      icon: CheckCircle,
      title: "Label qualité",
      description: "Certifié Curacasa 2024-2025 pour une qualité de service garantie.",
    },
  ];

  return (
    <section className="py-20 px-4 bg-muted">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <Card 
                key={index} 
                className="border-none shadow-soft hover:shadow-strong transition-all duration-500 hover:-translate-y-2 bg-card animate-fade-in-up group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6 space-y-4">
                  <div className="w-14 h-14 rounded-xl bg-primary-light flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-primary">
                    <Icon className="h-7 w-7 text-primary transition-colors duration-300 group-hover:text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ValuePropositions;
