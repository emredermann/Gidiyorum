import { Injectable, signal, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private platformId = inject(PLATFORM_ID);
  readonly darkMode = signal<boolean>(false);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.initTheme();
    }
  }

  private initTheme(): void {
    const stored = localStorage.getItem('gidiyorum_theme');
    let isDark = false;

    if (stored === 'dark') {
      isDark = true;
    } else if (stored === 'light') {
      isDark = false;
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      isDark = true;
    }

    this.applyTheme(isDark);
  }

  toggleDarkMode(): void {
    this.applyTheme(!this.darkMode());
  }

  setDarkMode(isDark: boolean): void {
    this.applyTheme(isDark);
  }

  private applyTheme(isDark: boolean): void {
    this.darkMode.set(isDark);
    if (!isPlatformBrowser(this.platformId)) return;

    const root = document.documentElement;
    const body = document.body;

    if (isDark) {
      root.classList.add('dark');
      body?.classList.add('dark');
      localStorage.setItem('gidiyorum_theme', 'dark');
    } else {
      root.classList.remove('dark');
      body?.classList.remove('dark');
      localStorage.setItem('gidiyorum_theme', 'light');
    }
  }
}
