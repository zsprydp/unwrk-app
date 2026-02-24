-- UnWrk database schema for Supabase
-- Run this in the Supabase SQL Editor after creating your project.

-- Profiles stores per-user settings and metadata
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  is_premium boolean default false,
  settings jsonb default '{}'::jsonb,
  streak integer default 0,
  total_sessions integer default 0,
  last_session_date date,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Focus/break sessions log
create table if not exists sessions (
  id bigint generated always as identity primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  task_description text default '',
  start_time timestamptz,
  end_time timestamptz,
  duration integer not null,
  completed boolean default true,
  mode text not null check (mode in ('focus', 'shortBreak', 'longBreak')),
  created_at timestamptz default now()
);

-- Row Level Security: users can only access their own data
alter table profiles enable row level security;
alter table sessions enable row level security;

create policy "Users can read own profile"
  on profiles for select using (auth.uid() = id);

create policy "Users can update own profile"
  on profiles for update using (auth.uid() = id);

create policy "Users can insert own profile"
  on profiles for insert with check (auth.uid() = id);

create policy "Users can read own sessions"
  on sessions for select using (auth.uid() = user_id);

create policy "Users can insert own sessions"
  on sessions for insert with check (auth.uid() = user_id);

-- Auto-create profile on signup via trigger
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Indexes for common queries
create index if not exists idx_sessions_user_id on sessions(user_id);
create index if not exists idx_sessions_start_time on sessions(user_id, start_time desc);
