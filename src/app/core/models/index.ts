export interface User {
  id: string;
  name: string | null;
  email: string;
  avatar_url: string | null;
  created_at?: string;
}

export type UserProfile = User;

export interface Trip {
  id: string;
  user_id: string;
  title: string;
  city: string;
  country: string;
  start_date: string | null;
  end_date: string | null;
  budget_level: 'budget' | 'mid' | 'luxury' | null;
  walking_pace: 'slow' | 'moderate' | 'fast' | null;
  interest_tags: string[];
  cover_image: string | null;
  created_at?: string;
}

export interface ItineraryDay {
  id: string;
  trip_id: string;
  day_number: number;
  date: string | null;
  created_at?: string;
  items?: ItineraryItem[];
}

export interface ItineraryItem {
  id: string;
  day_id: string;
  place_name: string;
  category: string | null;
  time_slot: string | null;
  order_index: number;
  latitude: number | null;
  longitude: number | null;
  description: string | null;
  image_url: string | null;
  price_level: 1 | 2 | 3 | 4 | null;
  created_at?: string;
}

export interface ChatMessage {
  id: string;
  user_id: string;
  trip_id: string | null;
  role: 'user' | 'assistant';
  content: string;
  metadata_suggestions: Record<string, unknown> | null;
  created_at: string;
}

export type BudgetLevel = Trip['budget_level'];
export type WalkingPace = Trip['walking_pace'];
