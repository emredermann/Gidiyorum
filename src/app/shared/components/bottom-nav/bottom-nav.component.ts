import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { LucideAngularModule, MapPin, Sparkles, Plus, Compass, User } from 'lucide-angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bottom-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, LucideAngularModule, CommonModule],
  template: `
    <nav class="fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-stone-900/95 backdrop-blur-lg border-t border-slate-100 dark:border-white/10 md:hidden shadow-lg">
      <div id="bottom-nav-container" class="flex items-center justify-around h-16 px-1 max-w-md mx-auto">
        <!-- 1. Keşfet -->
        <a [routerLink]="'/trips'"
           [ngClass]="{
             'text-primary font-bold': isTripsActive(),
             'text-slate-400': !isTripsActive()
           }"
           class="relative flex flex-col items-center gap-1 px-3 py-1.5 transition-colors duration-200 hover:text-primary">
          <lucide-icon [img]="CompassIcon" [size]="20" strokeWidth="1.8"></lucide-icon>
          <span class="text-[10px] font-medium tracking-tight">Keşfet</span>
          @if (isTripsActive()) {
            <span class="absolute bottom-0.5 w-1 h-1 bg-primary rounded-full"></span>
          }
        </a>

        <!-- 2. Planla -->
        <a [routerLink]="'/planner/preferences'"
           routerLinkActive="text-primary font-bold" #rPlan="routerLinkActive"
           class="relative flex flex-col items-center gap-1 px-3 py-1.5 text-slate-400 transition-colors duration-200 hover:text-primary">
          <lucide-icon [img]="PlusIcon" [size]="20" strokeWidth="1.8"></lucide-icon>
          <span class="text-[10px] font-medium tracking-tight">Planla</span>
          @if (rPlan.isActive) {
            <span class="absolute bottom-0.5 w-1 h-1 bg-primary rounded-full"></span>
          }
        </a>

        <!-- 3. Rotam -->
        <a [routerLink]="'/itinerary'"
           [ngClass]="{
             'text-primary font-bold': isItineraryActive(),
             'text-slate-400': !isItineraryActive()
           }"
           class="relative flex flex-col items-center gap-1 px-3 py-1.5 transition-colors duration-200 hover:text-primary">
          <lucide-icon [img]="MapPinIcon" [size]="20" strokeWidth="1.8"></lucide-icon>
          <span class="text-[10px] font-medium tracking-tight">Rotam</span>
          @if (isItineraryActive()) {
            <span class="absolute bottom-0.5 w-1 h-1 bg-primary rounded-full"></span>
          }
        </a>

        <!-- 4. Rehber (AI Rehber) -->
        <a [routerLink]="'/ai-guide'"
           routerLinkActive="text-primary font-bold" #rAi="routerLinkActive"
           class="relative flex flex-col items-center gap-1 px-3 py-1.5 text-slate-400 transition-colors duration-200 hover:text-primary">
          <lucide-icon [img]="SparklesIcon" [size]="20" strokeWidth="1.8"></lucide-icon>
          <span class="text-[10px] font-medium tracking-tight">Rehber</span>
          @if (rAi.isActive) {
            <span class="absolute bottom-0.5 w-1 h-1 bg-primary rounded-full"></span>
          }
        </a>

        <!-- 5. Profil -->
        <a [routerLink]="'/profile'"
           routerLinkActive="text-primary font-bold" #rProf="routerLinkActive"
           class="relative flex flex-col items-center gap-1 px-3 py-1.5 text-slate-400 transition-colors duration-200 hover:text-primary">
          <lucide-icon [img]="UserIcon" [size]="20" strokeWidth="1.8"></lucide-icon>
          <span class="text-[10px] font-medium tracking-tight">Profil</span>
          @if (rProf.isActive) {
            <span class="absolute bottom-0.5 w-1 h-1 bg-primary rounded-full"></span>
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
