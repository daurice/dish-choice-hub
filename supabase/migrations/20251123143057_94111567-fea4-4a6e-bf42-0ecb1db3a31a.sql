-- Fix RLS policy for contact_messages to allow both anonymous and authenticated users to insert
DROP POLICY IF EXISTS "Anyone can insert contact messages" ON public.contact_messages;

CREATE POLICY "Anyone can insert contact messages" 
ON public.contact_messages
FOR INSERT 
TO public, authenticated
WITH CHECK (true);