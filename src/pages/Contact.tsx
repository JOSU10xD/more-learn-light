import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SEOHead } from '@/components/SEOHead';
import { ContactForm } from '@/components/ContactForm';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

/**
 * Contact page
 * Contains contact form and contact information
 */
const Contact = () => {
  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      content: 'info@moreathome.com',
      link: 'mailto:info@moreathome.com'
    },
    {
      icon: Phone,
      title: 'Phone',
      content: '+91-XXXXXXXXXX',
      link: 'tel:+91XXXXXXXXXX'
    },
    {
      icon: MapPin,
      title: 'Address',
      content: 'Your Center\'s Address',
      link: null
    },
    {
      icon: Clock,
      title: 'Office Hours',
      content: 'Monday – Saturday | 9:00 AM – 7:00 PM',
      link: null
    }
  ];

  return (
    <>
      <SEOHead 
        title="Contact More@Home - Book Your Free Consultation"
        description="Get in touch with More@Home for personalized tutoring services. Book a free consultation or reach out with questions. We're here to help!"
      />
      <div className="min-h-screen">
        <Header />
        <main>
          {/* Hero Section */}
          <section className="py-20 bg-gradient-primary text-white">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center animate-fade-in">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  Get In Touch
                </h1>
                <p className="text-lg md:text-xl text-white/90">
                  We'd love to hear from you! Whether you're ready to enroll or simply have a question, our team is here to help.
                </p>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section className="py-20 bg-background">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                {/* Contact Form */}
                <div>
                  <h2 className="text-2xl font-bold mb-6">Quick Contact Form</h2>
                  <Card>
                    <CardContent className="pt-6">
                      <ContactForm />
                    </CardContent>
                  </Card>
                </div>

                {/* Contact Information */}
                <div>
                  <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                  <div className="space-y-4">
                    {contactInfo.map((info, index) => {
                      const Icon = info.icon;
                      const content = info.link ? (
                        <a 
                          href={info.link}
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          {info.content}
                        </a>
                      ) : (
                        <p className="text-muted-foreground">{info.content}</p>
                      );

                      return (
                        <Card key={index}>
                          <CardHeader>
                            <CardTitle className="flex items-center gap-3 text-lg">
                              <div className="p-2 rounded-lg bg-primary/10">
                                <Icon className="h-5 w-5 text-primary" />
                              </div>
                              {info.title}
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            {content}
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>

                  <div className="mt-8 p-6 bg-gradient-subtle rounded-lg border border-border">
                    <h3 className="font-semibold text-lg mb-3">Ready to Start Learning?</h3>
                    <p className="text-muted-foreground mb-4">
                      Fill out the form and we'll get back to you within 24 hours to schedule your free consultation.
                    </p>
                    <p className="text-sm text-muted-foreground">
                      All fields marked with * are required
                    </p>
                  </div>
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

export default Contact;
