import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SEOHead } from '@/components/SEOHead';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { Target, Eye, Award, Heart, Lightbulb, Shield } from 'lucide-react';

/**
 * About Us page
 * Contains mission, vision, and core values
 */
const About = () => {
  const { ref: missionRef, isVisible: missionVisible } = useIntersectionObserver();
  const { ref: valuesRef, isVisible: valuesVisible } = useIntersectionObserver();

  const coreValues = [
    {
      icon: Award,
      title: 'Excellence',
      description: 'We set high standards for teaching and outcomes.'
    },
    {
      icon: Shield,
      title: 'Integrity',
      description: 'We build trust through honesty and transparency.'
    },
    {
      icon: Heart,
      title: 'Empathy',
      description: 'We meet every learner where they are.'
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'We use modern tools and methods to make learning engaging.'
    }
  ];

  return (
    <>
      <SEOHead 
        title="About More@Home - Our Mission & Values"
        description="Learn about More@Home's mission to empower students through personalized education. Discover our vision, values, and commitment to excellence in tutoring."
      />
      <div className="min-h-screen">
        <Header />
        <main>
          {/* Hero Section */}
          <section className="py-20 bg-gradient-primary text-white">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center animate-fade-in">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  Who We Are
                </h1>
                <p className="text-lg md:text-xl text-white/90 leading-relaxed">
                  More@Home was created with a simple goal — to make quality education accessible and effective for every student.
                  We understand that each learner is unique, so our tutoring approach focuses on personalization, patience, and progress.
                </p>
                <p className="text-lg md:text-xl text-white/90 mt-6 leading-relaxed">
                  Our expert tutors don't just teach — they mentor, motivate, and inspire.
                </p>
              </div>
            </div>
          </section>

          {/* Mission & Vision Section */}
          <section className="py-20 bg-background">
            <div className="container mx-auto px-4">
              <div ref={missionRef} className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
                {/* Mission */}
                <div className={`bg-card p-8 rounded-lg border border-border shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-2 reveal-left ${missionVisible ? 'is-visible' : ''}`}>
                  <div className="inline-flex p-3 rounded-lg bg-gradient-primary mb-6 transition-transform duration-300 hover:scale-110">
                    <Target className="h-8 w-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    To empower students through personalized education that builds knowledge, confidence, and lifelong learning skills.
                  </p>
                </div>

                {/* Vision */}
                <div className={`bg-card p-8 rounded-lg border border-border shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-2 reveal-right ${missionVisible ? 'is-visible' : ''}`}>
                  <div className="inline-flex p-3 rounded-lg bg-gradient-warm mb-6 transition-transform duration-300 hover:scale-110">
                    <Eye className="h-8 w-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    To be a trusted learning partner for families, helping students achieve success both in school and beyond.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Core Values Section */}
          <section className="py-20 bg-muted">
            <div className="container mx-auto px-4">
              <div ref={valuesRef} className={`reveal ${valuesVisible ? 'is-visible' : ''}`}>
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Our Core Values
                  </h2>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    These principles guide everything we do
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
                  {coreValues.map((value, index) => (
                    <div
                      key={index}
                      className={`bg-card p-6 rounded-lg border border-border text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-2 reveal-scale reveal-delay-${index + 1} ${valuesVisible ? 'is-visible' : ''}`}
                    >
                      <div className="inline-flex p-3 rounded-full bg-primary/10 mb-4 transition-transform duration-300 hover:scale-110">
                        <value.icon className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  ))}
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

export default About;
