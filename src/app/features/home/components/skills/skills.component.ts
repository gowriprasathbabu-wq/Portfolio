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
  selector: 'app-skills',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="skills" class="section skills-section" aria-labelledby="skills-heading">
      <div class="container">
        <!-- Header -->
        <div class="section-header reveal">
          <span class="eyebrow">Technical Arsenal</span>
          <h2 id="skills-heading">Skills &amp; <span class="gradient-text">Expertise</span></h2>
          <p>
            A comprehensive skill set spanning frontend, backend, cloud, and security — built
            through enterprise product development.
          </p>
        </div>

        <!-- Category tabs -->
        <div class="skill-tabs reveal delay-2" role="tablist" aria-label="Skill categories">
          @for (cat of data.skillCategories; track cat.id) {
            <button
              class="skill-tab"
              [class.active]="activeCategory() === cat.id"
              role="tab"
              [attr.aria-selected]="activeCategory() === cat.id"
              [attr.aria-controls]="'panel-' + cat.id"
              (click)="setCategory(cat.id)"
            >
              <span class="tab-icon">{{ cat.icon }}</span>
              <span>{{ cat.label }}</span>
            </button>
          }
        </div>

        <!-- Active category panel -->
        @for (cat of data.skillCategories; track cat.id) {
          @if (activeCategory() === cat.id) {
            <div
              [id]="'panel-' + cat.id"
              role="tabpanel"
              class="skills-panel"
              [attr.aria-label]="cat.label + ' skills'"
            >
              <div class="skills-grid">
                @for (skill of cat.skills; track skill.name) {
                  <div class="skill-card glass">
                    <div class="skill-card-top">
                      <span class="skill-icon" [attr.aria-hidden]="true">{{ skill.icon }}</span>
                      <div class="skill-ring-wrap">
                        <svg viewBox="0 0 56 56" class="skill-ring" aria-hidden="true">
                          <circle cx="28" cy="28" r="22" class="ring-bg" />
                          <circle
                            cx="28"
                            cy="28"
                            r="22"
                            class="ring-fill"
                            [style.stroke-dasharray]="'138.2'"
                            [style.stroke-dashoffset]="138.2 - (138.2 * skill.level) / 100"
                            [style.stroke]="cat.color"
                          />
                        </svg>
                        <span class="ring-pct">{{ skill.level }}</span>
                      </div>
                    </div>
                    <h4 class="skill-name">{{ skill.name }}</h4>
                    <div class="skill-bar-mini">
                      <div
                        class="skill-bar-fill"
                        [style.width.%]="skill.level"
                        [style.background]="cat.color + '88'"
                      ></div>
                    </div>
                    <span class="skill-level-label">
                      {{ getLevelLabel(skill.level) }}
                    </span>
                  </div>
                }
              </div>
            </div>
          }
        }

        <!-- Technologies cloud -->
        <div class="tech-cloud reveal">
          <h3 class="tech-cloud-heading">All Technologies</h3>
          <div class="tech-tags">
            @for (tech of allTechs; track tech.name) {
              <span class="tech-tag" [style.--cat-color]="tech.color">{{ tech.name }}</span>
            }
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .skills-section {
        background: linear-gradient(180deg, #0a0a0a 0%, #0d0d0d 100%);
      }

      .section-header {
        text-align: center;
        margin-bottom: 48px;
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

      /* ---- Tabs ---- */
      .skill-tabs {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 8px;
        margin-bottom: 48px;
      }
      .skill-tab {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 10px 20px;
        border-radius: 100px;
        background: transparent;
        border: 1px solid rgba(255, 255, 255, 0.08);
        color: #707070;
        font-size: 0.875rem;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s ease;
        font-family: 'Inter', sans-serif;

        &:hover {
          color: #c0c0c0;
          border-color: rgba(255, 255, 255, 0.15);
        }
        &.active {
          background: rgba(255, 107, 0, 0.12);
          border-color: rgba(255, 107, 0, 0.3);
          color: #ff8c42;
        }
      }
      .tab-icon {
        font-size: 0.9rem;
      }

      /* ---- Skills grid ---- */
      .skills-panel {
        animation: fadeIn 0.3s ease;
      }
      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateY(8px);
        }
        to {
          opacity: 1;
          transform: none;
        }
      }

      .skills-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
        gap: 16px;
        margin-bottom: 64px;
        @media (max-width: 640px) {
          grid-template-columns: repeat(2, 1fr);
        }
      }

      .skill-card {
        background: rgba(26, 26, 26, 0.7);
        backdrop-filter: blur(16px);
        border: 1px solid rgba(255, 255, 255, 0.06);
        border-radius: 20px;
        padding: 24px 20px;
        text-align: center;
        transition: all 0.25s ease;

        &:hover {
          transform: translateY(-4px);
          border-color: rgba(255, 107, 0, 0.25);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
        }
      }

      .skill-card-top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 14px;
      }
      .skill-icon {
        font-size: 1.5rem;
      }

      /* Ring progress */
      .skill-ring-wrap {
        position: relative;
        width: 44px;
        height: 44px;
        flex-shrink: 0;
      }
      .skill-ring {
        width: 100%;
        height: 100%;
        transform: rotate(-90deg);
      }
      .ring-bg {
        fill: none;
        stroke: rgba(255, 255, 255, 0.06);
        stroke-width: 3;
      }
      .ring-fill {
        fill: none;
        stroke-width: 3;
        stroke-linecap: round;
        transition: stroke-dashoffset 1.2s cubic-bezier(0.34, 1.2, 0.64, 1);
      }
      .ring-pct {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.6rem;
        font-weight: 600;
        color: #a0a0a0;
      }

      .skill-name {
        font-size: 0.8125rem;
        font-weight: 600;
        color: #c0c0c0;
        margin: 0 0 10px;
        font-family: 'Space Grotesk', sans-serif;
      }
      .skill-bar-mini {
        height: 2px;
        background: rgba(255, 255, 255, 0.06);
        border-radius: 2px;
        overflow: hidden;
        margin-bottom: 8px;
      }
      .skill-bar-fill {
        height: 100%;
        border-radius: 2px;
      }
      .skill-level-label {
        font-size: 0.65rem;
        text-transform: uppercase;
        letter-spacing: 0.06em;
        color: #505050;
      }

      /* ---- Tech cloud ---- */
      .tech-cloud {
        background: rgba(255, 255, 255, 0.02);
        border: 1px solid rgba(255, 255, 255, 0.06);
        border-radius: 24px;
        padding: 40px;
        @media (max-width: 640px) {
          padding: 24px;
        }
      }
      .tech-cloud-heading {
        font-family: 'Space Grotesk', sans-serif;
        font-size: 0.75rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        color: #505050;
        margin: 0 0 24px;
      }
      .tech-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
      }
      .tech-tag {
        padding: 7px 16px;
        border-radius: 100px;
        font-size: 0.8125rem;
        font-weight: 500;
        background: rgba(255, 255, 255, 0.04);
        border: 1px solid rgba(255, 255, 255, 0.08);
        color: #707070;
        transition: all 0.2s ease;
        cursor: default;

        &:hover {
          background: rgba(from var(--cat-color) r g b / 0.12);
          border-color: rgba(from var(--cat-color) r g b / 0.3);
          color: #c0c0c0;
        }
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
      .delay-2 {
        transition-delay: 0.2s;
      }
    `,
  ],
})
export class SkillsComponent implements AfterViewInit {
  protected readonly data = inject(PortfolioDataService);
  private readonly platform = inject(PLATFORM_ID);

  protected activeCategory = signal('frontend');

  readonly allTechs = [
    { name: 'Angular 20', color: '#FF6B00' },
    { name: 'TypeScript', color: '#3B82F6' },
    { name: 'React', color: '#61DAFB' },
    { name: 'Ionic', color: '#3880FF' },
    { name: 'ASP.NET Core', color: '#512BD4' },
    { name: 'C#', color: '#512BD4' },
    { name: 'MSSQL', color: '#CC2927' },
    { name: 'Entity Framework', color: '#512BD4' },
    { name: 'AWS EC2', color: '#FF9900' },
    { name: 'AWS ECS', color: '#FF9900' },
    { name: 'AWS EKS', color: '#FF9900' },
    { name: 'Docker', color: '#2496ED' },
    { name: 'Keycloak', color: '#A855F7' },
    { name: 'OAuth2', color: '#A855F7' },
    { name: 'JWT', color: '#FB7185' },
    { name: 'SonarQube', color: '#4E9BCD' },
    { name: 'GitHub Actions', color: '#22C55E' },
    { name: 'RxJS', color: '#B7178C' },
    { name: 'SignalR', color: '#512BD4' },
    { name: 'REST APIs', color: '#10B981' },
    { name: 'SCSS', color: '#CC6699' },
    { name: 'HTML5', color: '#E34F26' },
    { name: 'SDLC', color: '#6B7280' },
    { name: 'Agile', color: '#0EA5E9' },
  ];

  setCategory(id: string): void {
    this.activeCategory.set(id);
  }

  getLevelLabel(level: number): string {
    if (level >= 90) return 'Expert';
    if (level >= 80) return 'Advanced';
    if (level >= 70) return 'Proficient';
    return 'Intermediate';
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platform)) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            document
              .querySelectorAll('#skills .reveal')
              .forEach((el) => el.classList.add('revealed'));
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15 },
    );
    const section = document.getElementById('skills');
    if (section) observer.observe(section);
  }
}
