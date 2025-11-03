import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

/**
 * ContactForm using a hidden iframe submit so the SPA never navigates.
 * - Uses FormSubmit token endpoint (no naked email in action).
 * - No `_next` param (so no redirect to a non-existent /thank-you).
 * - Shows a toast on iframe load (indicates endpoint responded).
 * - Prevents double-send (no fetch + fallback).
 *
 * Note: the very first submission from a new origin may trigger an activation email
 * to info@moreathome.in (FormSubmit behavior). After activation, normal forwards happen.
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
const IFRAME_NAME = 'formsubmit_hidden_iframe';

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
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const pendingSubmitRef = useRef<HTMLFormElement | null>(null); // for cleanup/diagnostics

  // Create hidden iframe once
  useEffect(() => {
    if (document.getElementById(IFRAME_NAME)) {
      iframeRef.current = document.getElementById(IFRAME_NAME) as HTMLIFrameElement;
      return;
    }

    const iframe = document.createElement('iframe');
    iframe.name = IFRAME_NAME;
    iframe.id = IFRAME_NAME;
    iframe.style.display = 'none';
    document.body.appendChild(iframe);
    iframeRef.current = iframe;

    return () => {
      // keep iframe if you want persistence; here we remove on unmount
      try {
        iframe.remove();
      } catch {}
    };
  }, []);

  // Listen for iframe load event to confirm server response
  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const onLoad = () => {
      // Called when the iframe finishes loading whatever FormSubmit returned.
      // We can't read iframe contents cross-origin, but load event means the POST completed.
      if (!isSubmitting) return; // ignore unrelated loads
      setIsSubmitting(false);

      toast({
        title: 'Message Sent Successfully!',
        description: "Thanks — we'll get back to you soon.",
      });

      // Reset the form
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
        honeypot: '',
      });
      setErrors({});

      // cleanup pending form if any
      if (pendingSubmitRef.current) {
        try {
          pendingSubmitRef.current.remove();
        } catch {}
        pendingSubmitRef.current = null;
      }
    };

    iframe.addEventListener('load', onLoad);
    return () => iframe.removeEventListener('load', onLoad);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [iframeRef.current, isSubmitting]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';

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

    if (!formData.message.trim()) newErrors.message = 'Message is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitToIframe = () => {
    // Build a native form, target the hidden iframe, submit it — no navigation.
    const iframe = iframeRef.current;
    if (!iframe) {
      throw new Error('Hidden iframe not available');
    }

    // remove any previous pending form
    if (pendingSubmitRef.current) {
      try {
        pendingSubmitRef.current.remove();
      } catch {}
      pendingSubmitRef.current = null;
    }

    const form = document.createElement('form');
    form.method = 'POST';
    form.action = FORM_ACTION;
    form.target = IFRAME_NAME;
    form.style.display = 'none';

    const add = (name: string, value: string) => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = name;
      input.value = value;
      form.appendChild(input);
    };

    add('name', formData.name);
    add('email', formData.email);
    add('phone', formData.phone || 'Not provided');
    add('message', formData.message);
    add('_replyto', formData.email);
    add('_subject', `Website Contact - ${formData.name}`);
    add('_captcha', 'false');
    // DO NOT add _next — avoids redirect/navigation in main window or iframe target confusion
    add('honeypot', formData.honeypot);

    document.body.appendChild(form);
    pendingSubmitRef.current = form;

    // Submit the form (request goes to FormSubmit, response loads into iframe)
    form.submit();
    // Do NOT remove the form immediately — remove it after iframe load handler cleans it up.
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // honeypot
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
      submitToIframe();
      // success toast will be shown after iframe load
    } catch (err) {
      console.error('Submit failed (iframe method):', err);
      setIsSubmitting(false);
      toast({
        title: 'Error Sending Message',
        description: 'Please try again later or contact us at info@moreathome.in',
        variant: 'destructive',
      });
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
