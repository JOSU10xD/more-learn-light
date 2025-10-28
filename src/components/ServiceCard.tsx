import { LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  ctaText: string;
  ctaLink: string;
}

/**
 * Service card component with scroll-reveal animation
 * Used to display tutoring service options
 */
export function ServiceCard({ icon: Icon, title, description, features, ctaText, ctaLink }: ServiceCardProps) {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.2 });

  return (
    <div ref={ref} className={`reveal ${isVisible ? 'is-visible' : ''}`}>
      <Card className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        <CardHeader>
          <div className="mb-4 inline-flex p-3 rounded-lg bg-gradient-primary">
            <Icon className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl">{title}</CardTitle>
          <CardDescription className="text-base">{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <span className="text-primary mt-0.5">✓</span>
                <span className="text-muted-foreground">{feature}</span>
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter>
          <Link to={ctaLink} className="w-full">
            <Button variant="default" className="w-full">
              {ctaText}
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
