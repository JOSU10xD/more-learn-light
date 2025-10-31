import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SEOHead } from '@/components/SEOHead';
import { ServiceCard } from '@/components/ServiceCard';
import { Monitor, Home as HomeIcon, School } from 'lucide-react';

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
      features: [
        'One-on-one or group sessions',
        'Interactive whiteboards and live feedback',
        'Flexible schedules to match your routine',
        'Available for all subjects and grades'
      ],
      perfectFor: 'Busy students who prefer the convenience of digital learning.',
      ctaText: 'Book Your Online Session',
      ctaLink: '/contact'
    },
    {
      icon: HomeIcon,
      title: 'In-Home Tutoring',
      description: 'Personalized Learning in the Comfort of Your Home',
      longDescription: 'Our tutors come to you — providing focused, one-on-one attention right where your child feels most comfortable.',
      features: [
        'Customized lessons based on learning pace',
        'Safe, experienced tutors at your doorstep',
        'Flexible scheduling (weekdays, weekends, evenings)',
        'Ideal for school-age children of all grades'
      ],
      perfectFor: 'Families who prefer face-to-face instruction in a familiar environment.',
      ctaText: 'Schedule an In-Home Session',
      ctaLink: '/contact'
    },
    {
      icon: School,
      title: 'In-School Tutoring (at More@Home Center)',
      description: 'A Space Designed for Success',
      longDescription: 'Our learning center offers a distraction-free environment for serious study. Students can focus better, collaborate with peers, and access exclusive resources.',
      features: [
        'Quiet, fully equipped study rooms',
        'One-on-one or small group classes',
        'Access to workshops, practice tests, and study materials',
        'Professional academic environment'
      ],
      perfectFor: 'Students who benefit from structured, classroom-style learning.',
      ctaText: 'Visit Our Learning Center',
      ctaLink: '/center'
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
              <div className="space-y-24 max-w-7xl mx-auto">
                {services.map((service, index) => {
                  const Icon = service.icon;
                  const isEven = index % 2 === 0;
                  
                  return (
                    <div 
                      key={index}
                      className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
                    >
                      {/* Content */}
                      <div className={`space-y-6 ${isEven ? 'lg:order-1 reveal-left' : 'lg:order-2 reveal-right'} is-visible`}>
                        <div className="inline-flex p-4 rounded-lg bg-gradient-primary">
                          <Icon className="h-10 w-10 text-white" />
                        </div>
                        <div>
                          <h2 className="text-3xl font-bold mb-2">{service.title}</h2>
                          <p className="text-xl text-primary font-semibold mb-4">{service.description}</p>
                          <p className="text-muted-foreground leading-relaxed">{service.longDescription}</p>
                        </div>

                        <div>
                          <h3 className="font-semibold text-lg mb-3">Features:</h3>
                          <ul className="space-y-2">
                            {service.features.map((feature, fIndex) => (
                              <li key={fIndex} className="flex items-start gap-2">
                                <span className="text-primary mt-1">✓</span>
                                <span className="text-muted-foreground">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="bg-muted p-4 rounded-lg border-l-4 border-primary">
                          <p className="text-sm font-medium">
                            <span className="text-primary">Perfect for:</span>{' '}
                            <span className="text-muted-foreground">{service.perfectFor}</span>
                          </p>
                        </div>
                      </div>

                      {/* Card */}
                      <div className={`${isEven ? 'lg:order-2 reveal-right' : 'lg:order-1 reveal-left'} is-visible`}>
                        <ServiceCard {...service} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Services;
