import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel
} from "./chunk-K3XLSYZ2.js";
import {
  HeaderComponent
} from "./chunk-3NIENPLU.js";
import {
  Bot,
  ChevronRight,
  Image,
  LucideAngularComponent,
  LucideAngularModule,
  MapPin,
  Mic,
  Send,
  Sparkles,
  Star
} from "./chunk-RPAFIYH2.js";
import {
  MOCK_CHAT_MESSAGES,
  SupabaseService,
  environment
} from "./chunk-3WGHE6CE.js";
import {
  ActivatedRoute,
  CommonModule,
  NgClass,
  RouterLink,
  inject,
  signal,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵpureFunction2,
  ɵɵqueryRefresh,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty,
  ɵɵviewQuery
} from "./chunk-C5IKH3YG.js";
import {
  __async
} from "./chunk-POPFE7MN.js";

// src/app/core/services/ai-chat.service.ts
var AiChatService = class _AiChatService {
  constructor() {
    this.supabase = inject(SupabaseService);
    this._messages = signal([]);
    this._isLoading = signal(false);
    this.messages = this._messages.asReadonly();
    this.isLoading = this._isLoading.asReadonly();
  }
  sendMessage(content, tripId) {
    return __async(this, null, function* () {
      const user = this.supabase.user();
      if (!user)
        return;
      const userMessage = {
        id: crypto.randomUUID(),
        user_id: user.id,
        trip_id: tripId ?? null,
        role: "user",
        content,
        metadata_suggestions: null,
        created_at: (/* @__PURE__ */ new Date()).toISOString()
      };
      this._messages.update((msgs) => [...msgs, userMessage]);
      this._isLoading.set(true);
      if (environment.useMockData) {
        yield new Promise((r) => setTimeout(r, 1200));
        const replyContent = this.generateMockAiReply(content);
        const assistantMessage = {
          id: crypto.randomUUID(),
          user_id: user.id,
          trip_id: tripId ?? null,
          role: "assistant",
          content: replyContent,
          metadata_suggestions: null,
          created_at: (/* @__PURE__ */ new Date()).toISOString()
        };
        this._messages.update((msgs) => [...msgs, assistantMessage]);
        this._isLoading.set(false);
        return;
      }
      try {
        const { data, error } = yield this.supabase.client.functions.invoke("ai-chat", {
          body: {
            message: content,
            trip_id: tripId,
            history: this._messages().slice(-10).map((m) => ({ role: m.role, content: m.content }))
          }
        });
        if (error)
          throw error;
        const assistantMessage = {
          id: crypto.randomUUID(),
          user_id: user.id,
          trip_id: tripId ?? null,
          role: "assistant",
          content: data.reply,
          metadata_suggestions: data.suggestions ?? null,
          created_at: (/* @__PURE__ */ new Date()).toISOString()
        };
        this._messages.update((msgs) => [...msgs, assistantMessage]);
      } catch {
        const assistantMessage = {
          id: crypto.randomUUID(),
          user_id: user.id,
          trip_id: tripId ?? null,
          role: "assistant",
          content: this.generateMockAiReply(content),
          metadata_suggestions: null,
          created_at: (/* @__PURE__ */ new Date()).toISOString()
        };
        this._messages.update((msgs) => [...msgs, assistantMessage]);
      } finally {
        this._isLoading.set(false);
      }
    });
  }
  loadMessages(tripId) {
    return __async(this, null, function* () {
      if (environment.useMockData) {
        this._messages.set(MOCK_CHAT_MESSAGES.filter((m) => !m.trip_id || m.trip_id === tripId));
        return;
      }
      const { data, error } = yield this.supabase.from("chat_messages").select("*").eq("trip_id", tripId).order("created_at", { ascending: true });
      if (!error && data) {
        this._messages.set(data);
      } else {
        this._messages.set(MOCK_CHAT_MESSAGES);
      }
    });
  }
  clearMessages() {
    this._messages.set([]);
  }
  generateMockAiReply(prompt) {
    const p = prompt.toLowerCase();
    if (p.includes("m\xFCze") || p.includes("tarih")) {
      return "Tarih ve m\xFCze severler i\xE7in \xF6nerilerim:\n\n1. **Ayasofya & Topkap\u0131 Saray\u0131**: \u015Eehrin kalbinde e\u015Fsiz bir tarih yolculu\u011Fu. \u{1F3DB}\uFE0F\n2. **\u0130stanbul Modern**: \xC7a\u011Fda\u015F sanat eserleri ve harika Bo\u011Faz manzaras\u0131.\n3. **Arkeoloji M\xFCzeleri**: \u0130skender Lahdi dahil binlerce antik eser!";
    }
    if (p.includes("yemek") || p.includes("lezzet") || p.includes("restoran")) {
      return "Yerel gurme tavsiyeleri:\n\n1. **Tarihi Sultanahmet K\xF6ftecisi**: Izgara k\xF6fte ve \xF6zel piyaz. \u{1F60B}\n2. **Karak\xF6y G\xFCll\xFCo\u011Flu**: Taze f\u0131st\u0131kl\u0131 baklava & \xE7ay.\n3. **\xC7iya Sofras\u0131 (Kad\u0131k\xF6y)**: Unutulmaya y\xFCz tutmu\u015F Anadolu lezzetleri.";
    }
    if (p.includes("ula\u015F\u0131m") || p.includes("gez")) {
      return "\u015Eehir i\xE7i ula\u015F\u0131m tavsiyeleri:\n\n- \u0130stanbulkart edinerek metro, tramvay ve vapur hatlar\u0131n\u0131 rahat\xE7a kullanabilirsiniz. \u{1F3AB}\n- Karak\xF6y - Kad\u0131k\xF6y vapuru sadece ula\u015F\u0131m de\u011Fil, mart\u0131larla unutulmaz bir Bo\u011Faz turudur! \u{1F6A2}";
    }
    return `Harika bir soru! "${prompt}" hakk\u0131nda rotan\u0131za \xF6zel tavsiyelerim:

\u2728 G\xFCn\xFCn en keyifli saatlerinde bu mekan\u0131 ziyaret edebilir, \xE7evresindeki lokantalar\u0131 ke\u015Ffedebilirsiniz. Ba\u015Fka merak etti\u011Finiz bir yer var m\u0131?`;
  }
  static {
    this.\u0275fac = function AiChatService_Factory(t) {
      return new (t || _AiChatService)();
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AiChatService, factory: _AiChatService.\u0275fac, providedIn: "root" });
  }
};

