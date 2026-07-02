import {
  Component,
  inject,
  signal,
  ChangeDetectionStrategy,
  PLATFORM_ID,
  AfterViewInit,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PortfolioDataService } from '../../../../core/services/portfolio-data.service';

@Component({
  selector: 'app-achievements',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="achievements" class="achievements-section" aria-labelledby="ach-heading">
      <!-- Top wave -->
      <div class="section-divider top" aria-hidden="true">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none">
          <path d="M0,60 C360,0 1080,80 1440,20 L1440,0 L0,0 Z" fill="#0A0A0A" />
        </svg>
      </div>

      <div class="ach-inner">
        <div class="container">
          <!-- Header -->
          <div class="ach-header reveal">
            <span class="eyebrow">Impact & Scale</span>
            <h2 id="ach-heading">Global <span class="gradient-text">Achievements</span></h2>
          </div>

          <!-- Counters -->
          <div class="counters-grid">
            @for (ach of data.achievements; track ach.id; let i = $index) {
              <div class="counter-card reveal glass" [style.transition-delay]="i * 0.1 + 's'">
                <div class="counter-icon" aria-hidden="true">{{ ach.icon }}</div>
                <div class="counter-value" [attr.aria-label]="ach.value + ' ' + ach.label">
                  {{ displayValues()[i] }}
                </div>
                <div class="counter-label">{{ ach.label }}</div>
                @if (ach.description) {
                  <div class="counter-desc">{{ ach.description }}</div>
                }
              </div>
            }
          </div>

          <!-- Achievement highlights -->
          <div class="highlights-grid">
            @for (hl of highlights; track hl.title; let i = $index) {
              <div
                class="highlight-card reveal glass"
                [style.transition-delay]="i * 0.1 + 0.4 + 's'"
              >
                <div class="hl-icon" aria-hidden="true">{{ hl.icon }}</div>
                <div class="hl-content">
                  <h4>{{ hl.title }}</h4>
                  <p>{{ hl.desc }}</p>
                </div>
              </div>
            }
          </div>
        </div>
      </div>

      <!-- Bottom wave -->
      <div class="section-divider bottom" aria-hidden="true">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none">
          <path d="M0,0 C360,80 1080,0 1440,40 L1440,60 L0,60 Z" fill="#0A0A0A" />
        </svg>
      </div>
    </section>
  `,
  styles: [
    `
      .achievements-section {
        position: relative;
        background: linear-gradient(135deg, #0d0d0d 0%, #111111 50%, #0d0d0d 100%);
      }
      .section-divider {
        width: 100%;
        line-height: 0;
        &.top {
          margin-bottom: -2px;
        }
        &.bottom {
          margin-top: -2px;
        }
        svg {
          width: 100%;
          height: 60px;
          display: block;
        }
      }
      .ach-inner {
        padding: 80px 0;
      }

      .ach-header {
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
      .ach-header h2 {
        font-size: clamp(1.75rem, 4vw, 2.75rem);
        font-weight: 700;
        margin: 0;
      }
      .gradient-text {
        background: linear-gradient(135deg, #ff6b00, #ff8c42);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }

      /* Counters */
      .counters-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 24px;
        margin-bottom: 40px;
        @media (max-width: 768px) {
          grid-template-columns: repeat(2, 1fr);
        }
        @media (max-width: 480px) {
          grid-template-columns: 1fr;
        }
      }

      .counter-card {
        background: rgba(26, 26, 26, 0.6);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.07);
        border-radius: 24px;
        padding: 40px 28px;
        text-align: center;
        transition: all 0.3s ease;
        position: relative;
        overflow: hidden;

        &::before {
          content: '';
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 60%;
          height: 2px;
          background: linear-gradient(90deg, transparent, #ff6b00, transparent);
          opacity: 0.5;
        }

        &:hover {
          transform: translateY(-6px);
          border-color: rgba(255, 107, 0, 0.25);
          box-shadow:
            0 12px 48px rgba(0, 0, 0, 0.5),
            0 0 40px rgba(255, 107, 0, 0.1);
        }
      }

      .counter-icon {
        font-size: 2rem;
        margin-bottom: 16px;
        display: block;
      }
      .counter-value {
        font-family: 'Space Grotesk', sans-serif;
        font-size: clamp(2.5rem, 5vw, 3.5rem);
        font-weight: 800;
        background: linear-gradient(135deg, #ff6b00, #ff8c42, #ffb347);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        line-height: 1;
        margin-bottom: 12px;
        display: block;
      }
      .counter-label {
        font-family: 'Space Grotesk', sans-serif;
        font-size: 0.875rem;
        font-weight: 600;
        color: #a0a0a0;
        margin-bottom: 6px;
      }
      .counter-desc {
        font-size: 0.75rem;
        color: #505050;
      }

      /* Highlights */
      .highlights-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 20px;
        @media (max-width: 640px) {
          grid-template-columns: 1fr;
        }
      }

      .highlight-card {
        background: rgba(26, 26, 26, 0.5);
        backdrop-filter: blur(16px);
        border: 1px solid rgba(255, 255, 255, 0.06);
        border-radius: 16px;
        padding: 24px;
        display: flex;
        align-items: flex-start;
        gap: 16px;
        transition: all 0.25s ease;
        &:hover {
          border-color: rgba(255, 107, 0, 0.2);
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.3);
        }
      }
      .hl-icon {
        font-size: 1.5rem;
        width: 44px;
        height: 44px;
        border-radius: 12px;
        background: rgba(255, 107, 0, 0.1);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }
      .hl-content h4 {
        font-family: 'Space Grotesk', sans-serif;
        font-size: 0.9375rem;
        font-weight: 700;
        color: #c0c0c0;
        margin: 0 0 6px;
      }
      .hl-content p {
        font-size: 0.8125rem;
        color: #606060;
        margin: 0;
        line-height: 1.6;
      }

      /* Reveal */
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
      @for $i from 1 through 8 {
        .delay-#{$i} {
          transition-delay: #{$i * 0.1}s;
        }
      }
    `,
  ],
})
export class AchievementsComponent implements AfterViewInit {
  protected readonly data = inject(PortfolioDataService);
  private readonly platform = inject(PLATFORM_ID);

  protected displayValues = signal<string[]>(['0', '0', '0', '0']);

  readonly highlights = [
    {
      icon: '🌍',
      title: 'PROCON Global Launch',
      desc: 'Successfully launched enterprise procurement platform across 10+ countries with onsite deployment in Nigeria.',
    },
    {
      icon: '🚀',
      title: 'Enterprise Leadership',
      desc: 'Led architecture, development, and deployment of 5+ major enterprise products end-to-end.',
    },
    {
      icon: '🔒',
      title: 'Security-First Engineering',
      desc: 'Implemented Keycloak SSO, OAuth2/JWT authentication for enterprise-grade security across all products.',
    },
    {
      icon: '⚡',
      title: 'AI-Powered Innovation',
      desc: 'Pioneered integration of Microsoft Copilot in ProcureSprint for next-gen agentic procurement workflows.',
    },
  ];

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platform)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            document
              .querySelectorAll('#achievements .reveal')
              .forEach((el) => el.classList.add('revealed'));
            this.startCounters();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.25 },
    );
    const section = document.getElementById('achievements');
    if (section) observer.observe(section);
  }

  private startCounters(): void {
    const targets = ['10+', '20+', '5+', '1K+'];
    const numerics = [10, 20, 5, 1000];
    const suffixes = ['+', '+', '+', 'K+'];
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const eased = 1 - Math.pow(1 - progress, 3); // ease out cubic

      const values = numerics.map((target, i) => {
        const current = Math.floor(eased * target);
        if (step >= steps) return targets[i];
        if (target >= 1000)
          return `${(current / 1000).toFixed(current < 1000 ? 1 : 0)}${suffixes[i]}`;
        return `${current}${suffixes[i]}`;
      });

      this.displayValues.set(values);
      if (step >= steps) clearInterval(timer);
    }, interval);
  }
}
