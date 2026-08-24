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
    if (p.includes('restoran') || p.includes('lezzet') || p.includes('yemek')) {
      return 'Yakınınızda mükemmel bir restoran önerim var:\n\n📍 **Roscioli Salumeria con Cucina** (120m uzaklıkta)\nİtalyan taze makarnaları, şarküteri çeşitleri ve taze peynir seçkisiyle dünyaca ünlü şık bir mekan. Masanızı şimdiden ayırmanızı öneririm! 🍷';
    }
    if (p.includes('yürüyüş') || p.includes('rotas')) {
      return 'Harika bir hava! Sizin için **2 Saatlik Roma Tarihi Meydanlar Yürüyüş Rotası** hazırladım:\n\n1. 09:00 - Piazza Navona\n2. 09:45 - Pantheon Tapınağı\n3. 10:30 - Trevi Aşk Çeşmesi\n\nRotayı harita üzerinde inceleyebilirsiniz! 🚶‍♂️';
    }
    if (p.includes('yağmur') || p.includes('kapalı')) {
      return 'Yağmurlu hava için harika kapalı mekan alternatifleri:\n\n🏛️ **Pantheon Tapınağı**: Kubbesindeki oculus açıklığından yağmur düşüşünü izlemek büyüleyici bir deneyimdir.\n🎨 **Vatikan Müzeleri**: Yağmur dinerken binlerce Rönesans şaheserini inceleyin.\n☕ **Caffè Sant’Eustachio**: Yağmur eşliğinde Roma’nın en iyi espressosunu tadın!';
    }
    if (p.includes('bar') || p.includes('kokteyl') || p.includes('akşam')) {
      return 'Akşam keyfi için seçkin bar önerileri:\n\n🍸 **Jerry Thomas Speakeasy**: Gizli kapılı, 1920’ler konseptli ödüllü kokteyl barı.\n🍷 **Terrazza Borromini**: Piazza Navona manzaralı harika bir rooftop teras barı.\n🍹 **Freni e Frizioni (Trastevere)**: Nehir kenarında canlı genç atmosfer ve açık büfe aperitivo!';
    }
    if (p.includes('müze') || p.includes('tarih')) {
      return 'Tarih ve müze severler için önerilerim:\n\n1. **Kolezyum & Roman Forumu**: Şehrin kalbinde antik Roma imparatorluğu yolculuğu. 🏛️\n2. **Kapitolin Müzeleri**: Dünyanın en eski halka açık müze koleksiyonu.\n3. **Borghese Galerisi**: Bernini heykelleri ve Caravaggio tabloları!';
    }
    return `Harika bir soru! "${prompt}" hakkında rotanıza özel tavsiyelerim:\n\n✨ Günün en keyifli saatlerinde bu mekanı ziyaret edebilir, çevresindeki lokantaları keşfedebilirsiniz. Başka merak ettiğiniz bir yer var mı?`;
  }
}
