import {
  Component,
  inject,
  ChangeDetectionStrategy,
  PLATFORM_ID,
  AfterViewInit,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { PortfolioDataService } from '../../../../core/services/portfolio-data.service';
import { PortfolioState } from '../../../../state/portfolio.state';
import { EmailService } from '../../../../core/services/email.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule],
  template: `
    <section id="contact" class="section contact-section" aria-labelledby="contact-heading">
      <div class="container">
        <div class="section-header reveal">
          <span class="eyebrow">Get In Touch</span>
          <h2 id="contact-heading">Let's <span class="gradient-text">Connect</span></h2>
          <p>
            Have a project in mind or want to discuss enterprise architecture? I'd love to hear from
            you.
          </p>
        </div>
        <div class="contact-grid">
          <div class="contact-info reveal delay-1">
            <div class="info-cards">
              @for (item of contactItems; track item.label) {
                <div class="info-card glass">
                  <div class="info-icon">{{ item.icon }}</div>
                  <div class="info-text">
                    <span class="info-label">{{ item.label }}</span>
                    @if (item.href) {
                      <a [href]="item.href" class="info-value link">{{ item.value }}</a>
                    } @else {
                      <span class="info-value">{{ item.value }}</span>
                    }
                  </div>
                </div>
              }
            </div>
            <div class="social-section">
              <h3 class="social-heading">Connect Online</h3>
              <div class="social-grid">
                @for (s of socials; track s.label) {
                  <a
                    [href]="s.href"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="social-card glass"
                    [attr.aria-label]="s.label"
                  >
                    <span class="s-icon">{{ s.icon }}</span>
                    <div>
                      <strong>{{ s.label }}</strong
                      ><span>{{ s.handle }}</span>
                    </div>
                  </a>
                }
              </div>
            </div>
            <div class="availability-card">
              <div class="avail-dot"></div>
              <div>
                <strong>Available for Opportunities</strong>
                <span>Open to senior/lead full stack roles and exciting projects</span>
              </div>
            </div>
          </div>
          <div class="contact-form-wrap reveal delay-2">
            <div class="form-card glass">
              <div class="form-header">
                <h3>Send a Message</h3>
                <p>I typically respond within 24 hours.</p>
              </div>
              @if (state.contactSubmitted()) {
                <div class="success-state" role="alert">
                  <div class="success-icon">✓</div>
                  <h4>Message Sent!</h4>
                  <p>Thank you for reaching out. I'll get back to you within 24 hours.</p>
                  <button class="btn-reset" (click)="resetForm()">Send Another →</button>
                </div>
              } @else {
                <form [formGroup]="contactForm" (ngSubmit)="onSubmit()" novalidate>
                  <div class="form-row">
                    <div class="form-group">
                      <label for="name" class="form-label">Full Name *</label>
                      <input
                        id="name"
                        type="text"
                        class="form-control"
                        formControlName="name"
                        placeholder="John Doe"
                        autocomplete="name"
                        [class.error]="isInvalid('name')"
                        [attr.aria-invalid]="isInvalid('name')"
                      />
                      @if (isInvalid('name')) {
                        <span class="form-error" role="alert">{{ getError('name') }}</span>
                      }
                    </div>
                    <div class="form-group">
                      <label for="email" class="form-label">Email Address *</label>
                      <input
                        id="email"
                        type="email"
                        class="form-control"
                        formControlName="email"
                        placeholder="john@company.com"
                        autocomplete="email"
                        [class.error]="isInvalid('email')"
                        [attr.aria-invalid]="isInvalid('email')"
                      />
                      @if (isInvalid('email')) {
                        <span class="form-error" role="alert">{{ getError('email') }}</span>
                      }
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="subject" class="form-label">Subject *</label>
                    <input
                      id="subject"
                      type="text"
                      class="form-control"
                      formControlName="subject"
                      placeholder="Project Collaboration / Job Opportunity"
                      [class.error]="isInvalid('subject')"
                      [attr.aria-invalid]="isInvalid('subject')"
                    />
                    @if (isInvalid('subject')) {
                      <span class="form-error" role="alert">{{ getError('subject') }}</span>
                    }
                  </div>
                  <div class="form-group">
                    <label for="message" class="form-label">Message *</label>
                    <textarea
                      id="message"
                      class="form-control"
                      formControlName="message"
                      rows="5"
                      placeholder="Tell me about your project or what you'd like to discuss..."
                      [class.error]="isInvalid('message')"
                      [attr.aria-invalid]="isInvalid('message')"
                    >
                    </textarea>
                    <div class="char-count">
                      {{ contactForm.get('message')?.value?.length || 0 }} / 1000
                    </div>
                    @if (isInvalid('message')) {
                      <span class="form-error" role="alert">{{ getError('message') }}</span>
                    }
                  </div>
                  <button type="submit" class="btn-submit" [disabled]="state.isContactSubmitting()">
                    @if (state.isContactSubmitting()) {
                      <span class="spinner"></span> Sending...
                    } @else {
                      Send Message →
                    }
                  </button>
                </form>
              }
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .contact-section {
        background: linear-gradient(180deg, #0d0d0d, #0a0a0a);
      }
      .section-header {
        text-align: center;
        margin-bottom: 64px;
      }
      .eyebrow {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.7rem;
        font-weight: 500;
        letter-spacing: 0.15em;
        text-transform: uppercase;
        color: #ff6b00;
        margin-bottom: 16px;
        &::before,
        &::after {
          content: '';
          width: 18px;
          height: 1px;
          background: #ff6b00;
          opacity: 0.5;
        }
      }
      .section-header h2 {
        font-size: clamp(1.75rem, 4vw, 2.75rem);
        font-weight: 700;
        margin: 0 0 16px;
      }
      .section-header p {
        color: #707070;
        max-width: 520px;
        margin: 0 auto;
      }
      .gradient-text {
        background: linear-gradient(135deg, #ff6b00, #ff8c42);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
      .contact-grid {
        display: grid;
        grid-template-columns: 360px 1fr;
        gap: 48px;
        align-items: start;
        @media (max-width: 1024px) {
          grid-template-columns: 1fr;
        }
      }
      .info-cards {
        display: flex;
        flex-direction: column;
        gap: 12px;
        margin-bottom: 28px;
      }
      .info-card {
        background: rgba(26, 26, 26, 0.7);
        backdrop-filter: blur(16px);
        border: 1px solid rgba(255, 255, 255, 0.07);
        border-radius: 14px;
        padding: 16px 20px;
        display: flex;
        align-items: center;
        gap: 14px;
        transition: border-color 0.2s ease;
        &:hover {
          border-color: rgba(255, 107, 0, 0.2);
        }
      }
      .info-icon {
        font-size: 1.1rem;
        width: 38px;
        height: 38px;
        border-radius: 10px;
        background: rgba(255, 107, 0, 0.08);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }
      .info-label {
        display: block;
        font-size: 0.7rem;
        color: #505050;
        text-transform: uppercase;
        letter-spacing: 0.06em;
        margin-bottom: 3px;
      }
      .info-value {
        font-size: 0.875rem;
        color: #a0a0a0;
      }
      .info-value.link {
        color: #ff8c42;
        text-decoration: none;
        &:hover {
          color: #ff6b00;
        }
      }
      .social-heading {
        font-family: 'Space Grotesk', sans-serif;
        font-size: 0.75rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        color: #505050;
        margin: 0 0 14px;
      }
      .social-grid {
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin-bottom: 24px;
      }
      .social-card {
        background: rgba(26, 26, 26, 0.6);
        backdrop-filter: blur(12px);
        border: 1px solid rgba(255, 255, 255, 0.06);
        border-radius: 12px;
        padding: 14px 18px;
        display: flex;
        align-items: center;
        gap: 14px;
        text-decoration: none;
        transition: all 0.2s ease;
        &:hover {
          border-color: rgba(255, 107, 0, 0.25);
          transform: translateX(4px);
        }
      }
      .s-icon {
        font-size: 1.2rem;
        flex-shrink: 0;
      }
      .social-card strong {
        display: block;
        font-size: 0.875rem;
        font-weight: 600;
        color: #a0a0a0;
      }
      .social-card span {
        font-size: 0.75rem;
        color: #505050;
      }
      .availability-card {
        display: flex;
        align-items: flex-start;
        gap: 14px;
        padding: 18px 20px;
        border-radius: 14px;
        background: rgba(34, 197, 94, 0.06);
        border: 1px solid rgba(34, 197, 94, 0.15);
      }
      .avail-dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: #22c55e;
        box-shadow: 0 0 8px rgba(34, 197, 94, 0.5);
        flex-shrink: 0;
        margin-top: 5px;
        animation: blink 2s ease infinite;
        @keyframes blink {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.4;
          }
        }
      }
      .availability-card strong {
        display: block;
        font-size: 0.875rem;
        font-weight: 600;
        color: #4ade80;
        margin-bottom: 4px;
      }
      .availability-card span {
        font-size: 0.8rem;
        color: #507050;
        line-height: 1.5;
      }
      .form-card {
        background: rgba(26, 26, 26, 0.7);
        backdrop-filter: blur(24px);
        border: 1px solid rgba(255, 255, 255, 0.07);
        border-radius: 24px;
        padding: 40px;
        @media (max-width: 640px) {
          padding: 24px;
        }
      }
      .form-header {
        margin-bottom: 28px;
      }
      .form-header h3 {
        font-family: 'Space Grotesk', sans-serif;
        font-size: 1.25rem;
        font-weight: 700;
        color: #fff;
        margin: 0 0 6px;
      }
      .form-header p {
        font-size: 0.875rem;
        color: #606060;
        margin: 0;
      }
      .form-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 16px;
        @media (max-width: 640px) {
          grid-template-columns: 1fr;
        }
      }
      .form-group {
        margin-bottom: 20px;
      }
      .form-label {
        display: block;
        font-size: 0.8125rem;
        font-weight: 500;
        color: #a0a0a0;
        margin-bottom: 8px;
        letter-spacing: 0.02em;
      }
      .form-control {
        width: 100%;
        padding: 12px 16px;
        background: rgba(255, 255, 255, 0.04);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 10px;
        color: #fff;
        font-family: 'Inter', sans-serif;
        font-size: 0.9375rem;
        transition:
          border-color 0.2s ease,
          box-shadow 0.2s ease;
        outline: none;
        box-sizing: border-box;
        &::placeholder {
          color: #404040;
        }
        &:focus {
          border-color: #ff6b00;
          box-shadow: 0 0 0 3px rgba(255, 107, 0, 0.12);
          background: rgba(255, 255, 255, 0.06);
        }
        &.error {
          border-color: #ef4444;
        }
      }
      textarea.form-control {
        resize: vertical;
        min-height: 130px;
      }
      .char-count {
        font-size: 0.7rem;
        color: #404040;
        text-align: right;
        margin-top: 4px;
      }
      .form-error {
        display: block;
        font-size: 0.75rem;
        color: #f87171;
        margin-top: 4px;
      }
      .btn-submit {
        width: 100%;
        padding: 14px 24px;
        background: linear-gradient(135deg, #ff6b00, #ff8c42);
        color: #fff;
        border: none;
        border-radius: 12px;
        font-family: 'Space Grotesk', sans-serif;
        font-size: 0.9375rem;
        font-weight: 700;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        transition: all 0.25s ease;
        box-shadow: 0 4px 24px rgba(255, 107, 0, 0.3);
        &:hover:not(:disabled) {
          box-shadow: 0 6px 36px rgba(255, 107, 0, 0.5);
          transform: translateY(-1px);
        }
        &:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
      }
      .spinner {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        border: 2px solid rgba(255, 255, 255, 0.3);
        border-top-color: #fff;
        animation: spin 0.7s linear infinite;
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      }
      .success-state {
        text-align: center;
        padding: 40px 20px;
      }
      .success-icon {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: rgba(34, 197, 94, 0.15);
        border: 2px solid rgba(34, 197, 94, 0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
        color: #4ade80;
        margin: 0 auto 20px;
        animation: pop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        @keyframes pop {
          from {
            transform: scale(0);
          }
          to {
            transform: scale(1);
          }
        }
      }
      .success-state h4 {
        font-family: 'Space Grotesk', sans-serif;
        font-size: 1.25rem;
        color: #4ade80;
        margin: 0 0 8px;
      }
      .success-state p {
        color: #606060;
        margin: 0 0 24px;
      }
      .btn-reset {
        background: none;
        border: none;
        color: #ff8c42;
        font-size: 0.875rem;
        font-weight: 600;
        cursor: pointer;
        &:hover {
          color: #ff6b00;
        }
      }
      .reveal {
        opacity: 0;
        transform: translateY(28px);
        transition:
          opacity 0.7s ease,
          transform 0.7s ease;
      }
      .reveal.revealed {
        opacity: 1;
        transform: none;
      }
      .delay-1 {
        transition-delay: 0.1s;
      }
      .delay-2 {
        transition-delay: 0.2s;
      }
    `,
  ],
})
export class ContactComponent implements AfterViewInit {
  protected readonly data = inject(PortfolioDataService);
  protected readonly state = inject(PortfolioState);
  private readonly fb = inject(FormBuilder);
  private readonly emailSvc = inject(EmailService);
  private readonly platform = inject(PLATFORM_ID);

