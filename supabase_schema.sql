-- Create accounts table for broker connections
create table if not exists accounts (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) not null,
  broker text not null,
  account_number text not null,
  server text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS for accounts
alter table accounts enable row level security;

create policy "Users can view their own accounts"
  on accounts for select
  using (auth.uid() = user_id);

create policy "Users can insert their own accounts"
  on accounts for insert
  with check (auth.uid() = user_id);

-- Existing Trades Table (Previously Created)
create table if not exists trades (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) not null,
  pair text not null,
  entry_price numeric not null,
  current_price numeric,
  lot_size numeric not null default 0.01,
  profit_percent numeric,
  status text check (status in ('profit', 'loss', 'neutral', 'closed')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table trades enable row level security;

create policy "Users can view their own trades"
  on trades for select
  using (auth.uid() = user_id);

create policy "Users can insert their own trades"
  on trades for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own trades"
  on trades for update
  using (auth.uid() = user_id);

-- 1. Risk Profiles
create table if not exists risk_profiles (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) not null,
  max_daily_loss numeric not null default 0,
  max_risk_per_trade numeric not null default 1, -- percent
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table risk_profiles enable row level security;

create policy "Users can view their own risk profile"
  on risk_profiles for select
  using (auth.uid() = user_id);

create policy "Users can insert/update their own risk profile"
  on risk_profiles for all
  using (auth.uid() = user_id);

-- 2. Trade Analysis (AI Coach)
create table if not exists trade_analysis (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) not null,
  insight text not null,
  type text check (type in ('mistake', 'praise', 'suggestion')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table trade_analysis enable row level security;

create policy "Users can view their own analysis"
  on trade_analysis for select
  using (auth.uid() = user_id);

-- 3. Prop Firm Accounts
create table if not exists prop_accounts (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) not null,
  account_size numeric not null,
  target_profit numeric not null,
  daily_drawdown_limit numeric not null,
  max_drawdown_limit numeric not null,
  current_equity numeric not null,
  status text default 'active',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table prop_accounts enable row level security;

create policy "Users can view their own prop accounts"
  on prop_accounts for select
  using (auth.uid() = user_id);

-- 4. Alerts
create table if not exists alerts (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) not null,
  message text not null,
  type text check (type in ('info', 'warning', 'success', 'error')),
  is_read boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table alerts enable row level security;

create policy "Users can view their own alerts"
  on alerts for select
  using (auth.uid() = user_id);
