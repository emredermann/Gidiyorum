import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BottomNavComponent } from './shared/components/bottom-nav/bottom-nav.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BottomNavComponent, SidebarComponent],
  template: `
    <div class="flex h-screen overflow-hidden bg-background">
      <!-- Sidebar — visible on md+ screens only -->
      <app-sidebar></app-sidebar>

      <!-- Main content area -->
      <main class="flex-1 overflow-y-auto relative">
        <router-outlet></router-outlet>

        <!-- Spacer so content isn't hidden behind bottom-nav on mobile -->
        <div class="h-16 md:hidden"></div>
      </main>
    </div>

    <!-- Bottom navigation — visible on mobile only -->
    <app-bottom-nav></app-bottom-nav>
  `,
  styles: [],
})
export class AppComponent {
  title = 'gidiyorum';
}
