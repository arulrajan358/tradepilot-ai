-- Create the trades table
create table if not exists trades (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) not null,
  pair text not null,
  entry_price numeric not null,
  current_price numeric,
  profit_percent numeric,
  status text check (status in ('profit', 'loss', 'neutral', 'closed')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Add RLS policies (optional but recommended)
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
