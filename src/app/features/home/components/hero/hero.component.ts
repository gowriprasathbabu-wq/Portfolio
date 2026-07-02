import {
  Component, inject, signal, OnInit, OnDestroy,
  ChangeDetectionStrategy, PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PortfolioDataService } from '../../../../core/services/portfolio-data.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="hero" class="hero" aria-label="Hero section">

      <!-- Animated background gradient -->
      <div class="hero-bg" aria-hidden="true">
        <div class="hero-glow-1"></div>
        <div class="hero-glow-2"></div>
        <div class="hero-grid"></div>
      </div>

      <!-- Floating shapes -->
      <div class="floating-shapes" aria-hidden="true">
        <div class="shape shape-1"></div>
        <div class="shape shape-2"></div>
        <div class="shape shape-3"></div>
        <div class="shape shape-4"></div>
        <div class="shape shape-5"></div>
      </div>

      <div class="container hero-inner">

        <!-- Left / text column -->
        <div class="hero-content">

          <!-- Status badge -->
          <div class="status-badge reveal delay-1">
            <span class="status-dot"></span>
            Available for opportunities
          </div>

          <!-- Name -->
          <h1 class="hero-name reveal delay-2">
            <span class="name-line">Gowri</span>
            <span class="name-line gradient-text">Prasath Babu</span>
          </h1>

          <!-- Title -->
          <p class="hero-title reveal delay-3">
            Senior Full Stack Software Engineer
          </p>

          <!-- Rotating animated subtitle -->
          <div class="hero-rotating reveal delay-4" aria-live="polite">
            <span class="rotating-prefix">Expert in</span>
            <span class="rotating-word" [class.exit]="isExiting()">
              {{ currentTitle() }}
            </span>
            <span class="cursor" aria-hidden="true">|</span>
          </div>

          <!-- Description -->
          <p class="hero-description reveal delay-5">
            Designing and developing enterprise-grade applications with
            <strong>Angular 20</strong>, <strong>ASP.NET Core</strong>, and
            <strong>AWS</strong>. 5+ years building scalable solutions for global teams.
          </p>

          <!-- Meta chips -->
          <div class="hero-meta reveal delay-6">
            <span class="meta-chip">
              <span>📍</span> Coimbatore, India
            </span>
            <span class="meta-chip">
              <span>⚡</span> 5+ Years Exp
            </span>
            <span class="meta-chip">
              <span>🌍</span> 10+ Countries
            </span>
          </div>

          <!-- CTA buttons -->
          <div class="hero-actions reveal delay-7">
            <a href="/assets/resume/Gowri Prasath Babu - Software Developer.pdf" download
               class="btn btn-primary btn-lg" aria-label="Download resume">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Download Resume
            </a>
            <button class="btn btn-secondary btn-lg" (click)="scrollTo('projects')">
              View Projects
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </button>
            <button class="btn btn-ghost btn-lg" (click)="scrollTo('contact')">
              Contact Me
            </button>
          </div>

          <!-- Scroll hint -->
          <div class="scroll-hint reveal delay-8" aria-hidden="true">
            <div class="scroll-line"></div>
            <span>Scroll to explore</span>
          </div>
        </div>

        <!-- Right / avatar column -->
        <div class="hero-visual reveal delay-3">
          <div class="avatar-container">
            <!-- Orbit rings -->
            <div class="orbit orbit-1" aria-hidden="true">
              <div class="orbit-dot orbit-dot-1"></div>
            </div>
            <div class="orbit orbit-2" aria-hidden="true">
              <div class="orbit-dot orbit-dot-2"></div>
            </div>

            <!-- Avatar -->
            <div class="avatar-frame">
              <div class="avatar-inner">
                <!-- SVG Avatar placeholder -->
                <svg viewBox="0 0 200 200" class="avatar-svg" aria-label="Gowri Prasath Babu avatar">
                  <defs>
                    <radialGradient id="bgGrad" cx="50%" cy="50%">
                      <stop offset="0%" stop-color="#1A1A1A"/>
                      <stop offset="100%" stop-color="#111111"/>
                    </radialGradient>
                    <linearGradient id="skinGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stop-color="#D4956A"/>
                      <stop offset="100%" stop-color="#C07A50"/>
                    </linearGradient>
                    <linearGradient id="shirtGrad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stop-color="#FF6B00"/>
                      <stop offset="100%" stop-color="#FF8C42"/>
                    </linearGradient>
                  </defs>
                  <!-- Background circle -->
                  <circle cx="100" cy="100" r="100" fill="url(#bgGrad)"/>
                  <!-- Body/shirt -->
                  <ellipse cx="100" cy="175" rx="60" ry="45" fill="url(#shirtGrad)"/>
                  <!-- Neck -->
                  <rect x="88" y="130" width="24" height="20" rx="4" fill="url(#skinGrad)"/>
                  <!-- Head -->
                  <ellipse cx="100" cy="112" rx="38" ry="40" fill="url(#skinGrad)"/>
                  <!-- Hair -->
                  <ellipse cx="100" cy="80" rx="38" ry="22" fill="#1A0A00"/>
                  <rect x="62" y="80" width="8" height="30" rx="4" fill="#1A0A00"/>
                  <rect x="130" y="80" width="8" height="30" rx="4" fill="#1A0A00"/>
                  <!-- Eyes -->
                  <ellipse cx="87" cy="112" rx="5" ry="6" fill="#1A0A00"/>
                  <ellipse cx="113" cy="112" rx="5" ry="6" fill="#1A0A00"/>
                  <circle cx="89" cy="110" r="1.5" fill="white"/>
                  <circle cx="115" cy="110" r="1.5" fill="white"/>
                  <!-- Eyebrows -->
                  <path d="M80 103 Q87 99 94 103" stroke="#1A0A00" stroke-width="2.5" fill="none" stroke-linecap="round"/>
                  <path d="M106 103 Q113 99 120 103" stroke="#1A0A00" stroke-width="2.5" fill="none" stroke-linecap="round"/>
                  <!-- Smile -->
                  <path d="M90 125 Q100 133 110 125" stroke="#8B5E3C" stroke-width="2" fill="none" stroke-linecap="round"/>
                  <!-- Code icon on shirt -->
                  <text x="100" y="178" text-anchor="middle" fill="white" font-family="monospace" font-size="11" font-weight="bold">&lt;/&gt;</text>
                </svg>
              </div>

              <!-- Glow effect -->
              <div class="avatar-glow"></div>
            </div>

            <!-- Floating tech badges -->
            <div class="tech-badge-float badge-angular" aria-hidden="true">
              <span>🅰️</span><span>Angular 20</span>
            </div>
            <div class="tech-badge-float badge-dotnet" aria-hidden="true">
              <span>🔷</span><span>.NET Core</span>
            </div>
            <div class="tech-badge-float badge-aws" aria-hidden="true">
              <span>☁️</span><span>AWS</span>
            </div>
            <div class="tech-badge-float badge-react" aria-hidden="true">
              <span>⚛️</span><span>React</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  `,
  styles: [`
    .hero {
      position: relative;
      min-height: 100vh;
      display: flex;
      align-items: center;
      overflow: hidden;
      padding-top: 80px;
    }

    /* ---- Background ---- */
    .hero-bg { position: absolute; inset: 0; z-index: 0; }
    .hero-glow-1 {
      position: absolute; top: -20%; left: 10%;
      width: 600px; height: 600px; border-radius: 50%;
      background: radial-gradient(circle, rgba(255,107,0,0.12) 0%, transparent 65%);
      animation: drift 12s ease-in-out infinite alternate;
      @keyframes drift { from{transform:translate(0,0);} to{transform:translate(40px,-30px);} }
    }
    .hero-glow-2 {
      position: absolute; bottom: -10%; right: 5%;
      width: 400px; height: 400px; border-radius: 50%;
      background: radial-gradient(circle, rgba(255,140,66,0.08) 0%, transparent 65%);
      animation: drift 15s ease-in-out infinite alternate-reverse;
    }
    .hero-grid {
      position: absolute; inset: 0;
      background-image:
        linear-gradient(rgba(255,107,0,0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,107,0,0.03) 1px, transparent 1px);
      background-size: 60px 60px;
      mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black, transparent);
    }

    /* ---- Floating shapes ---- */
    .floating-shapes { position: absolute; inset: 0; pointer-events: none; z-index: 0; }
    .shape {
      position: absolute; border-radius: 50%;
      border: 1px solid rgba(255,107,0,0.12);
    }
    .shape-1 { width:80px;height:80px;top:15%;left:5%;animation:float 7s ease-in-out infinite; }
    .shape-2 { width:50px;height:50px;top:60%;left:2%;animation:float 9s ease-in-out infinite 1s;background:rgba(255,107,0,0.04); }
    .shape-3 { width:120px;height:120px;top:30%;right:3%;animation:float 11s ease-in-out infinite 2s; }
    .shape-4 { width:30px;height:30px;bottom:25%;right:8%;animation:float 6s ease-in-out infinite 0.5s;background:rgba(255,107,0,0.06); }
    .shape-5 { width:60px;height:60px;top:8%;right:25%;animation:float 8s ease-in-out infinite 1.5s; }
    @keyframes float { 0%,100%{transform:translateY(0) rotate(0deg);}50%{transform:translateY(-20px) rotate(5deg);} }

    /* ---- Layout ---- */
    .hero-inner {
      display: grid;
      grid-template-columns: 1fr 1fr;
      align-items: center;
      gap: 64px;
      position: relative;
      z-index: 1;
      padding-top: 40px;
      padding-bottom: 40px;
      @media(max-width:1024px){grid-template-columns:1fr;gap:48px;}
    }

    /* ---- Status badge ---- */
    .status-badge {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 6px 14px; border-radius: 100px;
      background: rgba(34,197,94,0.08);
      border: 1px solid rgba(34,197,94,0.2);
      color: #4ade80; font-size: .8125rem; font-weight: 500;
      margin-bottom: 24px;
    }
    .status-dot {
      width:8px;height:8px;border-radius:50%;background:#22c55e;
      box-shadow:0 0 0 3px rgba(34,197,94,.2);
      animation:blink 2s ease infinite;
      @keyframes blink{0%,100%{opacity:1;}50%{opacity:.4;}}
    }

    /* ---- Name ---- */
    .hero-name {
      font-family: 'Space Grotesk', sans-serif;
      font-size: clamp(2.8rem, 6vw, 5.5rem);
      font-weight: 700;
      line-height: 1.0;
      letter-spacing: -0.03em;
      margin: 0 0 16px;
    }
    .name-line { display: block; }
    .gradient-text {
      background: linear-gradient(135deg, #FF6B00, #FF8C42, #FFB347);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    /* ---- Title ---- */
    .hero-title {
      font-family: 'Space Grotesk', sans-serif;
      font-size: clamp(1rem, 2.5vw, 1.25rem);
      font-weight: 500;
      color: #A0A0A0;
      margin: 0 0 20px;
      letter-spacing: 0.02em;
    }

    /* ---- Rotating text ---- */
    .hero-rotating {
      display: flex; align-items: center; gap: 10px;
      margin-bottom: 24px; flex-wrap: wrap;
    }
    .rotating-prefix {
      font-family: 'JetBrains Mono', monospace;
      font-size: .8125rem; color: #505050;
    }
    .rotating-word {
      font-family: 'Space Grotesk', sans-serif;
      font-size: clamp(1.1rem, 2vw, 1.35rem);
      font-weight: 600;
      color: #FF8C42;
      display: inline-block;
      transition: all .3s ease;
      &.exit { opacity: 0; transform: translateY(-8px); }
    }
    .cursor {
      color: #FF6B00; font-size: 1.25rem; font-weight: 300;
      animation: blink-cursor .8s ease infinite;
      @keyframes blink-cursor { 0%,100%{opacity:1;}50%{opacity:0;} }
    }

    /* ---- Description ---- */
    .hero-description {
      font-size: 1rem;
      line-height: 1.75;
      color: #707070;
      max-width: 520px;
      margin: 0 0 24px;
      strong { color: #C0C0C0; font-weight: 500; }
    }

    /* ---- Meta chips ---- */
    .hero-meta { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 32px; }
    .meta-chip {
      display: flex; align-items: center; gap: 6px;
      padding: 6px 14px; border-radius: 100px;
      background: rgba(255,255,255,.04);
      border: 1px solid rgba(255,255,255,.08);
      font-size: .8125rem; color: #707070;
    }

    /* ---- Buttons ---- */
    .hero-actions { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 48px; }
    .btn { display:inline-flex;align-items:center;gap:8px;padding:12px 24px;
      border-radius:100px;font-family:'Space Grotesk',sans-serif;
      font-size:.875rem;font-weight:600;cursor:pointer;transition:all .25s ease;
      text-decoration:none;border:none;outline:none;
    }
    .btn-primary {
      background:linear-gradient(135deg,#FF6B00,#FF8C42);color:#fff;
      box-shadow:0 4px 24px rgba(255,107,0,.35);
      &:hover{box-shadow:0 6px 36px rgba(255,107,0,.5);transform:translateY(-2px);}
    }
    .btn-secondary {
      background:transparent;color:#C0C0C0;
      border:1px solid rgba(255,255,255,.12);
      &:hover{border-color:rgba(255,107,0,.4);color:#FF8C42;}
    }
    .btn-ghost {
      background:rgba(255,107,0,.08);color:#FF8C42;
      border:1px solid rgba(255,107,0,.2);
      &:hover{background:rgba(255,107,0,.15);}
    }
    .btn-lg { padding:14px 28px;font-size:.9375rem; }

    /* ---- Scroll hint ---- */
    .scroll-hint { display:flex;align-items:center;gap:12px; }
    .scroll-line {
      width:2px;height:40px;
      background:linear-gradient(180deg,#FF6B00,transparent);
      border-radius:2px;
      animation:scroll-pulse 2s ease infinite;
      @keyframes scroll-pulse{0%,100%{opacity:.4;transform:scaleY(1);}50%{opacity:1;transform:scaleY(1.1);}}
    }
    .scroll-hint span { font-size:.75rem;color:#404040;letter-spacing:.08em;text-transform:uppercase; }

    /* ---- Avatar / Visual ---- */
    .hero-visual { display:flex;justify-content:center;align-items:center; }

    .avatar-container {
      position: relative;
      width: 380px; height: 380px;
      @media(max-width:480px){width:280px;height:280px;}
    }

    /* Orbits */
    .orbit {
      position:absolute;border-radius:50%;
      border:1px solid rgba(255,107,0,0.12);
      animation:spin-orbit linear infinite;
    }
    .orbit-1 {
      inset:-40px;
      animation-duration:20s;
    }
    .orbit-2 {
      inset:-80px;
      border-style:dashed;
      border-color:rgba(255,107,0,0.07);
      animation-duration:30s;
      animation-direction:reverse;
    }
    @keyframes spin-orbit{to{transform:rotate(360deg);}}

    .orbit-dot {
      position:absolute;width:10px;height:10px;border-radius:50%;
      box-shadow:0 0 10px currentColor;
    }
    .orbit-dot-1 {
      top:0;left:50%;transform:translateX(-50%);
      background:#FF6B00;color:#FF6B00;
    }
    .orbit-dot-2 {
      bottom:10%;right:0;
      background:#FF8C42;color:#FF8C42;
    }

    /* Avatar frame */
    .avatar-frame {
      position:absolute;
      inset:20px;
      border-radius:50%;
      background:linear-gradient(145deg,#1A1A1A,#111111);
      border:2px solid rgba(255,107,0,0.2);
      display:flex;align-items:center;justify-content:center;
      box-shadow:0 0 60px rgba(255,107,0,0.15), inset 0 0 40px rgba(0,0,0,0.5);
      overflow:hidden;
    }
    .avatar-inner { width:80%;height:80%; }
    .avatar-svg { width:100%;height:100%; }
    .avatar-glow {
      position:absolute;inset:0;border-radius:50%;
      background:radial-gradient(circle at 50% 100%, rgba(255,107,0,0.1), transparent 60%);
    }

    /* Floating tech badges */
    .tech-badge-float {
      position:absolute;
      display:flex;align-items:center;gap:6px;
      padding:8px 14px;border-radius:100px;
      background:rgba(17,17,17,0.9);
      border:1px solid rgba(255,107,0,0.2);
      font-size:.75rem;font-weight:600;color:#C0C0C0;
      backdrop-filter:blur(16px);
      box-shadow:0 4px 24px rgba(0,0,0,0.4);
      white-space:nowrap;
    }
    .badge-angular { top:5%;left:-10%;  animation:float 6s ease-in-out infinite; }
    .badge-dotnet  { top:15%;right:-8%;  animation:float 7s ease-in-out infinite 1s; }
    .badge-aws     { bottom:20%;left:-8%;animation:float 8s ease-in-out infinite 0.5s; }
    .badge-react   { bottom:10%;right:-5%;animation:float 9s ease-in-out infinite 1.5s; }

    /* ---- Reveal ---- */
    .reveal { opacity:0;transform:translateY(32px);transition:opacity .7s ease,transform .7s ease; }
    .reveal.revealed { opacity:1;transform:translateY(0); }
    @for $i from 1 through 8 { .delay-#{$i} { transition-delay: #{$i * 0.1}s; } }
  `],
})
export class HeroComponent implements OnInit, OnDestroy {
  protected readonly data = inject(PortfolioDataService);
  private readonly platform = inject(PLATFORM_ID);

  protected currentTitle = signal(this.data.rotatingTitles[0]);
  protected isExiting = signal(false);

  private titleIndex = 0;
  private intervalId?: ReturnType<typeof setInterval>;

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platform)) return;

    // Trigger reveal animations
    setTimeout(() => {
      document.querySelectorAll('.hero .reveal').forEach(el => el.classList.add('revealed'));
    }, 100);

    // Start title rotation
    this.intervalId = setInterval(() => {
      this.isExiting.set(true);
      setTimeout(() => {
        this.titleIndex = (this.titleIndex + 1) % this.data.rotatingTitles.length;
        this.currentTitle.set(this.data.rotatingTitles[this.titleIndex]);
        this.isExiting.set(false);
      }, 350);
    }, 2500);
  }

  ngOnDestroy(): void {
    if (this.intervalId) clearInterval(this.intervalId);
  }

  scrollTo(id: string): void {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }
}
