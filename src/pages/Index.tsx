import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturedEvents from "@/components/FeaturedEvents";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <FeaturedEvents />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
