import {
  Component, OnInit, OnDestroy, HostListener,
  inject, ChangeDetectionStrategy,
  PLATFORM_ID, afterNextRender,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './features/layout/header/header.component';
import { FooterComponent } from './features/layout/footer/footer.component';
import { PortfolioState } from './state/portfolio.state';

@Component({
  selector: 'app-root',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  template: `
    <!-- Scroll progress bar -->
    <div class="scroll-progress" [style.width.%]="state.scrollProgress()"></div>

    <!-- Cursor glow (desktop only) -->
    @if (isBrowser) {
      <div class="cursor-glow"
           [style.left.px]="state.cursorPosition().x"
           [style.top.px]="state.cursorPosition().y">
      </div>
    }

    <!-- Toast notifications -->
    @if (state.toastMessage()) {
      <div class="toast" [class]="'toast-' + state.toastType()" role="alert" aria-live="polite">
        <span>{{ state.toastType() === 'success' ? '✓' : '✕' }}</span>
        {{ state.toastMessage() }}
      </div>
    }

    <!-- App layout -->
    <app-header />
    <main id="main-content" tabindex="-1">
      <router-outlet />
    </main>
    <app-footer />
  `,
})
export class AppComponent implements OnInit, OnDestroy {
  protected readonly state = inject(PortfolioState);
  protected readonly isBrowser: boolean;

  private readonly platform = inject(PLATFORM_ID);
  private sectionObserver?: IntersectionObserver;

  constructor() {
    this.isBrowser = isPlatformBrowser(this.platform);

    // Must be called within an injection context (constructor), so we
    // schedule the section-observer setup to run once the view is rendered.
    afterNextRender(() => {
      if (this.isBrowser) {
        this.initSectionObserver();
      }
    });
  }

  ngOnInit(): void {
    if (!this.isBrowser) return;
    this.onScroll(); // prime initial scroll progress on load
  }

  ngOnDestroy(): void {
    this.sectionObserver?.disconnect();
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    if (!this.isBrowser) return;
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    this.state.setScrollProgress(progress);
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(e: MouseEvent): void {
    this.state.cursorPosition.set({ x: e.clientX, y: e.clientY });
  }

  private initSectionObserver(): void {
    const sections = [
      'hero', 'about', 'skills', 'experience',
      'projects', 'achievements', 'architecture', 'certifications', 'contact',
    ];

    this.sectionObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          this.state.setActiveSection(visible[0].target.id);
        }
      },
      { threshold: 0.25, rootMargin: '-80px 0px -20% 0px' }
    );

    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) this.sectionObserver!.observe(el);
    });
  }
}
