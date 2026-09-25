import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { User, Language, Page } from '../types';
import { translations } from '../translations';
import { supabase, isSupabaseConfigured, SUPABASE_SQL_SCHEMA } from '../lib/supabase';
import { safeStorage } from '../lib/safeStorage';

interface StoredAccount {
  user: User;
  passwordHash: string;
}

interface SupabaseStatus {
  isConfigured: boolean;
  isConnected: boolean;
  testing: boolean;
  error?: string;
}

interface AuthContextType {
  currentUser: User | null;
  language: Language;
  currentPage: Page;
  supabaseStatus: SupabaseStatus;
  supabaseSql: string;
  supabaseModalOpen: boolean;
  setSupabaseModalOpen: (open: boolean) => void;
  setLanguage: (lang: Language) => void;
  navigateTo: (page: Page, anchor?: string) => void;
  login: (email: string, password: string, remember: boolean) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  socialLogin: (provider: 'google' | 'github') => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<{ success: boolean; error?: string }>;
  refreshProfile: () => Promise<{ success: boolean; error?: string }>;
  testSupabaseConnection: () => Promise<void>;
  t: (key: keyof typeof translations['ar']) => string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const SEED_USERS: StoredAccount[] = [
  {
    user: {
      id: 'usr_demo_1',
      name: 'عبدالرحمن الفهد (Demo User)',
      email: 'demo@novasphere.com',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      role: 'مطور أول / Senior Engineer',
      company: 'نوفا للتقنية والابتكار',
      bio: 'مهندس برمجيات شغوف ببناء منصات الويب الحديثة وقواعد البيانات السحابية.',
      createdAt: '2025-11-12',
      lastLogin: '2026-09-25 09:30'
    },
    passwordHash: 'Password123!'
  }
];

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = safeStorage.getItem('novasphere_lang');
      return (saved === 'en' || saved === 'ar') ? saved : 'ar';
    } catch {
      return 'ar';
    }
  });

  const [currentPage, setCurrentPage] = useState<Page>(() => {
    try {
      if (typeof window !== 'undefined' && window.location.hash) {
        const hash = window.location.hash.replace('#', '') as Page;
        if (['home', 'login', 'register', 'dashboard'].includes(hash)) {
          return hash;
        }
      }
    } catch {
      // ignore
    }
    return 'home';
  });

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const savedUser = safeStorage.getItem('novasphere_session_user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  const [supabaseStatus, setSupabaseStatus] = useState<SupabaseStatus>(() => ({
    isConfigured: isSupabaseConfigured(),
    isConnected: false,
    testing: false,
  }));

  const [supabaseModalOpen, setSupabaseModalOpen] = useState(false);

  // Test Supabase Connection
  const testSupabaseConnection = async () => {
    if (!isSupabaseConfigured() || !supabase) {
      setSupabaseStatus({
        isConfigured: false,
        isConnected: false,
        testing: false,
        error: language === 'ar' ? 'متغيرات Supabase غير محددة بعد في ملف .env' : 'Supabase environment variables not configured yet.'
      });
      return;
    }

    setSupabaseStatus(prev => ({ ...prev, testing: true, error: undefined }));
    try {
      const { error } = await supabase.from('profiles').select('id').limit(1);
      if (error && error.code !== 'PGRST116') {
        setSupabaseStatus({
          isConfigured: true,
          isConnected: false,
          testing: false,
          error: error.message
        });
      } else {
        setSupabaseStatus({
          isConfigured: true,
          isConnected: true,
          testing: false
        });
      }
    } catch (err: any) {
      setSupabaseStatus({
        isConfigured: true,
        isConnected: false,
        testing: false,
        error: err.message || 'Connection failed'
      });
    }
  };

  // Check Supabase session on mount if configured
  useEffect(() => {
    const client = supabase;
    if (isSupabaseConfigured() && client) {
      testSupabaseConnection();

      try {
        const { data: { subscription } } = client.auth.onAuthStateChange(async (event, session) => {
          if (session?.user) {
            const supaUser = session.user;
            try {
              const { data: profile } = await client
                .from('profiles')
                .select('*')
                .eq('id', supaUser.id)
                .single();

              const mappedUser: User = {
                id: supaUser.id,
                name: profile?.full_name || supaUser.user_metadata?.full_name || supaUser.email?.split('@')[0] || 'User',
                email: supaUser.email || '',
                role: profile?.role || 'Member',
                company: profile?.company || '',
                bio: profile?.bio || '',
                createdAt: profile?.created_at?.substring(0, 10) || new Date().toISOString().substring(0, 10),
                lastLogin: new Date().toISOString().replace('T', ' ').substring(0, 16)
              };
              setCurrentUser(mappedUser);
              safeStorage.setItem('novasphere_session_user', JSON.stringify(mappedUser));
            } catch (fetchErr) {
              console.warn('Could not fetch Supabase profile:', fetchErr);
            }
          } else if (event === 'SIGNED_OUT') {
            setCurrentUser(null);
            safeStorage.removeItem('novasphere_session_user');
          }
        });

        return () => {
          subscription.unsubscribe();
        };
      } catch (authErr) {
        console.warn('Supabase auth state listener error:', authErr);
      }
    } else {
      // Ensure local accounts storage is initialized for offline/local simulation
      try {
        const existing = safeStorage.getItem('novasphere_accounts');
        if (!existing) {
          safeStorage.setItem('novasphere_accounts', JSON.stringify(SEED_USERS));
        }
      } catch {
        // ignore
      }
    }
  }, []);

  // Update HTML tag attributes on language change
  useEffect(() => {
    try {
      safeStorage.setItem('novasphere_lang', language);
      if (typeof document !== 'undefined') {
        document.documentElement.lang = language;
        document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
      }
    } catch {
      // ignore
    }
  }, [language]);

  // Sync hash with current page
  useEffect(() => {
    const handleHashChange = () => {
      try {
        const hash = window.location.hash.replace('#', '') as Page;
        if (['home', 'login', 'register', 'dashboard'].includes(hash)) {
          setCurrentPage(hash);
        }
      } catch {
        // ignore
      }
    };
    if (typeof window !== 'undefined') {
      window.addEventListener('hashchange', handleHashChange);
      return () => window.removeEventListener('hashchange', handleHashChange);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const navigateTo = (page: Page, anchor?: string) => {
    setCurrentPage(page);
    try {
      if (typeof window !== 'undefined') {
        window.location.hash = page;
        window.scrollTo({ top: 0, behavior: 'smooth' });

        if (anchor && page === 'home') {
          setTimeout(() => {
            const el = document.getElementById(anchor);
            if (el) {
              el.scrollIntoView({ behavior: 'smooth' });
            }
          }, 100);
        }
      }
    } catch {
      // ignore
    }
  };

  const getStoredAccounts = (): StoredAccount[] => {
    try {
      const raw = safeStorage.getItem('novasphere_accounts');
      return raw ? JSON.parse(raw) : SEED_USERS;
    } catch {
      return SEED_USERS;
    }
  };

  const login = async (email: string, password: string, remember: boolean): Promise<{ success: boolean; error?: string }> => {
    if (isSupabaseConfigured() && supabase) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password
        });

        if (error) {
          return { success: false, error: error.message };
        }

        if (data.user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', data.user.id)
            .single();

          const activeUser: User = {
            id: data.user.id,
            name: profile?.full_name || data.user.user_metadata?.full_name || email.split('@')[0],
            email: data.user.email || email,
            role: profile?.role || 'Member',
            company: profile?.company || '',
            bio: profile?.bio || '',
            createdAt: profile?.created_at?.substring(0, 10) || new Date().toISOString().substring(0, 10),
            lastLogin: new Date().toISOString().replace('T', ' ').substring(0, 16)
          };

          setCurrentUser(activeUser);
          if (remember) {
            safeStorage.setItem('novasphere_session_user', JSON.stringify(activeUser));
          }
          return { success: true };
        }
      } catch (err: any) {
        return { success: false, error: err.message || 'Supabase authentication failed' };
      }
    }

    // Local / Offline fallback
    await new Promise((res) => setTimeout(res, 350));
    const accounts = getStoredAccounts();
    const account = accounts.find(
      (acc) => acc.user.email.toLowerCase().trim() === email.toLowerCase().trim()
    );

    if (!account || account.passwordHash !== password) {
      return {
        success: false,
        error: language === 'ar' ? 'البريد الإلكتروني أو كلمة المرور غير صحيحة.' : 'Invalid email or password.'
      };
    }

    const updatedUser: User = {
      ...account.user,
      lastLogin: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };

    setCurrentUser(updatedUser);
    if (remember) {
      safeStorage.setItem('novasphere_session_user', JSON.stringify(updatedUser));
    }

    return { success: true };
  };

  const register = async (name: string, email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    if (isSupabaseConfigured() && supabase) {
      try {
        const { data, error } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: {
            data: {
              full_name: name.trim()
            }
          }
        });

        if (error) {
          return { success: false, error: error.message };
        }

        if (data.user) {
          try {
            await supabase.from('profiles').upsert({
              id: data.user.id,
              full_name: name.trim(),
              email: email.trim(),
              role: 'Member'
            });
          } catch {
            // Handled gracefully if table trigger is present
          }

          const newUser: User = {
            id: data.user.id,
            name: name.trim(),
            email: email.trim(),
            role: language === 'ar' ? 'عضو جديد' : 'New Member',
            createdAt: new Date().toISOString().substring(0, 10),
            lastLogin: new Date().toISOString().replace('T', ' ').substring(0, 16),
            company: '',
            bio: ''
          };

          setCurrentUser(newUser);
          safeStorage.setItem('novasphere_session_user', JSON.stringify(newUser));
          return { success: true };
        }
      } catch (err: any) {
        return { success: false, error: err.message || 'Supabase registration failed' };
      }
    }

    // Local / Offline fallback
    await new Promise((res) => setTimeout(res, 350));
    const accounts = getStoredAccounts();
    const exists = accounts.some(
      (acc) => acc.user.email.toLowerCase().trim() === email.toLowerCase().trim()
    );

    if (exists) {
      return {
        success: false,
        error: language === 'ar' ? 'هذا البريد الإلكتروني مسجل بالفعل. يرجى تسجيل الدخول.' : 'An account with this email already exists. Please log in.'
      };
    }

    const newUser: User = {
      id: 'usr_' + Date.now(),
      name,
      email,
      role: language === 'ar' ? 'عضو جديد' : 'New Member',
      createdAt: new Date().toISOString().substring(0, 10),
      lastLogin: new Date().toISOString().replace('T', ' ').substring(0, 16),
      company: language === 'ar' ? 'حساب شخصي' : 'Personal Account',
      bio: language === 'ar' ? 'مستخدم جديد في منصة نوفا سفير.' : 'New member exploring the NovaSphere web platform.'
    };

    const newAccounts = [...accounts, { user: newUser, passwordHash: password }];
    safeStorage.setItem('novasphere_accounts', JSON.stringify(newAccounts));
    safeStorage.setItem('novasphere_session_user', JSON.stringify(newUser));
    setCurrentUser(newUser);

    return { success: true };
  };

  const socialLogin = async (provider: 'google' | 'github'): Promise<{ success: boolean; error?: string }> => {
    if (isSupabaseConfigured() && supabase) {
      try {
        const { error } = await supabase.auth.signInWithOAuth({
          provider,
          options: {
            redirectTo: window.location.origin
          }
        });
        if (error) {
          return { success: false, error: error.message };
        }
        return { success: true };
      } catch (err: any) {
        return { success: false, error: err.message };
      }
    }

    // Fallback SSO simulation
    await new Promise((res) => setTimeout(res, 500));
    const providerEmail = provider === 'google' ? 'user.google@gmail.com' : 'dev.coder@github.com';
    const providerName = provider === 'google' ? 'Google Account User' : 'GitHub Developer';

    const socialUser: User = {
      id: `usr_${provider}_${Date.now()}`,
      name: providerName,
      email: providerEmail,
      role: `${provider.toUpperCase()} Authenticated`,
      createdAt: new Date().toISOString().substring(0, 10),
      lastLogin: new Date().toISOString().replace('T', ' ').substring(0, 16),
      company: provider === 'google' ? 'Google Workspace' : 'GitHub Open Source',
      bio: 'Connected via secure Single Sign-On (SSO).'
    };

    setCurrentUser(socialUser);
    safeStorage.setItem('novasphere_session_user', JSON.stringify(socialUser));
    return { success: true };
  };

  const logout = async () => {
    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.auth.signOut();
      } catch {
        // ignore
      }
    }
    setCurrentUser(null);
    safeStorage.removeItem('novasphere_session_user');
    navigateTo('home');
  };

  const updateProfile = async (data: Partial<User>): Promise<{ success: boolean; error?: string }> => {
    if (!currentUser) return { success: false, error: 'No active session' };
    const updated: User = { ...currentUser, ...data };
    setCurrentUser(updated);
    safeStorage.setItem('novasphere_session_user', JSON.stringify(updated));

    // Update in Supabase if configured
    if (isSupabaseConfigured() && supabase) {
      try {
        const updatePayload: Record<string, any> = {
          updated_at: new Date().toISOString()
        };
        if (data.name !== undefined) updatePayload.full_name = data.name;
        if (data.company !== undefined) updatePayload.company = data.company;
        if (data.bio !== undefined) updatePayload.bio = data.bio;
        if (data.role !== undefined) updatePayload.role = data.role;

        const { error } = await supabase
          .from('profiles')
          .update(updatePayload)
          .eq('id', currentUser.id);

        if (error) {
          console.warn('Supabase update profiles warning:', error.message);
          return { success: false, error: error.message };
        }
        return { success: true };
      } catch (err: any) {
        console.warn('Could not update Supabase profile:', err);
        return { success: false, error: err.message || 'Failed to update Supabase profile' };
      }
    } else {
      // Update in local accounts
      const accounts = getStoredAccounts();
      const idx = accounts.findIndex((acc) => acc.user.id === currentUser.id);
      if (idx !== -1) {
        accounts[idx].user = updated;
        safeStorage.setItem('novasphere_accounts', JSON.stringify(accounts));
      }
      return { success: true };
    }
  };

  const refreshProfile = async (): Promise<{ success: boolean; error?: string }> => {
    if (!currentUser) return { success: false, error: 'No active session' };
    if (isSupabaseConfigured() && supabase) {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', currentUser.id)
          .single();

        if (error) {
          return { success: false, error: error.message };
        }
        if (data) {
          const refreshed: User = {
            ...currentUser,
            name: data.full_name || currentUser.name,
            role: data.role || currentUser.role,
            company: data.company !== undefined ? data.company : currentUser.company,
            bio: data.bio !== undefined ? data.bio : currentUser.bio,
          };
          setCurrentUser(refreshed);
          safeStorage.setItem('novasphere_session_user', JSON.stringify(refreshed));
          return { success: true };
        }
      } catch (err: any) {
        return { success: false, error: err.message };
      }
    }
    return { success: true };
  };

  const t = (key: keyof typeof translations['ar']): string => {
    return translations[language][key] || translations['ar'][key] || String(key);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        language,
        currentPage,
        supabaseStatus,
        supabaseSql: SUPABASE_SQL_SCHEMA,
        supabaseModalOpen,
        setSupabaseModalOpen,
        setLanguage,
        navigateTo,
        login,
        register,
        socialLogin,
        logout,
        updateProfile,
        refreshProfile,
        testSupabaseConnection,
        t,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
