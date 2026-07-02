import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { PortfolioDataService } from '../../../core/services/portfolio-data.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer class="site-footer">
      <div class="container">
        <div class="footer-grid">
          <!-- Brand -->
          <div class="footer-brand">
            <div class="logo-mark">
              <span class="bracket">&lt;</span><span>GP</span><span class="bracket">/&gt;</span>
            </div>
            <p class="tagline">
              Crafting enterprise-grade software with passion, precision, and purpose.
            </p>
            <div class="social-links">
              <a
                [href]="data.personalInfo.github"
                target="_blank"
                rel="noopener noreferrer"
                class="social-btn"
                aria-label="GitHub"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path
                    d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"
                  />
                </svg>
              </a>
              <a
                [href]="data.personalInfo.linkedin"
                target="_blank"
                rel="noopener noreferrer"
                class="social-btn"
                aria-label="LinkedIn"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path
                    d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                  />
                </svg>
              </a>
              <a [href]="'mailto:' + data.personalInfo.email" class="social-btn" aria-label="Email">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                  />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </a>
            </div>
          </div>

          <!-- Quick links -->
          <div class="footer-col">
            <h4 class="footer-heading">Navigation</h4>
            <ul>
              @for (item of data.navItems; track item.anchor) {
                <li>
                  <button class="footer-link" (click)="scrollTo(item.anchor)">
                    {{ item.label }}
                  </button>
                </li>
              }
            </ul>
          </div>

          <!-- Tech Stack -->
          <div class="footer-col">
            <h4 class="footer-heading">Core Stack</h4>
            <ul>
              @for (tech of stack; track tech) {
                <li>
                  <span class="footer-tech">{{ tech }}</span>
                </li>
              }
            </ul>
          </div>

          <!-- Contact info -->
          <div class="footer-col">
            <h4 class="footer-heading">Get In Touch</h4>
            <ul class="contact-list">
              <li>
                <span class="contact-icon">📍</span>
                <span>{{ data.personalInfo.location }}</span>
              </li>
              <li>
                <span class="contact-icon">✉️</span>
                <a [href]="'mailto:' + data.personalInfo.email">{{ data.personalInfo.email }}</a>
              </li>
              <li>
                <span class="contact-icon">📞</span>
                <a [href]="'tel:' + data.personalInfo.phone">{{ data.personalInfo.phone }}</a>
              </li>
            </ul>
          </div>
        </div>

        <!-- Bottom bar -->
        <div class="footer-bottom">
          <p class="copyright">
            &copy; {{ year }} <span class="text-orange">{{ data.personalInfo.name }}</span
            >. Built with <span class="heart">♥</span> using Angular 20 & TypeScript 5.8+
          </p>
          <p class="made-with">
            <span class="tech-badge">Angular 20</span>
            <span class="tech-badge">TypeScript</span>
            <span class="tech-badge">SCSS</span>
          </p>
        </div>
      </div>
    </footer>
  `,
  styles: [
    `
      .site-footer {
        background: #0d0d0d;
        border-top: 1px solid rgba(255, 255, 255, 0.06);
        padding: 80px 0 40px;
      }
      .footer-grid {
        display: grid;
        grid-template-columns: 2fr 1fr 1fr 1.5fr;
        gap: 48px;
        margin-bottom: 64px;
        @media (max-width: 1024px) {
          grid-template-columns: 1fr 1fr;
          gap: 32px;
        }
        @media (max-width: 640px) {
          grid-template-columns: 1fr;
          gap: 24px;
        }
      }
      .logo-mark {
        font-family: 'JetBrains Mono', monospace;
        font-size: 1.5rem;
        font-weight: 700;
        margin-bottom: 16px;
        .bracket {
          color: #ff6b00;
          opacity: 0.7;
        }
        span:nth-child(2) {
          color: #fff;
        }
      }
      .tagline {
        color: #707070;
        font-size: 0.9rem;
        line-height: 1.7;
        max-width: 260px;
        margin: 0 0 24px;
      }
      .social-links {
        display: flex;
        gap: 10px;
      }
      .social-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 38px;
        height: 38px;
        border-radius: 10px;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.08);
        color: #707070;
        transition: all 0.2s ease;
        &:hover {
          color: #ff6b00;
          background: rgba(255, 107, 0, 0.1);
          border-color: rgba(255, 107, 0, 0.3);
        }
      }
      .footer-heading {
        font-family: 'Space Grotesk', sans-serif;
        font-size: 0.7rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.12em;
        color: #ff6b00;
        margin: 0 0 20px;
      }
      .footer-col ul {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      .footer-link {
        background: none;
        border: none;
        color: #707070;
        font-size: 0.875rem;
        cursor: pointer;
        padding: 0;
        text-align: left;
        transition: color 0.2s ease;
        &:hover {
          color: #ff8c42;
        }
      }
      .footer-tech {
        color: #707070;
        font-size: 0.875rem;
        font-family: 'JetBrains Mono', monospace;
      }
      .contact-list {
        gap: 14px !important;
      }
      .contact-list li {
        display: flex;
        align-items: center;
        gap: 10px;
        color: #707070;
        font-size: 0.875rem;
      }
      .contact-list a {
        color: #707070;
        transition: color 0.2s ease;
        &:hover {
          color: #ff8c42;
        }
      }
      .contact-icon {
        font-size: 0.9rem;
      }
      .footer-bottom {
        padding-top: 32px;
        border-top: 1px solid rgba(255, 255, 255, 0.05);
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 16px;
      }
      .copyright {
        color: #505050;
        font-size: 0.8125rem;
        margin: 0;
      }
      .text-orange {
        color: #ff8c42;
      }
      .heart {
        color: #ff6b00;
        animation: heartbeat 1.5s ease infinite;
        @keyframes heartbeat {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.2);
          }
        }
      }
      .made-with {
        display: flex;
        gap: 8px;
        margin: 0;
      }
      .tech-badge {
        padding: 3px 10px;
        border-radius: 100px;
        font-size: 0.7rem;
        font-weight: 500;
        font-family: 'JetBrains Mono', monospace;
        background: rgba(255, 107, 0, 0.08);
        color: rgba(255, 107, 0, 0.7);
        border: 1px solid rgba(255, 107, 0, 0.15);
      }
    `,
  ],
})
export class FooterComponent {
  protected readonly data = inject(PortfolioDataService);
  readonly year = new Date().getFullYear();
  readonly stack = ['Angular 20', 'TypeScript 5.8', 'ASP.NET Core', 'React', 'AWS', 'Docker'];

  scrollTo(id: string): void {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }
}
