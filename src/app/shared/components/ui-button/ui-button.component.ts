import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, LucideIconData } from 'lucide-angular';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'gold';
export type ButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-ui-button',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <button
      [type]="type"
      [disabled]="disabled || loading"
      (click)="clicked.emit($event)"
      [class]="buttonClasses"
    >
      @if (loading) {
        <svg class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
        </svg>
      }
      @if (icon && !loading) {
        <lucide-icon [img]="icon" [size]="iconSize" strokeWidth="1.5"></lucide-icon>
      }
      @if (label) {
        <span>{{ label }}</span>
      }
      <ng-content></ng-content>
    </button>
  `,
})
export class UiButtonComponent {
  @Input() label = '';
  @Input() variant: ButtonVariant = 'primary';
  @Input() size: ButtonSize = 'md';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() disabled = false;
  @Input() loading = false;
  @Input() fullWidth = false;
  @Input() icon: LucideIconData | null = null;
  @Output() clicked = new EventEmitter<MouseEvent>();

  get iconSize(): number {
    return this.size === 'sm' ? 14 : this.size === 'lg' ? 18 : 16;
  }

  get buttonClasses(): string {
    const base =
      'inline-flex items-center justify-center gap-2 font-bold tracking-tight rounded-2xl transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary/30 cursor-pointer';
    const variants: Record<ButtonVariant, string> = {
      primary: 'bg-primary text-white hover:bg-primary-hover shadow-purple active:scale-[0.98]',
      secondary: 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 shadow-subtle',
      ghost: 'bg-transparent text-slate-600 hover:bg-purple-50 hover:text-primary',
      danger: 'bg-red-50 text-red-600 border border-red-100 hover:bg-red-100/80',
      gold: 'bg-primary text-white font-bold hover:bg-primary-hover shadow-purple',
    };
    const sizes: Record<ButtonSize, string> = {
      sm: 'px-3.5 py-1.5 text-xs',
      md: 'px-5 py-2.5 text-xs sm:text-sm',
      lg: 'px-6 py-3.5 text-sm sm:text-base font-bold',
    };
    return [base, variants[this.variant], sizes[this.size], this.fullWidth ? 'w-full' : ''].join(' ');
  }
}
