-- Fix RLS policy for contact_messages to allow anonymous submissions
DROP POLICY IF EXISTS "Anyone can insert contact messages" ON public.contact_messages;

CREATE POLICY "Anyone can insert contact messages" 
ON public.contact_messages
FOR INSERT 
WITH CHECK (true);