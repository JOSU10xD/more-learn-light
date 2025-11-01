import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SEOHead } from '@/components/SEOHead';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { MapPin, Clock, Users, Wifi, Book, Coffee } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import MapEmbed from "@/components/MapEmbed";

/**
 * Learning Center page
 * Information about the physical learning center location
 */
const Center = () => {
  const { ref: featuresRef, isVisible: featuresVisible } = useIntersectionObserver();

  const centerFeatures = [
    {
      icon: Users,
      title: 'Small Group Classes',
      description: 'Intimate class sizes ensure personalized attention for every student'
    },
    {
      icon: Wifi,
      title: 'High-Speed Internet',
      description: 'Fast, reliable connectivity for all your online learning needs'
    },
    {
      icon: Book,
      title: 'Resource Library',
      description: 'Access to textbooks, reference materials, and study guides'
    },
    {
      icon: Coffee,
      title: 'Comfortable Study Areas',
      description: 'Quiet, well-lit spaces designed for focused learning'
    }
  ];

  return (
    <>
      <SEOHead 
        title="More@Home Learning Center - Our Physical Location"
        description="Visit the More@Home Learning Center for in-person tutoring in a professional, distraction-free environment. Fully equipped study rooms and expert tutors."
      />
      <div className="min-h-screen">
        <Header />
        <main>
          {/* Hero Section */}
          <section className="py-20 bg-gradient-primary text-white">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center animate-fade-in">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  Our Learning Center
                </h1>
                <p className="text-lg md:text-xl text-white/90">
                  A Space Designed for Success
                </p>
              </div>
            </div>
          </section>

          {/* Overview Section */}
          <section className="py-20 bg-background">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <div className="prose prose-lg max-w-none mb-12">
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Our learning center offers a distraction-free environment for serious study. 
                    Students can focus better, collaborate with peers, and access exclusive resources.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <MapPin className="h-6 w-6 text-primary" />
                        Location
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">2nd Floor, Puthiyarakkattu building, Thodupuzha, Kerala 685584</p>
                      <p className="text-sm text-muted-foreground mt-2">
                        Easily accessible with ample parking available
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <Clock className="h-6 w-6 text-primary" />
                        Hours
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">Monday – Saturday</p>
                      <p className="text-muted-foreground">9:00 AM – 7:00 PM</p>
                      <p className="text-sm text-muted-foreground mt-2">
                        Extended hours during exam periods
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-20 bg-muted">
            <div className="container mx-auto px-4">
              <div ref={featuresRef} className={`reveal ${featuresVisible ? 'is-visible' : ''}`}>
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Center Features
                  </h2>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Everything you need for successful learning in one place
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                  {centerFeatures.map((feature, index) => {
                    const Icon = feature.icon;
                    return (
                      <Card 
                        key={index}
                        className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                      >
                        <CardContent className="pt-6">
                          <div className="inline-flex p-3 rounded-full bg-primary/10 mb-4">
                            <Icon className="h-8 w-8 text-primary" />
                          </div>
                          <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {feature.description}
                          </p>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>

          {/* What We Offer Section */}
          <section className="py-20 bg-background">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold mb-8 text-center">What We Offer</h2>
                <div className="space-y-4">
                  {[
                    'Quiet, fully equipped study rooms',
                    'One-on-one or small group classes',
                    'Access to workshops, practice tests, and study materials',
                    'Professional academic environment'
                  ].map((item, index) => (
                    <div 
                      key={index}
                      className="flex items-start gap-3 p-4 bg-muted rounded-lg"
                    >
                      <span className="text-primary text-xl">✓</span>
                      <p className="text-muted-foreground">{item}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-12 p-6 bg-gradient-primary text-white rounded-lg text-center">
                  <p className="text-lg mb-2">
                    <strong>Perfect for:</strong> Students who benefit from structured, classroom-style learning.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 bg-muted">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold mb-6">
                Ready to Visit Our Center?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Schedule a tour or book your first session at our learning center today
              </p>
              <Link to="/contact">
                <Button size="lg" variant="default">
                  Contact Us to Schedule a Visit
                </Button>
              </Link>
            </div>
          </section>

          {/* Map Section */}
          <section className="py-12 bg-background">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <div className="rounded-lg overflow-hidden shadow-lg border border-border">
                  <MapEmbed
                    embedUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.847!2d76.7277!3d9.8334!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOcKwNTAnMDAuMiJOIDc2wrA0Myc0MC4wIkU!5e0!3m2!1sen!2sin!4v1234567890"
                    height="420px"
                    title="More@Home Location - 2nd Floor, Puthiyarakkattu building, Thodupuzha, Kerala 685584"
                  />
                </div>

                <div className="text-center mt-6">
                  <h3 className="text-xl font-semibold mb-2">Map Loading Area</h3>
                  <p className="text-muted-foreground">
                    Interactive map showing the center location.
                  </p>
                </div>
              </div>
            </div>
          </section>

        </main>
        <Footer />
      </div>
    </>
  );
};

export default Center;
