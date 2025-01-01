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
    DROP POLICY IF EXISTS "Superadmins can manage all roles" ON public.user_roles;
    DROP POLICY IF EXISTS "Users can view their own role" ON public.user_roles;
EXCEPTION
    WHEN undefined_object THEN 
        NULL;
END $$;

-- Create policies
CREATE POLICY "Users can view their own role"
    ON public.user_roles
    FOR SELECT
    USING (auth.uid() = user_id);

-- Allow superadmins to manage all roles without recursive check
CREATE POLICY "Superadmins can manage all roles"
    ON public.user_roles
    USING (
        EXISTS (
            SELECT 1 
            FROM public.user_roles 
            WHERE user_id = auth.uid() 
            AND role = 'superadmin'
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 
            FROM public.user_roles 
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