-- Add CRUD policies for admins on all tables

-- Contact Info: Admins can manage contact info
CREATE POLICY "Admins can insert contact info"
ON public.contact_info
FOR INSERT
TO authenticated
WITH CHECK (is_admin(auth.uid()));

CREATE POLICY "Admins can update contact info"
ON public.contact_info
FOR UPDATE
TO authenticated
USING (is_admin(auth.uid()));

CREATE POLICY "Admins can delete contact info"
ON public.contact_info
FOR DELETE
TO authenticated
USING (is_admin(auth.uid()));

-- Gallery Images: Admins can manage gallery images
CREATE POLICY "Admins can insert gallery images"
ON public.gallery_images
FOR INSERT
TO authenticated
WITH CHECK (is_admin(auth.uid()));

CREATE POLICY "Admins can update gallery images"
ON public.gallery_images
FOR UPDATE
TO authenticated
USING (is_admin(auth.uid()));

CREATE POLICY "Admins can delete gallery images"
ON public.gallery_images
FOR DELETE
TO authenticated
USING (is_admin(auth.uid()));

-- Menu Categories: Admins can manage menu categories
CREATE POLICY "Admins can insert menu categories"
ON public.menu_categories
FOR INSERT
TO authenticated
WITH CHECK (is_admin(auth.uid()));

CREATE POLICY "Admins can update menu categories"
ON public.menu_categories
FOR UPDATE
TO authenticated
USING (is_admin(auth.uid()));

CREATE POLICY "Admins can delete menu categories"
ON public.menu_categories
FOR DELETE
TO authenticated
USING (is_admin(auth.uid()));

-- Menu Items: Admins can manage menu items
CREATE POLICY "Admins can insert menu items"
ON public.menu_items
FOR INSERT
TO authenticated
WITH CHECK (is_admin(auth.uid()));

CREATE POLICY "Admins can update menu items"
ON public.menu_items
FOR UPDATE
TO authenticated
USING (is_admin(auth.uid()));

CREATE POLICY "Admins can delete menu items"
ON public.menu_items
FOR DELETE
TO authenticated
USING (is_admin(auth.uid()));

-- Services: Admins can manage services
CREATE POLICY "Admins can insert services"
ON public.services
FOR INSERT
TO authenticated
WITH CHECK (is_admin(auth.uid()));

CREATE POLICY "Admins can update services"
ON public.services
FOR UPDATE
TO authenticated
USING (is_admin(auth.uid()));

CREATE POLICY "Admins can delete services"
ON public.services
FOR DELETE
TO authenticated
USING (is_admin(auth.uid()));

-- Site Settings: Admins can manage site settings
CREATE POLICY "Admins can insert site settings"
ON public.site_settings
FOR INSERT
TO authenticated
WITH CHECK (is_admin(auth.uid()));

CREATE POLICY "Admins can update site settings"
ON public.site_settings
FOR UPDATE
TO authenticated
USING (is_admin(auth.uid()));

CREATE POLICY "Admins can delete site settings"
ON public.site_settings
FOR DELETE
TO authenticated
USING (is_admin(auth.uid()));

-- Profiles: Already have admin policies, just adding delete
CREATE POLICY "Admins can delete profiles"
ON public.profiles
FOR DELETE
TO authenticated
USING (is_admin(auth.uid()));