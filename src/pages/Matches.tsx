import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EventCard from "@/components/EventCard";
import { getMatches } from "@/data/events";
import { Trophy } from "lucide-react";

const Matches = () => {
  const matches = getMatches();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="text-center mb-12 space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-secondary/20 flex items-center justify-center mx-auto">
              <Trophy className="w-8 h-8 text-secondary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              المباريات الرياضية
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              تابع فريقك المفضل من الملعب واحجز تذكرتك لأهم المباريات
            </p>
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {matches.map((event, index) => (
              <EventCard key={event.id} event={event} index={index} />
            ))}
          </div>

          {matches.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground">لا توجد مباريات متاحة حالياً</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Matches;
