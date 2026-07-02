import {
  Component, inject, ChangeDetectionStrategy, PLATFORM_ID, AfterViewInit,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PortfolioDataService } from '../../../../core/services/portfolio-data.service';

@Component({
  selector: 'app-certifications',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="certifications" class="section cert-section" aria-labelledby="cert-heading">
      <div class="container">

        <div class="section-header reveal">
          <span class="eyebrow">Credentials</span>
          <h2 id="cert-heading">Certifications &amp; <span class="gradient-text">Growth</span></h2>
          <p>Committed to continuous learning and professional development in cloud, DevOps, and software engineering.</p>
        </div>

        <div class="cert-grid">
          @for (cert of data.certifications; track cert.id; let i = $index) {
            <div class="cert-card reveal glass"
                 [class.planned]="cert.status === 'planned'"
                 [class.in-progress]="cert.status === 'in-progress'"
                 [style.transition-delay]="(i * 0.1) + 's'"
                 [attr.aria-label]="cert.name + ' - ' + cert.status">

              <!-- Status ribbon -->
              <div class="cert-ribbon" [class]="'ribbon-' + cert.status">
                {{ cert.status === 'earned' ? '✓ Earned' : cert.status === 'in-progress' ? '⟳ In Progress' : '◎ Planned' }}
              </div>

              <!-- Badge -->
              <div class="cert-badge-wrap">
                <div class="cert-badge" [class]="'badge-' + cert.status">
                  <span class="badge-icon" aria-hidden="true">{{ cert.badge }}</span>
                </div>
                <div class="badge-glow" [class]="'glow-' + cert.status" aria-hidden="true"></div>
              </div>

              <!-- Info -->
              <div class="cert-info">
                <h4 class="cert-name">{{ cert.name }}</h4>
                <p class="cert-issuer">{{ cert.issuer }}</p>
                @if (cert.date) {
                  <span class="cert-date">{{ cert.date }}</span>
                }
              </div>

              <!-- Progress bar for in-progress -->
              @if (cert.status === 'in-progress') {
                <div class="cert-progress" role="progressbar" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100">
                  <div class="progress-track">
                    <div class="progress-fill"></div>
                  </div>
                  <span class="progress-label">45% Complete</span>
                </div>
              }

            </div>
          }

          <!-- Add more card -->
          <div class="cert-add-card reveal glass" [style.transition-delay]="(data.certifications.length * 0.1) + 's'">
            <div class="add-icon" aria-hidden="true">+</div>
            <h4>More Coming</h4>
            <p>Continuously expanding skills and earning industry certifications</p>
          </div>
        </div>

        <!-- Learning path -->
        <div class="learning-path reveal">
          <h3 class="lp-heading">Learning Roadmap</h3>
          <div class="lp-items">
            @for (item of learningPath; track item.label) {
              <div class="lp-item" [class.done]="item.done" [class.active]="item.active">
                <div class="lp-dot" aria-hidden="true">
                  @if (item.done) { <span>✓</span> }
                  @else if (item.active) { <span class="pulse-dot"></span> }
                </div>
                <div class="lp-content">
                  <strong>{{ item.label }}</strong>
                  <span>{{ item.desc }}</span>
                </div>
              </div>
            }
          </div>
        </div>

      </div>
    </section>
  `,
  styles: [`
    .cert-section { background: #0A0A0A; }

    .section-header { text-align:center; margin-bottom:64px; }
    .eyebrow {
      display:inline-flex; align-items:center; gap:8px;
      font-family:'JetBrains Mono',monospace; font-size:.7rem; font-weight:500;
      letter-spacing:.15em; text-transform:uppercase; color:#FF6B00; margin-bottom:16px;
      &::before,&::after { content:''; width:18px; height:1px; background:#FF6B00; opacity:.5; }
    }
    .section-header h2 { font-size:clamp(1.75rem,4vw,2.75rem); font-weight:700; margin:0 0 16px; }
    .section-header p { color:#707070; max-width:520px; margin:0 auto; }
    .gradient-text {
      background:linear-gradient(135deg,#FF6B00,#FF8C42);
      -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
    }

    /* ---- Grid ---- */
    .cert-grid {
      display:grid;
      grid-template-columns:repeat(auto-fill, minmax(220px, 1fr));
      gap:20px;
      margin-bottom:64px;
    }

    .cert-card {
      background:rgba(26,26,26,.7);
      backdrop-filter:blur(20px);
      border:1px solid rgba(255,255,255,.07);
      border-radius:20px;
      padding:28px 24px;
      text-align:center;
      position:relative;
      overflow:hidden;
      transition:all .3s ease;

      &:hover { transform:translateY(-6px); box-shadow:0 12px 40px rgba(0,0,0,.5); }

      &.planned { border-color:rgba(255,255,255,.05); }
      &.in-progress { border-color:rgba(245,158,11,.2); }
    }

    .cert-ribbon {
      position:absolute; top:14px; right:-24px;
      padding:4px 32px; font-size:.65rem; font-weight:700;
      transform:rotate(45deg);
      letter-spacing:.04em;
    }
    .ribbon-planned { background:rgba(255,255,255,.06); color:#505050; }
    .ribbon-in-progress { background:rgba(245,158,11,.15); color:#fbbf24; }
    .ribbon-earned { background:rgba(34,197,94,.15); color:#4ade80; }

    .cert-badge-wrap {
      position:relative; display:inline-block; margin-bottom:20px;
    }
    .cert-badge {
      width:72px; height:72px; border-radius:20px;
      display:flex; align-items:center; justify-content:center;
      font-size:2rem; margin:0 auto;
      position:relative; z-index:1;
    }
    .badge-planned { background:rgba(255,255,255,.05); border:1px solid rgba(255,255,255,.08); }
    .badge-in-progress { background:rgba(245,158,11,.1); border:1px solid rgba(245,158,11,.2); }
    .badge-earned { background:rgba(34,197,94,.1); border:1px solid rgba(34,197,94,.2); }

    .badge-glow {
      position:absolute; inset:-8px; border-radius:28px;
      opacity:.4;
    }
    .glow-planned { background:radial-gradient(circle,rgba(255,255,255,.04),transparent 60%); }
    .glow-in-progress { background:radial-gradient(circle,rgba(245,158,11,.15),transparent 60%); }
    .glow-earned { background:radial-gradient(circle,rgba(34,197,94,.2),transparent 60%); }

    .badge-icon { display:block; line-height:1; }

    .cert-info { padding:0 4px; }
    .cert-name {
      font-family:'Space Grotesk',sans-serif;
      font-size:.875rem; font-weight:700; color:#C0C0C0; margin:0 0 6px; line-height:1.4;
    }
    .cert-issuer { font-size:.75rem; color:#505050; margin:0 0 6px; }
    .cert-date { font-size:.7rem; color:#FF8C42; font-family:'JetBrains Mono',monospace; }

    .cert-progress { margin-top:16px; }
    .progress-track {
      height:3px; background:rgba(255,255,255,.06); border-radius:3px; overflow:hidden; margin-bottom:6px;
    }
    .progress-fill {
      height:100%; width:45%;
      background:linear-gradient(90deg,#F59E0B,#FBBF24);
      border-radius:3px;
      animation:progress-shine 2s ease infinite;
      @keyframes progress-shine {
        0%{opacity:.8;} 50%{opacity:1;} 100%{opacity:.8;}
      }
    }
    .progress-label { font-size:.65rem; color:#707070; }

    .cert-add-card {
      background:rgba(26,26,26,.4);
      backdrop-filter:blur(16px);
      border:1px dashed rgba(255,255,255,.08);
      border-radius:20px;
      padding:28px 24px;
      text-align:center;
      display:flex; flex-direction:column; align-items:center; justify-content:center;
      min-height:220px;
      transition:all .3s ease;
      &:hover { border-color:rgba(255,107,0,.2); }
      .add-icon {
        width:48px; height:48px; border-radius:14px;
        background:rgba(255,107,0,.08); border:1px dashed rgba(255,107,0,.2);
        display:flex; align-items:center; justify-content:center;
        font-size:1.5rem; color:#FF6B00; margin-bottom:16px;
      }
      h4 { font-family:'Space Grotesk',sans-serif; font-size:.9375rem; font-weight:700; color:#505050; margin:0 0 8px; }
      p { font-size:.8rem; color:#404040; line-height:1.6; margin:0; }
    }

    /* ---- Learning path ---- */
    .learning-path {
      background:rgba(255,255,255,.02);
      border:1px solid rgba(255,255,255,.05);
      border-radius:20px;
      padding:40px;
      @media(max-width:640px){padding:24px;}
    }
    .lp-heading {
      font-family:'Space Grotesk',sans-serif;
      font-size:.75rem; font-weight:600; text-transform:uppercase;
      letter-spacing:.08em; color:#505050; margin:0 0 28px;
    }
    .lp-items {
      display:grid; grid-template-columns:repeat(auto-fill,minmax(240px,1fr)); gap:20px;
    }
    .lp-item {
      display:flex; align-items:flex-start; gap:14px;
      padding:16px; border-radius:12px;
      border:1px solid rgba(255,255,255,.05);
      transition:all .2s ease;

      &.done { border-color:rgba(34,197,94,.15); }
      &.active { border-color:rgba(245,158,11,.2); background:rgba(245,158,11,.04); }
    }
    .lp-dot {
      width:24px; height:24px; border-radius:50%;
      background:rgba(255,255,255,.06);
      display:flex; align-items:center; justify-content:center;
      font-size:.7rem; color:#22C55E; flex-shrink:0; margin-top:1px;
      .done & { background:rgba(34,197,94,.15); border:1px solid rgba(34,197,94,.2); }
      .active & { background:rgba(245,158,11,.1); border:1px solid rgba(245,158,11,.2); }
    }
    .pulse-dot {
      width:8px; height:8px; border-radius:50%;
      background:#F59E0B;
      animation:pulse 1.5s ease infinite;
      @keyframes pulse{0%,100%{transform:scale(1);opacity:1;}50%{transform:scale(1.3);opacity:.7;}}
    }
    .lp-content strong { display:block; font-size:.8125rem; font-weight:600; color:#A0A0A0; margin-bottom:3px; }
    .lp-content span { font-size:.75rem; color:#505050; line-height:1.5; }

    /* Reveal */
    .reveal { opacity:0;transform:translateY(28px);transition:opacity .7s ease,transform .7s ease; }
    .reveal.revealed { opacity:1;transform:none; }
    @for $i from 1 through 6 { .delay-#{$i} { transition-delay: #{$i * 0.1}s; } }
  `],
})
export class CertificationsComponent implements AfterViewInit {
  protected readonly data = inject(PortfolioDataService);
  private readonly platform = inject(PLATFORM_ID);

  readonly learningPath = [
    { label: 'Angular & TypeScript', desc: 'Deep mastery of Angular 20 with Signals API, SSR, Standalone components.', done: true, active: false },
    { label: 'ASP.NET Core & C#', desc: 'Enterprise REST APIs with clean architecture and EF Core ORM.', done: true, active: false },
    { label: 'AWS Cloud Practitioner', desc: 'EC2, ECS, EKS, ELB, S3, IAM — production deployments in use.', done: true, active: false },
    { label: 'Angular Certification', desc: 'Professional certification from the Angular team currently in progress.', done: false, active: true },
    { label: 'AWS Developer Associate', desc: 'Advancing cloud skills with developer-focused AWS certification.', done: false, active: false },
    { label: 'Kubernetes (CKAD)', desc: 'Certified Kubernetes Application Developer for container orchestration.', done: false, active: false },
  ];

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platform)) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            document.querySelectorAll('#certifications .reveal').forEach(el => el.classList.add('revealed'));
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );
    const section = document.getElementById('certifications');
    if (section) observer.observe(section);
  }
}
