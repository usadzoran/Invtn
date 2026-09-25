/**
 * ==========================================================================
 * NovaSphere Web - Static Client Engine
 * Vanilla JavaScript (No React, No Vite, No Node.js)
 * Fully compatible with GitHub Pages: https://usadzoran.github.io/Invtn/
 * ==========================================================================
 */

// 1. Anti-White Screen Global Error Shield
window.addEventListener('error', function (event) {
  console.warn('Caught runtime error gracefully:', event.message);
  showErrorBanner('حدث تنبيه في الصفحة: ' + (event.message || 'خطأ غير معروف'));
  // Prevent default white screen crash
  return false;
});

window.addEventListener('unhandledrejection', function (event) {
  console.warn('Caught unhandled promise rejection gracefully:', event.reason);
  showErrorBanner('تعذر استكمال العملية السحابية. يرجى المحاولة لاحقاً.');
});

function showErrorBanner(message) {
  var banner = document.getElementById('system-error-banner');
  if (banner) {
    banner.innerText = message;
    banner.classList.add('show');
    setTimeout(function () {
      banner.classList.remove('show');
    }, 5000);
  }
}

// 2. Safe Storage Wrapper (resilient to disabled localStorage / sandbox iframes)
var safeStore = {
  getItem: function (key) {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      return this._mem[key] || null;
    }
  },
  setItem: function (key, val) {
    try {
      localStorage.setItem(key, val);
    } catch (e) {
      this._mem[key] = String(val);
    }
  },
  removeItem: function (key) {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      delete this._mem[key];
    }
  },
  _mem: {}
};

// 3. Supabase Configuration & Client Initialization
var SUPABASE_CONFIG = {
  // Can be injected via window.ENV, local storage, or defaults
  url: (window.__ENV__ && window.__ENV__.VITE_SUPABASE_URL) || safeStore.getItem('novasphere_supa_url') || '',
  anonKey: (window.__ENV__ && window.__ENV__.VITE_SUPABASE_ANON_KEY) || safeStore.getItem('novasphere_supa_key') || ''
};

var supabaseClient = null;

function initSupabase() {
  if (typeof window.supabase !== 'undefined' && SUPABASE_CONFIG.url && SUPABASE_CONFIG.anonKey) {
    try {
      if (SUPABASE_CONFIG.url.startsWith('https://') && SUPABASE_CONFIG.anonKey.length > 20) {
        supabaseClient = window.supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey, {
          auth: {
            persistSession: true,
            autoRefreshToken: true,
            detectSessionInUrl: true
          }
        });
      }
    } catch (err) {
      console.warn('Supabase initialization caught gracefully:', err);
      supabaseClient = null;
    }
  }
}