// src/app/features/ai-guide/ai-guide.component.ts
var _c0 = ["scrollContainer"];
var _forTrack0 = ($index, $item) => $item.id;
var _c1 = (a0, a1) => ({ "bg-obsidian text-gold border-obsidian": a0, "bg-white text-stone-600 border-black/[0.06]": a1 });
var _c2 = (a0) => ({ "flex-row-reverse": a0 });
var _c3 = (a0, a1) => ({ "bg-obsidian text-white rounded-br-xs": a0, "bg-white text-stone-900 border border-black/[0.06] rounded-bl-xs": a1 });
function AiGuideComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 4)(1, "div", 19)(2, "div", 20);
    \u0275\u0275element(3, "lucide-icon", 21);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "h2", 22);
    \u0275\u0275text(5, " Merhaba Emre \u{1F44B} ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 23);
    \u0275\u0275text(7, " Ki\u015Fisel seyahat concierge asistan\u0131n\u0131z hizmetinizde. \xD6zel tavsiye ve rotalar\u0131n\u0131z\u0131 belirlemek i\xE7in sorabilirsiniz. ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 24)(9, "button", 25);
    \u0275\u0275listener("click", function AiGuideComponent_Conditional_4_Template_button_click_9_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.sendQuickAction("Yak\u0131n\u0131mda iyi bir restoran bul"));
    });
    \u0275\u0275elementStart(10, "div", 26);
    \u0275\u0275text(11, " \u{1F37D}\uFE0F ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "div", 27)(13, "h3", 28);
    \u0275\u0275text(14, " Yak\u0131n\u0131mda restoran bul ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "p", 29);
    \u0275\u0275text(16, " 120m mesafedeki \u0130talyan lezzetleri ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(17, "button", 25);
    \u0275\u0275listener("click", function AiGuideComponent_Conditional_4_Template_button_click_17_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.sendQuickAction("2 saatlik y\xFCr\xFCy\xFC\u015F rotas\u0131 olu\u015Ftur"));
    });
    \u0275\u0275elementStart(18, "div", 26);
    \u0275\u0275text(19, " \u{1F6B6} ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "div", 27)(21, "h3", 28);
    \u0275\u0275text(22, " 2 saatlik y\xFCr\xFCy\xFC\u015F rotas\u0131 ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "p", 29);
    \u0275\u0275text(24, " Tarihi sokaklar ve meydanlar ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(25, "button", 25);
    \u0275\u0275listener("click", function AiGuideComponent_Conditional_4_Template_button_click_25_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.sendQuickAction("Ya\u011Fmur ba\u015Flad\u0131, ne yapabilirim?"));
    });
    \u0275\u0275elementStart(26, "div", 26);
    \u0275\u0275text(27, " \u{1F327}\uFE0F ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "div", 27)(29, "h3", 28);
    \u0275\u0275text(30, " Ya\u011Fmur ba\u015Flad\u0131! ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "p", 29);
    \u0275\u0275text(32, " Kapal\u0131 mekan & m\xFCze \xF6nerileri ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(33, "button", 25);
    \u0275\u0275listener("click", function AiGuideComponent_Conditional_4_Template_button_click_33_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.sendQuickAction("Ak\u015Fam i\xE7in bar \xF6nerisi ver"));
    });
    \u0275\u0275elementStart(34, "div", 26);
    \u0275\u0275text(35, " \u{1F378} ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(36, "div", 27)(37, "h3", 28);
    \u0275\u0275text(38, " Ak\u015Fam i\xE7in bar \xF6nerisi ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(39, "p", 29);
    \u0275\u0275text(40, " Manzaral\u0131 kokteyl mekanlar\u0131 ");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275property("img", ctx_r2.SparklesIcon)("size", 28);
  }
}
function AiGuideComponent_For_7_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 30);
    \u0275\u0275element(1, "lucide-icon", 34);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("img", ctx_r2.BotIcon)("size", 14);
  }
}
function AiGuideComponent_For_7_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 33)(1, "div", 35);
    \u0275\u0275element(2, "img", 36);
    \u0275\u0275elementStart(3, "div", 37);
    \u0275\u0275element(4, "lucide-icon", 13);
    \u0275\u0275text(5, " 120 m uzakl\u0131kta ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 38);
    \u0275\u0275text(7, " 4.6 \u2605 ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 39)(9, "div", 40)(10, "h4", 41);
    \u0275\u0275text(11, "Roscioli Salumeria con Cucina");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "span", 42);
    \u0275\u0275text(13, "\u0130talyan \xB7 \u20AC\u20AC");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "p", 43);
    \u0275\u0275text(15, " Geleneksel Roma makarnalar\u0131, \u015Fark\xFCteri \xE7e\u015Fitleri ve taze peynir se\xE7kisiyle d\xFCnyaca \xFCnl\xFC \u015F\u0131k restoran. ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "div", 44)(17, "a", 45)(18, "span");
    \u0275\u0275text(19, "Detaylar\u0131 G\xF6r");
    \u0275\u0275elementEnd();
    \u0275\u0275element(20, "lucide-icon", 13);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275property("img", ctx_r2.MapPinIcon)("size", 10);
    \u0275\u0275advance(16);
    \u0275\u0275property("img", ctx_r2.ChevronRightIcon)("size", 14);
  }
}
function AiGuideComponent_For_7_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 33)(1, "div", 46);
    \u0275\u0275element(2, "img", 47)(3, "div", 48);
    \u0275\u0275elementStart(4, "div", 49)(5, "span", 50);
    \u0275\u0275text(6, " 2 Saatlik Y\xFCr\xFCy\xFC\u015F ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "h4", 51);
    \u0275\u0275text(8, "Roma Tarihi Meydanlar Rotalar\u0131");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(9, "div", 52)(10, "div", 53)(11, "div", 54)(12, "span", 55);
    \u0275\u0275text(13, "1");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "span", 56);
    \u0275\u0275text(15, "Piazza Navona");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "span", 57);
    \u0275\u0275text(17, "\xB7 09:00");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "div", 54)(19, "span", 55);
    \u0275\u0275text(20, "2");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "span", 56);
    \u0275\u0275text(22, "Pantheon Tap\u0131na\u011F\u0131");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "span", 57);
    \u0275\u0275text(24, "\xB7 09:45");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(25, "div", 54)(26, "span", 55);
    \u0275\u0275text(27, "3");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "span", 56);
    \u0275\u0275text(29, "Trevi \xC7e\u015Fmesi");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "span", 57);
    \u0275\u0275text(31, "\xB7 10:30");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(32, "div", 58)(33, "span", 57);
    \u0275\u0275text(34, "\u{1F6B6} ~1.8 km y\xFCr\xFCy\xFC\u015F");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "a", 59)(36, "span");
    \u0275\u0275text(37, "Rotay\u0131 Haritada A\xE7");
    \u0275\u0275elementEnd();
    \u0275\u0275element(38, "lucide-icon", 13);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(38);
    \u0275\u0275property("img", ctx_r2.ChevronRightIcon)("size", 12);
  }
}
function AiGuideComponent_For_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6);
    \u0275\u0275template(1, AiGuideComponent_For_7_Conditional_1_Template, 2, 2, "div", 30);
    \u0275\u0275elementStart(2, "div", 31)(3, "div", 32);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275template(5, AiGuideComponent_For_7_Conditional_5_Template, 21, 4, "div", 33)(6, AiGuideComponent_For_7_Conditional_6_Template, 39, 2, "div", 33);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const msg_r4 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction1(6, _c2, msg_r4.role === "user"));
    \u0275\u0275advance();
    \u0275\u0275conditional(1, msg_r4.role === "assistant" ? 1 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction2(8, _c3, msg_r4.role === "user", msg_r4.role === "assistant"));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", msg_r4.content, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(5, msg_r4.role === "assistant" && ctx_r2.shouldShowRestaurantCard(msg_r4.content) ? 5 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(6, msg_r4.role === "assistant" && ctx_r2.shouldShowRouteCard(msg_r4.content) ? 6 : -1);
  }
}
function AiGuideComponent_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 7)(1, "div", 60);
    \u0275\u0275element(2, "lucide-icon", 34);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 61)(4, "div", 62);
    \u0275\u0275element(5, "span", 63)(6, "span", 64)(7, "span", 65);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275property("img", ctx_r2.BotIcon)("size", 14);
  }
}
function AiGuideComponent_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 10)(1, "span", 66);
    \u0275\u0275element(2, "span", 67);
    \u0275\u0275text(3, " Dinleniyor... Konu\u015Fabilirsiniz. ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "button", 68);
    \u0275\u0275listener("click", function AiGuideComponent_Conditional_11_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.toggleSpeechRecognition());
    });
    \u0275\u0275text(5, "Durdur");
    \u0275\u0275elementEnd()();
  }
}
var AiGuideComponent = class _AiGuideComponent {
  constructor() {
    this.chatService = inject(AiChatService);
    this.route = inject(ActivatedRoute);
    this.inputText = "";
    this.tripId = signal(null);
    this.messages = this.chatService.messages;
    this.isLoading = this.chatService.isLoading;
    this.isListening = signal(false);
    this.SendIcon = Send;
    this.SparklesIcon = Sparkles;
    this.BotIcon = Bot;
    this.MicIcon = Mic;
    this.ImageIcon = Image;
    this.MapPinIcon = MapPin;
    this.StarIcon = Star;
    this.ChevronRightIcon = ChevronRight;
    this.recognition = null;
  }
  ngOnInit() {
    const tripId = this.route.snapshot.paramMap.get("id");
    if (tripId) {
      this.tripId.set(tripId);
      this.chatService.loadMessages(tripId);
    }
    this.initSpeechRecognition();
  }
  ngAfterViewChecked() {
    this.scrollToBottom();
  }
  scrollToBottom() {
    try {
      const el = this.scrollContainer?.nativeElement;
      if (el)
        el.scrollTop = el.scrollHeight;
    } catch {
    }
  }
  onEnterKey(event) {
    const ke = event;
    if (!ke.shiftKey) {
      ke.preventDefault();
      this.send();
    }
  }
  sendQuickAction(text) {
    return __async(this, null, function* () {
      this.inputText = text;
      yield this.send();
    });
  }
  send() {
    return __async(this, null, function* () {
      const text = this.inputText.trim();
      if (!text)
        return;
      this.inputText = "";
      yield this.chatService.sendMessage(text, this.tripId() ?? void 0);
    });
  }
  onFileSelected(event) {
    const target = event.target;
    if (target.files && target.files[0]) {
      const file = target.files[0];
      this.inputText += ` [G\xF6rsel Y\xFCklendi: ${file.name}]`;
    }
  }
  initSpeechRecognition() {
    if (typeof window !== "undefined") {
      const windowObj = window;
      const SpeechRecognition = windowObj.SpeechRecognition || windowObj.webkitSpeechRecognition;
      if (SpeechRecognition) {
        this.recognition = new SpeechRecognition();
        this.recognition.continuous = false;
        this.recognition.interimResults = false;
        this.recognition.lang = "tr-TR";
        this.recognition.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          this.inputText += (this.inputText ? " " : "") + transcript;
          this.isListening.set(false);
        };
        this.recognition.onerror = () => {
          this.isListening.set(false);
        };
        this.recognition.onend = () => {
          this.isListening.set(false);
        };
      }
    }
  }
  toggleSpeechRecognition() {
    if (!this.recognition) {
      alert("Taray\u0131c\u0131n\u0131z ses tan\u0131ma \xF6zelli\u011Fini desteklemiyor. L\xFCtfen Chrome veya Edge kullan\u0131n.");
      return;
    }
    if (this.isListening()) {
      this.recognition.stop();
      this.isListening.set(false);
    } else {
      this.recognition.start();
      this.isListening.set(true);
    }
  }
  shouldShowRestaurantCard(content) {
    const c = content.toLowerCase();
    return c.includes("restoran") || c.includes("roscioli") || c.includes("lezzet") || c.includes("yemek");
  }
  shouldShowRouteCard(content) {
    const c = content.toLowerCase();
    return c.includes("rotas") || c.includes("y\xFCr\xFCy\xFC\u015F") || c.includes("gezi") || c.includes("saatlik");
  }
  static {
    this.\u0275fac = function AiGuideComponent_Factory(t) {
      return new (t || _AiGuideComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AiGuideComponent, selectors: [["app-ai-guide"]], viewQuery: function AiGuideComponent_Query(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275viewQuery(_c0, 5);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.scrollContainer = _t.first);
      }
    }, standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 22, vars: 16, consts: [["scrollContainer", ""], [1, "flex", "flex-col", "h-screen", "bg-background"], ["title", "AI Concierge", 3, "showBack"], [1, "flex-1", "overflow-y-auto", "px-4", "py-4", "space-y-4"], [1, "max-w-xl", "mx-auto", "py-8", "space-y-7"], [1, "max-w-xl", "mx-auto", "space-y-4"], [1, "flex", "items-start", "gap-2.5", 3, "ngClass"], [1, "flex", "items-end", "gap-2"], [1, "border-t", "border-black/[0.06]", "bg-[#F9F8F6]/95", "backdrop-blur-md", "px-4", "py-3", "sticky", "bottom-0", "z-20", 2, "padding-bottom", "max(12px, env(safe-area-inset-bottom))"], [1, "max-w-xl", "mx-auto", "space-y-2"], [1, "flex", "items-center", "justify-between", "px-3", "py-1.5", "bg-stone-900", "text-white", "rounded-xl", "text-xs", "font-medium", "animate-pulse"], [1, "w-10", "h-10", "rounded-2xl", "bg-white", "border", "border-black/[0.06]", "text-stone-600", "hover:text-stone-950", "flex", "items-center", "justify-center", "cursor-pointer", "transition-colors", "flex-shrink-0", "mb-0.5", "shadow-subtle"], ["type", "file", "accept", "image/*", 1, "hidden", 3, "change"], ["strokeWidth", "1.5", 3, "img", "size"], ["type", "button", "title", "Sesli Konu\u015F (Web Speech API)", 1, "w-10", "h-10", "rounded-2xl", "border", "transition-all", "flex", "items-center", "justify-center", "flex-shrink-0", "mb-0.5", "shadow-subtle", 3, "click", "ngClass"], [1, "flex-1", "relative"], ["placeholder", "Bir \u015Fey sorun...", "rows", "1", 1, "w-full", "px-4", "py-2.5", "rounded-2xl", "border", "border-black/[0.06]", "text-xs", "sm:text-sm", "focus:outline-none", "focus:ring-1", "focus:ring-obsidian/30", "focus:border-obsidian", "bg-white", "leading-relaxed", "pr-10", "shadow-subtle", 2, "max-height", "120px", 3, "ngModelChange", "keydown.enter", "ngModel"], ["type", "button", "aria-label", "G\xF6nder", 1, "w-10", "h-10", "bg-obsidian", "rounded-2xl", "flex", "items-center", "justify-center", "text-white", "hover:bg-stone-900", "transition-all", "disabled:opacity-30", "shadow-subtle", "flex-shrink-0", "mb-0.5", 3, "click", "disabled"], ["strokeWidth", "1.5", 1, "text-white", 3, "img", "size"], [1, "text-center", "space-y-2"], [1, "w-16", "h-16", "rounded-3xl", "bg-stone-100", "border", "border-black/[0.05]", "flex", "items-center", "justify-center", "mx-auto", "mb-4", "shadow-subtle"], ["strokeWidth", "1.5", 1, "text-gold", "animate-pulse", 3, "img", "size"], [1, "text-2xl", "sm:text-3xl", "font-serif-luxe", "font-normal", "text-stone-950", "tracking-tight"], [1, "text-xs", "sm:text-sm", "text-stone-500", "max-w-sm", "mx-auto", "leading-relaxed"], [1, "grid", "grid-cols-1", "sm:grid-cols-2", "gap-3", "pt-2"], ["type", "button", 1, "flex", "items-start", "gap-3.5", "p-4", "rounded-3xl", "bg-white", "border", "border-black/[0.06]", "hover:border-obsidian", "hover:shadow-luxe", "transition-all", "duration-300", "text-left", "group", 3, "click"], [1, "w-9", "h-9", "rounded-2xl", "bg-stone-100", "text-stone-900", "flex", "items-center", "justify-center", "text-lg", "flex-shrink-0", "group-hover:scale-105", "transition-transform"], [1, "flex-1", "min-w-0"], [1, "font-bold", "text-xs", "text-stone-950", "group-hover:text-gold", "transition-colors"], [1, "text-[11px]", "text-stone-400", "mt-0.5"], [1, "w-7", "h-7", "rounded-full", "bg-stone-100", "border", "border-black/[0.06]", "flex", "items-center", "justify-center", "flex-shrink-0", "mt-1", "shadow-sm"], [1, "space-y-3", "max-w-[85%]", "sm:max-w-[80%]"], [1, "px-4", "py-3", "rounded-2xl", "text-xs", "sm:text-sm", "leading-relaxed", "shadow-subtle", 3, "ngClass"], [1, "bg-white", "rounded-3xl", "border", "border-black/[0.06]", "shadow-luxe", "overflow-hidden", "transition-all"], ["strokeWidth", "1.5", 1, "text-gold", 3, "img", "size"], [1, "relative", "h-36"], ["src", "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600", "alt", "Roscioli Salumeria con Cucina", 1, "w-full", "h-full", "object-cover"], [1, "absolute", "top-3", "left-3", "bg-obsidian/90", "backdrop-blur-md", "text-white", "text-[10px]", "font-bold", "px-2.5", "py-1", "rounded-full", "flex", "items-center", "gap-1"], [1, "absolute", "top-3", "right-3", "bg-gold", "text-stone-950", "text-[10px]", "font-bold", "px-2", "py-0.5", "rounded-md", "shadow-sm"], [1, "p-4", "space-y-2"], [1, "flex", "items-center", "justify-between"], [1, "font-bold", "text-stone-950", "text-sm"], [1, "text-[11px]", "font-medium", "text-stone-400"], [1, "text-xs", "text-stone-500", "leading-relaxed"], [1, "pt-2", "flex", "justify-end"], ["routerLink", "/places/place-roscioli-120", 1, "inline-flex", "items-center", "gap-1", "text-xs", "font-bold", "text-obsidian", "hover:text-gold", "transition-colors"], [1, "relative", "h-32", "bg-stone-100", "overflow-hidden"], ["src", "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600", "alt", "Roma Y\xFCr\xFCy\xFC\u015F Rotalar\u0131", 1, "w-full", "h-full", "object-cover"], [1, "absolute", "inset-0", "bg-gradient-to-t", "from-black/80", "to-transparent"], [1, "absolute", "bottom-3", "left-3", "text-white"], [1, "text-[9px]", "font-bold", "uppercase", "tracking-wider", "bg-gold", "text-stone-950", "px-2", "py-0.5", "rounded-md"], [1, "font-bold", "text-xs", "mt-0.5"], [1, "p-3.5", "space-y-2.5"], [1, "space-y-1.5", "text-xs", "text-stone-800"], [1, "flex", "items-center", "gap-2"], [1, "w-4", "h-4", "rounded-full", "bg-obsidian", "text-white", "text-[9px]", "font-bold", "flex", "items-center", "justify-center"], [1, "font-bold"], [1, "text-[10px]", "text-stone-400"], [1, "pt-2", "border-t", "border-black/[0.04]", "flex", "justify-between", "items-center"], ["routerLink", "/itinerary", 1, "inline-flex", "items-center", "gap-1", "px-3", "py-1.5", "bg-obsidian", "text-white", "text-xs", "font-bold", "rounded-xl", "hover:bg-stone-900", "transition-colors", "shadow-sm"], [1, "w-7", "h-7", "rounded-full", "bg-stone-100", "border", "border-black/[0.06]", "flex", "items-center", "justify-center", "flex-shrink-0"], [1, "bg-white", "border", "border-black/[0.06]", "px-4", "py-3", "rounded-2xl", "rounded-bl-xs", "shadow-subtle"], [1, "flex", "gap-1.5"], [1, "w-1.5", "h-1.5", "bg-stone-400", "rounded-full", "animate-bounce", 2, "animation-delay", "0ms"], [1, "w-1.5", "h-1.5", "bg-stone-600", "rounded-full", "animate-bounce", 2, "animation-delay", "150ms"], [1, "w-1.5", "h-1.5", "bg-obsidian", "rounded-full", "animate-bounce", 2, "animation-delay", "300ms"], [1, "flex", "items-center", "gap-1.5"], [1, "w-2", "h-2", "rounded-full", "bg-gold", "animate-ping"], [1, "font-bold", "underline", "text-[11px]", 3, "click"]], template: function AiGuideComponent_Template(rf, ctx) {
      if (rf & 1) {
        const _r1 = \u0275\u0275getCurrentView();
        \u0275\u0275elementStart(0, "div", 1);
        \u0275\u0275element(1, "app-header", 2);
        \u0275\u0275elementStart(2, "div", 3, 0);
        \u0275\u0275template(4, AiGuideComponent_Conditional_4_Template, 41, 2, "div", 4);
        \u0275\u0275elementStart(5, "div", 5);
        \u0275\u0275repeaterCreate(6, AiGuideComponent_For_7_Template, 7, 11, "div", 6, _forTrack0);
        \u0275\u0275template(8, AiGuideComponent_Conditional_8_Template, 8, 2, "div", 7);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(9, "div", 8)(10, "div", 9);
        \u0275\u0275template(11, AiGuideComponent_Conditional_11_Template, 6, 0, "div", 10);
        \u0275\u0275elementStart(12, "div", 7)(13, "label", 11)(14, "input", 12);
        \u0275\u0275listener("change", function AiGuideComponent_Template_input_change_14_listener($event) {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.onFileSelected($event));
        });
        \u0275\u0275elementEnd();
        \u0275\u0275element(15, "lucide-icon", 13);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(16, "button", 14);
        \u0275\u0275listener("click", function AiGuideComponent_Template_button_click_16_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.toggleSpeechRecognition());
        });
        \u0275\u0275element(17, "lucide-icon", 13);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(18, "div", 15)(19, "textarea", 16);
        \u0275\u0275twoWayListener("ngModelChange", function AiGuideComponent_Template_textarea_ngModelChange_19_listener($event) {
          \u0275\u0275restoreView(_r1);
          \u0275\u0275twoWayBindingSet(ctx.inputText, $event) || (ctx.inputText = $event);
          return \u0275\u0275resetView($event);
        });
        \u0275\u0275listener("keydown.enter", function AiGuideComponent_Template_textarea_keydown_enter_19_listener($event) {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.onEnterKey($event));
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(20, "button", 17);
        \u0275\u0275listener("click", function AiGuideComponent_Template_button_click_20_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.send());
        });
        \u0275\u0275element(21, "lucide-icon", 18);
        \u0275\u0275elementEnd()()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance();
        \u0275\u0275property("showBack", true);
        \u0275\u0275advance(3);
        \u0275\u0275conditional(4, ctx.messages().length === 0 ? 4 : -1);
        \u0275\u0275advance(2);
        \u0275\u0275repeater(ctx.messages());
        \u0275\u0275advance(2);
        \u0275\u0275conditional(8, ctx.isLoading() ? 8 : -1);
        \u0275\u0275advance(3);
        \u0275\u0275conditional(11, ctx.isListening() ? 11 : -1);
        \u0275\u0275advance(4);
        \u0275\u0275property("img", ctx.ImageIcon)("size", 18);
        \u0275\u0275advance();
        \u0275\u0275property("ngClass", \u0275\u0275pureFunction2(13, _c1, ctx.isListening(), !ctx.isListening()));
        \u0275\u0275advance();
        \u0275\u0275property("img", ctx.MicIcon)("size", 18);
        \u0275\u0275advance(2);
        \u0275\u0275twoWayProperty("ngModel", ctx.inputText);
        \u0275\u0275advance();
        \u0275\u0275property("disabled", !ctx.inputText.trim() || ctx.isLoading());
        \u0275\u0275advance();
        \u0275\u0275property("img", ctx.SendIcon)("size", 16);
      }
    }, dependencies: [
      CommonModule,
      NgClass,
      FormsModule,
      DefaultValueAccessor,
      NgControlStatus,
      NgModel,
      RouterLink,
      LucideAngularModule,
      LucideAngularComponent,
      HeaderComponent
    ], encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AiGuideComponent, { className: "AiGuideComponent", filePath: "src\\app\\features\\ai-guide\\ai-guide.component.ts", lineNumber: 346 });
})();
export {
  AiGuideComponent
};
//# sourceMappingURL=chunk-SL3KOHIL.js.map
