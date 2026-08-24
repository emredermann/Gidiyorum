import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { LucideAngularModule, MapPin, Sparkles, Plus, Compass, User } from 'lucide-angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bottom-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, LucideAngularModule, CommonModule],
  template: `
    <nav class="fixed bottom-0 left-0 right-0 z-50 bg-[#F9F8F6]/90 backdrop-blur-md border-t border-black/[0.06] md:hidden">
      <div id="bottom-nav-container" class="flex items-center justify-around h-16 px-2 max-w-md mx-auto">
        <!-- Keşfet / Seyahatler -->
        <a [routerLink]="'/trips'"
           [ngClass]="{
             'text-obsidian font-bold dark:text-gold': isTripsActive(),
             'text-stone-400': !isTripsActive()
           }"
           class="relative flex flex-col items-center gap-1 px-3 py-2 transition-colors duration-200 hover:text-obsidian">
          <lucide-icon [img]="CompassIcon" [size]="20" strokeWidth="1.5"></lucide-icon>
          <span class="text-[10px] tracking-tight">Keşfet</span>
          @if (isTripsActive()) {
            <span class="absolute bottom-1 w-1 h-1 bg-obsidian dark:bg-gold rounded-full"></span>
          }
        </a>

        <!-- Rotam -->
        <a [routerLink]="'/itinerary'"
           [ngClass]="{
             'text-obsidian font-bold dark:text-gold': isItineraryActive(),
             'text-stone-400': !isItineraryActive()
           }"
           class="relative flex flex-col items-center gap-1 px-3 py-2 transition-colors duration-200 hover:text-obsidian">
          <lucide-icon [img]="MapPinIcon" [size]="20" strokeWidth="1.5"></lucide-icon>
          <span class="text-[10px] tracking-tight">Rotam</span>
          @if (isItineraryActive()) {
            <span class="absolute bottom-1 w-1 h-1 bg-obsidian dark:bg-gold rounded-full"></span>
          }
        </a>

        <!-- Yeni Plan -->
        <a [routerLink]="'/planner/preferences'" routerLinkActive="text-obsidian font-bold" #r3="routerLinkActive"
           class="relative flex flex-col items-center gap-1 px-3 py-2 text-stone-400 transition-colors duration-200 hover:text-obsidian">
          <div id="bottom-nav-plus-icon-wrapper" class="w-8 h-8 rounded-full bg-obsidian text-white flex items-center justify-center shadow-sm">
            <lucide-icon [img]="PlusIcon" [size]="16" strokeWidth="1.75"></lucide-icon>
          </div>
        </a>

        <!-- AI Rehber -->
        <a [routerLink]="'/ai-guide'" routerLinkActive="text-obsidian font-bold" #r4="routerLinkActive"
           class="relative flex flex-col items-center gap-1 px-3 py-2 text-stone-400 transition-colors duration-200 hover:text-obsidian">
          <lucide-icon [img]="SparklesIcon" [size]="20" strokeWidth="1.5"></lucide-icon>
          <span class="text-[10px] tracking-tight">AI Rehber</span>
          @if (r4.isActive) {
            <span class="absolute bottom-1 w-1 h-1 bg-gold rounded-full"></span>
          }
        </a>

        <!-- Profil -->
        <a [routerLink]="'/profile'" routerLinkActive="text-obsidian font-bold" #r5="routerLinkActive"
           class="relative flex flex-col items-center gap-1 px-3 py-2 text-stone-400 transition-colors duration-200 hover:text-obsidian">
          <lucide-icon [img]="UserIcon" [size]="20" strokeWidth="1.5"></lucide-icon>
          <span class="text-[10px] tracking-tight">Profil</span>
          @if (r5.isActive) {
            <span class="absolute bottom-1 w-1 h-1 bg-obsidian rounded-full"></span>
          }
        </a>
      </div>
    </nav>
  `,
})
export class BottomNavComponent {
  private router = inject(Router);

  protected CompassIcon = Compass;
  protected MapPinIcon = MapPin;
  protected PlusIcon = Plus;
  protected SparklesIcon = Sparkles;
  protected UserIcon = User;

  isTripsActive(): boolean {
    const url = this.router.url;
    return url === '/trips' || url === '/';
  }

  isItineraryActive(): boolean {
    const url = this.router.url;
    return url.includes('itinerary') || url.includes('daily-route');
  }
}
