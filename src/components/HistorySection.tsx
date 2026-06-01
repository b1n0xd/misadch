import historyImage from "@/assets/history-healthcare.jpg";

const HistorySection = () => {

  return (
    <section id="historique" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-6 animate-slide-in-left">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Nos valeurs
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Des soins à taille humaine, une équipe proche de vous. Fondée à Genève, MISAD rassemble une équipe mixte d’infirmier·ère·s diplômé·e·s, fort·e·s de plus de 20 ans d’expérience cumulée dans les soins à domicile.
 </p>
              <p>
                Nous sommes convaincu·e·s que le soin ne se limite pas à un simple acte médical : c’est avant tout une <span className="text-primary font-bold">relation de confiance</span>, de <span className="text-primary font-bold">respect</span> et de <span className="text-primary font-bold">bienveillance</span>. Pour garantir un accompagnement de qualité et personnalisé, nous limitons volontairement le nombre d’intervenant·e·s par patient·e afin de préserver le lien humain et la continuité des soins.



              </p>
              <p>Nos valeurs fondamentales sont le respect de la <span className="text-primary font-bold">dignité</span>, l’humanité, la <span className="text-primary font-bold">bienfaisance</span>, l’<span className="text-primary font-bold">écoute active</span>, la <span className="text-primary font-bold">confidentialité</span> et la <span className="text-primary font-bold">solidarité</span>. Elles guident chacune de nos interventions et nourrissent notre engagement quotidien auprès des personnes que nous accompagnons.</p>
            </div>
          </div>
      
          {/* Image */}
          <div className="relative animate-slide-in-right">
            <div className="relative rounded-2xl overflow-hidden shadow-strong transition-all duration-500 hover:shadow-xl hover:scale-[1.02]">
              <img
                src={historyImage}
                alt="Professionnel de santé Misad avec un patient"
                className="w-full h-auto object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HistorySection;