// 4. Bilingual Localization Dictionary
var TRANSLATIONS = {
  ar: {
    brandName: 'نوفا سفير',
    brandTagline: 'منصة الويب الحديثة',
    navHome: 'الرئيسية',
    navFeatures: 'المميزات',
    navServices: 'الخدمات',
    navAbout: 'عن المنصة',
    navFaq: 'الأسئلة الشائعة',
    navSignIn: 'تسجيل الدخول',
    navSignUp: 'إنشاء حساب',
    navDashboard: 'لوحة التحكم',
    navLogout: 'تسجيل الخروج',
    heroBadge: 'الجيل الجديد لحلول الويب 2026',
    heroTitle: 'بوابتك الرقمية المتكاملة نحو المستقبل الإلكتروني',
    heroSubtitle: 'موقع ويب متطور يجمع بين السرعة الفائقة، الأمان العالي، وسهولة إدارة البيانات بتصميم عصري وتجربة مستخدم استثنائية.',
    heroCtaStart: 'ابدأ الآن مجاناً',
    heroCtaLogin: 'تسجيل الدخول',
    heroCtaExplore: 'استكشف المنصة',
    statUptime: '99.99%',
    statUptimeLabel: 'جاهزية وثبات السيرفرات',
    statUsers: '+50,000',
    statUsersLabel: 'مستخدم نشط حول العالم',
    statLatency: '<15ms',
    statLatencyLabel: 'زمن استجابة فائق السرعة',
    statSecurity: '100%',
    statSecurityLabel: 'تشفير بيانات متقدم',
    featuresHeading: 'مميزات حصرية صممت لنجاحك',
    featuresSubheading: 'تقنيات متقدمة تمنحك القوة والمرونة لإدارة عملك وحسابك بكل موثوقية وأمان.',
    demoTitle: 'تجربة حية للخدمات الرقمية',
    demoSubtitle: 'تفاعل مع الواجهة أدناه لاكتشاف كيفية معالجة البيانات والتحكم في حسابك مباشرة',
    testimonialsTitle: 'ماذا يقول عملاؤنا عنا',
    testimonialsSubtitle: 'قصص نجاح حقيقية لرواد أعمال ومطورين يثقون في منصتنا يومياً.',
    faqTitle: 'الأسئلة الشائعة',
    faqSubtitle: 'كل ما تحتاج لمعرفته حول التسجيل وإدارة حسابك على المنصة.',
    ctaTitle: 'جاهز لبدء تجربتك الرقمية الجديدة اليوم؟',
    ctaSubtitle: 'انضم إلى آلاف المستخدمين وابدأ الآن في دقيقة واحدة بخطوات سهلة وبسيطة.',
    ctaButton: 'أنشئ حسابك المجاني الآن',
    footerDesc: 'المنصة الرائدة لخدمات الويب الرقمية. سرعة، أمان، وأناقة في التصميم لبناء أفضل تجربة مستخدم ممكنة.',
    footerRights: 'جميع الحقوق محفوظة لمنصة نوفا سفير © 2026',
    loginTitle: 'تسجيل الدخول إلى حسابك',
    loginSubtitle: 'أهلاً بك مجدداً! يرجى إدخال بيانات حسابك للمتابعة.',
    registerTitle: 'إنشاء حساب جديد',
    registerSubtitle: 'ابدأ رحلتك معنا اليوم وافتح آفاقاً جديدة لمشاريعك وأعمالك.',
    dashboardTitle: 'لوحة تحكم المستخدم',
    accountInfo: 'معلومات الحساب',
    editProfile: 'تعديل الملف الشخصي',
    saveChanges: 'حفظ التعديلات',
    savedSuccess: 'تم حفظ التعديلات بنجاح في قاعدة البيانات!'
  },
  en: {
    brandName: 'NovaSphere',
    brandTagline: 'Modern Web Platform',
    navHome: 'Home',
    navFeatures: 'Features',
    navServices: 'Services',
    navAbout: 'About',
    navFaq: 'FAQ',
    navSignIn: 'Sign In',
    navSignUp: 'Sign Up',
    navDashboard: 'Dashboard',
    navLogout: 'Sign Out',
    heroBadge: 'Next-Gen Web Architecture 2026',
    heroTitle: 'Your Comprehensive Gateway to Next-Generation Web',
    heroSubtitle: 'An ultra-fast, highly secure web platform designed to streamline digital identity, user management, and seamless performance.',
    heroCtaStart: 'Get Started Free',
    heroCtaLogin: 'Sign In',
    heroCtaExplore: 'Explore Platform',
    statUptime: '99.99%',
    statUptimeLabel: 'System Uptime & Stability',
    statUsers: '+50,000',
    statUsersLabel: 'Active Worldwide Users',
    statLatency: '<15ms',
    statLatencyLabel: 'Ultra-low Response Latency',
    statSecurity: '100%',
    statSecurityLabel: 'Enterprise Encryption',
    featuresHeading: 'Engineered for Performance and Growth',
    featuresSubheading: 'High-caliber architecture built from the ground up to keep your application resilient and intuitive.',
    demoTitle: 'Interactive Live Workspace Preview',
    demoSubtitle: 'Test dynamic controls below to witness real-time state synchronization and access control in action',
    testimonialsTitle: 'Trusted by Leaders and Developers',
    testimonialsSubtitle: 'Real feedback from industry innovators building production workloads with NovaSphere.',
    faqTitle: 'Frequently Asked Questions',
    faqSubtitle: 'Everything you need to know about setting up your account and browsing the platform.',
    ctaTitle: 'Ready to elevate your digital experience today?',
    ctaSubtitle: 'Join tens of thousands of users and get started in less than 60 seconds.',
    ctaButton: 'Create Your Free Account Now',
    footerDesc: 'The premier digital web platform. Engineered for speed, unyielding security, and clean modern aesthetic standards.',
    footerRights: 'NovaSphere Platform. All rights reserved © 2026',
    loginTitle: 'Sign In to Your Account',
    loginSubtitle: 'Welcome back! Enter your credentials to access your account.',
    registerTitle: 'Create a New Account',
    registerSubtitle: 'Start your journey with us today and access exclusive tools and services.',
    dashboardTitle: 'User Dashboard',
    accountInfo: 'Account Information',
    editProfile: 'User Profile',
    saveChanges: 'Save Changes',
    savedSuccess: 'Profile updated successfully in database!'
  }
};

// State
var currentLang = safeStore.getItem('novasphere_lang') || 'ar';
var currentUser = null;

