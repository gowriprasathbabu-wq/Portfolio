import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ContactForm } from '../models/portfolio.models';
import { environment } from '@env/environment';

// EmailJS integration.
// Configure your real Service ID / Template ID / Public Key in:
//   src/environments/environment.ts (dev)
//   src/environments/environment.prod.ts (production)
// Sign up free at https://www.emailjs.com to obtain these values.
@Injectable({ providedIn: 'root' })
export class EmailService {
  private readonly platform = inject(PLATFORM_ID);

  async sendContactEmail(form: ContactForm): Promise<boolean> {
    // EmailJS is browser-only; guard for SSR.
    if (!isPlatformBrowser(this.platform)) return false;

    try {
      // Dynamic import keeps emailjs out of the SSR/server bundle.
      const emailjs = await import('emailjs-com');

      const result = await emailjs.send(
        environment.emailjsServiceId,
        environment.emailjsTemplateId,
        {
          from_name: form.name,
          from_email: form.email,
          subject: form.subject,
          message: form.message,
          to_name: 'Gowri Prasath Babu',
          reply_to: form.email,
        },
        environment.emailjsPublicKey,
      );

      return result.status === 200;
    } catch (error) {
      console.error('[EmailService] Failed to send email:', error);
      return false;
    }
  }
}
