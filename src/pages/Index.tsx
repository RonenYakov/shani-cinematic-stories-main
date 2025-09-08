import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import StoriesGallery from "@/components/StoriesGallery";
import WeddingsVideoGallery from "@/components/WeddingsVideoGallery";
import BrandsVideoCarousel from "@/components/BrandsVideoCarousel";
import ContactSection from "@/components/ContactSection";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import BackToTopButton from "@/components/BackToTopButton";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <AboutSection />
      <StoriesGallery />
      <WeddingsVideoGallery />  
      <BrandsVideoCarousel /> 
      <ContactSection />
      <WhatsAppFloat />
      <BackToTopButton />
      <Footer />
    </div>
  );
};

export default Index;
