import { Button } from "@/components/ui/button";
import { Search, Music, Trophy } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import heroConcert from "@/assets/hero-concert.jpg";
import heroMatch from "@/assets/hero-match.jpg";

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    { image: heroConcert, type: "concert" },
    { image: heroMatch, type: "match" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Slideshow */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            currentSlide === index ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={slide.image}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Title */}
          <div className="space-y-4 animate-fade-in">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight">
              احجز تذاكرك لأفضل{" "}
              <span className="text-gradient-primary">الحفلات</span>
              {" "}و
              <span className="text-gradient-secondary">المباريات</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              اكتشف أحدث الفعاليات الترفيهية والرياضية واحجز مقعدك بسهولة وأمان
            </p>
          </div>

          {/* Search Bar */}
          <div
            className="bg-card/80 backdrop-blur-lg border border-border rounded-2xl p-2 max-w-2xl mx-auto animate-fade-in-up"
            style={{ animationDelay: "200ms" }}
          >
            <div className="flex flex-col md:flex-row gap-2">
              <div className="flex-1 relative">
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="ابحث عن فنان، فريق، أو فعالية..."
                  className="w-full h-12 pr-12 pl-4 bg-muted rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <Button variant="hero" size="lg" className="h-12">
                بحث
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div
            className="flex flex-wrap justify-center gap-4 animate-fade-in-up"
            style={{ animationDelay: "400ms" }}
          >
            <Link to="/concerts">
              <Button variant="heroOutline" size="lg" className="gap-2">
                <Music className="w-5 h-5" />
                تصفح الحفلات
              </Button>
            </Link>
            <Link to="/matches">
              <Button variant="heroOutline" size="lg" className="gap-2">
                <Trophy className="w-5 h-5" />
                تصفح المباريات
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div
            className="grid grid-cols-3 gap-8 max-w-lg mx-auto pt-8 animate-fade-in-up"
            style={{ animationDelay: "600ms" }}
          >
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary">+500</div>
              <div className="text-sm text-muted-foreground">فعالية</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-secondary">+1M</div>
              <div className="text-sm text-muted-foreground">تذكرة مباعة</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-accent">+100</div>
              <div className="text-sm text-muted-foreground">مدينة</div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              currentSlide === index
                ? "w-8 bg-primary"
                : "bg-muted-foreground/50 hover:bg-muted-foreground"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
