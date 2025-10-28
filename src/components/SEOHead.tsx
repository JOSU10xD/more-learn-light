import { useEffect } from 'react';

interface SEOHeadProps {
  title?: string;
  description?: string;
  canonical?: string;
}

/**
 * Component to manage SEO meta tags and structured data
 * Includes JSON-LD LocalBusiness markup
 */
export function SEOHead({ 
  title = "More@Home - Personalized Tutoring & Learning Solutions",
  description = "Unlock your full potential with More@Home's personalized tutoring. Choose online, in-home, or in-school learning with experienced tutors.",
  canonical
}: SEOHeadProps) {
  useEffect(() => {
    // Set page title
    document.title = title;

    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }

    // Add JSON-LD structured data for LocalBusiness
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "More@Home",
      "description": description,
      "url": window.location.origin,
      "telephone": "+91-XXXXXXXXXX",
      "email": "info@moreathome.com",
      "priceRange": "$$",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Your City",
        "addressCountry": "IN"
      },
      "openingHours": "Mo-Sa 09:00-19:00",
      "sameAs": []
    });
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [title, description, canonical]);

  return null;
}
