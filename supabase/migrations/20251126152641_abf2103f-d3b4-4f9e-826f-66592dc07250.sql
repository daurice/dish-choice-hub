-- Fix RLS policy to allow anonymous quote submissions
-- Drop existing insert policy if it exists
DROP POLICY IF EXISTS "Anyone can submit quotes" ON public.quotes;

-- Create explicit policy allowing anonymous inserts
CREATE POLICY "Allow anonymous quote submissions"
ON public.quotes
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Verify RLS is enabled
ALTER TABLE public.quotes ENABLE ROW LEVEL SECURITY;