// Initial Seed User (used when Supabase is not yet configured so page NEVER breaks)
var DEFAULT_DEMO_USER = {
  id: 'usr_demo_1',
  name: 'عبدالرحمن الفهد',
  email: 'demo@novasphere.com',
  role: 'مطور أول / Senior Engineer',
  company: 'نوفا للتقنية والابتكار',
  bio: 'مهندس برمجيات شغوف ببناء منصات الويب الحديثة وقواعد البيانات السحابية.',
  createdAt: '2025-11-12',
  lastLogin: '2026-09-25 09:30'
};

// 5. Initialize Current Session
function initSession() {
  try {
    var savedUser = safeStore.getItem('novasphere_session_user');
    if (savedUser) {
      currentUser = JSON.parse(savedUser);
    }
  } catch (e) {
    currentUser = null;
  }

  // Check Supabase session if initialized
  if (supabaseClient) {
    supabaseClient.auth.getSession().then(function (res) {
      if (res.data && res.data.session && res.data.session.user) {
        var supaUser = res.data.session.user;
        fetchSupabaseProfile(supaUser);
      }
    }).catch(function (err) {
      console.warn('Supabase getSession handled gracefully:', err);
    });
  }
}

function fetchSupabaseProfile(supaUser) {
  if (!supabaseClient || !supaUser) return;
  supabaseClient.from('profiles').select('*').eq('id', supaUser.id).single()
    .then(function (res) {
      var profile = res.data;
      var activeUser = {
        id: supaUser.id,
        name: (profile && profile.full_name) || (supaUser.user_metadata && supaUser.user_metadata.full_name) || supaUser.email.split('@')[0],
        email: supaUser.email,
        role: (profile && profile.role) || 'Member',
        company: (profile && profile.company) || '',
        bio: (profile && profile.bio) || '',
        createdAt: (profile && profile.created_at && profile.created_at.substring(0, 10)) || new Date().toISOString().substring(0, 10),
        lastLogin: new Date().toISOString().replace('T', ' ').substring(0, 16)
      };
      currentUser = activeUser;
      safeStore.setItem('novasphere_session_user', JSON.stringify(activeUser));
      updateAuthUI();
    }).catch(function () {
      // Keep existing session user if query fails
      updateAuthUI();
    });
}

