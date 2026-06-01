import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
  const faqs = [
    {
      question: "Quels sont vos horaires de disponibilité ?",
      answer:
        "Nous sommes disponibles 7 jours sur 7, y compris les week-ends et jours fériés. Notre équipe peut intervenir selon vos besoins, du lundi au dimanche.",
    },
    {
      question: "Vos services sont-ils couverts par l'assurance maladie ?",
      answer:
        "Oui, nos prestations sont prises en charge par l'assurance maladie de base (LAMal) sur prescription médicale. Nous nous occupons de toutes les démarches administratives.",
    },
    {
      question: "Intervenez-vous dans tout le canton de Genève ?",
      answer:
        "Oui, nous intervenons dans tout le canton de Genève et ses environs. N'hésitez pas à nous contacter pour vérifier si votre domicile est dans notre zone d'intervention.",
    },
    {
      question: "Comment puis-je faire une demande de soins ?",
      answer: (
        <>
          Vous pouvez nous contacter par téléphone au{" "}
          <a
            href="tel:+41227886595"
            className="font-bold text-blue-600"
          >
            022 788 65 95
          </a>
          , par email à{" "}
          <a
            href="mailto:info@misad.ch"
            className="font-bold text-blue-600"
          >
            info@misad.ch
          </a>
          , ou via le formulaire de contact disponible sur notre site internet.
          Nous fixerons un premier rendez-vous dans un délai de 48 heures afin
          de réaliser une évaluation initiale et planifier les soins adaptés à
          vos besoins.
        </>
      ),
    },
    {
      question: "Aurai-je toujours le même infirmier ?",
      answer:
        "Nous mettons tout en œuvre pour garantir la continuité des soins en favorisant la stabilité de notre équipe. Vous serez accompagné·e par un petit nombre d'infirmier·ère·s qui connaîtront parfaitement votre situation et vos besoins, afin de vous offrir un suivi personnalisé et de qualité.",
    },
    {
      question: "Quelles sont vos qualifications ?",
      answer:
        "Tous nos infirmier·ère·s sont diplômé·e·s et suivent régulièrement des formations pour rester à jour avec les dernières pratiques de soins. Nous sommes certifiés Curacasa 2024-2025, ce qui garantit la qualité, la sécurité et la conformité de nos services aux standards reconnus.",
    },
  ];

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Questions Fréquentes
          </h2>
          <p className="text-lg text-muted-foreground">
            Retrouvez les réponses aux questions les plus courantes
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-card border border-border rounded-lg px-6 shadow-soft transition-all duration-300 hover:shadow-md animate-fade-in"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <AccordionTrigger className="text-left hover:no-underline py-4">
                <span className="font-semibold text-foreground">
                  {faq.question}
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pb-4">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
