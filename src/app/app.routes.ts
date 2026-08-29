import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full',
  },
  {
    path: 'onboarding',
    loadComponent: () =>
      import('./features/onboarding/onboarding.component').then(m => m.OnboardingComponent),
  },
  {
    path: 'auth/login',
    loadComponent: () =>
      import('./features/auth/login.component').then(m => m.LoginComponent),
  },
  {
    path: 'auth/register',
    loadComponent: () =>
      import('./features/auth/register.component').then(m => m.RegisterComponent),
  },
  {
    path: 'profile',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/profile/profile.component').then(m => m.ProfileComponent),
  },
  {
    path: 'planner/preferences',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/planner/preferences.component').then(m => m.PreferencesComponent),
  },
  {
    path: 'planner/summary',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/planner/plan-summary.component').then(m => m.PlanSummaryComponent),
  },
  {
    path: 'auth/callback',
    loadComponent: () =>
      import('./features/auth-callback/auth-callback.component').then(m => m.AuthCallbackComponent),
  },
  {
    path: 'trips',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/trips/trips.component').then(m => m.TripsComponent),
  },
  {
    path: 'trips/:id/itinerary',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/itinerary/daily-route.component').then(m => m.DailyRouteComponent),
  },
  {
    path: 'trips/:id/chat',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/ai-guide/ai-guide.component').then(m => m.AiGuideComponent),
  },
  {
    path: 'ai-guide',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/ai-guide/ai-guide.component').then(m => m.AiGuideComponent),
  },
  {
    path: 'itinerary',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/itinerary/daily-route.component').then(m => m.DailyRouteComponent),
  },
  {
    path: 'daily-route',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/itinerary/daily-route.component').then(m => m.DailyRouteComponent),
  },
  {
    path: 'places/:id',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/places/place-detail.component').then(m => m.PlaceDetailComponent),
  },
  {
    path: 'agent-tracker',
    loadComponent: () =>
      import('./features/agent-tracker/agent-tracker.component').then(m => m.AgentTrackerComponent),
  },
  {
    path: '**',
    redirectTo: '/auth/login',
  },
];

