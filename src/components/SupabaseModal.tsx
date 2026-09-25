import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  Database,
  Check,
  Copy,
  ExternalLink,
  X,
  AlertCircle,
  CheckCircle2,
  RefreshCw,
  Code2,
  ShieldCheck,
} from 'lucide-react';

interface SupabaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SupabaseModal: React.FC<SupabaseModalProps> = ({ isOpen, onClose }) => {
  const { language, supabaseStatus, supabaseSql, testSupabaseConnection } = useAuth();
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'instructions' | 'sql'>('instructions');

  if (!isOpen) return null;

  const handleCopySql = () => {
    navigator.clipboard.writeText(supabaseSql);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 flex items-center justify-center">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900">
                  {language === 'ar' ? 'ربط قاعدة بيانات Supabase' : 'Supabase Database Integration'}
                </h3>
                {supabaseStatus.isConfigured ? (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                    {language === 'ar' ? 'مضبوط' : 'Configured'}
                  </span>
                ) : (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300">
                    {language === 'ar' ? 'محاكاة محلية نشطة' : 'Local Mode'}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500">
                {language === 'ar'
                  ? 'إرشادات الربط مع PostgreSQL ومصادقة المستخدمين عبر Supabase'
                  : 'PostgreSQL connection and user authentication via Supabase'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/50 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Status Bar */}
        <div className="p-4 border-b border-slate-100 bg-white">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <div className={`w-2.5 h-2.5 rounded-full ${supabaseStatus.isConnected ? 'bg-emerald-500 animate-ping' : supabaseStatus.isConfigured ? 'bg-amber-500' : 'bg-slate-400'}`} />
              <span className="font-semibold text-slate-700">
                {supabaseStatus.isConnected
                  ? (language === 'ar' ? 'متصل بنجاح بقاعدة بيانات Supabase ⚡' : 'Connected to Supabase Cloud Database ⚡')
                  : supabaseStatus.isConfigured
                  ? (language === 'ar' ? 'المفاتيح محددة، جاري التحقق...' : 'Keys set, verifying connection...')
                  : (language === 'ar' ? 'يعمل حالياً بوضع التخزين المحلي الآمن (جاهز للربط)' : 'Currently using local browser storage (Ready to link)')}
              </span>
            </div>

            <button
              onClick={() => testSupabaseConnection()}
              disabled={supabaseStatus.testing}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors shrink-0"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${supabaseStatus.testing ? 'animate-spin' : ''}`} />
              <span>{language === 'ar' ? 'فحص الاتصال' : 'Test Connection'}</span>
            </button>
          </div>

          {supabaseStatus.error && (
            <div className="mt-2.5 p-2.5 bg-rose-50 border border-rose-200 rounded-lg text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{supabaseStatus.error}</span>
            </div>
          )}
        </div>

        {/* Tab Controls */}
        <div className="flex border-b border-slate-200 px-5 pt-3 gap-4 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('instructions')}
            className={`pb-2.5 border-b-2 transition-colors ${
              activeTab === 'instructions'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            {language === 'ar' ? 'خطوات الربط السريع' : 'Setup Instructions'}
          </button>
          <button
            onClick={() => setActiveTab('sql')}
            className={`pb-2.5 border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'sql'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>{language === 'ar' ? 'مخطط SQL لقاعدة البيانات' : 'SQL Schema'}</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto flex-1 space-y-4 text-xs text-slate-700">
          
          {activeTab === 'instructions' ? (
            <div className="space-y-4">
              <div className="p-3.5 bg-indigo-50/70 border border-indigo-100 rounded-xl space-y-1">
                <p className="font-bold text-indigo-900">
                  {language === 'ar' ? 'تم تجهيز كود Supabase بالكامل في المشروع!' : 'Supabase Client SDK is fully integrated!'}
                </p>
                <p className="text-slate-600 leading-relaxed text-[11px]">
                  {language === 'ar'
                    ? 'الموقع مبرمج حالياً ليعمل بالكامل مع Supabase Auth و جداول الـ Database بمجرد إضافة رابط مشروعك والمفتاح العام.'
                    : 'The app is fully programmed to interface with Supabase Auth & PostgreSQL tables once you specify your project URL and public key.'}
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-[11px] shrink-0">1</span>
                  <div className="space-y-1">
                    <p className="font-bold text-slate-900">
                      {language === 'ar' ? 'أنشئ مشروعاً مجانياً على Supabase' : 'Create a Supabase Project'}
                    </p>
                    <p className="text-slate-600">
                      {language === 'ar'
                        ? 'تفضل بزيارة موقع supabase.com وسجل دخولك ثم أنشئ مشروعاً جديداً (New Project).'
                        : 'Navigate to supabase.com, sign in, and create a new project.'}
                    </p>
                    <a
                      href="https://supabase.com"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-indigo-600 font-semibold hover:underline pt-0.5"
                    >
                      <span>supabase.com</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                <div className="flex gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-[11px] shrink-0">2</span>
                  <div className="space-y-1">
                    <p className="font-bold text-slate-900">
                      {language === 'ar' ? 'انسخ بيانات الـ API إلى ملف .env' : 'Add API Credentials to .env'}
                    </p>
                    <p className="text-slate-600">
                      {language === 'ar'
                        ? 'من إعدادات مشروع Supabase انتقل إلى (Project Settings ➔ API) وانسخ:'
                        : 'In your Supabase Dashboard, head to Project Settings ➔ API and copy:'}
                    </p>
                    <div className="p-2 bg-slate-900 text-slate-200 rounded-lg font-mono text-[11px] space-y-1">
                      <p>VITE_SUPABASE_URL="https://xyzcompany.supabase.co"</p>
                      <p>VITE_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsIn..."</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-[11px] shrink-0">3</span>
                  <div className="space-y-1">
                    <p className="font-bold text-slate-900">
                      {language === 'ar' ? 'تشغيل كود الـ SQL لإنشاء الجداول' : 'Run SQL Schema in Supabase'}
                    </p>
                    <p className="text-slate-600">
                      {language === 'ar'
                        ? 'انتقل إلى تبويب "مخطط SQL" أعلاه، انسخ الكود بنقرة واحدة، ثم الصقه في (SQL Editor) في لوحة تحكم Supabase واضغط على Run.'
                        : 'Switch to the "SQL Schema" tab above, copy the SQL, paste it into the Supabase SQL Editor, and click Run.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500">
                  {language === 'ar' ? 'مخطط جدول public.profiles مع مشغل التسجيل الآلي وسياسات الأمان RLS:' : 'Profiles table schema, RLS policies, and auto-registration trigger:'}
                </span>
                <button
                  onClick={handleCopySql}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? (language === 'ar' ? 'تم النسخ!' : 'Copied!') : (language === 'ar' ? 'نسخ كود الـ SQL' : 'Copy SQL')}</span>
                </button>
              </div>

              <pre className="p-4 bg-slate-950 text-emerald-400 font-mono text-[11px] rounded-xl overflow-x-auto border border-slate-800 leading-relaxed text-left" dir="ltr">
                {supabaseSql}
              </pre>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>{language === 'ar' ? 'حماية تامة بفضل Row Level Security' : 'Protected via Row Level Security (RLS)'}</span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold transition-colors"
          >
            {language === 'ar' ? 'إغلاق' : 'Close'}
          </button>
        </div>

      </div>
    </div>
  );
};
