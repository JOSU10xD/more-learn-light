import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Monitor, Home, School } from 'lucide-react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import heroBg from '@/assets/hero-bg.jpg';

/**
 * Hero section with parallax background effect
 * Respects prefers-reduced-motion for accessibility
 */
export function Hero() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const handleScroll = () => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          setScrollY(window.scrollY);
        }
      }
    };

    // Throttle scroll events for performance
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [prefersReducedMotion]);

  return (
    <section ref={heroRef} className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Parallax Background */}
      <div
        className="absolute inset-0 parallax-bg"
        style={{
          transform: prefersReducedMotion ? 'none' : `translateY(${scrollY * 0.5}px)`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-secondary/80 to-primary/90" />
        <img
          src={heroBg}
          alt=""
          className="w-full h-full object-cover"
          loading="eager"
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center text-white space-y-8 animate-fade-in">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
            Unlock Your Full Potential with Personalized Learning
          </h1>
          
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            Learning should be engaging, inspiring, and built around you.
            At More@Home, we make education personal — helping students of all ages and abilities thrive academically through tailored tutoring programs.
          </p>

          {/* Learning Options */}
          <div className="flex flex-wrap justify-center gap-6 py-4">
            <div className="flex items-center gap-2 text-white">
              <Monitor className="h-5 w-5" />
              <span className="font-medium">Online</span>
            </div>
            <div className="flex items-center gap-2 text-white">
              <Home className="h-5 w-5" />
              <span className="font-medium">At Home</span>
            </div>
            <div className="flex items-center gap-2 text-white">
              <School className="h-5 w-5" />
              <span className="font-medium">At Our Learning Center</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link to="/contact">
              <Button 
                size="lg" 
                variant="secondary"
                className="text-base px-8 shadow-lg hover:shadow-xl transition-all"
              >
                Book a Free Consultation
              </Button>
            </Link>
            <Link to="/services">
              <Button 
                size="lg" 
                variant="outline"
                className="text-base px-8 bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 hover:text-white shadow-lg"
              >
                Explore Our Services
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
