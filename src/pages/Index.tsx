import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { ServiceCard } from '@/components/ServiceCard';
import { TestimonialCard } from '@/components/TestimonialCard';
import { Footer } from '@/components/Footer';
import { SEOHead } from '@/components/SEOHead';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { Monitor, Home as HomeIcon, School, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

/**
 * Home page component
 * Contains hero, services overview, testimonials, and CTA sections
 */
const Index = () => {
  const { ref: featuresRef, isVisible: featuresVisible } = useIntersectionObserver();
  const { ref: servicesRef, isVisible: servicesVisible } = useIntersectionObserver();
  const { ref: testimonialsRef, isVisible: testimonialsVisible } = useIntersectionObserver();

  const services = [
    {
      icon: Monitor,
      title: 'Online Tutoring',
      description: 'Learn anytime, anywhere.',
      features: [
        'One-on-one or group sessions',
        'Interactive whiteboards and live feedback',
        'Flexible schedules to match your routine',
        'Available for all subjects and grades'
      ],
      ctaText: 'Book Your Online Session',
      ctaLink: '/contact'
    },
    {
      icon: HomeIcon,
      title: 'In-Home Tutoring',
      description: 'Personal guidance in the comfort of your home.',
      features: [
        'Customized lessons based on learning pace',
        'Safe, experienced tutors at your doorstep',
        'Flexible scheduling (weekdays, weekends, evenings)',
        'Ideal for school-age children of all grades'
      ],
      ctaText: 'Schedule an In-Home Session',
      ctaLink: '/contact'
    },
    {
      icon: School,
      title: 'In-School Tutoring',
      description: 'Focused learning at our dedicated center.',
      features: [
        'Quiet, fully equipped study rooms',
        'One-on-one or small group classes',
        'Access to workshops and study materials',
        'Professional academic environment'
      ],
      ctaText: 'Visit Our Learning Center',
      ctaLink: '/center'
    }
  ];

  const testimonials = [
    {
      quote: "More@Home completely changed how my son feels about studying. His grades improved, and his confidence soared!",
      author: "Priya S.",
      role: "Parent"
    },
    {
      quote: "Online classes are so convenient. My tutor explains math in ways I finally understand!",
      author: "Aditya K.",
      role: "Student"
    },
    {
      quote: "We've tried other tutoring services, but More@Home's personal touch truly stands out.",
      author: "Rahul M.",
      role: "Parent"
    }
  ];

  const whyChooseUs = [
    'Experienced, qualified tutors',
    'Customized learning plans for every student',
    'Flexible scheduling and lesson formats',
    'Proven results and happy learners'
  ];

  return (
    <>
      <SEOHead />
      <div className="min-h-screen">
        <Header />
        <main>
          <Hero />

          {/* Why Choose More@Home Section */}
          <section className="py-20 bg-gradient-subtle">
            <div className="container mx-auto px-4">
              <div ref={featuresRef} className={`max-w-4xl mx-auto text-center reveal ${featuresVisible ? 'is-visible' : ''}`}>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Why Choose More@Home
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
                  {whyChooseUs.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-6 bg-card rounded-lg border border-border shadow-sm hover:shadow-md transition-shadow"
                    >
                      <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                      <p className="text-left font-medium">{feature}</p>
                    </div>
                  ))}
                </div>
                <blockquote className="mt-12 text-xl italic text-muted-foreground border-l-4 border-primary pl-6 py-2">
                  "Education is not one-size-fits-all — it's about finding what works best for you."
                </blockquote>
              </div>
            </div>
          </section>

          {/* Our Learning Options Section */}
          <section className="py-20 bg-background">
            <div className="container mx-auto px-4">
              <div ref={servicesRef} className={`reveal ${servicesVisible ? 'is-visible' : ''}`}>
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Our Learning Options
                  </h2>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Choose the learning format that works best for you
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                  {services.map((service, index) => (
                    <ServiceCard
                      key={index}
                      {...service}
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Testimonials Section */}
          <section className="py-20 bg-muted">
            <div className="container mx-auto px-4">
              <div ref={testimonialsRef} className={`reveal ${testimonialsVisible ? 'is-visible' : ''}`}>
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    What Our Students & Parents Say
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                  {testimonials.map((testimonial, index) => (
                    <TestimonialCard
                      key={index}
                      {...testimonial}
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 bg-gradient-primary text-white">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Begin?
              </h2>
              <p className="text-lg mb-8 text-white/90 max-w-2xl mx-auto">
                Take the first step towards academic success with a free consultation
              </p>
              <Link to="/contact">
                <Button 
                  size="lg" 
                  variant="secondary"
                  className="text-base px-8 shadow-lg hover:shadow-xl transition-all"
                >
                  Book a Free Consultation
                </Button>
              </Link>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
