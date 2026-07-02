import {
  Component, inject, ChangeDetectionStrategy, HostListener,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioState } from '../../../state/portfolio.state';
import { PortfolioDataService } from '../../../core/services/portfolio-data.service';

@Component({
  selector: 'app-header',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  template: `
    <header class="site-header" [class.scrolled]="state.isScrolled()">
      <nav class="nav-inner container" role="navigation" aria-label="Main navigation">

        <!-- Logo -->
        <a class="logo" (click)="scrollTo('hero')" (keyup.enter)="scrollTo('hero')"
           tabindex="0" role="button" aria-label="Go to top">
          <span class="logo-bracket">&lt;</span>
          <span class="logo-text">GP</span>
          <span class="logo-bracket">/&gt;</span>
          <span class="logo-dot"></span>
        </a>

        <!-- Desktop navigation -->
        <ul class="nav-links" role="list">
          @for (item of data.navItems; track item.anchor) {
            <li>
              <button
                class="nav-link"
                [class.active]="state.activeSection() === item.anchor"
                (click)="scrollTo(item.anchor)"
                [attr.aria-current]="state.activeSection() === item.anchor ? 'true' : null">
                {{ item.label }}
              </button>
            </li>
          }
        </ul>

        <!-- CTA -->
        <div class="nav-actions">
          <a href="/assets/resume/Gowri Prasath Babu - Software Developer.pdf"
             download
             class="btn btn-primary btn-sm"
             aria-label="Download Resume">
            Resume ↓
          </a>
          <!-- Mobile hamburger -->
          <button class="hamburger"
                  (click)="state.toggleNav()"
                  [attr.aria-expanded]="state.isNavOpen()"
                  aria-label="Toggle menu"
                  aria-controls="mobile-nav">
            <span [class.open]="state.isNavOpen()"></span>
            <span [class.open]="state.isNavOpen()"></span>
            <span [class.open]="state.isNavOpen()"></span>
          </button>
        </div>
      </nav>

      <!-- Mobile menu -->
      @if (state.isNavOpen()) {
        <nav id="mobile-nav" class="mobile-nav glass-strong" role="navigation" aria-label="Mobile navigation">
          <ul role="list">
            @for (item of data.navItems; track item.anchor) {
              <li>
                <button class="mobile-nav-link"
                        [class.active]="state.activeSection() === item.anchor"
                        (click)="mobileNav(item.anchor)">
                  {{ item.label }}
                </button>
              </li>
            }
          </ul>
        </nav>
      }
    </header>
  `,
  styles: [`
    .site-header {
      position: fixed; top: 0; left: 0; right: 0;
      z-index: 1000;
      padding: 16px 0;
      transition: all 0.3s ease;

      &.scrolled {
        background: rgba(10, 10, 10, 0.85);
        backdrop-filter: blur(24px);
        -webkit-backdrop-filter: blur(24px);
        border-bottom: 1px solid rgba(255,255,255,0.06);
        padding: 12px 0;
        box-shadow: 0 4px 40px rgba(0,0,0,0.4);
      }
    }

    .nav-inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 24px;
    }

    .logo {
      display: flex;
      align-items: center;
      gap: 2px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 1.125rem;
      font-weight: 700;
      cursor: pointer;
      text-decoration: none;
      user-select: none;

      .logo-bracket { color: #FF6B00; opacity: 0.7; }
      .logo-text    { color: #fff; letter-spacing: -0.03em; }
      .logo-dot {
        width: 6px; height: 6px;
        background: #FF6B00;
        border-radius: 50%;
        margin-left: 4px;
        box-shadow: 0 0 8px rgba(255,107,0,0.6);
        animation: pulse 2s infinite;
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50%       { transform: scale(1.3); opacity: 0.7; }
        }
      }
    }

    .nav-links {
      display: flex;
      align-items: center;
      gap: 4px;
      list-style: none;
      margin: 0; padding: 0;

      @media (max-width: 768px) { display: none; }
    }

    .nav-link {
      background: none;
      border: none;
      padding: 8px 14px;
      font-family: 'Inter', sans-serif;
      font-size: 0.875rem;
      font-weight: 500;
      color: #A0A0A0;
      cursor: pointer;
      border-radius: 24px;
      transition: color 0.2s ease, background 0.2s ease;
      letter-spacing: 0.01em;

      &:hover { color: #fff; background: rgba(255,255,255,0.06); }
      &.active { color: #FF8C42; background: rgba(255,107,0,0.1); }
    }

    .nav-actions {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .hamburger {
      display: none;
      flex-direction: column;
      gap: 5px;
      background: none;
      border: none;
      cursor: pointer;
      padding: 4px;

      @media (max-width: 768px) { display: flex; }

      span {
        display: block;
        width: 22px; height: 2px;
        background: #A0A0A0;
        border-radius: 2px;
        transition: all 0.3s ease;
        transform-origin: center;

        &.open:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        &.open:nth-child(2) { opacity: 0; transform: scaleX(0); }
        &.open:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
      }
    }

    .mobile-nav {
      position: absolute;
      top: 100%; left: 0; right: 0;
      border-top: 1px solid rgba(255,255,255,0.06);
      animation: slideDown 0.2s ease;

      @keyframes slideDown {
        from { opacity: 0; transform: translateY(-8px); }
        to   { opacity: 1; transform: translateY(0); }
      }

      ul {
        list-style: none;
        margin: 0; padding: 16px;
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
    }

    .mobile-nav-link {
      width: 100%;
      background: none;
      border: none;
      padding: 12px 16px;
      font-size: 0.9375rem;
      font-weight: 500;
      color: #A0A0A0;
      cursor: pointer;
      border-radius: 10px;
      text-align: left;
      transition: all 0.2s ease;

      &:hover { color: #fff; background: rgba(255,255,255,0.06); }
      &.active { color: #FF8C42; background: rgba(255,107,0,0.1); }
    }

    @media (max-width: 768px) {
      .btn.btn-sm { display: none; }
    }
  `],
})
export class HeaderComponent {
  protected readonly state = inject(PortfolioState);
  protected readonly data = inject(PortfolioDataService);

  scrollTo(id: string): void {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  mobileNav(id: string): void {
    this.state.closeNav();
    setTimeout(() => this.scrollTo(id), 100);
  }
}
