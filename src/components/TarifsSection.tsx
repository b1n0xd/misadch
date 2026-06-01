import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { DollarSign, CheckCircle } from "lucide-react";

const TarifsSection = () => {
  const lamalTarifs = [
    {
      type: "Évaluation et conseil (art. 7 al. 2 let. A OPAS)",
      tarif: "CHF 76.90",
      unit: "/ heure",
    },
    {
      type: "Examens et traitements (art. 7 al. 2 let. B OPAS)",
      tarif: "CHF 63.00",
      unit: "/ heure",
    },
    {
      type: "Soins de base (art. 7 al. 2 let. C OPAS)",
      tarif: "CHF 52.60",
      unit: "/ heure",
    },
  ];

  const aiTarifs = [
    {
      type: "Évaluation et conseil",
      tarif: "CHF 103.56",
      unit: "/ heure",
    },
    {
      type: "Examens et traitements",
      tarif: "CHF 103.56",
      unit: "/ heure",
    },
    {
      type: "Soins de base",
      tarif: "CHF 81.00",
      unit: "/ heure",
    },
  ];

  return (
    <section id="tarifs" className="py-20 px-4 bg-muted">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <div className="text-center mb-6">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Tarifs
            </h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Chez MISAD, la transparence est essentielle. Nos interventions sont réglementées par la LAMal et prises en charge par les assurances (OPAS).
          </p>
        </div>

        {/* Contribution du patient */}
        <div className="mb-12 max-w-2xl mx-auto">
          <Card className="border-2 border-secondary bg-card shadow-soft hover:shadow-strong transition-all duration-300 animate-fade-in">
            <CardHeader>
              <h3 className="text-2xl font-semibold text-foreground flex items-center gap-2">
                <CheckCircle className="h-6 w-6 text-secondary" />
                Contribution du patient
              </h3>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <p className="text-5xl font-bold text-secondary mb-2">
                  CHF 10.–
                </p>
                <p className="text-lg text-muted-foreground">
                  par jour de visite (uniquement les jours avec prestation)
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tarifs LAMal et AI/LAA */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* LAMal */}
          <Card className="border-none shadow-soft hover:shadow-strong transition-all duration-500 bg-card animate-slide-in-left">
            <CardHeader>
              <h3 className="text-2xl font-semibold text-foreground mb-2">
                Tarifs LAMal
              </h3>
              <p className="text-muted-foreground">
                Assurance maladie de base
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {lamalTarifs.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between pb-4 border-b border-border last:border-b-0"
                  >
                    <div>
                      <p className="font-medium text-foreground">
                        {item.type}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-secondary">
                        {item.tarif}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {item.unit}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-primary-light rounded-lg">
                <p className="text-sm text-foreground flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>
                    Prise en charge directe par votre assurance (tiers payant), selon prescription médicale.
                  </span>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* AI / LAA / Assurance militaire */}
          <Card className="border-none shadow-soft hover:shadow-strong transition-all duration-500 bg-card animate-slide-in-right">
            <CardHeader>
              <h3 className="text-2xl font-semibold text-foreground mb-2">
                Tarifs des soins pour LAA & LAI
              </h3>
              <p className="text-muted-foreground">
                LAA = Assurance accident
              </p>
              <p className="text-muted-foreground">
                LAI = Assurance invalidité  
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {aiTarifs.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between pb-4 border-b border-border last:border-b-0"
                  >
                    <div>
                      <p className="font-medium text-foreground">
                        {item.type}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-secondary">
                        {item.tarif}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {item.unit}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-secondary/10 rounded-lg">
                <p className="text-sm text-foreground flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                  <span>
                    Prise en charge directe par votre assurance (tiers payant), selon prescription médicale.
                  </span>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default TarifsSection;
