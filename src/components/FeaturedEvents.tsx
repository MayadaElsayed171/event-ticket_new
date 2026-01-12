import { events } from "@/data/events";
import EventCard from "./EventCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Music, Trophy } from "lucide-react";

const FeaturedEvents = () => {
  const concerts = events.filter((e) => e.type === "concert").slice(0, 3);
  const matches = events.filter((e) => e.type === "match").slice(0, 3);

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Concerts Section */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                <Music className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  أحدث الحفلات
                </h2>
                <p className="text-muted-foreground">
                  لا تفوت أفضل الحفلات الغنائية
                </p>
              </div>
            </div>
            <Link to="/concerts">
              <Button variant="ghost" className="gap-2 group">
                عرض الكل
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {concerts.map((event, index) => (
              <EventCard key={event.id} event={event} index={index} />
            ))}
          </div>
        </div>

        {/* Matches Section */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center">
                <Trophy className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  أهم المباريات
                </h2>
                <p className="text-muted-foreground">
                  تابع فريقك المفضل مباشرة من الملعب
                </p>
              </div>
            </div>
            <Link to="/matches">
              <Button variant="ghost" className="gap-2 group">
                عرض الكل
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {matches.map((event, index) => (
              <EventCard key={event.id} event={event} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedEvents;
