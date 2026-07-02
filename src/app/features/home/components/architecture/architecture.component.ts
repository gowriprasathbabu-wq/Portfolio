import {
  Component, inject, ChangeDetectionStrategy, PLATFORM_ID, AfterViewInit,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PortfolioDataService } from '../../../../core/services/portfolio-data.service';

@Component({
  selector: 'app-architecture',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="architecture" class="section arch-section" aria-labelledby="arch-heading">
      <div class="container">

        <div class="section-header reveal">
          <span class="eyebrow">System Design</span>
          <h2 id="arch-heading">Tech <span class="gradient-text">Architecture</span></h2>
          <p>A robust, layered architecture powering enterprise applications — from pixel to cloud.</p>
        </div>

        <div class="arch-layout">

          <!-- Flow diagram -->
          <div class="arch-flow reveal delay-1">
            @for (node of data.archNodes; track node.id; let i = $index; let last = $last) {
              <div class="arch-node-wrap">
                <div class="arch-node glass" [style.--node-color]="node.color"
                     [attr.aria-label]="node.label + ': ' + node.tech">
                  <div class="node-icon" aria-hidden="true">{{ node.icon }}</div>
                  <div class="node-body">
                    <span class="node-layer">{{ node.label }}</span>
                    <strong class="node-tech">{{ node.tech }}</strong>
                    <span class="node-desc">{{ node.description }}</span>
                  </div>
                  <div class="node-badge" [style.background]="node.color + '22'"
                       [style.border-color]="node.color + '44'"
                       [style.color]="node.color">
                    Active
                  </div>
                </div>
                @if (!last) {
                  <div class="arch-connector" aria-hidden="true">
                    <div class="connector-line" [style.--color]="data.archNodes[i + 1].color"></div>
                    <div class="connector-arrow">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                           stroke="currentColor" stroke-width="2.5">
                        <polyline points="6 9 12 15 18 9"/>
                      </svg>
                    </div>
                    <div class="connector-label">{{ getConnectorLabel(i) }}</div>
                  </div>
                }
              </div>
            }
          </div>

          <!-- Side info panel -->
          <div class="arch-details reveal delay-2">
            <h3 class="details-title">Enterprise Principles</h3>

            @for (principle of principles; track principle.title) {
              <div class="principle-card glass">
                <div class="principle-icon">{{ principle.icon }}</div>
                <div class="principle-content">
                  <h4>{{ principle.title }}</h4>
                  <p>{{ principle.desc }}</p>
                </div>
              </div>
            }

            <!-- Metric badges -->
            <div class="arch-metrics">
              @for (m of metrics; track m.label) {
                <div class="metric-badge" [style.--mc]="m.color">
                  <span class="metric-val">{{ m.value }}</span>
                  <span class="metric-lbl">{{ m.label }}</span>
                </div>
              }
            </div>
          </div>

        </div>

        <!-- Supporting tech grid -->
        <div class="support-grid reveal">
          @for (item of supportingTech; track item.name) {
            <div class="support-item">
              <span class="support-icon" aria-hidden="true">{{ item.icon }}</span>
              <div>
                <strong>{{ item.name }}</strong>
                <span>{{ item.role }}</span>
              </div>
            </div>
          }
        </div>

      </div>
    </section>
  `,
  styles: [`
    .arch-section { background: linear-gradient(180deg, #0A0A0A, #0D0D0D); }

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

    /* ---- Layout ---- */
    .arch-layout {
      display: grid;
      grid-template-columns: 1fr 340px;
      gap: 48px;
      align-items: start;
      margin-bottom: 64px;
      @media(max-width:1024px) { grid-template-columns:1fr; }
    }

    /* ---- Flow ---- */
    .arch-flow {
      display: flex;
      flex-direction: column;
      gap: 0;
    }

    .arch-node-wrap {
      display: flex;
      flex-direction: column;
      align-items: stretch;
    }

    .arch-node {
      background: rgba(26,26,26,.8);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255,255,255,.07);
      border-left: 3px solid var(--node-color, #FF6B00);
      border-radius: 16px;
      padding: 24px 28px;
      display: flex;
      align-items: center;
      gap: 20px;
      transition: all .3s ease;
      position: relative;
      overflow: hidden;

      &::before {
        content:'';
        position:absolute; inset:0;
        background: linear-gradient(135deg, rgba(from var(--node-color, #FF6B00) r g b / 0.04), transparent);
      }

      &:hover {
        transform: translateX(6px);
        border-color: rgba(255,107,0,.3);
        box-shadow: -4px 0 24px rgba(from var(--node-color, #FF6B00) r g b / 0.15);
      }
    }

    .node-icon {
      font-size: 2rem;
      width: 56px; height: 56px;
      display: flex; align-items:center; justify-content:center;
      background: rgba(255,255,255,.04);
      border-radius: 14px;
      flex-shrink: 0;
    }

    .node-body {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 3px;
    }
    .node-layer {
      font-size: .7rem; text-transform:uppercase; letter-spacing:.08em;
      color: #505050; font-family:'JetBrains Mono',monospace;
    }
    .node-tech {
      font-family:'Space Grotesk',sans-serif;
      font-size: 1.1rem; font-weight:700; color:#fff;
    }
    .node-desc { font-size:.8rem; color:#606060; }

    .node-badge {
      padding: 4px 12px; border-radius:100px;
      font-size: .65rem; font-weight:600;
      border: 1px solid;
      white-space: nowrap;
      flex-shrink: 0;
    }

    /* Connector */
    .arch-connector {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0;
      padding: 4px 0;
      margin-left: 40px;
    }
    .connector-line {
      width: 2px; height: 20px;
      background: linear-gradient(180deg, rgba(255,107,0,.3), var(--color, #3B82F6));
      border-radius: 1px;
    }
    .connector-arrow {
      color: #505050;
      display:flex; align-items:center;
    }
    .connector-label {
      font-family:'JetBrains Mono',monospace;
      font-size:.6rem; color:#404040; margin-top:2px;
    }

    /* ---- Side panel ---- */
    .details-title {
      font-family:'Space Grotesk',sans-serif;
      font-size:.8125rem; font-weight:600;
      text-transform:uppercase; letter-spacing:.08em;
      color:#505050; margin:0 0 20px;
    }

    .principle-card {
      background: rgba(26,26,26,.6);
      backdrop-filter:blur(16px);
      border:1px solid rgba(255,255,255,.06);
      border-radius:14px;
      padding:18px;
      display:flex; align-items:flex-start; gap:14px;
      margin-bottom:12px;
      transition:border-color .2s ease;
      &:hover { border-color:rgba(255,107,0,.2); }
    }
    .principle-icon {
      font-size:1.1rem;
      width:36px; height:36px; border-radius:10px;
      background:rgba(255,107,0,.08);
      display:flex; align-items:center; justify-content:center;
      flex-shrink:0;
    }
    .principle-content h4 {
      font-family:'Space Grotesk',sans-serif;
      font-size:.875rem; font-weight:600; color:#C0C0C0; margin:0 0 4px;
    }
    .principle-content p { font-size:.78rem; color:#606060; margin:0; line-height:1.5; }

    .arch-metrics {
      display:grid; grid-template-columns:repeat(2,1fr); gap:10px; margin-top:20px;
    }
    .metric-badge {
      background:rgba(26,26,26,.7);
      border:1px solid rgba(255,255,255,.07);
      border-radius:12px; padding:14px;
      text-align:center;
    }
    .metric-val {
      display:block;
      font-family:'Space Grotesk',sans-serif;
      font-size:1.25rem; font-weight:700;
      color:var(--mc, #FF6B00);
    }
    .metric-lbl {
      display:block; font-size:.65rem;
      color:#505050; margin-top:3px;
    }

    /* ---- Support grid ---- */
    .support-grid {
      display:grid;
      grid-template-columns:repeat(auto-fill, minmax(200px, 1fr));
      gap:14px;
      padding:32px;
      background:rgba(255,255,255,.02);
      border:1px solid rgba(255,255,255,.05);
      border-radius:20px;
    }
    .support-item {
      display:flex; align-items:center; gap:12px;
      padding:10px;
    }
    .support-icon {
      font-size:1.25rem;
      width:36px; height:36px; border-radius:10px;
      background:rgba(255,255,255,.04);
      display:flex; align-items:center; justify-content:center;
      flex-shrink:0;
    }
    .support-item strong { display:block; font-size:.8125rem; font-weight:600; color:#A0A0A0; }
    .support-item span  { display:block; font-size:.7rem; color:#505050; margin-top:2px; }

    /* Reveal */
    .reveal { opacity:0;transform:translateY(28px);transition:opacity .7s ease,transform .7s ease; }
    .reveal.revealed { opacity:1;transform:none; }
    .delay-1 { transition-delay:.1s; }
    .delay-2 { transition-delay:.25s; }
  `],
})
export class ArchitectureComponent implements AfterViewInit {
  protected readonly data = inject(PortfolioDataService);
  private readonly platform = inject(PLATFORM_ID);

  readonly principles = [
    { icon: '🏗️', title: 'Clean Architecture', desc: 'Separation of concerns with feature-based modules and dependency inversion.' },
    { icon: '🔒', title: 'Security by Design', desc: 'Keycloak SSO, JWT, OAuth2 baked in from the ground up.' },
    { icon: '📈', title: 'Horizontal Scalability', desc: 'ECS/EKS container orchestration with load balancing for auto-scale.' },
    { icon: '✅', title: 'Quality Gates', desc: 'SonarQube analysis enforced in CI/CD pipeline before every deploy.' },
  ];

  readonly metrics = [
    { label: 'Uptime SLA', value: '99.9%', color: '#22C55E' },
    { label: 'Test Coverage', value: '>80%', color: '#3B82F6' },
    { label: 'Lighthouse', value: '>95', color: '#FF6B00' },
    { label: 'SonarQube', value: 'A+', color: '#A855F7' },
  ];

  readonly supportingTech = [
    { icon: '🐋', name: 'Docker', role: 'Containerization' },
    { icon: '🔧', name: 'GitHub Actions', role: 'CI/CD Pipeline' },
    { icon: '📊', name: 'SonarQube', role: 'Code Quality' },
    { icon: '⚖️', name: 'AWS ELB', role: 'Load Balancing' },
    { icon: '📦', name: 'AWS S3', role: 'Object Storage' },
    { icon: '🔐', name: 'AWS IAM', role: 'Access Control' },
    { icon: '📡', name: 'SignalR', role: 'Real-time Comms' },
    { icon: '📧', name: 'SMTP', role: 'Notifications' },
  ];

  getConnectorLabel(i: number): string {
    const labels = ['HTTP/REST', 'EF Core', 'VPC', 'Token'];
    return labels[i] || '→';
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platform)) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            document.querySelectorAll('#architecture .reveal').forEach(el => el.classList.add('revealed'));
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );
    const section = document.getElementById('architecture');
    if (section) observer.observe(section);
  }
}
