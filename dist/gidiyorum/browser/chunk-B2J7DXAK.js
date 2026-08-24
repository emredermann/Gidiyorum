import {
  CheckboxControlValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel,
  NgSelectOption,
  SelectControlValueAccessor,
  ɵNgSelectMultipleOption
} from "./chunk-K3XLSYZ2.js";
import {
  AuthService
} from "./chunk-3ASZHI2J.js";
import {
  UiCardComponent
} from "./chunk-GDWRDWRE.js";
import {
  HeaderComponent
} from "./chunk-3NIENPLU.js";
import {
  Bell,
  Bookmark,
  Camera,
  ChevronRight,
  CircleQuestionMark,
  Globe,
  LogOut,
  LucideAngularComponent,
  LucideAngularModule,
  Mail,
  Pen,
  ShieldCheck,
  Sparkles,
  WifiOff
} from "./chunk-RPAFIYH2.js";
import "./chunk-3WGHE6CE.js";
import {
  CommonModule,
  NgClass,
  RouterLink,
  inject,
  signal,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction2,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-C5IKH3YG.js";
import {
  __async
} from "./chunk-POPFE7MN.js";

// src/app/features/profile/profile.component.ts
var _c0 = (a0, a1) => ({ "bg-obsidian text-white border-obsidian": a0, "bg-stone-50 text-stone-600 border-black/[0.06]": a1 });
function ProfileComponent_For_58_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 55);
    \u0275\u0275listener("click", function ProfileComponent_For_58_Template_button_click_0_listener() {
      const tag_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.toggleTag(tag_r2));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const tag_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction2(2, _c0, ctx_r2.userTags().includes(tag_r2), !ctx_r2.userTags().includes(tag_r2)));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", tag_r2, " ");
  }
}
var ProfileComponent = class _ProfileComponent {
  constructor() {
    this.authService = inject(AuthService);
    this.userName = signal("Emre Y\u0131lmaz");
    this.userEmail = signal("emre@gidiyorum.app");
    this.avatarUrl = signal("https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300");
    this.availableTags = ["Tarih", "Yemek", "Do\u011Fa", "Sanat", "Al\u0131\u015Fveri\u015F", "Gece Hayat\u0131"];
    this.userTags = signal(["Tarih", "Yemek", "Sanat"]);
    this.selectedPace = "Normal \u{1F6B6}";
    this.selectedBudget = "\u20AC\u20AC (Dengeli)";
    this.offlineMode = true;
    this.pushNotifications = true;
    this.CameraIcon = Camera;
    this.Edit2Icon = Pen;
    this.MailIcon = Mail;
    this.SparklesIcon = Sparkles;
    this.WifiOffIcon = WifiOff;
    this.BellIcon = Bell;
    this.GlobeIcon = Globe;
    this.BookmarkIcon = Bookmark;
    this.ShieldCheckIcon = ShieldCheck;
    this.HelpCircleIcon = CircleQuestionMark;
    this.LogOutIcon = LogOut;
    this.ChevronRightIcon = ChevronRight;
  }
  toggleTag(tag) {
    this.userTags.update((tags) => {
      if (tags.includes(tag)) {
        return tags.filter((t) => t !== tag);
      } else {
        return [...tags, tag];
      }
    });
  }
  onAvatarChange(event) {
    const input = event.target;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.avatarUrl.set(e.target.result);
      };
      reader.readAsDataURL(input.files[0]);
    }
  }
  editProfileName() {
    const newName = prompt("Yeni Ad Soyad girin:", this.userName());
    if (newName && newName.trim()) {
      this.userName.set(newName.trim());
    }
  }
  openLangCurrency() {
    alert("Mevcut Se\xE7im: T\xFCrk\xE7e / EUR (\u20AC)");
  }
  openPrivacy() {
    alert("Gizlilik & RLS politikalar\u0131 aktif. Verileriniz \u015Fifrelenmi\u015Ftir.");
  }
  openHelp() {
    alert("Yard\u0131m merkezi ve AI canl\u0131 destek aktif.");
  }
  onSignOut() {
    return __async(this, null, function* () {
      if (confirm("Oturumunuz kapat\u0131lacakt\u0131r. Onayl\u0131yor musunuz?")) {
        yield this.authService.signOut();
      }
    });
  }
  static {
    this.\u0275fac = function ProfileComponent_Factory(t) {
      return new (t || _ProfileComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ProfileComponent, selectors: [["app-profile"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 155, vars: 38, consts: [[1, "min-h-screen", "bg-background", "pb-24"], ["title", "Profilim", 3, "showNotifications"], [1, "max-w-2xl", "mx-auto", "px-4", "py-8", "space-y-6"], [1, "bg-white", "rounded-3xl", "p-6", "border", "border-black/[0.06]", "shadow-luxe", "relative"], [1, "flex", "flex-col", "sm:flex-row", "items-center", "gap-5", "text-center", "sm:text-left"], [1, "relative"], [1, "w-20", "h-20", "sm:w-24", "sm:h-24", "rounded-full", "overflow-hidden", "border-2", "border-black/[0.08]", "shadow-subtle", "bg-stone-100", "flex", "items-center", "justify-center"], ["alt", "Profil Foto\u011Fraf\u0131", 1, "w-full", "h-full", "object-cover", 3, "src"], [1, "absolute", "bottom-0", "right-0", "w-8", "h-8", "rounded-full", "bg-obsidian", "text-white", "flex", "items-center", "justify-center", "shadow-md", "cursor-pointer", "hover:bg-stone-900", "transition-all"], ["type", "file", "accept", "image/*", 1, "hidden", 3, "change"], ["strokeWidth", "1.5", 3, "img", "size"], [1, "flex-1", "min-w-0"], [1, "flex", "items-center", "justify-center", "sm:justify-start", "gap-2"], [1, "text-xl", "font-serif-luxe", "font-normal", "text-stone-950", "tracking-tight"], ["type", "button", "title", "Profili D\xFCzenle", 1, "w-7", "h-7", "rounded-xl", "bg-stone-100", "hover:bg-stone-200", "text-stone-600", "flex", "items-center", "justify-center", "transition-colors", 3, "click"], [1, "text-xs", "text-stone-400", "mt-0.5", "flex", "items-center", "justify-center", "sm:justify-start", "gap-1"], [1, "mt-2.5", "inline-flex", "items-center", "gap-1.5", "px-3", "py-1", "bg-gold", "text-stone-950", "rounded-full", "text-[10px]", "font-bold", "uppercase", "tracking-wider", "shadow-sm"], [1, "grid", "grid-cols-3", "gap-3", "mt-6", "pt-5", "border-t", "border-black/[0.05]"], [1, "bg-stone-50", "p-3", "rounded-2xl", "text-center", "border", "border-black/[0.03]"], [1, "text-base", "mb-0.5", "block"], [1, "text-base", "font-extrabold", "text-stone-950", "block"], [1, "text-[10px]", "text-stone-400", "font-medium", "uppercase", "tracking-wider"], [1, "space-y-4"], [1, "flex", "items-center", "justify-between", "border-b", "border-black/[0.05]", "pb-3.5"], [1, "font-bold", "text-stone-950", "text-xs", "tracking-wider", "uppercase"], [1, "text-xs", "text-stone-900", "font-bold"], [1, "text-[11px]", "font-semibold", "text-stone-400", "uppercase", "tracking-wider", "mb-2", "block"], [1, "flex", "flex-wrap", "gap-2"], ["type", "button", 1, "px-3", "py-1.5", "rounded-full", "border", "text-xs", "font-bold", "transition-all", 3, "ngClass"], [1, "grid", "grid-cols-2", "gap-3", "pt-2"], [1, "text-[11px]", "font-semibold", "text-stone-400", "uppercase", "tracking-wider", "mb-1.5", "block"], [1, "w-full", "px-3", "py-2", "rounded-2xl", "border", "border-black/[0.06]", "text-xs", "font-bold", "bg-white", "text-stone-900", "focus:outline-none", "focus:ring-1", "focus:ring-obsidian/30", "shadow-subtle", 3, "ngModelChange", "ngModel"], ["value", "Yava\u015F \u{1F422}"], ["value", "Normal \u{1F6B6}"], ["value", "H\u0131zl\u0131 \u26A1"], ["value", "\u20AC (Ekonomik)"], ["value", "\u20AC\u20AC (Dengeli)"], ["value", "\u20AC\u20AC\u20AC (L\xFCks)"], [1, "bg-white", "rounded-3xl", "border", "border-black/[0.06]", "shadow-subtle", "overflow-hidden", "divide-y", "divide-black/[0.04]"], [1, "flex", "items-center", "justify-between", "p-4", "hover:bg-stone-50", "transition-colors"], [1, "flex", "items-center", "gap-3.5"], [1, "w-9", "h-9", "rounded-2xl", "bg-stone-100", "text-stone-900", "flex", "items-center", "justify-center", "flex-shrink-0"], [1, "text-xs", "font-bold", "text-stone-950", "block"], [1, "text-[11px]", "text-stone-400"], [1, "relative", "inline-flex", "items-center", "cursor-pointer"], ["type", "checkbox", 1, "sr-only", "peer", 3, "ngModelChange", "ngModel"], [1, "w-11", "h-6", "bg-stone-200", "peer-focus:outline-none", "rounded-full", "peer", "peer-checked:after:translate-x-full", "peer-checked:after:border-white", "after:content-['']", "after:absolute", "after:top-[2px]", "after:left-[2px]", "after:bg-white", "after:border-stone-300", "after:border", "after:rounded-full", "after:h-5", "after:w-5", "after:transition-all", "peer-checked:bg-obsidian"], ["type", "button", 1, "w-full", "flex", "items-center", "justify-between", "p-4", "hover:bg-stone-50", "transition-colors", "text-left", 3, "click"], ["strokeWidth", "1.5", 1, "text-stone-300", 3, "img", "size"], ["routerLink", "/places/place-roscioli-120", 1, "flex", "items-center", "justify-between", "p-4", "hover:bg-stone-50", "transition-colors"], [1, "space-y-4", "pt-2"], ["type", "button", 1, "w-full", "py-3.5", "px-4", "rounded-2xl", "bg-stone-100", "text-red-600", "font-bold", "text-xs", "hover:bg-red-50", "transition-all", "border", "border-black/[0.05]", "flex", "items-center", "justify-center", "gap-2", 3, "click"], [1, "text-center", "space-y-0.5"], [1, "text-[10px]", "font-bold", "text-stone-400", "tracking-wider", "uppercase", "font-serif-luxe"], [1, "text-[10px]", "text-stone-400"], ["type", "button", 1, "px-3", "py-1.5", "rounded-full", "border", "text-xs", "font-bold", "transition-all", 3, "click", "ngClass"]], template: function ProfileComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0);
        \u0275\u0275element(1, "app-header", 1);
        \u0275\u0275elementStart(2, "div", 2)(3, "div", 3)(4, "div", 4)(5, "div", 5)(6, "div", 6);
        \u0275\u0275element(7, "img", 7);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(8, "label", 8)(9, "input", 9);
        \u0275\u0275listener("change", function ProfileComponent_Template_input_change_9_listener($event) {
          return ctx.onAvatarChange($event);
        });
        \u0275\u0275elementEnd();
        \u0275\u0275element(10, "lucide-icon", 10);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(11, "div", 11)(12, "div", 12)(13, "h2", 13);
        \u0275\u0275text(14);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(15, "button", 14);
        \u0275\u0275listener("click", function ProfileComponent_Template_button_click_15_listener() {
          return ctx.editProfileName();
        });
        \u0275\u0275element(16, "lucide-icon", 10);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(17, "p", 15);
        \u0275\u0275element(18, "lucide-icon", 10);
        \u0275\u0275text(19);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(20, "div", 16);
        \u0275\u0275element(21, "lucide-icon", 10);
        \u0275\u0275elementStart(22, "span");
        \u0275\u0275text(23, "Concierge Elite \xDCye");
        \u0275\u0275elementEnd()()()();
        \u0275\u0275elementStart(24, "div", 17)(25, "div", 18)(26, "span", 19);
        \u0275\u0275text(27, "\u2708\uFE0F");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(28, "span", 20);
        \u0275\u0275text(29, "12");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(30, "span", 21);
        \u0275\u0275text(31, "Seyahat");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(32, "div", 18)(33, "span", 19);
        \u0275\u0275text(34, "\u{1F4CD}");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(35, "span", 20);
        \u0275\u0275text(36, "34");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(37, "span", 21);
        \u0275\u0275text(38, "Mekan");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(39, "div", 18)(40, "span", 19);
        \u0275\u0275text(41, "\u{1F30D}");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(42, "span", 20);
        \u0275\u0275text(43, "8");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(44, "span", 21);
        \u0275\u0275text(45, "\u015Eehir");
        \u0275\u0275elementEnd()()()();
        \u0275\u0275elementStart(46, "app-ui-card")(47, "div", 22)(48, "div", 23)(49, "h3", 24);
        \u0275\u0275text(50, "Varsay\u0131lan Seyahat Tercihlerim");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(51, "span", 25);
        \u0275\u0275text(52, "G\xFCncelle");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(53, "div")(54, "label", 26);
        \u0275\u0275text(55, "Favori \u0130lgi Alanlar\u0131");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(56, "div", 27);
        \u0275\u0275repeaterCreate(57, ProfileComponent_For_58_Template, 2, 5, "button", 28, \u0275\u0275repeaterTrackByIdentity);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(59, "div", 29)(60, "div")(61, "label", 30);
        \u0275\u0275text(62, "Y\xFCr\xFCme H\u0131z\u0131");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(63, "select", 31);
        \u0275\u0275twoWayListener("ngModelChange", function ProfileComponent_Template_select_ngModelChange_63_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.selectedPace, $event) || (ctx.selectedPace = $event);
          return $event;
        });
        \u0275\u0275elementStart(64, "option", 32);
        \u0275\u0275text(65, "Yava\u015F \u{1F422}");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(66, "option", 33);
        \u0275\u0275text(67, "Normal \u{1F6B6}");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(68, "option", 34);
        \u0275\u0275text(69, "H\u0131zl\u0131 \u26A1");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(70, "div")(71, "label", 30);
        \u0275\u0275text(72, "Varsay\u0131lan B\xFCt\xE7e");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(73, "select", 31);
        \u0275\u0275twoWayListener("ngModelChange", function ProfileComponent_Template_select_ngModelChange_73_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.selectedBudget, $event) || (ctx.selectedBudget = $event);
          return $event;
        });
        \u0275\u0275elementStart(74, "option", 35);
        \u0275\u0275text(75, "\u20AC (Ekonomik)");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(76, "option", 36);
        \u0275\u0275text(77, "\u20AC\u20AC (Dengeli)");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(78, "option", 37);
        \u0275\u0275text(79, "\u20AC\u20AC\u20AC (L\xFCks)");
        \u0275\u0275elementEnd()()()()()();
        \u0275\u0275elementStart(80, "div", 38)(81, "div", 39)(82, "div", 40)(83, "div", 41);
        \u0275\u0275element(84, "lucide-icon", 10);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(85, "div")(86, "span", 42);
        \u0275\u0275text(87, "\xC7evrimd\u0131\u015F\u0131 Haritalar & Veriler");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(88, "span", 43);
        \u0275\u0275text(89, "\u0130nternet olmadan rotalar\u0131 g\xF6r\xFCnt\xFCleyin");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(90, "label", 44)(91, "input", 45);
        \u0275\u0275twoWayListener("ngModelChange", function ProfileComponent_Template_input_ngModelChange_91_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.offlineMode, $event) || (ctx.offlineMode = $event);
          return $event;
        });
        \u0275\u0275elementEnd();
        \u0275\u0275element(92, "div", 46);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(93, "div", 39)(94, "div", 40)(95, "div", 41);
        \u0275\u0275element(96, "lucide-icon", 10);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(97, "div")(98, "span", 42);
        \u0275\u0275text(99, "Bildirim Tercihleri");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(100, "span", 43);
        \u0275\u0275text(101, "Concierge rota hat\u0131rlatmalar\u0131");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(102, "label", 44)(103, "input", 45);
        \u0275\u0275twoWayListener("ngModelChange", function ProfileComponent_Template_input_ngModelChange_103_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.pushNotifications, $event) || (ctx.pushNotifications = $event);
          return $event;
        });
        \u0275\u0275elementEnd();
        \u0275\u0275element(104, "div", 46);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(105, "button", 47);
        \u0275\u0275listener("click", function ProfileComponent_Template_button_click_105_listener() {
          return ctx.openLangCurrency();
        });
        \u0275\u0275elementStart(106, "div", 40)(107, "div", 41);
        \u0275\u0275element(108, "lucide-icon", 10);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(109, "div")(110, "span", 42);
        \u0275\u0275text(111, "Dil ve Para Birimi");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(112, "span", 43);
        \u0275\u0275text(113, "T\xFCrk\xE7e / EUR (\u20AC)");
        \u0275\u0275elementEnd()()();
        \u0275\u0275element(114, "lucide-icon", 48);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(115, "a", 49)(116, "div", 40)(117, "div", 41);
        \u0275\u0275element(118, "lucide-icon", 10);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(119, "div")(120, "span", 42);
        \u0275\u0275text(121, "Kay\u0131tl\u0131 Mekanlar\u0131m & Favoriler");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(122, "span", 43);
        \u0275\u0275text(123, "18 se\xE7kin mekan kaydedildi");
        \u0275\u0275elementEnd()()();
        \u0275\u0275element(124, "lucide-icon", 48);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(125, "button", 47);
        \u0275\u0275listener("click", function ProfileComponent_Template_button_click_125_listener() {
          return ctx.openPrivacy();
        });
        \u0275\u0275elementStart(126, "div", 40)(127, "div", 41);
        \u0275\u0275element(128, "lucide-icon", 10);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(129, "div")(130, "span", 42);
        \u0275\u0275text(131, "Gizlilik & G\xFCvenlik");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(132, "span", 43);
        \u0275\u0275text(133, "Hesap g\xFCvenli\u011Fi ve veri izinleri");
        \u0275\u0275elementEnd()()();
        \u0275\u0275element(134, "lucide-icon", 48);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(135, "button", 47);
        \u0275\u0275listener("click", function ProfileComponent_Template_button_click_135_listener() {
          return ctx.openHelp();
        });
        \u0275\u0275elementStart(136, "div", 40)(137, "div", 41);
        \u0275\u0275element(138, "lucide-icon", 10);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(139, "div")(140, "span", 42);
        \u0275\u0275text(141, "Yard\u0131m & Destek");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(142, "span", 43);
        \u0275\u0275text(143, "SSS ve Concierge canl\u0131 destek");
        \u0275\u0275elementEnd()()();
        \u0275\u0275element(144, "lucide-icon", 48);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(145, "div", 50)(146, "button", 51);
        \u0275\u0275listener("click", function ProfileComponent_Template_button_click_146_listener() {
          return ctx.onSignOut();
        });
        \u0275\u0275element(147, "lucide-icon", 10);
        \u0275\u0275elementStart(148, "span");
        \u0275\u0275text(149, "\xC7\u0131k\u0131\u015F Yap");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(150, "div", 52)(151, "p", 53);
        \u0275\u0275text(152, "Gidiyorum Concierge");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(153, "p", 54);
        \u0275\u0275text(154, "S\xFCr\xFCm v1.0.0 \xB7 Monocle Edition 2026");
        \u0275\u0275elementEnd()()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance();
        \u0275\u0275property("showNotifications", true);
        \u0275\u0275advance(6);
        \u0275\u0275property("src", ctx.avatarUrl(), \u0275\u0275sanitizeUrl);
        \u0275\u0275advance(3);
        \u0275\u0275property("img", ctx.CameraIcon)("size", 14);
        \u0275\u0275advance(4);
        \u0275\u0275textInterpolate(ctx.userName());
        \u0275\u0275advance(2);
        \u0275\u0275property("img", ctx.Edit2Icon)("size", 13);
        \u0275\u0275advance(2);
        \u0275\u0275property("img", ctx.MailIcon)("size", 12);
        \u0275\u0275advance();
        \u0275\u0275textInterpolate1(" ", ctx.userEmail(), " ");
        \u0275\u0275advance(2);
        \u0275\u0275property("img", ctx.SparklesIcon)("size", 11);
        \u0275\u0275advance(36);
        \u0275\u0275repeater(ctx.availableTags);
        \u0275\u0275advance(6);
        \u0275\u0275twoWayProperty("ngModel", ctx.selectedPace);
        \u0275\u0275advance(10);
        \u0275\u0275twoWayProperty("ngModel", ctx.selectedBudget);
        \u0275\u0275advance(11);
        \u0275\u0275property("img", ctx.WifiOffIcon)("size", 16);
        \u0275\u0275advance(7);
        \u0275\u0275twoWayProperty("ngModel", ctx.offlineMode);
        \u0275\u0275advance(5);
        \u0275\u0275property("img", ctx.BellIcon)("size", 16);
        \u0275\u0275advance(7);
        \u0275\u0275twoWayProperty("ngModel", ctx.pushNotifications);
        \u0275\u0275advance(5);
        \u0275\u0275property("img", ctx.GlobeIcon)("size", 16);
        \u0275\u0275advance(6);
        \u0275\u0275property("img", ctx.ChevronRightIcon)("size", 16);
        \u0275\u0275advance(4);
        \u0275\u0275property("img", ctx.BookmarkIcon)("size", 16);
        \u0275\u0275advance(6);
        \u0275\u0275property("img", ctx.ChevronRightIcon)("size", 16);
        \u0275\u0275advance(4);
        \u0275\u0275property("img", ctx.ShieldCheckIcon)("size", 16);
        \u0275\u0275advance(6);
        \u0275\u0275property("img", ctx.ChevronRightIcon)("size", 16);
        \u0275\u0275advance(4);
        \u0275\u0275property("img", ctx.HelpCircleIcon)("size", 16);
        \u0275\u0275advance(6);
        \u0275\u0275property("img", ctx.ChevronRightIcon)("size", 16);
        \u0275\u0275advance(3);
        \u0275\u0275property("img", ctx.LogOutIcon)("size", 16);
      }
    }, dependencies: [
      CommonModule,
      NgClass,
      FormsModule,
      NgSelectOption,
      \u0275NgSelectMultipleOption,
      CheckboxControlValueAccessor,
      SelectControlValueAccessor,
      NgControlStatus,
      NgModel,
      RouterLink,
      LucideAngularModule,
      LucideAngularComponent,
      HeaderComponent,
      UiCardComponent
    ], encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ProfileComponent, { className: "ProfileComponent", filePath: "src\\app\\features\\profile\\profile.component.ts", lineNumber: 300 });
})();
export {
  ProfileComponent
};
//# sourceMappingURL=chunk-B2J7DXAK.js.map
