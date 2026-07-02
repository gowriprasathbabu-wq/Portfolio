import {
  Component, inject, AfterViewInit, ChangeDetectionStrategy,
  PLATFORM_ID, ElementRef, ViewChildren, QueryList,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PortfolioDataService } from '../../../../core/services/portfolio-data.service';

@Component({
  selector: 'app-about',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="about" class="section about-section" aria-labelledby="about-heading">
      <div class="container">

        <div class="about-grid">

          <!-- Left: Info card -->
          <div class="about-left reveal">
            <div class="profile-card glass">
              <!-- Card header -->
              <div class="profile-card-header">
                <div class="profile-avatar">
                  <svg viewBox="0 0 80 80" width="80" height="80">
                    <circle cx="40" cy="40" r="40" fill="#1A1A1A"/>
                    <ellipse cx="40" cy="70" rx="28" ry="20" fill="#FF6B00"/>
                    <ellipse cx="40" cy="40" rx="16" ry="17" fill="#D4956A"/>
                    <ellipse cx="40" cy="28" rx="16" ry="10" fill="#1A0A00"/>
                    <rect x="24" y="28" width="4" height="14" rx="2" fill="#1A0A00"/>
                    <rect x="52" y="28" width="4" height="14" rx="2" fill="#1A0A00"/>
                    <circle cx="35" cy="40" r="2.5" fill="#1A0A00"/>
                    <circle cx="45" cy="40" r="2.5" fill="#1A0A00"/>
                    <path d="M36 50 Q40 54 44 50" stroke="#8B5E3C" stroke-width="1.5" fill="none" stroke-linecap="round"/>
                  </svg>
                </div>
                <div class="profile-identity">
                  <h3>{{ data.personalInfo.name }}</h3>
                  <p>{{ data.personalInfo.title }}</p>
                  <div class="profile-status">
                    <span class="status-dot"></span>
                    Open to opportunities
                  </div>
                </div>
              </div>

              <!-- Stats grid -->
              <div class="stats-grid">
                @for (stat of stats; track stat.label) {
                  <div class="stat-item">
                    <span class="stat-icon">{{ stat.icon }}</span>
                    <span class="stat-value">{{ stat.value }}</span>
                    <span class="stat-label">{{ stat.label }}</span>
                  </div>
                }
              </div>

              <!-- Info list -->
              <ul class="info-list">
                @for (info of infoItems; track info.label) {
                  <li>
                    <span class="info-icon">{{ info.icon }}</span>
                    <div>
                      <span class="info-label">{{ info.label }}</span>
                      <span class="info-value">{{ info.value }}</span>
                    </div>
                  </li>
                }
              </ul>

              <!-- Social -->
              <div class="profile-social">
                <a [href]="data.personalInfo.github" target="_blank" rel="noopener noreferrer"
                   class="social-link" aria-label="GitHub">GitHub →</a>
                <a [href]="data.personalInfo.linkedin" target="_blank" rel="noopener noreferrer"
                   class="social-link" aria-label="LinkedIn">LinkedIn →</a>
              </div>
            </div>
          </div>

          <!-- Right: content -->
          <div class="about-right">
            <div class="section-label reveal delay-1">
              <span class="eyebrow">About Me</span>
            </div>

            <h2 id="about-heading" class="about-heading reveal delay-2">
              Building <span class="gradient-text">enterprise</span> solutions<br>that scale globally
            </h2>

            <p class="about-summary reveal delay-3">{{ data.personalInfo.summary }}</p>

            <p class="about-detail reveal delay-4">
              With a deep focus on <strong>clean architecture</strong> and <strong>SOLID principles</strong>,
              I craft maintainable, testable, and performant applications. From architecting multi-country
              procurement platforms to integrating AI-powered workflows, I bring a full-stack perspective to
              every challenge.
            </p>

            <!-- Skill bars -->
            <div class="core-skills reveal delay-5">
              <h4 class="skills-heading">Core Proficiency</h4>
              @for (skill of data.coreSkills; track skill.label) {
                <div class="skill-row">
                  <div class="skill-meta">
                    <span class="skill-name">{{ skill.label }}</span>
                    <span class="skill-pct">{{ skill.percentage }}%</span>
                  </div>
                  <div class="skill-track">
                    <div
                      class="skill-fill"
                      #skillFill
                      [attr.data-width]="skill.percentage">
                    </div>
                  </div>
                </div>
              }
            </div>

            <!-- What I do pills -->
            <div class="about-tags reveal delay-6">
              @for (tag of tags; track tag) {
                <span class="tag">{{ tag }}</span>
              }
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .about-section { background: #0D0D0D; }
    .about-grid {
      display: grid;
      grid-template-columns: 380px 1fr;
      gap: 80px;
      align-items: start;
      @media(max-width:1024px){grid-template-columns:1fr;gap:48px;}
    }

    /* ---- Profile card ---- */
    .profile-card {
      background: rgba(26,26,26,.7);
      backdrop-filter: blur(24px);
      border: 1px solid rgba(255,255,255,.07);
      border-radius: 24px;
      padding: 32px;
      position: sticky;
      top: 100px;
      @media(max-width:1024px){position:static;}
    }
    .profile-card-header {
      display: flex;
      align-items: center;
      gap: 20px;
      padding-bottom: 28px;
      border-bottom: 1px solid rgba(255,255,255,.06);
      margin-bottom: 28px;
    }
    .profile-avatar {
      flex-shrink: 0;
      width: 80px; height: 80px;
      border-radius: 50%;
      border: 2px solid rgba(255,107,0,.25);
      overflow: hidden;
      box-shadow: 0 0 24px rgba(255,107,0,.15);
    }
    .profile-identity h3 {
      font-size: .9375rem; font-weight: 700;
      color: #fff; margin: 0 0 4px;
      font-family: 'Space Grotesk', sans-serif;
    }
    .profile-identity p { font-size: .8rem; color: #707070; margin: 0 0 8px; }
    .profile-status {
      display: flex; align-items: center; gap: 6px;
      font-size: .75rem; color: #4ade80;
    }
    .status-dot {
      width: 7px; height: 7px; border-radius: 50%;
      background: #22c55e; box-shadow: 0 0 6px rgba(34,197,94,.5);
      animation: blink 2s ease infinite;
      @keyframes blink{0%,100%{opacity:1;}50%{opacity:.3;}}
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
      margin-bottom: 28px;
    }
    .stat-item {
      background: rgba(255,255,255,.03);
      border: 1px solid rgba(255,255,255,.06);
      border-radius: 14px;
      padding: 16px;
      text-align: center;
    }
    .stat-icon { display: block; font-size: 1.1rem; margin-bottom: 4px; }
    .stat-value { display: block; font-family: 'Space Grotesk',sans-serif; font-size: 1.3rem; font-weight: 700; color: #FF8C42; }
    .stat-label { display: block; font-size: .7rem; color: #505050; margin-top: 2px; }

    .info-list {
      list-style: none; margin: 0; padding: 0;
      display: flex; flex-direction: column; gap: 14px;
      margin-bottom: 24px;
    }
    .info-list li { display: flex; align-items: flex-start; gap: 12px; }
    .info-icon { font-size: .9rem; margin-top: 1px; }
    .info-label { display: block; font-size: .7rem; color: #505050; text-transform: uppercase; letter-spacing: .06em; }
    .info-value { display: block; font-size: .875rem; color: #A0A0A0; margin-top: 2px; }

    .profile-social {
      display: flex; gap: 12px;
      padding-top: 20px;
      border-top: 1px solid rgba(255,255,255,.06);
    }
    .social-link {
      font-size: .8125rem; font-weight: 600;
      color: #FF8C42; text-decoration: none;
      transition: color .2s ease;
      &:hover { color: #FF6B00; }
    }

    /* ---- Right column ---- */
    .section-label { margin-bottom: 16px; }
    .eyebrow {
      display: inline-flex; align-items: center; gap: 8px;
      font-family: 'JetBrains Mono', monospace;
      font-size: .7rem; font-weight: 500;
      letter-spacing: .15em; text-transform: uppercase;
      color: #FF6B00;
      &::before, &::after {
        content: ''; width: 18px; height: 1px;
        background: #FF6B00; opacity: .5;
      }
    }

    .about-heading {
      font-size: clamp(1.75rem, 4vw, 2.75rem);
      font-weight: 700; line-height: 1.15;
      margin: 0 0 24px;
    }
    .gradient-text {
      background: linear-gradient(135deg, #FF6B00, #FF8C42);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .about-summary, .about-detail {
      font-size: 1rem; line-height: 1.8;
      color: #707070; margin-bottom: 20px;
      strong { color: #A0A0A0; font-weight: 500; }
    }

    /* ---- Skill bars ---- */
    .core-skills { margin-bottom: 32px; }
    .skills-heading {
      font-family: 'Space Grotesk', sans-serif;
      font-size: .8125rem; font-weight: 600;
      color: #A0A0A0; text-transform: uppercase;
      letter-spacing: .06em; margin: 0 0 20px;
    }
    .skill-row { margin-bottom: 14px; }
    .skill-meta { display: flex; justify-content: space-between; margin-bottom: 6px; }
    .skill-name { font-size: .875rem; font-weight: 500; color: #C0C0C0; }
    .skill-pct { font-family: 'JetBrains Mono', monospace; font-size: .8rem; color: #FF8C42; }
    .skill-track {
      height: 4px; background: rgba(255,255,255,.06);
      border-radius: 100px; overflow: hidden;
    }
    .skill-fill {
      height: 100%;
      background: linear-gradient(90deg, #FF6B00, #FF8C42);
      border-radius: 100px;
      width: 0;
      transition: width 1.4s cubic-bezier(.34,1.2,.64,1);
    }

    /* ---- Tags ---- */
    .about-tags { display: flex; flex-wrap: wrap; gap: 8px; }
    .tag {
      padding: 6px 14px; border-radius: 100px;
      font-size: .75rem; font-weight: 500;
      background: rgba(255,107,0,.08);
      color: rgba(255,140,66,.8);
      border: 1px solid rgba(255,107,0,.15);
    }

    /* Reveal */
    .reveal { opacity:0;transform:translateY(28px);transition:opacity .7s ease,transform .7s ease; }
    .reveal.revealed { opacity:1;transform:none; }
    @for $i from 1 through 6 { .delay-#{$i} { transition-delay: #{$i * 0.1}s; } }
  `],
})
export class AboutComponent implements AfterViewInit {
  protected readonly data = inject(PortfolioDataService);
  private readonly platform = inject(PLATFORM_ID);

  @ViewChildren('skillFill') skillFills!: QueryList<ElementRef<HTMLElement>>;

  readonly stats = [
    { icon: '⚡', value: '5+',  label: 'Years Exp.' },
    { icon: '🚀', value: '20+', label: 'Projects' },
    { icon: '🌍', value: '10+', label: 'Countries' },
    { icon: '👥', value: '1K+', label: 'Users' },
  ];

  readonly infoItems = [
    { icon: '📍', label: 'Location',   value: 'Coimbatore, Tamil Nadu' },
    { icon: '🏢', label: 'Company',    value: 'Exalca Technologies' },
    { icon: '🎓', label: 'Expertise',  value: 'Full Stack · Cloud · Security' },
    { icon: '🌐', label: 'Languages',  value: 'English · Tamil' },
  ];

  readonly tags = [
    'Enterprise Architecture', 'Angular Expert', 'API Design',
    'Cloud Engineering', 'Agile/SCRUM', 'Code Reviews',
    'Performance Optimization', 'Security Integration',
  ];

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platform)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Animate skill bars
            this.skillFills.forEach(fill => {
              const w = fill.nativeElement.getAttribute('data-width');
              fill.nativeElement.style.width = `${w}%`;
            });
            // Trigger reveals
            document.querySelectorAll('#about .reveal').forEach(el => el.classList.add('revealed'));
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );

    const section = document.getElementById('about');
    if (section) observer.observe(section);
  }
}
