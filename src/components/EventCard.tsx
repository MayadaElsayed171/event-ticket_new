import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Event } from "@/types/event";
import { Calendar, MapPin, Clock } from "lucide-react";
import { format } from "date-fns";
import { ar } from "date-fns/locale";

interface EventCardProps {
  event: Event;
  index?: number;
}

const EventCard = ({ event, index = 0 }: EventCardProps) => {
  const formattedDate = format(new Date(event.date), "d MMMM yyyy", { locale: ar });

  return (
    <Link to={`/event/${event.id}`}>
      <Card
        className="group overflow-hidden hover:border-primary/50 hover:-translate-y-2 cursor-pointer"
        style={{ animationDelay: `${index * 100}ms` }}
      >
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          
          {/* Badges */}
          <div className="absolute top-3 right-3 flex gap-2">
            <Badge variant={event.type === "concert" ? "concert" : "match"}>
              {event.type === "concert" ? "حفلة" : "مباراة"}
            </Badge>
            {event.isLive && <Badge variant="live">مباشر</Badge>}
          </div>

          {/* Price */}
          <div className="absolute bottom-3 left-3">
            <div className="bg-background/90 backdrop-blur-sm rounded-lg px-3 py-1.5 border border-border">
              <span className="text-lg font-bold text-primary">{event.price}</span>
              <span className="text-sm text-muted-foreground mr-1">{event.currency}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          <div>
            <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">
              {event.title}
            </h3>
            <p className="text-sm text-muted-foreground">{event.category}</p>
          </div>

          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-secondary" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-accent" />
              <span>{event.venue}، {event.city}</span>
            </div>
          </div>

          <Button variant="heroOutline" className="w-full">
            احجز الآن
          </Button>
        </div>
      </Card>
    </Link>
  );
};

export default EventCard;
