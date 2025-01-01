/*
  # Authentication and Authorization Setup
  
  1. New Tables
    - `user_roles`
      - `id` (uuid, primary key)
      - `user_id` (references auth.users)
      - `role` (text)
      - `created_at` (timestamp)
  
  2. Security
    - Enable RLS on user_roles table
    - Add policies for role management
    
  3. Functions
    - Function to handle new user registration
    - Function to get user role
*/

-- Create enum for roles if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'app_role') THEN
    CREATE TYPE public.app_role AS ENUM ('superadmin', 'admin', 'user');
  END IF;
END $$;

-- Create user_roles table
CREATE TABLE IF NOT EXISTS public.user_roles (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users NOT NULL,
    role app_role NOT NULL DEFAULT 'user',
    created_at timestamptz DEFAULT now(),
    UNIQUE(user_id)
);

-- Enable RLS
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DO $$ 
BEGIN
    DROP POLICY IF EXISTS "Users can view own role" ON public.user_roles;
    DROP POLICY IF EXISTS "Only superadmins can manage roles" ON public.user_roles;
EXCEPTION
    WHEN undefined_object THEN 
        NULL;
END $$;

-- Create policies
CREATE POLICY "Users can view own role"
    ON public.user_roles
    FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

CREATE POLICY "Only superadmins can manage roles"
    ON public.user_roles
    FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.user_roles
            WHERE user_id = auth.uid()
            AND role = 'superadmin'
        )
    );

-- Function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.user_roles (user_id, role)
  VALUES (new.id, 'user');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Create trigger for new user registration
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to get current user's role
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS app_role AS $$
BEGIN
  RETURN (
    SELECT role
    FROM public.user_roles
    WHERE user_id = auth.uid()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;