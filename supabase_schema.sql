-- Create payments table
create table public.payments (
  id uuid primary key default gen_random_uuid(),
  stripe_session_id text unique,
  amount integer not null, -- stored in cents
  currency text not null,
  display_name text,
  message text,
  is_public boolean default true,
  created_at timestamptz default now()
);

-- Enable RLS (Optional but recommended)
alter table public.payments enable row level security;

-- Create policy to allow public read access to payments (for merit wall)
create policy "Enable read access for all users" on public.payments for select using (true);

-- (If you need to insert from server implementation using service role, RLS is bypassed automatically)
