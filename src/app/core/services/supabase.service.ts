import { Injectable, signal, computed } from '@angular/core';
import { createClient, SupabaseClient, User as SupabaseUser, Session } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';
import { MOCK_USER, MOCK_TRIPS, MOCK_ITINERARY_DAYS } from '../mock-data';
import { Trip, ItineraryItem } from '../models';

@Injectable({ providedIn: 'root' })
export class SupabaseService {
  private supabase!: SupabaseClient;

  private _session = signal<Session | null>(null);
  private _user = signal<SupabaseUser | null>(null);

  readonly session = this._session.asReadonly();
  readonly user = this._user.asReadonly();
  readonly isAuthenticated = computed(() => !!this._session());

  // In-memory mock storage for session persistence during demo
  private mockTrips: Trip[] = [...MOCK_TRIPS];

  constructor() {
    if (environment.useMockData) {
      this.checkStoredMockSession();
    } else {
      try {
        this.supabase = createClient(environment.supabaseUrl, environment.supabaseAnonKey, {
          auth: {
            autoRefreshToken: true,
            persistSession: true,
            detectSessionInUrl: true,
          },
        });

        this.supabase.auth.getSession().then(({ data: { session } }) => {
          if (session) {
            this._session.set(session);
            this._user.set(session.user);
          } else {
            this._session.set(null);
            this._user.set(null);
          }
        });

        this.supabase.auth.onAuthStateChange((_event, session) => {
          if (session) {
            this._session.set(session);
            this._user.set(session.user);
          } else {
            this._session.set(null);
            this._user.set(null);
          }
        });
      } catch (e) {
        console.warn('Supabase initialization failed, falling back to Mock Mode:', e);
        this.checkStoredMockSession();
      }
    }
  }

  private checkStoredMockSession() {
    if (typeof localStorage === 'undefined') {
      this._session.set(null);
      this._user.set(null);
      return;
    }
    const stored = localStorage.getItem('gidiyorum_mock_session');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        this._session.set(parsed);
        this._user.set(parsed.user);
        return;
      } catch (e) {
        localStorage.removeItem('gidiyorum_mock_session');
      }
    }
    this._session.set(null);
    this._user.set(null);
  }

  public setMockSession(
    email = 'demo@gidiyorum.app',
    fullName = 'Emre Yılmaz',
    avatarUrl = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb'
  ) {
    const mockSession = {
      access_token: 'mock-access-token',
      token_type: 'bearer',
      expires_in: 3600,
      refresh_token: 'mock-refresh-token',
      user: {
        id: MOCK_USER.id,
        app_metadata: {},
        user_metadata: { full_name: fullName, avatar_url: avatarUrl },
        aud: 'authenticated',
        created_at: MOCK_USER.created_at,
        email: email,
      } as SupabaseUser,
    } as Session;

    this._session.set(mockSession);
    this._user.set(mockSession.user);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('gidiyorum_mock_session', JSON.stringify(mockSession));
    }
  }

  public clearMockSession() {
    this._session.set(null);
    this._user.set(null);
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('gidiyorum_mock_session');
    }
  }

  get client(): SupabaseClient {
    return this.supabase;
  }

  from(table: string): any {
    if (environment.useMockData || !this.supabase) {
      return this.createMockQueryBuilder(table);
    }
    return this.supabase.from(table);
  }

  storage() {
    return this.supabase?.storage;
  }

  private createMockQueryBuilder(table: string) {
    const self = this;
    let selectedTripId: string | null = null;
    let selectedItemId: string | null = null;

    const builder = {
      select(_cols?: string) { return builder; },
      eq(column: string, value: any) {
        if (column === 'trip_id' || column === 'user_id') selectedTripId = value;
        if (column === 'id') selectedItemId = value;
        return builder;
      },
      order(_col: string, _opts?: any) { return builder; },
      insert(payload: any) {
        if (table === 'trips') {
          const newTrip: Trip = {
            id: `trip-${Date.now()}`,
            user_id: payload.user_id,
            title: payload.title,
            city: payload.city,
            country: payload.country || 'Türkiye',
            start_date: payload.start_date,
            end_date: payload.end_date,
            budget_level: payload.budget_level,
            walking_pace: payload.walking_pace,
            interest_tags: payload.interest_tags,
            cover_image: 'https://images.unsplash.com/photo-1527838832700-54595d164a3e?w=800',
            created_at: new Date().toISOString(),
          };
          self.mockTrips.unshift(newTrip);

          // Auto-generate mock itinerary for new trip
          MOCK_ITINERARY_DAYS[newTrip.id] = [
            {
              id: `day-${newTrip.id}-1`,
              trip_id: newTrip.id,
              day_number: 1,
              date: newTrip.start_date,
              created_at: new Date().toISOString(),
              items: [
                {
                  id: `item-${newTrip.id}-1`,
                  day_id: `day-${newTrip.id}-1`,
                  place_name: `${newTrip.city} Şehir Merkezi Keşfi`,
                  category: 'Tarih & Kültür',
                  time_slot: '10:00 - 12:30',
                  order_index: 0,
                  latitude: 41.0082,
                  longitude: 28.9784,
                  description: `${newTrip.city} bölgesinin tarihi sokaklarında yürüyüş ve lokal kahve molası.`,
                  image_url: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=600',
                  price_level: 2,
                  created_at: new Date().toISOString(),
                },
              ],
            },
          ];

          return {
            select() {
              return {
                single() {
                  return Promise.resolve({ data: newTrip, error: null });
                },
              };
            },
          };
        }
        return builder;
      },
      single() {
        if (table === 'itinerary_items' && selectedItemId) {
          let found: ItineraryItem | null = null;
          Object.values(MOCK_ITINERARY_DAYS).forEach(days => {
            days.forEach(d => {
              const match = d.items?.find(i => i.id === selectedItemId);
              if (match) found = match;
            });
          });
          return Promise.resolve({ data: found || MOCK_ITINERARY_DAYS['trip-istanbul-01'][0].items![0], error: null });
        }
        return Promise.resolve({ data: self.mockTrips[0], error: null });
      },
      then(resolve: (res: { data: any; error: any }) => void) {
        if (table === 'trips') {
          resolve({ data: self.mockTrips, error: null });
        } else if (table === 'itinerary_days') {
          const targetDays = MOCK_ITINERARY_DAYS[selectedTripId ?? 'trip-istanbul-01'] || MOCK_ITINERARY_DAYS['trip-istanbul-01'];
          resolve({ data: targetDays, error: null });
        } else if (table === 'itinerary_items') {
          const allItems = Object.values(MOCK_ITINERARY_DAYS).flatMap(days => days.flatMap(d => d.items || []));
          resolve({ data: allItems, error: null });
        } else {
          resolve({ data: [], error: null });
        }
      },
    };

    return builder;
  }
}