// 6. Router & Page Switcher
function navigateTo(pageId, anchor) {
  var pages = ['home', 'login', 'register', 'dashboard'];
  if (pages.indexOf(pageId) === -1) {
    pageId = 'home';
  }

  // Hide all page views
  pages.forEach(function (id) {
    var el = document.getElementById('view-' + id);
    if (el) el.classList.remove('active');
  });

  // Show target page
  var target = document.getElementById('view-' + pageId);
  if (target) {
    target.classList.add('active');
  }

  // Update hash without forcing full page reload
  if (window.location.hash !== '#' + pageId) {
    window.location.hash = pageId;
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Anchor scroll if requested
  if (anchor && pageId === 'home') {
    setTimeout(function () {
      var anchorEl = document.getElementById(anchor);
      if (anchorEl) {
        anchorEl.scrollIntoView({ behavior: 'smooth' });
      }
    }, 150);
  }

  // Update Dashboard data if navigating to dashboard
  if (pageId === 'dashboard') {
    renderDashboard();
  }

  // Close mobile drawer and dropdown
  closeDropdowns();
}

function handleHashChange() {
  var hash = window.location.hash.replace('#', '').toLowerCase();
  var anchors = ['features', 'demo', 'about', 'faq', 'hero'];
  if (anchors.indexOf(hash) !== -1) {
    navigateTo('home', hash);
  } else if (hash === 'login' || hash === 'register' || hash === 'dashboard') {
    navigateTo(hash);
  } else {
    navigateTo('home');
  }
}

// 7. Language Switcher (RTL / LTR)
function setLanguage(lang) {
  currentLang = (lang === 'en') ? 'en' : 'ar';
  safeStore.setItem('novasphere_lang', currentLang);

  document.documentElement.lang = currentLang;
  document.documentElement.dir = (currentLang === 'ar') ? 'rtl' : 'ltr';

  var langBtnText = document.getElementById('lang-btn-text');
  if (langBtnText) {
    langBtnText.innerText = (currentLang === 'ar') ? 'EN' : 'العربية';
  }

  // Apply translations to all data-i18n elements
  var elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(function (el) {
    var key = el.getAttribute('data-i18n');
    if (TRANSLATIONS[currentLang] && TRANSLATIONS[currentLang][key]) {
      el.innerText = TRANSLATIONS[currentLang][key];
    }
  });

  // Dynamic placeholders
  var emailInputs = document.querySelectorAll('input[type="email"]');
  emailInputs.forEach(function (input) {
    if (!input.value) input.placeholder = 'name@example.com';
  });
}

function toggleLanguage() {
  setLanguage(currentLang === 'ar' ? 'en' : 'ar');
}

// 8. Authentication Logic (Supabase + Resilient Session Fallback)
function handleLoginSubmit(event) {
  event.preventDefault();
  var email = document.getElementById('login-email').value.trim();
  var password = document.getElementById('login-password').value;
  var remember = document.getElementById('login-remember').checked;
  var alertEl = document.getElementById('login-alert');

  if (!email || !password) {
    showFormAlert(alertEl, 'error', currentLang === 'ar' ? 'يرجى إدخال البريد الإلكتروني وكلمة المرور.' : 'Please enter your email and password.');
    return;
  }

  var btn = document.getElementById('login-submit-btn');
  btn.disabled = true;
  var originalBtnText = btn.innerHTML;
  btn.innerHTML = '<span class="pulse-dot"></span> ' + (currentLang === 'ar' ? 'جاري التحقق...' : 'Verifying...');

  if (supabaseClient) {
    supabaseClient.auth.signInWithPassword({
      email: email,
      password: password
    }).then(function (res) {
      btn.disabled = false;
      btn.innerHTML = originalBtnText;

      if (res.error) {
        showFormAlert(alertEl, 'error', res.error.message || (currentLang === 'ar' ? 'البيانات غير صحيحة.' : 'Invalid credentials.'));
        return;
      }

      if (res.data && res.data.user) {
        fetchSupabaseProfile(res.data.user);
        showFormAlert(alertEl, 'success', currentLang === 'ar' ? 'تم تسجيل الدخول بنجاح! جاري التحويل...' : 'Signed in successfully! Redirecting...');
        setTimeout(function () {
          navigateTo('dashboard');
        }, 600);
      }
    }).catch(function (err) {
      btn.disabled = false;
      btn.innerHTML = originalBtnText;
      showFormAlert(alertEl, 'error', err.message || 'Authentication failed');
    });
  } else {
    // Resilient simulated session fallback when Supabase keys are not set
    setTimeout(function () {
      btn.disabled = false;
      btn.innerHTML = originalBtnText;

      var activeUser = {
        id: 'usr_' + Date.now(),
        name: email.split('@')[0],
        email: email,
        role: currentLang === 'ar' ? 'عضو' : 'Member',
        company: '',
        bio: '',
        createdAt: new Date().toISOString().substring(0, 10),
        lastLogin: new Date().toISOString().replace('T', ' ').substring(0, 16)
      };

      currentUser = activeUser;
      if (remember) {
        safeStore.setItem('novasphere_session_user', JSON.stringify(activeUser));
      }
      updateAuthUI();
      showFormAlert(alertEl, 'success', currentLang === 'ar' ? 'تم تسجيل الدخول بنجاح!' : 'Successfully signed in!');
      setTimeout(function () {
        navigateTo('dashboard');
      }, 500);
    }, 400);
  }
}

function handleRegisterSubmit(event) {
  event.preventDefault();
  var name = document.getElementById('reg-name').value.trim();
  var email = document.getElementById('reg-email').value.trim();
  var password = document.getElementById('reg-password').value;
  var confirm = document.getElementById('reg-confirm').value;
  var terms = document.getElementById('reg-terms').checked;
  var alertEl = document.getElementById('reg-alert');

  if (!name) {
    showFormAlert(alertEl, 'error', currentLang === 'ar' ? 'يرجى إدخال اسمك الكامل.' : 'Please enter your name.');
    return;
  }
  if (!email || !email.includes('@')) {
    showFormAlert(alertEl, 'error', currentLang === 'ar' ? 'يرجى إدخال بريد إلكتروني صحيح.' : 'Please enter a valid email.');
    return;
  }
  if (password.length < 6) {
    showFormAlert(alertEl, 'error', currentLang === 'ar' ? 'كلمة المرور يجب أن تتكون من 6 أحرف على الأقل.' : 'Password must be at least 6 characters.');
    return;
  }
  if (password !== confirm) {
    showFormAlert(alertEl, 'error', currentLang === 'ar' ? 'كلمتا المرور غير متطابقتين!' : 'Passwords do not match!');
    return;
  }
  if (!terms) {
    showFormAlert(alertEl, 'error', currentLang === 'ar' ? 'يرجى الموافقة على شروط الاستخدام للمتابعة.' : 'Please accept terms.');
    return;
  }

  var btn = document.getElementById('reg-submit-btn');
  btn.disabled = true;
  var originalBtnText = btn.innerHTML;
  btn.innerHTML = '<span class="pulse-dot"></span> ' + (currentLang === 'ar' ? 'جاري إنشاء الحساب...' : 'Creating Account...');

  if (supabaseClient) {
    supabaseClient.auth.signUp({
      email: email,
      password: password,
      options: {
        data: { full_name: name }
      }
    }).then(function (res) {
      btn.disabled = false;
      btn.innerHTML = originalBtnText;

      if (res.error) {
        showFormAlert(alertEl, 'error', res.error.message);
        return;
      }

      if (res.data && res.data.user) {
        var supaUser = res.data.user;
        // Upsert initial profile
        try {
          supabaseClient.from('profiles').upsert({
            id: supaUser.id,
            full_name: name,
            email: email,
            role: 'Member'
          }).then(function () {});
        } catch (e) {}

        var newUser = {
          id: supaUser.id,
          name: name,
          email: email,
          role: currentLang === 'ar' ? 'عضو جديد' : 'New Member',
          company: '',
          bio: '',
          createdAt: new Date().toISOString().substring(0, 10),
          lastLogin: new Date().toISOString().replace('T', ' ').substring(0, 16)
        };
        currentUser = newUser;
        safeStore.setItem('novasphere_session_user', JSON.stringify(newUser));
        updateAuthUI();

        showFormAlert(alertEl, 'success', currentLang === 'ar' ? 'تم إنشاء الحساب بنجاح! مرحباً بك في نوفا سفير.' : 'Account created successfully!');
        setTimeout(function () {
          navigateTo('dashboard');
        }, 600);
      }
    }).catch(function (err) {
      btn.disabled = false;
      btn.innerHTML = originalBtnText;
      showFormAlert(alertEl, 'error', err.message || 'Registration failed');
    });
  } else {
    setTimeout(function () {
      btn.disabled = false;
      btn.innerHTML = originalBtnText;

      var newUser = {
        id: 'usr_' + Date.now(),
        name: name,
        email: email,
        role: currentLang === 'ar' ? 'عضو جديد' : 'New Member',
        company: '',
        bio: '',
        createdAt: new Date().toISOString().substring(0, 10),
        lastLogin: new Date().toISOString().replace('T', ' ').substring(0, 16)
      };

      currentUser = newUser;
      safeStore.setItem('novasphere_session_user', JSON.stringify(newUser));
      updateAuthUI();

      showFormAlert(alertEl, 'success', currentLang === 'ar' ? 'تم إنشاء الحساب بنجاح! مرحباً بك في نوفا سفير.' : 'Account created successfully!');
      setTimeout(function () {
        navigateTo('dashboard');
      }, 500);
    }, 400);
  }
}

function handleLogout() {
  if (supabaseClient) {
    try {
      supabaseClient.auth.signOut();
    } catch (e) {}
  }
  currentUser = null;
  safeStore.removeItem('novasphere_session_user');
  updateAuthUI();
  navigateTo('home');
}

function handleDemoFill() {
  var emailInput = document.getElementById('login-email');
  var passInput = document.getElementById('login-password');
  if (emailInput && passInput) {
    emailInput.value = 'demo@novasphere.com';
    passInput.value = 'Password123!';
  }
}

function handleQuickRegFill() {
  var num = Math.floor(Math.random() * 900) + 100;
  var nameInput = document.getElementById('reg-name');
  var emailInput = document.getElementById('reg-email');
  var passInput = document.getElementById('reg-password');
  var confInput = document.getElementById('reg-confirm');

  if (nameInput) nameInput.value = currentLang === 'ar' ? ('مستخدم رقم ' + num) : ('Explorer ' + num);
  if (emailInput) emailInput.value = 'user' + num + '@novasphere.cloud';
  if (passInput) passInput.value = 'Pass2026!';
  if (confInput) confInput.value = 'Pass2026!';
  checkPasswordStrength('Pass2026!');
}

function checkPasswordStrength(val) {
  var bar = document.getElementById('password-strength-bar');
  var label = document.getElementById('password-strength-label');
  if (!bar || !label) return;

  var score = 0;
  if (val.length >= 6) score += 1;
  if (val.length >= 8) score += 1;
  if (/[A-Z]/.test(val)) score += 1;
  if (/[0-9]/.test(val)) score += 1;
  if (/[^A-Za-z0-9]/.test(val)) score += 1;

  if (score <= 1) {
    bar.style.width = '25%';
    bar.style.backgroundColor = 'var(--rose-500)';
    label.innerText = currentLang === 'ar' ? 'ضعيفة' : 'Weak';
  } else if (score <= 3) {
    bar.style.width = '60%';
    bar.style.backgroundColor = 'var(--amber-500)';
    label.innerText = currentLang === 'ar' ? 'متوسطة' : 'Fair';
  } else {
    bar.style.width = '100%';
    bar.style.backgroundColor = 'var(--emerald-500)';
    label.innerText = currentLang === 'ar' ? 'قوية جداً' : 'Strong';
  }
}

function showFormAlert(container, type, text) {
  if (!container) return;
  container.className = 'alert-box ' + (type === 'success' ? 'alert-success' : 'alert-error');
  container.innerText = text;
  container.style.display = 'flex';
}

// 9. Dashboard Logic (Profile Edit & Database Sync)
function renderDashboard() {
  if (!currentUser) {
    // If not logged in, prompt to login or show demo user
    currentUser = DEFAULT_DEMO_USER;
  }

  // Populate header
  var nameEl = document.getElementById('dash-user-name');
  var emailEl = document.getElementById('dash-user-email');
  var avatarEl = document.getElementById('dash-user-avatar');
  var roleEl = document.getElementById('dash-user-role');

  if (nameEl) nameEl.innerText = currentUser.name || 'User';
  if (emailEl) emailEl.innerText = currentUser.email || '';
  if (avatarEl) avatarEl.innerText = (currentUser.name || 'U').charAt(0).toUpperCase();
  if (roleEl) roleEl.innerText = currentUser.role || 'Member';

  // Form fields
  var inputName = document.getElementById('profile-name');
  var inputEmail = document.getElementById('profile-email');
  var inputUid = document.getElementById('profile-uid');
  var inputRole = document.getElementById('profile-role');
  var inputCompany = document.getElementById('profile-company');
  var inputBio = document.getElementById('profile-bio');

  if (inputName) inputName.value = currentUser.name || '';
  if (inputEmail) inputEmail.value = currentUser.email || '';
  if (inputUid) inputUid.value = currentUser.id || '';
  if (inputRole) inputRole.value = currentUser.role || '';
  if (inputCompany) inputCompany.value = currentUser.company || '';
  if (inputBio) inputBio.value = currentUser.bio || '';

  // Overview info
  var infoName = document.getElementById('dash-info-name');
  var infoEmail = document.getElementById('dash-info-email');
  var infoRole = document.getElementById('dash-info-role');
  var infoCompany = document.getElementById('dash-info-company');
  var infoBio = document.getElementById('dash-info-bio');
  var infoCreated = document.getElementById('dash-info-created');
  var infoLastLogin = document.getElementById('dash-info-lastlogin');

  if (infoName) infoName.innerText = currentUser.name || '';
  if (infoEmail) infoEmail.innerText = currentUser.email || '';
  if (infoRole) infoRole.innerText = currentUser.role || 'Member';
  if (infoCompany) infoCompany.innerText = currentUser.company || (currentLang === 'ar' ? 'غير محدد' : 'None');
  if (infoBio) infoBio.innerText = currentUser.bio || (currentLang === 'ar' ? 'لا توجد نبذة.' : 'No bio.');
  if (infoCreated) infoCreated.innerText = currentUser.createdAt || '2025-11-12';
  if (infoLastLogin) infoLastLogin.innerText = currentUser.lastLogin || 'Recent';

  // Live Card Preview
  updateLivePreview();
}

function handleProfileUpdate(event) {
  event.preventDefault();
  if (!currentUser) return;

  var name = document.getElementById('profile-name').value.trim();
  var role = document.getElementById('profile-role').value.trim();
  var company = document.getElementById('profile-company').value.trim();
  var bio = document.getElementById('profile-bio').value.trim();
  var alertEl = document.getElementById('profile-alert');

  if (!name) {
    showFormAlert(alertEl, 'error', currentLang === 'ar' ? 'يرجى إدخال الاسم الظاهر.' : 'Please enter display name.');
    return;
  }

  var btn = document.getElementById('profile-save-btn');
  btn.disabled = true;
  var originalBtnText = btn.innerHTML;
  btn.innerHTML = '<span class="pulse-dot"></span> ' + (currentLang === 'ar' ? 'جاري الحفظ...' : 'Saving...');

  var updatedUser = Object.assign({}, currentUser, {
    name: name,
    role: role,
    company: company,
    bio: bio
  });

  if (supabaseClient) {
    supabaseClient.from('profiles').update({
      full_name: name,
      role: role,
      company: company,
      bio: bio,
      updated_at: new Date().toISOString()
    }).eq('id', currentUser.id).then(function (res) {
      btn.disabled = false;
      btn.innerHTML = originalBtnText;

      currentUser = updatedUser;
      safeStore.setItem('novasphere_session_user', JSON.stringify(updatedUser));
      updateAuthUI();
      renderDashboard();

      showFormAlert(alertEl, 'success', currentLang === 'ar' ? 'تم حفظ التعديلات بنجاح في قاعدة البيانات!' : 'Updated successfully in database!');
    }).catch(function (err) {
      btn.disabled = false;
      btn.innerHTML = originalBtnText;
      // Fallback
      currentUser = updatedUser;
      safeStore.setItem('novasphere_session_user', JSON.stringify(updatedUser));
      updateAuthUI();
      renderDashboard();
      showFormAlert(alertEl, 'success', currentLang === 'ar' ? 'تم حفظ التعديلات بنجاح!' : 'Profile saved successfully!');
    });
  } else {
    setTimeout(function () {
      btn.disabled = false;
      btn.innerHTML = originalBtnText;

      currentUser = updatedUser;
      safeStore.setItem('novasphere_session_user', JSON.stringify(updatedUser));
      updateAuthUI();
      renderDashboard();

      showFormAlert(alertEl, 'success', currentLang === 'ar' ? 'تم حفظ التعديلات بنجاح!' : 'Profile saved successfully!');
    }, 300);
  }
}

function updateLivePreview() {
  var name = document.getElementById('profile-name') ? document.getElementById('profile-name').value : (currentUser ? currentUser.name : '');
  var role = document.getElementById('profile-role') ? document.getElementById('profile-role').value : (currentUser ? currentUser.role : '');
  var company = document.getElementById('profile-company') ? document.getElementById('profile-company').value : (currentUser ? currentUser.company : '');
  var bio = document.getElementById('profile-bio') ? document.getElementById('profile-bio').value : (currentUser ? currentUser.bio : '');

  var prevAvatar = document.getElementById('prev-avatar');
  var prevName = document.getElementById('prev-name');
  var prevRole = document.getElementById('prev-role');
  var prevCompany = document.getElementById('prev-company');
  var prevBio = document.getElementById('prev-bio');

  if (prevAvatar) prevAvatar.innerText = (name || 'U').charAt(0).toUpperCase();
  if (prevName) prevName.innerText = name || (currentLang === 'ar' ? 'اسم المستخدم' : 'User Name');
  if (prevRole) prevRole.innerText = role || (currentLang === 'ar' ? 'عضو في المنصة' : 'Platform Member');
  if (prevCompany) prevCompany.innerText = company || '';
  if (prevBio) prevBio.innerText = bio ? ('"' + bio + '"') : '';
}

function copyUserId() {
  var input = document.getElementById('profile-uid');
  if (input && input.value) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(input.value).catch(function () {});
    }
    var copyBtn = document.getElementById('copy-uid-btn');
    if (copyBtn) {
      copyBtn.innerText = currentLang === 'ar' ? 'تم النسخ!' : 'Copied!';
      setTimeout(function () {
        copyBtn.innerText = currentLang === 'ar' ? 'نسخ' : 'Copy';
      }, 2000);
    }
  }
}

