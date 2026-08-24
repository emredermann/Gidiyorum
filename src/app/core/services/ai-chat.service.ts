import { Injectable, inject, signal } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { ChatMessage } from '../models';
import { environment } from '../../../environments/environment';
import { MOCK_CHAT_MESSAGES } from '../mock-data';

@Injectable({ providedIn: 'root' })
export class AiChatService {
  private supabase = inject(SupabaseService);

  private _messages = signal<ChatMessage[]>([]);
  private _isLoading = signal(false);

  readonly messages = this._messages.asReadonly();
  readonly isLoading = this._isLoading.asReadonly();

  async sendMessage(content: string, tripId?: string): Promise<void> {
    const user = this.supabase.user();
    if (!user) return;

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      user_id: user.id,
      trip_id: tripId ?? null,
      role: 'user',
      content,
      metadata_suggestions: null,
      created_at: new Date().toISOString(),
    };

    this._messages.update(msgs => [...msgs, userMessage]);
    this._isLoading.set(true);

    if (environment.useMockData) {
      // Simulate realistic AI response delay in demo mode
      await new Promise(r => setTimeout(r, 1200));

      const replyContent = this.generateMockAiReply(content);

      const assistantMessage: ChatMessage = {
        id: crypto.randomUUID(),
        user_id: user.id,
        trip_id: tripId ?? null,
        role: 'assistant',
        content: replyContent,
        metadata_suggestions: null,
        created_at: new Date().toISOString(),
      };

      this._messages.update(msgs => [...msgs, assistantMessage]);
      this._isLoading.set(false);
      return;
    }

    try {
      const { data, error } = await this.supabase.client.functions.invoke('ai-chat', {
        body: {
          message: content,
          trip_id: tripId,
          history: this._messages()
            .slice(-10)
            .map(m => ({ role: m.role, content: m.content })),
        },
      });

      if (error) throw error;

      const assistantMessage: ChatMessage = {
        id: crypto.randomUUID(),
        user_id: user.id,
        trip_id: tripId ?? null,
        role: 'assistant',
        content: data.reply,
        metadata_suggestions: data.suggestions ?? null,
        created_at: new Date().toISOString(),
      };

      this._messages.update(msgs => [...msgs, assistantMessage]);
    } catch {
      // Fallback if network/API fails
      const assistantMessage: ChatMessage = {
        id: crypto.randomUUID(),
        user_id: user.id,
        trip_id: tripId ?? null,
        role: 'assistant',
        content: this.generateMockAiReply(content),
        metadata_suggestions: null,
        created_at: new Date().toISOString(),
      };
      this._messages.update(msgs => [...msgs, assistantMessage]);
    } finally {
      this._isLoading.set(false);
    }
  }

  async loadMessages(tripId: string): Promise<void> {
    if (environment.useMockData) {
      this._messages.set(MOCK_CHAT_MESSAGES.filter(m => !m.trip_id || m.trip_id === tripId));
      return;
    }

    const { data, error } = await this.supabase
      .from('chat_messages')
      .select('*')
      .eq('trip_id', tripId)
      .order('created_at', { ascending: true });

    if (!error && data) {
      this._messages.set(data as ChatMessage[]);
    } else {
      this._messages.set(MOCK_CHAT_MESSAGES);
    }
  }

  clearMessages(): void {
    this._messages.set([]);
  }

  private generateMockAiReply(prompt: string): string {
    const p = prompt.toLowerCase();
    if (p.includes('müze') || p.includes('tarih')) {
      return 'Tarih ve müze severler için önerilerim:\n\n1. **Ayasofya & Topkapı Sarayı**: Şehrin kalbinde eşsiz bir tarih yolculuğu. 🏛️\n2. **İstanbul Modern**: Çağdaş sanat eserleri ve harika Boğaz manzarası.\n3. **Arkeoloji Müzeleri**: İskender Lahdi dahil binlerce antik eser!';
    }
    if (p.includes('yemek') || p.includes('lezzet') || p.includes('restoran')) {
      return 'Yerel gurme tavsiyeleri:\n\n1. **Tarihi Sultanahmet Köftecisi**: Izgara köfte ve özel piyaz. 😋\n2. **Karaköy Güllüoğlu**: Taze fıstıklı baklava & çay.\n3. **Çiya Sofrası (Kadıköy)**: Unutulmaya yüz tutmuş Anadolu lezzetleri.';
    }
    if (p.includes('ulaşım') || p.includes('gez')) {
      return 'Şehir içi ulaşım tavsiyeleri:\n\n- İstanbulkart edinerek metro, tramvay ve vapur hatlarını rahatça kullanabilirsiniz. 🎫\n- Karaköy - Kadıköy vapuru sadece ulaşım değil, martılarla unutulmaz bir Boğaz turudur! 🚢';
    }
    return `Harika bir soru! "${prompt}" hakkında rotanıza özel tavsiyelerim:\n\n✨ Günün en keyifli saatlerinde bu mekanı ziyaret edebilir, çevresindeki lokantaları keşfedebilirsiniz. Başka merak ettiğiniz bir yer var mı?`;
  }
}
