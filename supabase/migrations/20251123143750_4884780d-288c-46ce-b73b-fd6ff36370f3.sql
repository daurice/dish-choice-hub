-- Fix RLS policy for contact_messages to properly allow anonymous and authenticated users
DROP POLICY IF EXISTS "Anyone can insert contact messages" ON public.contact_messages;

CREATE POLICY "Anyone can insert contact messages" 
ON public.contact_messages
FOR INSERT 
TO anon, authenticated
WITH CHECK (true);