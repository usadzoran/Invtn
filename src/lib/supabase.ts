import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = (): boolean => {
  return Boolean(
    supabaseUrl &&
    supabaseAnonKey &&
    supabaseUrl !== 'https://your-project-ref.supabase.co' &&
    supabaseAnonKey !== 'your-anon-public-key' &&
    supabaseUrl.startsWith('https://')
  );
};

export const supabase: SupabaseClient | null = isSupabaseConfigured()
  ? createClient(supabaseUrl!, supabaseAnonKey!)
  : null;

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
