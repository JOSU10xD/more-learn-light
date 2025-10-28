import { Card, CardContent } from '@/components/ui/card';
import { Quote } from 'lucide-react';

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
}

/**
 * Testimonial card component
 * Displays customer reviews
 */
export function TestimonialCard({ quote, author, role }: TestimonialCardProps) {
  return (
    <Card className="h-full bg-gradient-subtle border-none shadow-md">
      <CardContent className="pt-6">
        <Quote className="h-8 w-8 text-primary/30 mb-4" />
        <blockquote className="text-base mb-6 text-foreground leading-relaxed">
          "{quote}"
        </blockquote>
        <div className="border-t border-border pt-4">
          <p className="font-semibold text-foreground">{author}</p>
          <p className="text-sm text-muted-foreground">{role}</p>
        </div>
      </CardContent>
    </Card>
  );
}
