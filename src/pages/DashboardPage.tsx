import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  User as UserIcon,
  Mail,
  ShieldCheck,
  Building,
  FileText,
  Clock,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  LogOut,
  Sparkles,
  Lock,
  Copy,
  Check,
  RefreshCw,
  Database,
  AlertCircle,
  Eye,
  Settings,
  Layers,
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const {
    currentUser,
    language,
    navigateTo,
    logout,
    updateProfile,
    refreshProfile,
    supabaseStatus,
    testSupabaseConnection,
    t,
  } = useAuth();

  // Active dashboard tab: 'overview' | 'profile' | 'database'
  const [activeTab, setActiveTab] = useState<'overview' | 'profile' | 'database'>('profile');

  // Form states for profile editing
  const [displayName, setDisplayName] = useState(currentUser?.name || '');
  const [role, setRole] = useState(currentUser?.role || '');
  const [company, setCompany] = useState(currentUser?.company || '');
  const [bio, setBio] = useState(currentUser?.bio || '');

  // UI status states
  const [isSaving, setIsSaving] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [copiedUid, setCopiedUid] = useState(false);

  // Sync form inputs when currentUser changes
  useEffect(() => {
    if (currentUser) {
      setDisplayName(currentUser.name || '');
      setRole(currentUser.role || '');
      setCompany(currentUser.company || '');
      setBio(currentUser.bio || '');
    }
  }, [currentUser]);

  if (!currentUser) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 rounded-full bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 mb-4">
          <Lock className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 mb-2">
          {language === 'ar' ? 'يتطلب هذا القسم تسجيل الدخول' : 'Authentication Required'}
        </h2>
        <p className="text-xs text-slate-500 max-w-sm mb-6">
          {language === 'ar'
            ? 'يرجى تسجيل الدخول إلى حسابك أو إنشاء حساب جديد للوصول إلى لوحة التحكم والملف الشخصي.'
            : 'Please log in or register a new account to view your user dashboard and profile.'}
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => navigateTo('login')}
            className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg text-xs font-semibold hover:bg-indigo-700 transition-colors"
          >
            {t('navSignIn')}
          </button>
          <button
            onClick={() => navigateTo('home')}
            className="px-4 py-2.5 bg-slate-100 text-slate-700 rounded-lg text-xs font-semibold hover:bg-slate-200 transition-colors"
          >
            {t('backToHome')}
          </button>
        </div>
      </div>
    );
  }

  const handleCopyUid = () => {
    if (!currentUser?.id) return;
    navigator.clipboard.writeText(currentUser.id);
    setCopiedUid(true);
    setTimeout(() => setCopiedUid(false), 2000);
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    setStatusMessage(null);
    try {
      const res = await refreshProfile();
      if (res.success) {
        setStatusMessage({
          type: 'success',
          text: language === 'ar' ? 'تم تحديث البيانات من قاعدة البيانات بنجاح!' : 'Profile refreshed from database successfully!'
        });
      } else {
        setStatusMessage({
          type: 'error',
          text: res.error || (language === 'ar' ? 'تعذر جلب البيانات من السحابة.' : 'Failed to refresh data from cloud.')
        });
      }
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: err.message || 'Error refreshing profile' });
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!displayName.trim()) {
      setStatusMessage({
        type: 'error',
        text: language === 'ar' ? 'يرجى إدخال اسمك الظاهر.' : 'Please enter your display name.'
      });
      return;
    }

    setIsSaving(true);
    setStatusMessage(null);

    try {
      const res = await updateProfile({
        name: displayName.trim(),
        role: role.trim(),
        company: company.trim(),
        bio: bio.trim(),
      });

      if (res.success) {
        setStatusMessage({
          type: 'success',
          text: supabaseStatus.isConfigured
            ? (language === 'ar' ? 'تم حفظ التعديلات بنجاح في جدول public.profiles على Supabase! ⚡' : 'Updated successfully in Supabase public.profiles table! ⚡')
            : t('savedSuccess')
        });
      } else {
        setStatusMessage({
          type: 'error',
          text: res.error || (language === 'ar' ? 'تعذر حفظ البيانات في Supabase.' : 'Failed to update Supabase profile.')
        });
      }
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: err.message || 'Error updating profile' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleResetForm = () => {
    setDisplayName(currentUser.name || '');
    setRole(currentUser.role || '');
    setCompany(currentUser.company || '');
    setBio(currentUser.bio || '');
    setStatusMessage(null);
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Top Header Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-600 to-sky-500 text-white flex items-center justify-center text-2xl font-bold uppercase shadow-md shadow-indigo-500/20 shrink-0">
              {currentUser.name.charAt(0)}
            </div>
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                  {currentUser.name}
                </h1>
                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>{language === 'ar' ? 'نشط' : 'Active'}</span>
                </span>
                {supabaseStatus.isConnected && (
                  <span className="text-[11px] font-semibold text-sky-700 bg-sky-50 border border-sky-200/80 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Database className="w-3 h-3 text-sky-600" />
                    <span>Supabase DB</span>
                  </span>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span>{currentUser.email}</span>
                </span>
                <span aria-hidden="true">·</span>
                <span className="font-medium text-slate-700">{currentUser.role || 'Member'}</span>
                {currentUser.company && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span className="text-slate-600">{currentUser.company}</span>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => navigateTo('home')}
              className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5"
            >
              {language === 'ar' ? <ArrowRight className="w-3.5 h-3.5" /> : <ArrowLeft className="w-3.5 h-3.5" />}
              <span>{t('backToHome')}</span>
            </button>
            <button
              onClick={logout}
              className="px-3.5 py-2 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200/80 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>{t('navLogout')}</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation Controls */}
        <div className="flex border-b border-slate-200 bg-white px-6 rounded-xl shadow-xs gap-6 text-xs font-bold">
          <button
            onClick={() => setActiveTab('profile')}
            className={`py-3.5 border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'profile'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <UserIcon className="w-4 h-4" />
            <span>{t('tabEditProfile')}</span>
            <span className="text-[10px] bg-indigo-50 text-indigo-700 px-1.5 py-0.2 rounded font-normal">
              profiles
            </span>
          </button>

          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3.5 border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'overview'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>{t('tabDashboardOverview')}</span>
          </button>

          <button
            onClick={() => setActiveTab('database')}
            className={`py-3.5 border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'database'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>{t('tabSecurityDb')}</span>
          </button>
        </div>

        {/* Status Toast / Notification */}
        {statusMessage && (
          <div
            className={`p-3.5 rounded-xl border text-xs flex items-center justify-between animate-in fade-in duration-200 ${
              statusMessage.type === 'success'
                ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                : 'bg-rose-50 border-rose-200 text-rose-900'
            }`}
          >
            <div className="flex items-center gap-2">
              {statusMessage.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              )}
              <span className="font-medium">{statusMessage.text}</span>
            </div>
            <button
              onClick={() => setStatusMessage(null)}
              className="text-xs font-semibold text-slate-500 hover:text-slate-700"
            >
              ✕
            </button>
          </div>
        )}

        {/* 1. DEDICATED USER PROFILE VIEW */}
        {activeTab === 'profile' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in duration-150">
            
            {/* Main Form: Update Display Name and Profile Info */}
            <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-6">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <div>
                  <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <UserIcon className="w-4 h-4 text-indigo-600" />
                    <span>{t('profileViewTitle')}</span>
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {t('profileViewDesc')}
                  </p>
                </div>

                {/* Refresh Profile from Cloud Database Button */}
                <button
                  type="button"
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors shrink-0"
                  title="Reload current profile record from database"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
                  <span>{t('refreshFromDb')}</span>
                </button>
              </div>

              {/* Sync Status Banner */}
              <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Database className={`w-4 h-4 ${supabaseStatus.isConnected ? 'text-emerald-600' : 'text-slate-400'}`} />
                  <span className="font-medium text-slate-700">
                    {supabaseStatus.isConfigured
                      ? t('supabaseSyncBadge')
                      : t('localSyncBadge')}
                  </span>
                </div>
                <span className="text-[11px] font-mono text-slate-500">
                  table: public.profiles
                </span>
              </div>

              {/* Profile Edit Form */}
              <form onSubmit={handleProfileSubmit} className="space-y-4">
                
                {/* Display Name (maps to profiles.full_name) */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    {t('displayNameLabel')} <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 start-0 ps-3 flex items-center pointer-events-none text-slate-400">
                      <UserIcon className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      required
                      placeholder="e.g. John Doe / محمد أحمد"
                      className="w-full ps-9 pe-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-colors"
                    />
                  </div>
                  <span className="text-[11px] text-slate-400 mt-1 block">
                    {language === 'ar' ? 'هذا الاسم يظهر للجميع وفي الترويسة ويسجل كـ full_name في Supabase' : 'This name appears across the app and is stored as full_name in Supabase'}
                  </span>
                </div>

                {/* Email (Readonly Auth Field) & UID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {t('emailLabel')} <span className="text-slate-400 font-normal">({language === 'ar' ? 'حساب المصادقة' : 'Auth Email'})</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 start-0 ps-3 flex items-center pointer-events-none text-slate-400">
                        <Mail className="w-4 h-4" />
                      </div>
                      <input
                        type="email"
                        value={currentUser.email}
                        readOnly
                        disabled
                        className="w-full ps-9 pe-3 py-2 text-xs bg-slate-100 border border-slate-200 rounded-lg text-slate-600 cursor-not-allowed select-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {t('uidLabel')}
                    </label>
                    <div className="flex gap-1.5">
                      <input
                        type="text"
                        value={currentUser.id}
                        readOnly
                        className="flex-1 px-2.5 py-2 text-[11px] font-mono bg-slate-100 border border-slate-200 rounded-lg text-slate-600 select-all truncate"
                      />
                      <button
                        type="button"
                        onClick={handleCopyUid}
                        className="px-2.5 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg text-xs font-medium transition-colors flex items-center gap-1"
                        title={t('copyUid')}
                      >
                        {copiedUid ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        <span className="hidden sm:inline">{copiedUid ? t('copiedUid') : t('copyUid')}</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Role & Company */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {t('titleRoleLabel')}
                    </label>
                    <input
                      type="text"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      placeholder={language === 'ar' ? 'مهندس برمجيات / مدير منتج' : 'Software Engineer / Product Lead'}
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {t('companyLabel')}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 start-0 ps-3 flex items-center pointer-events-none text-slate-400">
                        <Building className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder={language === 'ar' ? 'اسم المؤسسة أو الشركة' : 'Company or Startup Name'}
                        className="w-full ps-9 pe-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* Bio (maps to profiles.bio) */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-xs font-semibold text-slate-700">
                      {t('bioLabel')}
                    </label>
                    <span className="text-[11px] text-slate-400 font-mono">
                      {bio.length}/300
                    </span>
                  </div>
                  <textarea
                    rows={3}
                    maxLength={300}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder={language === 'ar' ? 'اكتب نبذة مختصرة عن خبراتك واهتماماتك المهنية...' : 'Write a brief overview about your focus and background...'}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-colors resize-none"
                  />
                </div>

                {/* Form Buttons */}
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-xs font-semibold rounded-lg shadow-sm shadow-indigo-600/30 transition-all flex items-center gap-2"
                  >
                    {isSaving ? (
                      <>
                        <span className="inline-block w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>{language === 'ar' ? 'جاري الحفظ في Supabase...' : 'Saving to Supabase...'}</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>{t('saveChanges')}</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleResetForm}
                    disabled={isSaving}
                    className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors"
                  >
                    {language === 'ar' ? 'إعادة تعيين' : 'Reset'}
                  </button>
                </div>

              </form>
            </div>

            {/* Right Side: Live Profile Card Preview & Supabase Schema Mapping */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Live Profile Card Preview */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4 text-indigo-600" />
                    <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      {t('profilePreview')}
                    </h3>
                  </div>
                  <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-semibold">
                    Live
                  </span>
                </div>

                {/* Mock Card Preview */}
                <div className="p-4 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-xl text-white space-y-3 relative overflow-hidden shadow-md">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-500 to-sky-400 text-white flex items-center justify-center text-lg font-bold uppercase shadow-sm">
                      {displayName ? displayName.charAt(0) : 'U'}
                    </div>
                    <div className="truncate">
                      <p className="text-sm font-bold text-white truncate">
                        {displayName || (language === 'ar' ? 'اسم المستخدم' : 'User Name')}
                      </p>
                      <p className="text-[11px] text-indigo-300 truncate">
                        {role || (language === 'ar' ? 'عضو في المنصة' : 'Platform Member')}
                      </p>
                    </div>
                  </div>

                  {company && (
                    <div className="text-[11px] text-slate-300 flex items-center gap-1.5">
                      <Building className="w-3.5 h-3.5 text-indigo-400" />
                      <span className="truncate">{company}</span>
                    </div>
                  )}

                  {bio && (
                    <p className="text-[11px] text-slate-300 leading-relaxed italic border-t border-slate-800 pt-2 line-clamp-3">
                      "{bio}"
                    </p>
                  )}

                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                    <span>novasphere.profiles</span>
                    <span className="text-emerald-400">verified</span>
                  </div>
                </div>
              </div>

              {/* Supabase Profiles Schema Mapping Card */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                  <Database className="w-4 h-4 text-emerald-600" />
                  <h3 className="text-xs font-bold text-slate-800">
                    {language === 'ar' ? 'حقول جدول Profiles' : 'Profiles Table Schema'}
                  </h3>
                </div>

                <div className="space-y-1.5 text-[11px] font-mono">
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">id</span>
                    <span className="text-slate-800 font-semibold">uuid (PK)</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">full_name</span>
                    <span className="text-indigo-600 font-semibold truncate max-w-[130px]">{displayName || 'text'}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">role</span>
                    <span className="text-indigo-600 font-semibold truncate max-w-[130px]">{role || 'text'}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">company</span>
                    <span className="text-indigo-600 font-semibold truncate max-w-[130px]">{company || 'text'}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">bio</span>
                    <span className="text-indigo-600 font-semibold truncate max-w-[130px]">text</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-500">updated_at</span>
                    <span className="text-slate-800">timestamp</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      const btn = document.querySelector('header button[title*="Supabase"]') as HTMLButtonElement;
                      btn?.click();
                    }}
                    className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Settings className="w-3.5 h-3.5 text-slate-600" />
                    <span>{language === 'ar' ? 'فتح إعدادات Supabase' : 'Open Supabase Setup'}</span>
                  </button>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* 2. OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in duration-150">
            
            {/* Account Information Summary Card */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <UserIcon className="w-4 h-4 text-indigo-600" />
                    <h3 className="text-sm font-bold text-slate-900">{t('accountInfo')}</h3>
                  </div>
                  <button
                    onClick={() => setActiveTab('profile')}
                    className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 underline"
                  >
                    {t('editProfile')}
                  </button>
                </div>

                <div className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                      <span className="text-slate-400 block mb-1">{t('fullNameLabel')}</span>
                      <span className="font-semibold text-slate-800 text-sm">{currentUser.name}</span>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                      <span className="text-slate-400 block mb-1">{t('emailLabel')}</span>
                      <span className="font-semibold text-slate-800 text-sm">{currentUser.email}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                      <span className="text-slate-400 block mb-1">{t('titleRoleLabel')}</span>
                      <span className="font-semibold text-slate-800">
                        {currentUser.role || (language === 'ar' ? 'عضو' : 'Member')}
                      </span>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                      <span className="text-slate-400 block mb-1">{t('companyLabel')}</span>
                      <span className="font-semibold text-slate-800">
                        {currentUser.company || (language === 'ar' ? 'لم يتم التحديد' : 'Not specified')}
                      </span>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                    <span className="text-slate-400 block mb-1">{t('bioLabel')}</span>
                    <p className="text-slate-700 leading-relaxed">
                      {currentUser.bio || (language === 'ar' ? 'لا توجد نبذة مضافة بعد.' : 'No bio added yet.')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Activity Log */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                  <Clock className="w-4 h-4 text-indigo-600" />
                  <h3 className="text-sm font-bold text-slate-900">
                    {language === 'ar' ? 'سجل العمليات الأخير' : 'Recent Activity Logs'}
                  </h3>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div className="p-3 bg-slate-50 rounded-lg flex items-center justify-between border border-slate-100">
                    <div className="flex items-center gap-2.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span className="text-slate-800 font-medium">
                        {language === 'ar' ? 'تسجيل دخول ناجح' : 'Successful session sign-in'}
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-slate-500 tabular-nums">
                      {currentUser.lastLogin || 'Recent'}
                    </span>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-lg flex items-center justify-between border border-slate-100">
                    <div className="flex items-center gap-2.5">
                      <span className="w-2 h-2 rounded-full bg-indigo-500" />
                      <span className="text-slate-800 font-medium">
                        {language === 'ar' ? 'تفعيل الحساب والملف الشخصي' : 'Account created & profile synchronized'}
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-slate-500 tabular-nums">
                      {currentUser.createdAt}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side Stats & Security */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <h3 className="text-sm font-bold text-slate-900">{t('securityStatus')}</h3>
                </div>

                <div className="p-3.5 bg-emerald-50/70 border border-emerald-200/80 rounded-xl space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>{t('securityStatusGood')}</span>
                  </div>
                  <p className="text-[11px] text-emerald-700 leading-relaxed">
                    {language === 'ar'
                      ? 'جلسة متصفحك محمية ومشفرة وفق أعلى معايير أمان الويب الحديثة.'
                      : 'Your session is encrypted in accordance with modern security standards.'}
                  </p>
                </div>

                <div className="space-y-2 text-xs text-slate-600">
                  <div className="flex justify-between py-1.5 border-b border-slate-100">
                    <span>{t('memberSince')}</span>
                    <span className="font-mono font-medium text-slate-900">{currentUser.createdAt}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-100">
                    <span>{t('lastSeen')}</span>
                    <span className="font-mono font-medium text-slate-900">{currentUser.lastLogin}</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span>{t('roleLabel')}</span>
                    <span className="font-semibold text-indigo-700">{currentUser.role || 'Member'}</span>
                  </div>
                </div>
              </div>

              {/* Promo explore */}
              <div className="bg-gradient-to-br from-indigo-900 to-slate-900 rounded-2xl p-5 text-white space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-sky-400">
                  <Sparkles className="w-4 h-4" />
                  <span>{language === 'ar' ? 'تخصيص الملف الشخصي' : 'Customize Profile'}</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {language === 'ar'
                    ? 'يمكنك تحديث اسمك الظاهر والمسمى الوظيفي ونبذتك التعرفية في أي وقت.'
                    : 'You can update your display name, role, and personal summary anytime.'}
                </p>
                <button
                  onClick={() => setActiveTab('profile')}
                  className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-xs font-semibold transition-colors"
                >
                  {t('tabEditProfile')}
                </button>
              </div>
            </div>

          </div>
        )}

        {/* 3. DATABASE & SECURITY TAB */}
        {activeTab === 'database' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in duration-150">
            <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Database className="w-5 h-5 text-emerald-600" />
                  <h3 className="text-base font-bold text-slate-900">
                    {language === 'ar' ? 'حالة قاعدة بيانات Supabase (PostgreSQL)' : 'Supabase PostgreSQL Database'}
                  </h3>
                </div>
                <button
                  onClick={() => testSupabaseConnection()}
                  disabled={supabaseStatus.testing}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${supabaseStatus.testing ? 'animate-spin' : ''}`} />
                  <span>{language === 'ar' ? 'فحص الاتصال' : 'Test Connection'}</span>
                </button>
              </div>

              <div className="space-y-4 text-xs">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-700">
                      {language === 'ar' ? 'حالة الربط المباشر:' : 'Connection Status:'}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full font-bold text-[11px] ${
                      supabaseStatus.isConnected
                        ? 'bg-emerald-100 text-emerald-800'
                        : supabaseStatus.isConfigured
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-slate-200 text-slate-700'
                    }`}>
                      {supabaseStatus.isConnected
                        ? (language === 'ar' ? 'متصل بنجاح ⚡' : 'Connected ⚡')
                        : supabaseStatus.isConfigured
                        ? (language === 'ar' ? 'المفاتيح محددة' : 'Keys Set')
                        : (language === 'ar' ? 'وضع المحاكاة المحلي النشط' : 'Local Storage Mode')}
                    </span>
                  </div>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    {language === 'ar'
                      ? 'يتم تخزين بيانات المستخدمين وتعديلات الاسم الظاهر والملف الشخصي في جدول public.profiles. عند ربط Supabase، تتم المزامنة تلقائياً.'
                      : 'User display names and profile attributes are synced directly to public.profiles table once your Supabase keys are active.'}
                  </p>
                </div>

                <div className="p-4 bg-slate-900 text-slate-200 rounded-xl font-mono text-[11px] space-y-2">
                  <p className="text-indigo-400 font-bold">// Profiles table structure:</p>
                  <p>id (UUID, references auth.users)</p>
                  <p>full_name (TEXT, display name)</p>
                  <p>role (TEXT, title / position)</p>
                  <p>company (TEXT, organization)</p>
                  <p>bio (TEXT, biography)</p>
                  <p>updated_at (TIMESTAMP WITH TIME ZONE)</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                {language === 'ar' ? 'إجراءات سريعة' : 'Quick Actions'}
              </h3>
              <div className="space-y-2">
                <button
                  onClick={() => {
                    const btn = document.querySelector('header button[title*="Supabase"]') as HTMLButtonElement;
                    btn?.click();
                  }}
                  className="w-full py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <Database className="w-4 h-4" />
                  <span>{language === 'ar' ? 'فتح إرشادات و SQL' : 'View SQL Schema & Setup'}</span>
                </button>
                <button
                  onClick={() => setActiveTab('profile')}
                  className="w-full py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <UserIcon className="w-4 h-4 text-indigo-600" />
                  <span>{language === 'ar' ? 'الذهاب لتعديل الملف' : 'Go to Profile View'}</span>
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
