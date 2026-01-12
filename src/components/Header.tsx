import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Music, Trophy, Ticket, Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { href: "/", label: "الرئيسية", icon: null },
    { href: "/concerts", label: "الحفلات", icon: Music },
    { href: "/matches", label: "المباريات", icon: Trophy },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 right-0 left-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg group-hover:shadow-primary/30 transition-shadow">
              <Ticket className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">تذكرتي</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.href} to={link.href}>
                <Button
                  variant={isActive(link.href) ? "default" : "ghost"}
                  className={cn(
                    "gap-2",
                    isActive(link.href) && "bg-primary/10 text-primary hover:bg-primary/20"
                  )}
                >
                  {link.icon && <link.icon className="w-4 h-4" />}
                  {link.label}
                </Button>
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:block">
            <Button variant="hero" size="sm">
              تسجيل الدخول
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-foreground p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Button
                    variant={isActive(link.href) ? "default" : "ghost"}
                    className="w-full justify-start gap-2"
                  >
                    {link.icon && <link.icon className="w-4 h-4" />}
                    {link.label}
                  </Button>
                </Link>
              ))}
              <Button variant="hero" className="mt-2">
                تسجيل الدخول
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
