import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BottomNavComponent } from './shared/components/bottom-nav/bottom-nav.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BottomNavComponent, SidebarComponent],
  template: `
    <div id="app-root-layout" class="flex h-screen overflow-hidden bg-background">
      <!-- Sidebar — visible on md+ screens only when authenticated -->
      @if (authService.isAuthenticated()) {
        <app-sidebar></app-sidebar>
      }

      <!-- Main content area -->
      <main class="flex-1 overflow-y-auto relative">
        <router-outlet></router-outlet>

        <!-- Spacer so content isn't hidden behind bottom-nav on mobile -->
        @if (authService.isAuthenticated()) {
          <div id="app-mobile-nav-spacer" class="h-16 md:hidden"></div>
        }
      </main>
    </div>

    <!-- Bottom navigation — visible on mobile only when authenticated -->
    @if (authService.isAuthenticated()) {
      <app-bottom-nav></app-bottom-nav>
    }
  `,
  styles: [],
})
export class AppComponent {
  title = 'gidiyorum';
  authService = inject(AuthService);
}
