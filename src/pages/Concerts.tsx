import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EventCard from "@/components/EventCard";
import { getConcerts } from "@/data/events";
import { Music } from "lucide-react";

const Concerts = () => {
  const concerts = getConcerts();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="text-center mb-12 space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto">
              <Music className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              الحفلات الغنائية
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              اكتشف أفضل الحفلات الغنائية لنجوم الطرب والبوب العربي واحجز مقعدك الآن
            </p>
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {concerts.map((event, index) => (
              <EventCard key={event.id} event={event} index={index} />
            ))}
          </div>

          {concerts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground">لا توجد حفلات متاحة حالياً</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Concerts;
