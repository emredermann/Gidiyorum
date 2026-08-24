import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {
  LucideAngularModule,
  MapPin,
  Sparkles,
  Plus,
  Compass,
  User,
  ChevronLeft,
  ChevronRight,
  Globe,
} from 'lucide-angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, LucideAngularModule, CommonModule],
  template: `
    <aside
      class="hidden md:flex flex-col bg-[#F9F8F6] border-r border-black/[0.06] transition-all duration-300 h-screen sticky top-0"
      [class.w-64]="!collapsed()"
      [class.w-16]="collapsed()"
    >
      <!-- Monocle Style Logo Header -->
      <div id="sidebar-logo-header" class="flex items-center gap-3 px-5 py-6 border-b border-black/[0.05] overflow-hidden">
        <div id="sidebar-globe-badge" class="w-8 h-8 rounded-xl bg-obsidian text-white flex items-center justify-center flex-shrink-0 shadow-sm">
          <lucide-icon [img]="GlobeIcon" [size]="16" strokeWidth="1.5"></lucide-icon>
        </div>
        @if (!collapsed()) {
          <span class="font-bold text-base text-stone-950 tracking-wider uppercase font-serif-luxe">Gidiyorum</span>
        }
      </div>

      <!-- Quiet Luxury Navigation Links -->
      <nav class="flex-1 py-6 space-y-1.5 px-3">
        <a [routerLink]="'/trips'" routerLinkActive="bg-white text-obsidian font-bold shadow-subtle border border-black/[0.04]"
           class="flex items-center gap-3 px-3 py-2.5 rounded-2xl text-stone-500 hover:bg-stone-100 hover:text-stone-900 transition-all">
          <lucide-icon [img]="CompassIcon" [size]="18" strokeWidth="1.5" class="flex-shrink-0"></lucide-icon>
          @if (!collapsed()) { <span class="text-xs font-semibold whitespace-nowrap">Seyahatlerim</span> }
        </a>

        <a [routerLink]="'/itinerary'" routerLinkActive="bg-white text-obsidian font-bold shadow-subtle border border-black/[0.04]"
           class="flex items-center gap-3 px-3 py-2.5 rounded-2xl text-stone-500 hover:bg-stone-100 hover:text-stone-900 transition-all">
          <lucide-icon [img]="MapPinIcon" [size]="18" strokeWidth="1.5" class="flex-shrink-0"></lucide-icon>
          @if (!collapsed()) { <span class="text-xs font-semibold whitespace-nowrap">Bugünkü Rotam</span> }
        </a>

        <a [routerLink]="'/planner/preferences'" routerLinkActive="bg-white text-obsidian font-bold shadow-subtle border border-black/[0.04]"
           class="flex items-center gap-3 px-3 py-2.5 rounded-2xl text-stone-500 hover:bg-stone-100 hover:text-stone-900 transition-all">
          <lucide-icon [img]="PlusIcon" [size]="18" strokeWidth="1.5" class="flex-shrink-0"></lucide-icon>
          @if (!collapsed()) { <span class="text-xs font-semibold whitespace-nowrap">Yeni Plan</span> }
        </a>

        <a [routerLink]="'/ai-guide'" routerLinkActive="bg-white text-obsidian font-bold shadow-subtle border border-black/[0.04]"
           class="flex items-center gap-3 px-3 py-2.5 rounded-2xl text-stone-500 hover:bg-stone-100 hover:text-stone-900 transition-all">
          <lucide-icon [img]="SparklesIcon" [size]="18" strokeWidth="1.5" class="flex-shrink-0 text-gold"></lucide-icon>
          @if (!collapsed()) { <span class="text-xs font-semibold whitespace-nowrap">AI Concierge</span> }
        </a>

        <a [routerLink]="'/profile'" routerLinkActive="bg-white text-obsidian font-bold shadow-subtle border border-black/[0.04]"
           class="flex items-center gap-3 px-3 py-2.5 rounded-2xl text-stone-500 hover:bg-stone-100 hover:text-stone-900 transition-all">
          <lucide-icon [img]="UserIcon" [size]="18" strokeWidth="1.5" class="flex-shrink-0"></lucide-icon>
          @if (!collapsed()) { <span class="text-xs font-semibold whitespace-nowrap">Profilim</span> }
        </a>
      </nav>

      <!-- Collapse Toggle -->
      <button
        (click)="toggleCollapse()"
        class="flex items-center justify-center p-3 m-3 rounded-2xl text-stone-400 hover:bg-stone-100 hover:text-stone-800 transition-colors"
      >
        <lucide-icon [img]="collapsed() ? ChevronRightIcon : ChevronLeftIcon" [size]="16" strokeWidth="1.5"></lucide-icon>
      </button>
    </aside>
  `,
})
export class SidebarComponent {
  collapsed = signal(false);

  protected GlobeIcon = Globe;
  protected CompassIcon = Compass;
  protected MapPinIcon = MapPin;
  protected PlusIcon = Plus;
  protected SparklesIcon = Sparkles;
  protected UserIcon = User;
  protected ChevronLeftIcon = ChevronLeft;
  protected ChevronRightIcon = ChevronRight;

  toggleCollapse() {
    this.collapsed.update(v => !v);
  }
}
