import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SEOHead } from '@/components/SEOHead';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Monitor, Home as HomeIcon, School, CheckCircle } from 'lucide-react';
import onlineTutorImg from '@/assets/onlinetutor.jpg';
import homeTutorImg from '@/assets/hometutor.jpg';
import schoolImg from '@/assets/school.jpg';

/**
 * Services page
 * Detailed information about all tutoring services offered
 */
const Services = () => {
  const services = [
    {
      icon: Monitor,
      title: 'Online Tutoring',
      description: 'Learn Anytime, Anywhere',
      longDescription: 'Our online sessions bring expert tutors straight to your screen. Through interactive tools and real-time collaboration, students can learn efficiently and comfortably from home.',
      image: onlineTutorImg,
      features: [
        'One-on-one or group sessions',
        'Interactive whiteboards and live feedback',
        'Flexible schedules to match your routine',
        'Available for all subjects and grades'
      ],
      benefits: [
        'No commute time - learn from anywhere',
        'Record sessions for later review',
        'Access to digital learning resources',
        'Safe and convenient learning environment'
      ],
      perfectFor: 'Busy students who prefer the convenience of digital learning.',
    },
    {
      icon: HomeIcon,
      title: 'In-Home Tutoring',
      description: 'Personalized Learning in the Comfort of Your Home',
      longDescription: 'Our tutors come to you — providing focused, one-on-one attention right where your child feels most comfortable.',
      image: homeTutorImg,
      features: [
        'Customized lessons based on learning pace',
        'Safe, experienced tutors at your doorstep',
        'Flexible scheduling (weekdays, weekends, evenings)',
        'Ideal for school-age children of all grades'
      ],
      benefits: [
        'Face-to-face personalized attention',
        'Learn in a familiar, comfortable environment',
        'Build strong tutor-student relationships',
        'Parents can observe progress firsthand'
      ],
      perfectFor: 'Families who prefer face-to-face instruction in a familiar environment.',
    },
    {
      icon: School,
      title: 'In-School Tutoring (at More@Home Center)',
      description: 'A Space Designed for Success',
      longDescription: 'Our learning center offers a distraction-free environment for serious study. Students can focus better, collaborate with peers, and access exclusive resources.',
      image: schoolImg,
      features: [
        'Quiet, fully equipped study rooms',
        'One-on-one or small group classes',
        'Access to workshops, practice tests, and study materials',
        'Professional academic environment'
      ],
      benefits: [
        'Structured learning atmosphere',
        'Peer learning opportunities',
        'Access to extensive study materials',
        'Professional supervision and guidance'
      ],
      perfectFor: 'Students who benefit from structured, classroom-style learning.',
    }
  ];

  return (
    <>
      <SEOHead 
        title="Our Tutoring Services - Online, In-Home & In-School | More@Home"
        description="Explore More@Home's flexible tutoring options: online sessions, in-home tutoring, and in-school learning at our center. Find the perfect fit for your learning style."
      />
      <div className="min-h-screen">
        <Header />
        <main>
          {/* Hero Section */}
          <section className="py-20 bg-gradient-primary text-white">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center animate-fade-in">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  Our Services
                </h1>
                <p className="text-lg md:text-xl text-white/90">
                  Choose the learning format that fits your lifestyle and learning preferences
                </p>
              </div>
            </div>
          </section>

          {/* Services Section */}
          <section className="py-20 bg-background">
            <div className="container mx-auto px-4">
              <div className="space-y-32 max-w-7xl mx-auto">
                {services.map((service, index) => {
                  const Icon = service.icon;
                  const isEven = index % 2 === 0;
                  
                  return (
                    <div 
                      key={index}
                      className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
                    >
                      {/* Image */}
                      <div className={`${isEven ? 'lg:order-1 reveal-left' : 'lg:order-2 reveal-right'} is-visible`}>
                        <div className="relative group overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500">
                          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                          <img 
                            src={service.image} 
                            alt={service.title}
                            className="w-full h-[400px] object-cover transform group-hover:scale-110 transition-transform duration-700"
                          />
                          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent z-20">
                            <div className="flex items-center gap-3 text-white">
                              <div className="p-3 rounded-lg bg-primary/90">
                                <Icon className="h-6 w-6" />
                              </div>
                              <h3 className="text-xl font-bold">{service.title}</h3>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className={`space-y-6 ${isEven ? 'lg:order-2 reveal-right' : 'lg:order-1 reveal-left'} is-visible`}>
                        <div>
                          <p className="text-xl text-primary font-semibold mb-4">{service.description}</p>
                          <p className="text-muted-foreground leading-relaxed text-lg">{service.longDescription}</p>
                        </div>

                        <div className="space-y-4">
                          <h3 className="font-semibold text-lg flex items-center gap-2">
                            <CheckCircle className="h-5 w-5 text-primary" />
                            Key Features
                          </h3>
                          <ul className="grid grid-cols-1 gap-3">
                            {service.features.map((feature, fIndex) => (
                              <li key={fIndex} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                                <span className="text-primary mt-1 flex-shrink-0">✓</span>
                                <span className="text-muted-foreground">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="space-y-4">
                          <h3 className="font-semibold text-lg flex items-center gap-2">
                            <CheckCircle className="h-5 w-5 text-primary" />
                            Benefits
                          </h3>
                          <ul className="grid grid-cols-1 gap-3">
                            {service.benefits.map((benefit, bIndex) => (
                              <li key={bIndex} className="flex items-start gap-3 p-3 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors">
                                <span className="text-primary mt-1 flex-shrink-0">→</span>
                                <span className="text-muted-foreground">{benefit}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="bg-gradient-subtle p-6 rounded-xl border border-border">
                          <p className="text-sm font-medium mb-4">
                            <span className="text-primary">Perfect for:</span>{' '}
                            <span className="text-muted-foreground">{service.perfectFor}</span>
                          </p>
                          <Button asChild className="w-full hover-lift">
                            <Link to="/contact">Get Started Today</Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-16 bg-gradient-primary text-white">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                Contact us today to discuss which tutoring option is best for your learning goals.
              </p>
              <Button asChild size="lg" variant="secondary" className="hover-lift">
                <Link to="/contact">Schedule a Free Consultation</Link>
              </Button>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Services;