import React, { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

/**
 * Contact form that posts to FormSubmit:
 * https://formsubmit.co/info@moreathome.in
 *
 * Notes:
 * - FormSubmit requires the recipient email (info@moreathome.in) to click
 *   a confirmation link the first time a site tries to send to that address.
 * - We attempt a fetch POST with urlencoded body. If that fails (CORS/network),
 *   we fallback to creating and submitting a native form that opens in a new tab.
 */

type FormState = {
  name: string;
  email: string;
  phone: string;
  message: string;
  honeypot: string;
};

export function ContactForm(): JSX.Element {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    message: '',
    honeypot: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fallbackFormRef = useRef<HTMLFormElement | null>(null);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s-]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Invalid phone number';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const createAndSubmitNativeForm = () => {
    // Fallback: create a native form and submit it (opens in new tab to avoid navigation)
    const action = 'https://formsubmit.co/info@moreathome.in';
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = action;
    form.target = '_blank'; // open in new tab so SPA isn't navigated away
    form.style.display = 'none';

    const addInput = (name: string, value: string) => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = name;
      input.value = value;
      form.appendChild(input);
    };

    addInput('name', formData.name);
    addInput('email', formData.email);
    addInput('phone', formData.phone || 'Not provided');
    addInput('message', formData.message);
    addInput('_replyto', formData.email);
    addInput('_subject', `Website Contact - ${formData.name}`);
    addInput('_captcha', 'false');
    // Honeypot (if set) - FormSubmit ignores unknown fields but keep for consistency
    addInput('honeypot', formData.honeypot);

    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot check: silently ignore bots
    if (formData.honeypot) {
      return;
    }

    if (!validateForm()) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all required fields correctly.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Build urlencoded body (FormSubmit expects normal form POST)
      const params = new URLSearchParams();
      params.append('name', formData.name);
      params.append('email', formData.email);
      params.append('phone', formData.phone || 'Not provided');
      params.append('message', formData.message);
      params.append('_replyto', formData.email); // reply-to header
      params.append('_subject', `Website Contact - ${formData.name}`);
      params.append('_captcha', 'false'); // disable captcha (optional)

      // Attempt fetch POST first (keeps SPA UX)
      const response = await fetch('https://formsubmit.co/info@moreathome.in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body: params.toString(),
      });

      // Note: FormSubmit may return HTML/redirects (not JSON).
      // We treat any 2xx response as success.
      if (response.ok) {
        toast({
          title: 'Message Sent Successfully!',
          description:
            "Thank you for contacting us. We'll get back to you soon. (If this is the first time, the recipient must confirm FormSubmit's activation email.)",
        });

        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
          honeypot: '',
        });
        setErrors({});
      } else {
        // Non-2xx — attempt fallback native form submit
        console.warn('FormSubmit fetch returned non-OK status, falling back to native form submit.', {
          status: response.status,
          statusText: response.statusText,
        });
        createAndSubmitNativeForm();

        toast({
          title: 'Submitted (fallback)',
          description:
            'Could not submit via fetch (CORS/network). A fallback native form was opened in a new tab.',
        });

        // Clear form since fallback will handle the send
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
          honeypot: '',
        });
        setErrors({});
      }
    } catch (err) {
      console.error('Error sending message via FormSubmit fetch:', err);
      // On network/CORS errors, fallback to native form submit
      try {
        createAndSubmitNativeForm();
        toast({
          title: 'Submitted (fallback)',
          description:
            'Network/CORS prevented direct submission. A fallback native form has been opened in a new tab.',
        });

        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
          honeypot: '',
        });
        setErrors({});
      } catch (fallbackErr) {
        console.error('Fallback native form failed:', fallbackErr);
        toast({
          title: 'Error Sending Message',
          description: 'Please try again later or contact us directly at info@moreathome.in',
          variant: 'destructive',
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      {/* Honeypot field - hidden from users */}
      <input
        type="text"
        name="honeypot"
        value={formData.honeypot}
        onChange={handleChange}
        style={{ display: 'none' }}
        tabIndex={-1}
        autoComplete="off"
      />

      <div className="space-y-2">
        <Label htmlFor="name">
          Name <span className="text-destructive">*</span>
        </Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your full name"
          className={errors.name ? 'border-destructive' : ''}
        />
        {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">
          Email <span className="text-destructive">*</span>
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="your.email@example.com"
          className={errors.email ? 'border-destructive' : ''}
        />
        {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">
          Phone <span className="text-destructive">*</span>
        </Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Your phone number"
          className={errors.phone ? 'border-destructive' : ''}
        />
        {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">
          Message <span className="text-destructive">*</span>
        </Label>
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell us how we can help you..."
          rows={5}
          className={errors.message ? 'border-destructive' : ''}
        />
        {errors.message && <p className="text-sm text-destructive">{errors.message}</p>}
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          'Send Message'
        )}
      </Button>

      <p className="text-xs text-muted-foreground text-center mt-2">
        Your message will be sent to info@moreathome.in
      </p>
    </form>
  );
}
