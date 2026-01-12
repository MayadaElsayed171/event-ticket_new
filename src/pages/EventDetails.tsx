import { useParams, Link } from "react-router-dom";
import { getEventById } from "@/data/events";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  ArrowRight,
  Minus,
  Plus,
  CreditCard,
} from "lucide-react";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { useState } from "react";
import { toast } from "sonner";

const ticketCategories = [
  { id: "vip", name: "VIP", price: 1500, available: 50 },
  { id: "premium", name: "بريميوم", price: 800, available: 200 },
  { id: "standard", name: "عادي", price: 400, available: 500 },
  { id: "economy", name: "اقتصادي", price: 200, available: 1000 },
];

const EventDetails = () => {
  const { id } = useParams<{ id: string }>();
  const event = getEventById(id || "");
  const [selectedCategory, setSelectedCategory] = useState(ticketCategories[0]);
  const [quantity, setQuantity] = useState(1);

  if (!event) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-foreground">الفعالية غير موجودة</h1>
          <Link to="/">
            <Button variant="hero">العودة للرئيسية</Button>
          </Link>
        </div>
      </div>
    );
  }

  const formattedDate = format(new Date(event.date), "EEEE d MMMM yyyy", {
    locale: ar,
  });

  const handleBooking = () => {
    toast.success(
      `تم حجز ${quantity} تذكرة ${selectedCategory.name} بنجاح!`,
      {
        description: `المجموع: ${selectedCategory.price * quantity} ${event.currency}`,
      }
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <div className="relative h-[50vh] min-h-[400px]">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        </div>

        <div className="container mx-auto px-4 -mt-32 relative z-10 pb-16">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Event Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Link to="/" className="hover:text-primary transition-colors">
                  الرئيسية
                </Link>
                <ArrowRight className="w-4 h-4" />
                <Link
                  to={event.type === "concert" ? "/concerts" : "/matches"}
                  className="hover:text-primary transition-colors"
                >
                  {event.type === "concert" ? "الحفلات" : "المباريات"}
                </Link>
                <ArrowRight className="w-4 h-4" />
                <span className="text-foreground">{event.title}</span>
              </div>

              {/* Title & Badges */}
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge variant={event.type === "concert" ? "concert" : "match"}>
                    {event.type === "concert" ? "حفلة" : "مباراة"}
                  </Badge>
                  {event.isLive && <Badge variant="live">مباشر</Badge>}
                  <Badge variant="outline">{event.category}</Badge>
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
                  {event.title}
                </h1>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="p-4 text-center">
                  <Calendar className="w-6 h-6 text-primary mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">التاريخ</p>
                  <p className="font-semibold text-foreground text-sm">
                    {formattedDate}
                  </p>
                </Card>
                <Card className="p-4 text-center">
                  <Clock className="w-6 h-6 text-secondary mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">الوقت</p>
                  <p className="font-semibold text-foreground">{event.time}</p>
                </Card>
                <Card className="p-4 text-center">
                  <MapPin className="w-6 h-6 text-accent mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">المكان</p>
                  <p className="font-semibold text-foreground text-sm">
                    {event.venue}
                  </p>
                </Card>
                <Card className="p-4 text-center">
                  <Users className="w-6 h-6 text-primary mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">المقاعد المتاحة</p>
                  <p className="font-semibold text-foreground">
                    {event.availableSeats.toLocaleString("ar-EG")}
                  </p>
                </Card>
              </div>

              {/* Description */}
              <Card className="p-6">
                <h2 className="text-xl font-bold text-foreground mb-4">
                  عن الفعالية
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {event.type === "concert" ? (
                    <>
                      استعد لليلة لا تُنسى مع النجم {event.artist} في حفل استثنائي
                      يجمع بين أجمل الأغاني القديمة والجديدة. سيقدم الفنان
                      مجموعة من أشهر أغانيه التي أحبها الجمهور على مر السنين،
                      بالإضافة إلى مفاجآت خاصة للحضور.
                    </>
                  ) : (
                    <>
                      لا تفوت مباراة القمة بين {event.homeTeam} و {event.awayTeam}{" "}
                      في إطار منافسات {event.category}. مباراة حماسية منتظرة
                      بين أقوى الفرق في البطولة. كن جزءاً من الأجواء الحماسية
                      وشجع فريقك المفضل من قلب الملعب.
                    </>
                  )}
                </p>
              </Card>
            </div>

            {/* Booking Card */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24 p-6 space-y-6 border-primary/20">
                <div className="text-center pb-4 border-b border-border">
                  <p className="text-sm text-muted-foreground mb-1">السعر يبدأ من</p>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold text-primary">
                      {event.price}
                    </span>
                    <span className="text-muted-foreground">{event.currency}</span>
                  </div>
                </div>

                {/* Category Selection */}
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-foreground">
                    اختر الفئة
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {ticketCategories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat)}
                        className={`p-3 rounded-lg border text-center transition-all ${
                          selectedCategory.id === cat.id
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <p className="font-semibold text-sm">{cat.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {cat.price} {event.currency}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity */}
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-foreground">
                    عدد التذاكر
                  </label>
                  <div className="flex items-center justify-center gap-4">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="text-2xl font-bold text-foreground w-12 text-center">
                      {quantity}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(Math.min(10, quantity + 1))}
                      disabled={quantity >= 10}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Total */}
                <div className="bg-muted rounded-lg p-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {selectedCategory.name} × {quantity}
                    </span>
                    <span className="text-foreground">
                      {selectedCategory.price * quantity} {event.currency}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">رسوم الخدمة</span>
                    <span className="text-foreground">
                      {Math.round(selectedCategory.price * quantity * 0.05)}{" "}
                      {event.currency}
                    </span>
                  </div>
                  <div className="border-t border-border pt-2 flex justify-between font-bold">
                    <span className="text-foreground">المجموع</span>
                    <span className="text-primary">
                      {Math.round(selectedCategory.price * quantity * 1.05)}{" "}
                      {event.currency}
                    </span>
                  </div>
                </div>

                {/* Book Button */}
                <Button
                  variant="hero"
                  size="xl"
                  className="w-full gap-2"
                  onClick={handleBooking}
                >
                  <CreditCard className="w-5 h-5" />
                  احجز الآن
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  الدفع آمن 100% • استرجاع سهل
                </p>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EventDetails;
