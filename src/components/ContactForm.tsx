import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

/**
 * ContactForm — posts to FormSubmit using the activation token (obfuscated endpoint).
 *
 * Notes:
 * - Replace FORM_ACTION_TOKEN with the token FormSubmit provided.
 * - If you want the site to redirect to a custom thank-you page after native form submit,
 *   adjust the `_next` value below (currently uses window.location.origin + '/thank-you').
 * - If the form is submitted from a new origin (domain), FormSubmit will send an activation
 *   email to the recipient and you'll need to click that once for that origin.
 */

type FormState = {
  name: string;
  email: string;
  phone: string;
  message: string;
  honeypot: string;
};

const FORM_ACTION_TOKEN = '983cfc4a9751fab8a0b354958222f5e3';
const FORM_ACTION = `https://formsubmit.co/${FORM_ACTION_TOKEN}`;

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
    // Native form fallback (will navigate / redirect normally)
    const action = FORM_ACTION;
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = action;
    // Use target _self to keep user on same tab; change to _blank if you prefer new tab
    form.target = '_self';
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

    // Provide a next page so the user sees a friendly thank-you after native submission
    try {
      const nextUrl = `${window.location.origin}/thank-you`;
      addInput('_next', nextUrl);
    } catch {
      // window might not be available in SSR contexts; ignore if so
    }

    // Honeypot retained
    addInput('honeypot', formData.honeypot);

    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot check
    if (formData.honeypot) return;

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
      // Build urlencoded body (FormSubmit expects a standard form POST)
      const params = new URLSearchParams();
      params.append('name', formData.name);
      params.append('email', formData.email);
      params.append('phone', formData.phone || 'Not provided');
      params.append('message', formData.message);
      params.append('_replyto', formData.email);
      params.append('_subject', `Website Contact - ${formData.name}`);
      params.append('_captcha', 'false');

      // Also add a _next redirect so if FormSubmit processes natively, user sees thank-you
      try {
        params.append('_next', `${window.location.origin}/thank-you`);
      } catch {
        // ignore in SSR or non-window contexts
      }

      // Attempt fetch POST first (SPA-friendly)
      const response = await fetch(FORM_ACTION, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body: params.toString(),
      });

      // Treat any 2xx as success — FormSubmit often returns HTML/plain text responses.
      if (response.ok) {
        toast({
          title: 'Message Sent Successfully!',
          description: "Thanks — we'll get back to you soon.",
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
        // Non-2xx: fallback to native submit so FormSubmit receives a proper form POST and redirect
        console.warn('FormSubmit fetch returned non-OK, using native fallback', {
          status: response.status,
          statusText: response.statusText,
        });
        createAndSubmitNativeForm();
      }
    } catch (err) {
      // Likely a CORS or network error — native fallback
      console.error('Error posting to FormSubmit (fetch):', err);
      try {
        createAndSubmitNativeForm();
      } catch (fallbackErr) {
        console.error('Native fallback failed:', fallbackErr);
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
