import { createClient, SupabaseClient } from '@supabase/supabase-js';

const rawUrl = typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env.VITE_SUPABASE_URL : undefined;
const rawAnonKey = typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env.VITE_SUPABASE_ANON_KEY : undefined;

export const isSupabaseConfigured = (): boolean => {
  try {
    if (!rawUrl || !rawAnonKey) return false;
    if (rawUrl === 'https://your-project-ref.supabase.co' || rawAnonKey === 'your-anon-public-key') return false;
    if (!rawUrl.startsWith('https://')) return false;
    // Basic valid URL test
    new URL(rawUrl);
    return rawAnonKey.length > 20;
  } catch {
    return false;
  }
};

let clientInstance: SupabaseClient | null = null;

try {
  if (isSupabaseConfigured() && rawUrl && rawAnonKey) {
    clientInstance = createClient(rawUrl, rawAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    });
  }
} catch (err) {
  console.warn('Supabase initialization caught gracefully:', err);
  clientInstance = null;
}

export const supabase: SupabaseClient | null = clientInstance;

export const SUPABASE_SQL_SCHEMA = `-- 1. جدول الملفات الشخصية (Profiles Table)
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  full_name text,
  email text,
  company text,
  bio text,
  role text default 'Member'
);

-- 2. تفعيل سياسة الأمان (Row Level Security)
alter table public.profiles enable row level security;

-- 3. سياسات الوصول (RLS Policies)
create policy "الجميع يمكنهم قراءة الملفات الشخصية" on public.profiles
  for select using (true);

create policy "المستخدم يمكنه تعديل ملفه الشخصي فقط" on public.profiles
  for update using (auth.uid() = id);

create policy "المستخدم يمكنه إضافة ملفه الشخصي" on public.profiles
  for insert with check (auth.uid() = id);

-- 4. مشغل آلي لإنشاء ملف شخصي فور تسجيل أي حساب جديد
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, email, role)
  values (new.id, new.raw_user_meta_data->>'full_name', new.email, 'Member');
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
`;
