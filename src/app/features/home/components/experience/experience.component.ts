import {
  Component,
  inject,
  ChangeDetectionStrategy,
  PLATFORM_ID,
  AfterViewInit,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PortfolioDataService } from '../../../../core/services/portfolio-data.service';

@Component({
  selector: 'app-experience',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="experience" class="section exp-section" aria-labelledby="exp-heading">
      <div class="container">
        <div class="section-header reveal">
          <span class="eyebrow">Career Journey</span>
          <h2 id="exp-heading">Work <span class="gradient-text">Experience</span></h2>
          <p>
            A focused, high-impact career building enterprise products that serve thousands of users
            globally.
          </p>
        </div>

        <div class="exp-layout">
          <!-- Timeline -->
          <div class="timeline-track" aria-hidden="true">
            <div class="timeline-line"></div>
          </div>

          <!-- Experiences -->
          <div class="exp-list">
            @for (exp of data.experiences; track exp.id; let i = $index) {
              <article
                class="exp-card reveal"
                [style.transition-delay]="i * 0.15 + 's'"
                [attr.aria-label]="exp.role + ' at ' + exp.company"
              >
                <!-- Timeline dot -->
                <div class="timeline-dot" [class.current]="exp.current" aria-hidden="true">
                  @if (exp.current) {
                    <div class="dot-pulse"></div>
                  }
                </div>

                <div class="exp-card-inner glass">
                  <!-- Header -->
                  <div class="exp-header">
                    <div class="exp-company-block">
                      <div class="company-logo" aria-hidden="true">
                        <span>EX</span>
                      </div>
                      <div>
                        <h3 class="company-name">{{ exp.company }}</h3>
                        <span class="exp-location">
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            aria-hidden="true"
                          >
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                            <circle cx="12" cy="10" r="3" />
                          </svg>
                          {{ exp.location }}
                        </span>
                      </div>
                    </div>
                    <div class="exp-meta-right">
                      <span class="exp-period">{{ exp.period }}</span>
                      @if (exp.current) {
                        <span class="current-badge">Current</span>
                      }
                    </div>
                  </div>

                  <!-- Role -->
                  <div class="role-block">
                    <h4 class="role-title">{{ exp.role }}</h4>
                    <p class="role-desc">{{ exp.description }}</p>
                  </div>

                  <!-- Responsibilities -->
                  <div class="responsibilities">
                    <h5 class="resp-heading">Key Responsibilities</h5>
                    <ul class="resp-list">
                      @for (resp of exp.responsibilities; track resp) {
                        <li>
                          <span class="resp-bullet" aria-hidden="true">›</span>
                          {{ resp }}
                        </li>
                      }
                    </ul>
                  </div>

                  <!-- Tech stack -->
                  <div class="exp-tech">
                    <h5 class="resp-heading">Technologies</h5>
                    <div class="tech-pills">
                      @for (tech of exp.technologies; track tech) {
                        <span class="tech-pill">{{ tech }}</span>
                      }
                    </div>
                  </div>
                </div>
              </article>
            }

            <!-- Future placeholder -->
            <div class="future-card reveal">
              <div class="timeline-dot future-dot" aria-hidden="true">
                <span>?</span>
              </div>
              <div class="future-card-inner glass">
                <h4>Next Chapter</h4>
                <p>
                  Always open to exciting opportunities that challenge and inspire. Let's build
                  something great together.
                </p>
                <button class="btn-contact" (click)="scrollTo('contact')">Get In Touch →</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .exp-section {
        background: #0a0a0a;
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

      /* ---- Layout ---- */
      .exp-layout {
        position: relative;
        display: flex;
        gap: 40px;
        @media (max-width: 768px) {
          gap: 20px;
        }
      }

      .timeline-track {
        flex-shrink: 0;
        width: 2px;
        position: relative;
        @media (max-width: 768px) {
          width: 1px;
        }
      }
      .timeline-line {
        position: sticky;
        top: 80px;
        width: 100%;
        height: calc(100vh - 160px);
        background: linear-gradient(
          180deg,
          #ff6b00 0%,
          rgba(255, 107, 0, 0.2) 60%,
          transparent 100%
        );
        border-radius: 2px;
      }

      .exp-list {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 32px;
      }

      /* ---- Exp card ---- */
      .exp-card {
        position: relative;
      }

      .timeline-dot {
        position: absolute;
        left: -49px;
        top: 28px;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: #ff6b00;
        border: 2px solid #0a0a0a;
        box-shadow: 0 0 16px rgba(255, 107, 0, 0.5);
        z-index: 2;
        @media (max-width: 768px) {
          left: -29px;
        }

        &.current {
          width: 20px;
          height: 20px;
          left: -51px;
          box-shadow:
            0 0 0 4px rgba(255, 107, 0, 0.2),
            0 0 24px rgba(255, 107, 0, 0.6);
        }
      }
      .dot-pulse {
        position: absolute;
        inset: -6px;
        border-radius: 50%;
        border: 2px solid rgba(255, 107, 0, 0.3);
        animation: pulse-ring 2s ease infinite;
        @keyframes pulse-ring {
          0% {
            transform: scale(0.8);
            opacity: 1;
          }
          100% {
            transform: scale(1.8);
            opacity: 0;
          }
        }
      }

      .future-dot {
        background: #1a1a1a;
        border: 2px solid rgba(255, 255, 255, 0.12);
        box-shadow: none;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.7rem;
        color: #505050;
      }

      .exp-card-inner {
        background: rgba(26, 26, 26, 0.7);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.07);
        border-radius: 20px;
        padding: 32px;
        transition:
          border-color 0.25s ease,
          box-shadow 0.25s ease;
        &:hover {
          border-color: rgba(255, 107, 0, 0.2);
          box-shadow: 0 8px 40px rgba(0, 0, 0, 0.4);
        }
        @media (max-width: 640px) {
          padding: 20px;
        }
      }

      .exp-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: 16px;
        margin-bottom: 24px;
        flex-wrap: wrap;
      }
      .exp-company-block {
        display: flex;
        align-items: center;
        gap: 14px;
      }
      .company-logo {
        width: 44px;
        height: 44px;
        border-radius: 12px;
        background: linear-gradient(135deg, #ff6b00, #ff8c42);
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: 'Space Grotesk', sans-serif;
        font-weight: 700;
        font-size: 0.75rem;
        color: #fff;
      }
      .company-name {
        font-family: 'Space Grotesk', sans-serif;
        font-size: 1.125rem;
        font-weight: 700;
        color: #fff;
        margin: 0 0 4px;
      }
      .exp-location {
        display: flex;
        align-items: center;
        gap: 4px;
        font-size: 0.8rem;
        color: #505050;
      }
      .exp-meta-right {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: 8px;
      }
      .exp-period {
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.8rem;
        color: #707070;
        background: rgba(255, 255, 255, 0.04);
        border: 1px solid rgba(255, 255, 255, 0.08);
        padding: 4px 12px;
        border-radius: 100px;
      }
      .current-badge {
        font-size: 0.7rem;
        font-weight: 600;
        padding: 3px 10px;
        border-radius: 100px;
        background: rgba(34, 197, 94, 0.1);
        border: 1px solid rgba(34, 197, 94, 0.2);
        color: #4ade80;
      }

      .role-block {
        margin-bottom: 24px;
      }
      .role-title {
        font-family: 'Space Grotesk', sans-serif;
        font-size: 1rem;
        font-weight: 600;
        color: #ff8c42;
        margin: 0 0 8px;
      }
      .role-desc {
        font-size: 0.9375rem;
        color: #707070;
        line-height: 1.7;
        margin: 0;
      }

      .resp-heading {
        font-family: 'Space Grotesk', sans-serif;
        font-size: 0.7rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        color: #505050;
        margin: 0 0 14px;
      }
      .resp-list {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: column;
        gap: 8px;
        margin-bottom: 24px;
      }
      .resp-list li {
        display: flex;
        align-items: flex-start;
        gap: 10px;
        font-size: 0.875rem;
        color: #707070;
        line-height: 1.6;
      }
      .resp-bullet {
        color: #ff6b00;
        font-weight: 700;
        flex-shrink: 0;
        margin-top: 1px;
      }

      .tech-pills {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }
      .tech-pill {
        padding: 4px 12px;
        border-radius: 100px;
        font-size: 0.75rem;
        font-weight: 500;
        background: rgba(255, 107, 0, 0.07);
        border: 1px solid rgba(255, 107, 0, 0.15);
        color: rgba(255, 140, 66, 0.75);
        font-family: 'JetBrains Mono', monospace;
      }

      /* Future card */
      .future-card-inner {
        background: rgba(26, 26, 26, 0.4);
        backdrop-filter: blur(16px);
        border: 1px dashed rgba(255, 255, 255, 0.08);
        border-radius: 20px;
        padding: 28px;
        h4 {
          font-size: 1rem;
          color: #505050;
          margin: 0 0 8px;
          font-family: 'Space Grotesk', sans-serif;
        }
        p {
          font-size: 0.875rem;
          color: #404040;
          margin: 0 0 16px;
          line-height: 1.7;
        }
      }
      .btn-contact {
        background: none;
        border: none;
        color: #ff8c42;
        font-size: 0.875rem;
        font-weight: 600;
        cursor: pointer;
        padding: 0;
        transition: color 0.2s ease;
        &:hover {
          color: #ff6b00;
        }
      }

      /* Reveal */
      .reveal {
        opacity: 0;
        transform: translateX(-24px);
        transition:
          opacity 0.7s ease,
          transform 0.7s ease;
      }
      .reveal.revealed {
        opacity: 1;
        transform: none;
      }
    `,
  ],
})
export class ExperienceComponent implements AfterViewInit {
  protected readonly data = inject(PortfolioDataService);
  private readonly platform = inject(PLATFORM_ID);

  scrollTo(id: string): void {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platform)) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            document
              .querySelectorAll('#experience .reveal')
              .forEach((el) => el.classList.add('revealed'));
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 },
    );
    const section = document.getElementById('experience');
    if (section) observer.observe(section);
  }
}
