import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ValuePropositions from "@/components/ValuePropositions";
import HistorySection from "@/components/HistorySection";
import TeamSection from "@/components/TeamSection";
import ServicesSection from "@/components/ServicesSection";
import TarifsSection from "@/components/TarifsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <ValuePropositions />
        <HistorySection />
        <TeamSection />
        <ServicesSection />
        <TarifsSection />
        <TestimonialsSection />
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