  protected contactForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', [Validators.required, Validators.minLength(4)]],
    message: ['', [Validators.required, Validators.minLength(20), Validators.maxLength(1000)]],
  });

  readonly contactItems = [
    { icon: '📍', label: 'Location', value: 'Coimbatore, Tamil Nadu, India', href: null },
    {
      icon: '✉️',
      label: 'Email',
      value: this.data.personalInfo.email,
      href: `mailto:${this.data.personalInfo.email}`,
    },
    {
      icon: '📞',
      label: 'Phone',
      value: this.data.personalInfo.phone,
      href: `tel:${this.data.personalInfo.phone}`,
    },
    { icon: '🕐', label: 'Timezone', value: 'IST (UTC +5:30)', href: null },
  ];

  readonly socials = [
    {
      icon: '⌨️',
      label: 'GitHub',
      handle: 'github.com/gowriprasath',
      href: this.data.personalInfo.github,
    },
    {
      icon: '💼',
      label: 'LinkedIn',
      handle: 'linkedin.com/in/gowriprasath',
      href: this.data.personalInfo.linkedin,
    },
  ];

  isInvalid(field: string): boolean {
    const c = this.contactForm.get(field);
    return !!(c?.invalid && c?.touched);
  }

  getError(field: string): string {
    const c = this.contactForm.get(field);
    if (!c?.errors) return '';
    if (c.errors['required'])
      return `${field.charAt(0).toUpperCase() + field.slice(1)} is required.`;
    if (c.errors['email']) return 'Please enter a valid email address.';
    if (c.errors['minlength'])
      return `Minimum ${c.errors['minlength'].requiredLength} characters required.`;
    if (c.errors['maxlength'])
      return `Maximum ${c.errors['maxlength'].requiredLength} characters allowed.`;
    return 'Invalid input.';
  }

  async onSubmit(): Promise<void> {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }
    this.state.isContactSubmitting.set(true);
    try {
      const v = this.contactForm.getRawValue();
      const ok = await this.emailSvc.sendContactEmail({
        name: v.name!,
        email: v.email!,
        subject: v.subject!,
        message: v.message!,
      });
      if (ok) {
        this.state.contactSubmitted.set(true);
        this.state.showToast("Message sent! I'll reply within 24 hrs.", 'success');
      } else {
        this.state.showToast('Failed to send. Please email me directly.', 'error');
      }
    } finally {
      this.state.isContactSubmitting.set(false);
    }
  }

  resetForm(): void {
    this.contactForm.reset();
    this.state.contactSubmitted.set(false);
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platform)) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            document
              .querySelectorAll('#contact .reveal')
              .forEach((el) => el.classList.add('revealed'));
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 },
    );
    const s = document.getElementById('contact');
    if (s) observer.observe(s);
  }
}
