import {
  Component, inject, signal, computed, ChangeDetectionStrategy, PLATFORM_ID, AfterViewInit,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PortfolioDataService } from '../../../../core/services/portfolio-data.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="projects" class="section projects-section" aria-labelledby="projects-heading">
      <div class="container">

        <div class="section-header reveal">
          <span class="eyebrow">Portfolio</span>
          <h2 id="projects-heading">Featured <span class="gradient-text">Projects</span></h2>
          <p>Enterprise-grade solutions built for real-world impact — from global procurement platforms to AI-powered automation.</p>
        </div>

        <!-- Filter pills -->
        <div class="filter-pills reveal delay-1" role="group" aria-label="Filter projects">
          @for (f of filters; track f.id) {
            <button
              class="filter-pill"
              [class.active]="activeFilter() === f.id"
              (click)="activeFilter.set(f.id)"
              [attr.aria-pressed]="activeFilter() === f.id">
              {{ f.label }}
            </button>
          }
        </div>

        <!-- Featured (large) projects -->
        <div class="featured-projects">
          @for (project of featuredProjects(); track project.id; let i = $index) {
            <article
              class="project-card featured-card reveal"
              [style.transition-delay]="(i * 0.1) + 's'"
              [class.reverse]="i % 2 !== 0"
              [attr.aria-label]="project.title">

              <!-- Visual panel -->
              <div class="project-visual" [attr.data-tech]="project.tech[0]">
                <div class="project-bg-pattern"></div>
                <div class="project-display">
                  <div class="browser-bar" aria-hidden="true">
                    <span></span><span></span><span></span>
                    <div class="browser-url">{{ project.id }}.app</div>
                  </div>
                  <div class="project-screen">
                    <div class="screen-header" [style.background]="getProjectColor(project.id)">
                      <span class="screen-title">{{ project.title }}</span>
                    </div>
                    <div class="screen-body">
                      <div class="screen-row w70"></div>
                      <div class="screen-row w90"></div>
                      <div class="screen-row w50"></div>
                      <div class="screen-cards">
                        <div class="screen-card"></div>
                        <div class="screen-card"></div>
                        <div class="screen-card"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Content panel -->
              <div class="project-content">
                <div class="project-meta">
                  <span class="project-year">{{ project.year }}</span>
                  <span class="status-chip" [class]="'status-' + project.status">
                    {{ project.status === 'in-progress' ? 'In Progress' : project.status === 'live' ? '🟢 Live' : '✓ Completed' }}
                  </span>
                </div>

                <h3 class="project-title">{{ project.title }}</h3>
                <p class="project-subtitle">{{ project.subtitle }}</p>
                <p class="project-desc">{{ project.description }}</p>

                <!-- Features list -->
                <ul class="features-list">
                  @for (feat of project.features.slice(0, 4); track feat) {
                    <li>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FF6B00" stroke-width="2.5" aria-hidden="true">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                      {{ feat }}
                    </li>
                  }
                </ul>

                <!-- Tech stack -->
                <div class="project-tech">
                  @for (tech of project.tech; track tech) {
                    <span class="tech-tag">{{ tech }}</span>
                  }
                </div>
              </div>
            </article>
          }
        </div>

        <!-- Grid projects (smaller) -->
        <div class="grid-projects">
          @for (project of gridProjects(); track project.id; let i = $index) {
            <article class="project-mini-card reveal glass" [style.transition-delay]="(i * 0.1) + 's'">
              <div class="mini-card-header">
                <div class="project-icon" [style.background]="getProjectColor(project.id) + '22'">
                  <span>{{ getProjectEmoji(project.id) }}</span>
                </div>
                <span class="status-chip mini" [class]="'status-' + project.status">
                  {{ project.status === 'in-progress' ? '⟳' : project.status === 'live' ? '●' : '✓' }}
                </span>
              </div>
              <h4 class="mini-title">{{ project.title }}</h4>
              <p class="mini-desc">{{ project.description }}</p>
              <div class="mini-tech">
                @for (tech of project.tech.slice(0, 3); track tech) {
                  <span class="tech-tag mini-tag">{{ tech }}</span>
                }
                @if (project.tech.length > 3) {
                  <span class="tech-tag mini-tag">+{{ project.tech.length - 3 }}</span>
                }
              </div>
            </article>
          }
        </div>

      </div>
    </section>
  `,
  styles: [`
    .projects-section { background: linear-gradient(180deg, #0D0D0D, #0A0A0A); }

    .section-header { text-align:center;margin-bottom:48px; }
    .eyebrow {
      display:inline-flex;align-items:center;gap:8px;
      font-family:'JetBrains Mono',monospace;font-size:.7rem;font-weight:500;
      letter-spacing:.15em;text-transform:uppercase;color:#FF6B00;margin-bottom:16px;
      &::before,&::after{content:'';width:18px;height:1px;background:#FF6B00;opacity:.5;}
    }
    .section-header h2 { font-size:clamp(1.75rem,4vw,2.75rem);font-weight:700;margin:0 0 16px; }
    .section-header p { color:#707070;max-width:520px;margin:0 auto; }
    .gradient-text {
      background:linear-gradient(135deg,#FF6B00,#FF8C42);
      -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
    }

    /* Filter pills */
    .filter-pills {
      display:flex;justify-content:center;flex-wrap:wrap;gap:8px;margin-bottom:56px;
    }
    .filter-pill {
      padding:8px 20px;border-radius:100px;
      background:transparent;border:1px solid rgba(255,255,255,.08);
      color:#707070;font-size:.8125rem;font-weight:500;cursor:pointer;
      transition:all .2s ease;font-family:'Inter',sans-serif;
      &:hover{color:#C0C0C0;border-color:rgba(255,255,255,.16);}
      &.active{background:rgba(255,107,0,.12);border-color:rgba(255,107,0,.3);color:#FF8C42;}
    }

    /* ---- Featured cards ---- */
    .featured-projects { display:flex;flex-direction:column;gap:80px;margin-bottom:80px; }

    .featured-card {
      display:grid;
      grid-template-columns:1fr 1fr;
      gap:64px;
      align-items:center;
      @media(max-width:1024px){grid-template-columns:1fr;gap:40px;}

      &.reverse {
        direction:rtl;
        @media(max-width:1024px){direction:ltr;}
        >*{direction:ltr;}
      }
    }

    /* Visual */
    .project-visual {
      position:relative;border-radius:20px;overflow:hidden;
      background:#111111;border:1px solid rgba(255,255,255,.08);
      aspect-ratio:4/3;
    }
    .project-bg-pattern {
      position:absolute;inset:0;
      background-image:radial-gradient(rgba(255,107,0,.04) 1px, transparent 1px);
      background-size:20px 20px;
    }
    .project-display {
      position:absolute;inset:20px;
      background:#0A0A0A;border-radius:12px;
      border:1px solid rgba(255,255,255,.06);
      overflow:hidden;
    }
    .browser-bar {
      display:flex;align-items:center;gap:6px;
      padding:10px 14px;
      background:#111;border-bottom:1px solid rgba(255,255,255,.06);
      span {
        width:10px;height:10px;border-radius:50%;
        &:nth-child(1){background:#FF5F57;}
        &:nth-child(2){background:#FFBD2E;}
        &:nth-child(3){background:#28C840;}
      }
    }
    .browser-url {
      flex:1;background:rgba(255,255,255,.04);border-radius:4px;
      padding:3px 10px;font-size:.65rem;color:#404040;font-family:monospace;
    }
    .project-screen { height:calc(100% - 36px); }
    .screen-header {
      display:flex;align-items:center;padding:12px 14px;
    }
    .screen-title { font-size:.65rem;font-weight:700;color:#fff;opacity:.8; }
    .screen-body { padding:12px; }
    .screen-row {
      height:8px;background:rgba(255,255,255,.06);border-radius:4px;margin-bottom:8px;
      &.w70{width:70%;} &.w90{width:90%;} &.w50{width:50%;}
    }
    .screen-cards { display:flex;gap:8px;margin-top:12px; }
    .screen-card {
      flex:1;height:50px;background:rgba(255,255,255,.04);
      border-radius:8px;border:1px solid rgba(255,255,255,.04);
    }

    /* Content */
    .project-content {}
    .project-meta {
      display:flex;align-items:center;gap:12px;margin-bottom:16px;
    }
    .project-year {
      font-family:'JetBrains Mono',monospace;font-size:.75rem;color:#505050;
      background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.06);
      padding:3px 10px;border-radius:100px;
    }
    .status-chip {
      font-size:.7rem;font-weight:600;padding:3px 10px;border-radius:100px;
      &.status-live{background:rgba(34,197,94,.1);border:1px solid rgba(34,197,94,.2);color:#4ade80;}
      &.status-completed{background:rgba(59,130,246,.1);border:1px solid rgba(59,130,246,.2);color:#60a5fa;}
      &.status-in-progress{background:rgba(245,158,11,.1);border:1px solid rgba(245,158,11,.2);color:#fbbf24;}
    }
    .project-title {
      font-family:'Space Grotesk',sans-serif;font-size:clamp(1.25rem,2.5vw,1.75rem);
      font-weight:700;color:#fff;margin:0 0 6px;
    }
    .project-subtitle { font-size:.9375rem;color:#FF8C42;font-weight:500;margin:0 0 16px; }
    .project-desc { font-size:.9375rem;color:#707070;line-height:1.75;margin:0 0 24px; }

    .features-list {
      list-style:none;margin:0 0 24px;padding:0;
      display:flex;flex-direction:column;gap:8px;
    }
    .features-list li {
      display:flex;align-items:flex-start;gap:10px;
      font-size:.875rem;color:#A0A0A0;line-height:1.5;
    }

    .project-tech { display:flex;flex-wrap:wrap;gap:8px; }
    .tech-tag {
      padding:5px 12px;border-radius:100px;
      font-size:.75rem;font-weight:500;
      background:rgba(255,107,0,.07);
      border:1px solid rgba(255,107,0,.15);
      color:rgba(255,140,66,.7);
      font-family:'JetBrains Mono',monospace;
    }

    /* ---- Grid (smaller) projects ---- */
    .grid-projects {
      display:grid;
      grid-template-columns:repeat(auto-fill,minmax(300px,1fr));
      gap:20px;
    }
    .project-mini-card {
      background:rgba(26,26,26,.7);backdrop-filter:blur(16px);
      border:1px solid rgba(255,255,255,.06);border-radius:20px;
      padding:28px;
      transition:all .25s ease;
      &:hover{transform:translateY(-4px);border-color:rgba(255,107,0,.2);box-shadow:0 8px 32px rgba(0,0,0,.4);}
    }
    .mini-card-header {
      display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:16px;
    }
    .project-icon {
      width:44px;height:44px;border-radius:12px;
      display:flex;align-items:center;justify-content:center;font-size:1.25rem;
    }
    .status-chip.mini { font-size:.7rem; }
    .mini-title { font-family:'Space Grotesk',sans-serif;font-size:1rem;font-weight:700;color:#fff;margin:0 0 8px; }
    .mini-desc { font-size:.8125rem;color:#606060;line-height:1.6;margin:0 0 16px; }
    .mini-tech { display:flex;flex-wrap:wrap;gap:6px; }
    .mini-tag { font-size:.7rem;padding:3px 10px; }

    /* Reveal */
    .reveal { opacity:0;transform:translateY(28px);transition:opacity .7s ease,transform .7s ease; }
    .reveal.revealed { opacity:1;transform:none; }
    @for $i from 1 through 5 { .delay-#{$i} { transition-delay: #{$i * 0.1}s; } }
  `],
})
export class ProjectsComponent implements AfterViewInit {
  protected readonly data = inject(PortfolioDataService);
  private readonly platform = inject(PLATFORM_ID);

  protected activeFilter = signal('all');

  readonly filters = [
    { id: 'all',      label: 'All Projects' },
    { id: 'angular',  label: 'Angular' },
    { id: 'react',    label: 'React' },
    { id: 'dotnet',   label: '.NET Core' },
    { id: 'aws',      label: 'AWS/Cloud' },
  ];

  protected featuredProjects = computed(() => {
    const f = this.activeFilter();
    return this.data.projects.filter(p => {
      if (f === 'all') return p.featured;
      const techStr = p.tech.join(' ').toLowerCase();
      if (f === 'angular') return p.featured && techStr.includes('angular');
      if (f === 'react') return p.featured && techStr.includes('react');
      if (f === 'dotnet') return p.featured && (techStr.includes('.net') || techStr.includes('asp'));
      if (f === 'aws') return p.featured && techStr.includes('aws');
      return p.featured;
    });
  });

  protected gridProjects = computed(() => {
    const f = this.activeFilter();
    return this.data.projects.filter(p => {
      if (!p.featured) {
        if (f === 'all') return true;
        const t = p.tech.join(' ').toLowerCase();
        if (f === 'angular') return t.includes('angular');
        if (f === 'react') return t.includes('react');
        if (f === 'dotnet') return t.includes('.net') || t.includes('asp');
        if (f === 'aws') return t.includes('aws');
      }
      return false;
    });
  });

  getProjectColor(id: string): string {
    const map: Record<string, string> = {
      procon: '#FF6B00', vfix: '#3B82F6',
      procuresprint: '#A855F7', 'invoice-mgmt': '#22C55E', einvoice: '#F59E0B',
    };
    return map[id] || '#FF6B00';
  }

  getProjectEmoji(id: string): string {
    const map: Record<string, string> = {
      procon: '🏆', vfix: '🔧', procuresprint: '🤖',
      'invoice-mgmt': '📋', einvoice: '📄',
    };
    return map[id] || '⚡';
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platform)) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            document.querySelectorAll('#projects .reveal').forEach(el => el.classList.add('revealed'));
            observer.disconnect();
          }
        });
      },
      { threshold: 0.08 }
    );
    const section = document.getElementById('projects');
    if (section) observer.observe(section);
  }
}
