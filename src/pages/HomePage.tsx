import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  ShieldCheck,
  Zap,
  Globe2,
  Lock,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  Server,
  Layers,
  ChevronDown,
  Terminal,
  Activity,
  Users,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { language, navigateTo, t, currentUser } = useAuth();
  const [activeDemoTab, setActiveDemoTab] = useState<'overview' | 'security' | 'activity'>('overview');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Interactive demo live simulation state
  const [apiRequestsCount, setApiRequestsCount] = useState(14820);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [selectedRegion, setSelectedRegion] = useState('eu-central');

  const ArrowIcon = language === 'ar' ? ArrowLeft : ArrowRight;

  const features = [
    {
      icon: Zap,
      title: t('feat1Title'),
      desc: t('feat1Desc'),
      metric: '< 12ms',
      metricLabel: language === 'ar' ? 'متوسط سرعة الاستجابة' : 'Avg Edge Latency',
    },
    {
      icon: Lock,
      title: t('feat2Title'),
      desc: t('feat2Desc'),
      metric: 'AES-256',
      metricLabel: language === 'ar' ? 'تشفير شامل للبيانات' : 'End-to-End Encryption',
    },
    {
      icon: Layers,
      title: t('feat3Title'),
      desc: t('feat3Desc'),
      metric: '100%',
      metricLabel: language === 'ar' ? 'توافق كامل مع الشاشات' : 'Responsive Viewport',
    },
    {
      icon: Activity,
      title: t('feat4Title'),
      desc: t('feat4Desc'),
      metric: 'Real-time',
      metricLabel: language === 'ar' ? 'مزامنة فورية للنشاط' : 'Instant Event Sync',
    },
    {
      icon: Globe2,
      title: t('feat5Title'),
      desc: t('feat5Desc'),
      metric: 'RTL + LTR',
      metricLabel: language === 'ar' ? 'دعم كامل للغتين' : 'Bilingual Native Support',
    },
    {
      icon: ShieldCheck,
      title: t('feat6Title'),
      desc: t('feat6Desc'),
      metric: '24/7/365',
      metricLabel: language === 'ar' ? 'جاهزية الدعم والمساعدة' : 'SLA Technical Support',
    },
  ];

  const testimonials = [
    {
      name: language === 'ar' ? 'د. مريم المنصوري' : 'Dr. Mariam Al-Mansouri',
      role: language === 'ar' ? 'مديرة التحول الرقمي' : 'Director of Digital Tech',
      company: language === 'ar' ? 'مجموعة التقنية القابضة' : 'Holding Tech Group',
      content: language === 'ar'
        ? 'منصة نوفا سفير غيرت تماماً كيفية إطلاقنا لمواقع الويب التفاعلية. السرعة لا تقارن، والأمان المدمج وفر علينا مئات الساعات من التطوير.'
        : 'NovaSphere transformed how our enterprise builds high-performance web experiences. The latency is imperceptible and security governance is rock-solid.',
      rating: 5,
    },
    {
      name: language === 'ar' ? 'طارق السعيد' : 'Tariq Al-Saeed',
      role: language === 'ar' ? 'كبير مهندسي الواجهات' : 'Lead Frontend Architect',
      company: language === 'ar' ? 'أفق للبرمجيات' : 'Horizon Software',
      content: language === 'ar'
        ? 'بساطة التسجيل وسلاسة التحكم في الحساب تجعل التجربة مريحة لكل زائر. دعم اللغة العربية باحترافية هو ما كنا نبحث عنه بدقة.'
        : 'The authentication flow, bilingual RTL fidelity, and clean modern architecture set a benchmark for contemporary web software.',
      rating: 5,
    },
    {
      name: language === 'ar' ? 'سارة جاسم' : 'Sarah Jassim',
      role: language === 'ar' ? 'مؤسسة مشاريع ناشئة' : 'Fintech Founder',
      company: language === 'ar' ? 'بيان للاستشارات' : 'Bayan Ventures',
      content: language === 'ar'
        ? 'أنشأنا حسابنا في أقل من دقيقة، وبدأنا بالعمل فوراً. التصميم نظيف وعصري ومريح للعين، ويعكس احترافية حقيقية للموقع.'
        : 'We created our corporate account in under a minute and were up and running. The aesthetic restraint and speed inspire total confidence.',
      rating: 5,
    },
  ];

  const faqs = [
    { q: t('faq1Q'), a: t('faq1A') },
    { q: t('faq2Q'), a: t('faq2A') },
    { q: t('faq3Q'), a: t('faq3A') },
    { q: t('faq4Q'), a: t('faq4A') },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-indigo-500 selection:text-white">
      
      {/* 1. Hero Section */}
      <section id="hero" className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden bg-gradient-to-b from-white via-slate-50 to-slate-100/60 border-b border-slate-200/70">
        
        {/* Subtle background ambient mesh */}
        <div className="absolute top-0 inset-x-0 h-96 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(99,102,241,0.12),rgba(255,255,255,0))] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          
          <div className="text-center max-w-3xl mx-auto space-y-6">
            
            {/* Editorial Kicker (Zero-Pill: Clean unboxed text with dot) */}
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-700 tracking-wide">
              <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
              <span>{t('heroBadge')}</span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-500 font-normal">v2.4 Production</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]" style={{ textWrap: 'balance' }}>
              {t('heroTitle')}
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal max-w-2xl mx-auto">
              {t('heroSubtitle')}
            </p>

            {/* Hero CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              {currentUser ? (
                <button
                  onClick={() => navigateTo('dashboard')}
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-semibold text-sm rounded-xl shadow-md shadow-indigo-600/20 transition-all flex items-center gap-2 whitespace-nowrap"
                >
                  <span>{t('navDashboard')}</span>
                  <ArrowIcon className="w-4 h-4" />
                </button>
              ) : (
                <>
                  <button
                    onClick={() => navigateTo('register')}
                    className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-semibold text-sm rounded-xl shadow-md shadow-indigo-600/25 transition-all flex items-center gap-2 whitespace-nowrap"
                  >
                    <span>{t('heroCtaStart')}</span>
                    <ArrowIcon className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => navigateTo('login')}
                    className="px-5 py-3 bg-white hover:bg-slate-100 active:scale-95 text-slate-800 font-semibold text-sm rounded-xl border border-slate-300 shadow-xs transition-all whitespace-nowrap"
                  >
                    <span>{t('heroCtaLogin')}</span>
                  </button>
                </>
              )}

              <button
                onClick={() => {
                  const el = document.getElementById('demo');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-4 py-3 text-slate-600 hover:text-slate-900 font-medium text-sm transition-colors flex items-center gap-1.5 whitespace-nowrap"
              >
                <span>{t('heroCtaExplore')}</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            {/* Social Trust Line */}
            <div className="pt-4 flex items-center justify-center gap-6 text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                {language === 'ar' ? 'تسجيل مجاني فوري' : 'Instant Free Access'}
              </span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                {language === 'ar' ? 'بدون بطاقة دفع' : 'No Credit Card'}
              </span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                {language === 'ar' ? 'أمان بنكي مشفر' : 'Bank-grade Security'}
              </span>
            </div>
          </div>

          {/* Interactive Hero Showcase Viewport */}
          <div className="mt-14 max-w-4xl mx-auto rounded-2xl bg-slate-900 p-2 sm:p-3 shadow-2xl shadow-indigo-950/20 border border-slate-800">
            {/* Top Frame Bar */}
            <div className="flex items-center justify-between px-3 py-2 border-b border-slate-800 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                </div>
                <span className="text-[11px] font-mono text-slate-500 ms-2">novasphere.cloud/portal</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1 text-[11px] text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Operational
                </span>
              </div>
            </div>

            {/* Interior Preview Card */}
            <div className="p-4 sm:p-6 bg-slate-950 rounded-xl space-y-6 text-slate-100">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <h3 className="text-base font-bold text-white">
                    {language === 'ar' ? 'مركز التحكم في الحساب والمشاريع' : 'Platform Control & Identity Engine'}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {language === 'ar' ? 'استعراض مباشر لواجهات إدارة الهوية والوصول والبيانات الحية' : 'Live preview of access logs, data sync, and security telemetry'}
                  </p>
                </div>
                {/* Interactive Mode Tabs */}
                <div className="flex items-center gap-1 p-1 bg-slate-900 rounded-lg shrink-0">
                  <button
                    onClick={() => setActiveDemoTab('overview')}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                      activeDemoTab === 'overview'
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {t('tabOverview')}
                  </button>
                  <button
                    onClick={() => setActiveDemoTab('security')}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                      activeDemoTab === 'security'
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {t('tabSecurity')}
                  </button>
                  <button
                    onClick={() => setActiveDemoTab('activity')}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                      activeDemoTab === 'activity'
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {t('tabActivity')}
                  </button>
                </div>
              </div>

              {/* Dynamic Content depending on Tab */}
              {activeDemoTab === 'overview' && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-3.5 bg-slate-900/90 rounded-lg border border-slate-800">
                      <p className="text-xs text-slate-400">{t('statUptimeLabel')}</p>
                      <p className="text-xl font-bold font-mono tabular-nums text-emerald-400 mt-1">99.992%</p>
                      <span className="text-[10px] text-slate-500">Zero downtime incident</span>
                    </div>
                    <div className="p-3.5 bg-slate-900/90 rounded-lg border border-slate-800">
                      <p className="text-xs text-slate-400">{t('statLatencyLabel')}</p>
                      <p className="text-xl font-bold font-mono tabular-nums text-sky-400 mt-1">11.4 ms</p>
                      <span className="text-[10px] text-slate-500">Global median roundtrip</span>
                    </div>
                    <div className="p-3.5 bg-slate-900/90 rounded-lg border border-slate-800">
                      <p className="text-xs text-slate-400">{t('statUsersLabel')}</p>
                      <p className="text-xl font-bold font-mono tabular-nums text-indigo-400 mt-1">54,230+</p>
                      <span className="text-[10px] text-slate-500">Verified members</span>
                    </div>
                  </div>

                  <div className="p-3.5 bg-slate-900/60 rounded-lg border border-slate-800 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <Terminal className="w-4 h-4 text-indigo-400 shrink-0" />
                      <span className="text-slate-300 font-mono">
                        {language === 'ar' ? 'البيئة النشطة: خوادم سحابية موزعة بنظام CDN' : 'Current Region Gateway: Edge Global CDN'}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-400 font-mono">Status: 200 OK</span>
                  </div>
                </div>
              )}

              {activeDemoTab === 'security' && (
                <div className="space-y-3 animate-in fade-in duration-200">
                  <div className="p-4 bg-slate-900/90 rounded-lg border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h4 className="text-xs font-bold text-white">
                        {language === 'ar' ? 'التحقق بخطوتين (2-Factor Authentication)' : 'Two-Factor Authentication (2FA)'}
                      </h4>
                      <p className="text-[11px] text-slate-400">
                        {language === 'ar' ? 'حماية إضافية لكافة جلسات تسجيل الدخول' : 'Additional biometric / OTP verification layer'}
                      </p>
                    </div>
                    <button
                      onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                        twoFactorEnabled ? 'bg-emerald-600 text-white' : 'bg-slate-700 text-slate-300'
                      }`}
                    >
                      {twoFactorEnabled ? (language === 'ar' ? 'مفعّل ✓' : 'Enabled ✓') : (language === 'ar' ? 'معطّل' : 'Disabled')}
                    </button>
                  </div>

                  <div className="p-4 bg-slate-900/90 rounded-lg border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h4 className="text-xs font-bold text-white">
                        {language === 'ar' ? 'تشفير الجلسات وحماية الهوية' : 'End-to-End Session Encryption'}
                      </h4>
                      <p className="text-[11px] text-slate-400">
                        {language === 'ar' ? 'تطبيق بروتوكولات التشفير TLS 1.3 مع مفاتيح أمان غير قابلة للاختراق' : 'Strict TLS 1.3 protocol and zero-knowledge credentials'}
                      </p>
                    </div>
                    <span className="text-xs font-mono text-emerald-400 font-semibold">Active & Audited</span>
                  </div>
                </div>
              )}

              {activeDemoTab === 'activity' && (
                <div className="space-y-2 animate-in fade-in duration-200 text-xs">
                  <div className="flex items-center justify-between p-2.5 bg-slate-900/70 rounded-md border border-slate-800/80">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      <span className="text-slate-300 font-medium">Session initialized</span>
                    </div>
                    <span className="text-slate-500 font-mono text-[11px]">Just now</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 bg-slate-900/70 rounded-md border border-slate-800/80">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-sky-400" />
                      <span className="text-slate-300 font-medium">Auth token renewed</span>
                    </div>
                    <span className="text-slate-500 font-mono text-[11px]">2 mins ago</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 bg-slate-900/70 rounded-md border border-slate-800/80">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-indigo-400" />
                      <span className="text-slate-300 font-medium">Profile sync completed</span>
                    </div>
                    <span className="text-slate-500 font-mono text-[11px]">14 mins ago</span>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* 2. Key Metrics Bar (Adjacency & Quantitative Rigor) */}
      <section className="py-10 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold text-indigo-600 font-mono tabular-nums">
                {t('statUptime')}
              </p>
              <p className="text-xs sm:text-sm font-medium text-slate-600 mt-1">
                {t('statUptimeLabel')}
              </p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
                {t('statUsers')}
              </p>
              <p className="text-xs sm:text-sm font-medium text-slate-600 mt-1">
                {t('statUsersLabel')}
              </p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
                {t('statLatency')}
              </p>
              <p className="text-xs sm:text-sm font-medium text-slate-600 mt-1">
                {t('statLatencyLabel')}
              </p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold text-emerald-600 font-mono tabular-nums">
                {t('statSecurity')}
              </p>
              <p className="text-xs sm:text-sm font-medium text-slate-600 mt-1">
                {t('statSecurityLabel')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Features & Architecture Section */}
      <section id="features" className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {t('featuresHeading')}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {t('featuresSubheading')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feat, index) => {
              const IconComp = feat.icon;
              return (
                <div
                  key={index}
                  className="p-6 bg-white rounded-xl border border-slate-200 shadow-xs hover:shadow-md hover:border-slate-300 transition-all duration-200 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="w-10 h-10 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                      <IconComp className="w-5 h-5" />
                    </div>

                    <h3 className="text-base font-bold text-slate-900">
                      {feat.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {feat.desc}
                    </p>
                  </div>

                  {/* Clean unboxed metric */}
                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-500">{feat.metricLabel}</span>
                    <span className="font-mono font-bold text-indigo-700 tabular-nums">{feat.metric}</span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 4. Interactive Live Workspace Preview Section */}
      <section id="demo" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 space-y-6">
              <div className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                {language === 'ar' ? 'تجربة تفاعلية مباشرة' : 'Live Interactive Demo'}
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                {t('demoTitle')}
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                {t('demoSubtitle')}
              </p>

              <div className="space-y-3 text-xs text-slate-700">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{language === 'ar' ? 'تسجيل دخول فوري وحماية البيانات بكلمة مرور مشفرة' : 'Instant authentication with encrypted password hash verification'}</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{language === 'ar' ? 'حفظ الحسابات في مساحة تخزين متصفحك بشكل فوري' : 'Persistent client session state and automatic profile hydration'}</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{language === 'ar' ? 'إمكانية تعديل الملف الشخصي ومتابعة سجل الدخول' : 'Real-time account settings modification and last active indicators'}</span>
                </div>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  onClick={() => navigateTo('register')}
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-lg shadow-xs transition-colors flex items-center gap-1.5"
                >
                  <span>{t('heroCtaStart')}</span>
                  <ArrowIcon className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => navigateTo('login')}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs rounded-lg transition-colors"
                >
                  <span>{t('heroCtaLogin')}</span>
                </button>
              </div>
            </div>

            {/* Interactive Live Control Widget */}
            <div className="lg:col-span-7 bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <Server className="w-4 h-4 text-indigo-600" />
                  <span className="text-xs font-bold text-slate-800">
                    {language === 'ar' ? 'محاكي الخوادم وتوزيع الحمل' : 'Live Gateway Dispatcher'}
                  </span>
                </div>
                <span className="text-xs text-slate-500 font-mono">Node: v20.x Edge</span>
              </div>

              <div className="py-6 space-y-6">
                <div>
                  <div className="flex justify-between text-xs font-medium text-slate-700 mb-2">
                    <span>{language === 'ar' ? 'الطلبات المعالجة في الدقيقة' : 'Requests processed per minute'}</span>
                    <span className="font-mono font-bold text-indigo-600 tabular-nums">{apiRequestsCount.toLocaleString()} req/min</span>
                  </div>
                  <input
                    type="range"
                    min="5000"
                    max="50000"
                    step="500"
                    value={apiRequestsCount}
                    onChange={(e) => setApiRequestsCount(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-white rounded-lg border border-slate-200">
                    <span className="text-slate-500 block mb-1">
                      {language === 'ar' ? 'المنطقة الجغرافية' : 'Edge Node Region'}
                    </span>
                    <select
                      value={selectedRegion}
                      onChange={(e) => setSelectedRegion(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-md p-1.5 text-xs text-slate-800 font-medium focus:outline-none focus:border-indigo-500"
                    >
                      <option value="eu-central">EU Central (Frankfurt)</option>
                      <option value="me-central">ME Central (Riyadh / Dubai)</option>
                      <option value="us-east">US East (Virginia)</option>
                      <option value="ap-southeast">AP Southeast (Singapore)</option>
                    </select>
                  </div>

                  <div className="p-3 bg-white rounded-lg border border-slate-200 flex flex-col justify-between">
                    <span className="text-slate-500 block mb-1">
                      {language === 'ar' ? 'زمن المعالجة المتوقع' : 'Projected Latency'}
                    </span>
                    <span className="text-base font-bold font-mono text-emerald-600 tabular-nums">
                      {selectedRegion === 'me-central' ? '8.2 ms' : selectedRegion === 'eu-central' ? '12.4 ms' : '15.9 ms'}
                    </span>
                  </div>
                </div>

                <div className="p-3.5 bg-indigo-50/70 border border-indigo-100 rounded-lg text-xs text-indigo-900 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-indigo-600 shrink-0" />
                    <span>
                      {language === 'ar' ? 'جاهز للتجربة الفعلية؟ يمكنك إنشاء حسابك والبدء الآن!' : 'Ready to test production? Create an account in seconds.'}
                    </span>
                  </div>
                  <button
                    onClick={() => navigateTo('register')}
                    className="font-bold text-indigo-700 hover:text-indigo-900 underline whitespace-nowrap"
                  >
                    {t('navSignUp')}
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. Testimonials & Social Proof */}
      <section id="about" className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {t('testimonialsTitle')}
            </h2>
            <p className="text-sm text-slate-600">
              {t('testimonialsSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((item, idx) => (
              <div
                key={idx}
                className="p-6 bg-white rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Subtle 5-star rating */}
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-xs">★</span>
                    ))}
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                    "{item.content}"
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-xs text-indigo-700 uppercase shrink-0">
                    {item.name.charAt(0)}
                  </div>
                  <div className="text-start truncate">
                    <p className="text-xs font-bold text-slate-900 truncate">{item.name}</p>
                    <p className="text-[11px] text-slate-500 truncate">{item.role} · {item.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. FAQ Section */}
      <section id="faq" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {t('faqTitle')}
            </h2>
            <p className="text-sm text-slate-600">
              {t('faqSubtitle')}
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="border border-slate-200 rounded-xl overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full flex items-center justify-between p-4 sm:p-5 text-start font-semibold text-sm text-slate-900 hover:bg-slate-50 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-500 transition-transform duration-200 shrink-0 ms-2 ${
                        isOpen ? 'rotate-180 text-indigo-600' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-4 sm:pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 7. Call To Action Banner */}
      <section className="py-16 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(99,102,241,0.25),transparent)] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative space-y-6">
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            {t('ctaTitle')}
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto">
            {t('ctaSubtitle')}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => navigateTo('register')}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white font-semibold text-sm rounded-xl shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-2"
            >
              <span>{t('ctaButton')}</span>
              <ArrowIcon className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigateTo('login')}
              className="px-5 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm rounded-xl border border-slate-700 transition-colors"
            >
              <span>{t('navSignIn')}</span>
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
