import { Injectable, signal, computed } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PortfolioState {
  // Navigation state
  readonly activeSection = signal<string>('hero');
  readonly isNavOpen = signal<boolean>(false);
  readonly scrollProgress = signal<number>(0);
  readonly isScrolled = signal<boolean>(false);

  // UI state
  readonly isLoading = signal<boolean>(false);
  readonly toastMessage = signal<string | null>(null);
  readonly toastType = signal<'success' | 'error'>('success');
  readonly cursorPosition = signal<{ x: number; y: number }>({ x: 0, y: 0 });

  // Skills state
  readonly activeSkillCategory = signal<string>('frontend');
  readonly skillsAnimated = signal<boolean>(false);

  // Projects state
  readonly activeProjectFilter = signal<string>('all');
  readonly selectedProject = signal<string | null>(null);

  // Contact state
  readonly isContactSubmitting = signal<boolean>(false);
  readonly contactSubmitted = signal<boolean>(false);

  // Computed
  readonly navLinks = computed(() => [
    { label: 'About', anchor: 'about', active: this.activeSection() === 'about' },
    { label: 'Skills', anchor: 'skills', active: this.activeSection() === 'skills' },
    { label: 'Experience', anchor: 'experience', active: this.activeSection() === 'experience' },
    { label: 'Projects', anchor: 'projects', active: this.activeSection() === 'projects' },
    {
      label: 'Architecture',
      anchor: 'architecture',
      active: this.activeSection() === 'architecture',
    },
    { label: 'Contact', anchor: 'contact', active: this.activeSection() === 'contact' },
  ]);

  showToast(message: string, type: 'success' | 'error' = 'success', durationMs = 4000): void {
    this.toastMessage.set(message);
    this.toastType.set(type);
    setTimeout(() => this.toastMessage.set(null), durationMs);
  }

  setActiveSection(section: string): void {
    this.activeSection.set(section);
  }

  setScrollProgress(progress: number): void {
    this.scrollProgress.set(Math.min(100, Math.max(0, progress)));
    this.isScrolled.set(progress > 2);
  }

  toggleNav(): void {
    this.isNavOpen.update((v) => !v);
  }

  closeNav(): void {
    this.isNavOpen.set(false);
  }
}