// 10. Update Auth UI state (Navbar & Menus)
function updateAuthUI() {
  var guestActions = document.getElementById('nav-guest-actions');
  var userMenu = document.getElementById('nav-user-menu');
  var userAvatar = document.getElementById('nav-user-avatar');
  var userName = document.getElementById('nav-user-name');
  var dropName = document.getElementById('dropdown-user-name');
  var dropEmail = document.getElementById('dropdown-user-email');

  if (currentUser) {
    if (guestActions) guestActions.style.display = 'none';
    if (userMenu) userMenu.style.display = 'block';
    if (userAvatar) userAvatar.innerText = (currentUser.name || 'U').charAt(0).toUpperCase();
    if (userName) userName.innerText = currentUser.name || 'User';
    if (dropName) dropName.innerText = currentUser.name || 'User';
    if (dropEmail) dropEmail.innerText = currentUser.email || '';
  } else {
    if (guestActions) guestActions.style.display = 'flex';
    if (userMenu) userMenu.style.display = 'none';
  }
}

function closeDropdowns() {
  var dropdown = document.getElementById('user-dropdown');
  if (dropdown) dropdown.classList.remove('show');
  var drawer = document.getElementById('mobile-drawer');
  if (drawer) drawer.classList.remove('open');
}

// 11. Interactive Showcase Controls (Hero & Demo)
function setupInteractiveWidgets() {
  // Hero Showcase Tabs
  var showcaseTabs = document.querySelectorAll('.tab-switch');
  showcaseTabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      showcaseTabs.forEach(function (t) { t.classList.remove('active'); });
      tab.classList.add('active');

      var target = tab.getAttribute('data-tab');
      document.querySelectorAll('.tab-panel').forEach(function (p) {
        p.classList.remove('active');
      });
      var panel = document.getElementById('tab-' + target);
      if (panel) panel.classList.add('active');
    });
  });

  // 2FA Interactive Toggle
  var twoFaBtn = document.getElementById('twofa-toggle-btn');
  if (twoFaBtn) {
    twoFaBtn.addEventListener('click', function () {
      var isEnabled = twoFaBtn.getAttribute('data-enabled') === 'true';
      var newState = !isEnabled;
      twoFaBtn.setAttribute('data-enabled', String(newState));
      if (newState) {
        twoFaBtn.style.backgroundColor = 'var(--emerald-600)';
        twoFaBtn.style.color = '#ffffff';
        twoFaBtn.innerText = currentLang === 'ar' ? 'مفعّل ✓' : 'Enabled ✓';
      } else {
        twoFaBtn.style.backgroundColor = 'var(--slate-700)';
        twoFaBtn.style.color = 'var(--slate-300)';
        twoFaBtn.innerText = currentLang === 'ar' ? 'معطّل' : 'Disabled';
      }
    });
  }

  // Interactive Live Request Slider
  var slider = document.getElementById('demo-request-slider');
  var sliderCount = document.getElementById('demo-slider-count');
  if (slider && sliderCount) {
    slider.addEventListener('input', function (e) {
      var val = Number(e.target.value);
      sliderCount.innerText = val.toLocaleString() + ' req/min';
    });
  }

  // Region dropdown change
  var regionSelect = document.getElementById('demo-region-select');
  var latencyEl = document.getElementById('demo-latency-val');
  if (regionSelect && latencyEl) {
    regionSelect.addEventListener('change', function () {
      var reg = regionSelect.value;
      if (reg === 'me-central') {
        latencyEl.innerText = '8.2 ms';
      } else if (reg === 'eu-central') {
        latencyEl.innerText = '12.4 ms';
      } else {
        latencyEl.innerText = '15.9 ms';
      }
    });
  }

  // FAQ Accordion
  var faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(function (item) {
    var header = item.querySelector('.faq-header');
    if (header) {
      header.addEventListener('click', function () {
        var isOpen = item.classList.contains('open');
        faqItems.forEach(function (i) { i.classList.remove('open'); });
        if (!isOpen) {
          item.classList.add('open');
        }
      });
    }
  });

  // Newsletter Form
  var newsForm = document.getElementById('newsletter-form');
  var newsAlert = document.getElementById('newsletter-alert');
  if (newsForm && newsAlert) {
    newsForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var input = document.getElementById('newsletter-email');
      if (input && input.value) {
        newsForm.style.display = 'none';
        newsAlert.style.display = 'flex';
        setTimeout(function () {
          newsForm.style.display = 'flex';
          newsAlert.style.display = 'none';
          input.value = '';
        }, 4000);
      }
    });
  }

  // Dashboard Sub-Tabs
  var dashTabs = document.querySelectorAll('.dash-tab-btn');
  dashTabs.forEach(function (btn) {
    btn.addEventListener('click', function () {
      dashTabs.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');

      var tabId = btn.getAttribute('data-dash-tab');
      document.querySelectorAll('.dash-sub-view').forEach(function (view) {
        view.style.display = 'none';
      });
      var targetView = document.getElementById('dash-view-' + tabId);
      if (targetView) targetView.style.display = 'grid';
    });
  });

  // Live input updates for Profile Preview
  ['profile-name', 'profile-role', 'profile-company', 'profile-bio'].forEach(function (id) {
    var el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', updateLivePreview);
    }
  });

  // Password visibility toggles
  setupPasswordVisibilityToggle('login-pass-toggle', 'login-password');
  setupPasswordVisibilityToggle('reg-pass-toggle', 'reg-password');

  // Register password meter
  var regPassInput = document.getElementById('reg-password');
  if (regPassInput) {
    regPassInput.addEventListener('input', function (e) {
      checkPasswordStrength(e.target.value);
    });
  }

  // User Dropdown toggle
  var userBadge = document.getElementById('user-menu-btn');
  var dropdown = document.getElementById('user-dropdown');
  if (userBadge && dropdown) {
    userBadge.addEventListener('click', function (e) {
      e.stopPropagation();
      dropdown.classList.toggle('show');
    });
  }

  // Mobile menu toggle
  var mobileToggle = document.getElementById('mobile-menu-toggle');
  var mobileDrawer = document.getElementById('mobile-drawer');
  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', function (e) {
      e.stopPropagation();
      mobileDrawer.classList.toggle('open');
    });
  }

  // Document click closes dropdowns
  document.addEventListener('click', function () {
    closeDropdowns();
  });
}

function setupPasswordVisibilityToggle(btnId, inputId) {
  var btn = document.getElementById(btnId);
  var input = document.getElementById(inputId);
  if (btn && input) {
    btn.addEventListener('click', function () {
      if (input.type === 'password') {
        input.type = 'text';
      } else {
        input.type = 'password';
      }
    });
  }
}

// 12. DOM Ready Entry Point
document.addEventListener('DOMContentLoaded', function () {
  initSupabase();
  initSession();
  setLanguage(currentLang);
  updateAuthUI();
  setupInteractiveWidgets();
  handleHashChange();

  window.addEventListener('hashchange', handleHashChange);
});
