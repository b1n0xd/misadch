import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Encode the email subject and body
    const subject = encodeURIComponent(formData.subject || 'Nouveau message de contact');
    const body = encodeURIComponent(
      `Bonjour,\n\n` +
      `Je vous contacte via le formulaire de votre site web.\n\n` +
      `Nom: ${formData.name}\n` +
      `Email: ${formData.email}\n` +
      `Téléphone: ${formData.phone}\n` +
      `Sujet: ${formData.subject || 'Non spécifié'}\n\n` +
      `Message:\n${formData.message}\n\n` +
      `Cordialement,\n${formData.name}`
    );
    
    // Open default email client with pre-filled data
    window.location.href = `mailto:info@misad.ch?subject=${subject}&body=${body}`;
    
    // Show success message
    toast({
      title: "Email préparé !",
      description: "Votre client de messagerie s'ouvrira avec votre message pré-rempli.",
    });
    
    // Reset form
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  return (
    <section id="contact" className="py-20 px-4 bg-muted">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Contactez-nous
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Vous souhaitez en savoir plus ou planifier une première visite ? Contactez-nous, nous reviendrons vers vous rapidement.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-6 animate-slide-in-left">
            <div className="bg-card p-6 rounded-xl shadow-soft space-y-6 transition-all duration-300 hover:shadow-md">
              <h3 className="text-2xl font-semibold text-foreground mb-6">
                Informations de contact
              </h3>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary-light flex items-center justify-center flex-shrink-0">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Téléphone</p>
                  <p className="text-muted-foreground">022 788 65 95</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary-light flex items-center justify-center flex-shrink-0">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Email</p>
                  <p className="text-muted-foreground">info@misad.ch</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary-light flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Adresse</p>
                  <p className="text-muted-foreground">
                    Avenue Louis-Casaï 81, 1216 Cointrin<br />
                    Genève, Suisse
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary-light flex items-center justify-center flex-shrink-0">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Disponibilité</p>
                  <p className="text-muted-foreground">Interventions 7 jours sur 7 dans tout le canton de Genève.</p>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="bg-card p-4 rounded-xl shadow-soft">
              <h3 className="text-xl font-semibold text-foreground mb-4">
                Localisation
              </h3>
              <div className="aspect-video rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2759.8!2d6.1080!3d46.2290!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x478c6e8e8e8e8e8f%3A0x8e8e8e8e8e8e8e8e!2sAvenue%20Louis-Casai%2081%2C%201216%20Cointrin!5e0!3m2!1sfr!2sch!4v1699000000000"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Localisation Misad Genève"
                />
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-card p-8 rounded-xl shadow-soft animate-slide-in-right transition-all duration-300 hover:shadow-md">
            <h3 className="text-2xl font-semibold text-foreground mb-6">
              Envoyez-nous un message
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Votre nom <span className="text-destructive">*</span></Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="bg-background"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email <span className="text-destructive">*</span></Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="bg-background"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Téléphone <span className="text-destructive">*</span></Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                  className="bg-background"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Sujet</Label>
                <Input
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  required
                  className="bg-background"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message <span className="text-destructive">*</span></Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={5}
                  className="bg-background resize-none"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary-hover text-primary-foreground shadow-soft transition-all duration-300 hover:scale-105 hover:shadow-strong"
              >
                Préparer l'email
              </Button>
            </form>
          </div>
        </div>
      </div>

    </section>
  );
};

export default ContactSection;
