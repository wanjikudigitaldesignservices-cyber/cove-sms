-- Create custom roles type
CREATE TYPE user_role AS ENUM ('ADMIN', 'TEACHER', 'STUDENT', 'PARENT');

-- Create user_roles table to map Supabase Auth users to their roles
CREATE TABLE user_roles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    role user_role NOT NULL DEFAULT 'STUDENT',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(user_id)
);

-- Enable RLS on the user_roles table itself
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;

-- Admins can do everything
CREATE POLICY "Admins have full access to user_roles"
ON user_roles
FOR ALL
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM user_roles
        WHERE user_roles.user_id = auth.uid()
        AND user_roles.role = 'ADMIN'
    )
);

-- Users can read their own role
CREATE POLICY "Users can read their own role"
ON user_roles
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

-- Function to get the current user's role securely in RLS policies
CREATE OR REPLACE FUNCTION public.get_user_role()
RETURNS user_role AS $$
  SELECT role FROM public.user_roles WHERE user_id = auth.uid() LIMIT 1;
$$ LANGUAGE sql SECURITY DEFINER;

-- Example: Enabling RLS on a 'students' table (assume it exists or will be created)
/*
CREATE TABLE students (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id),
    name TEXT NOT NULL,
    year TEXT,
    -- other fields
);

ALTER TABLE students ENABLE ROW LEVEL SECURITY;

-- Admins can manage all students
CREATE POLICY "Admins can manage students"
ON students FOR ALL TO authenticated
USING (auth.user_role() = 'ADMIN');

-- Teachers can view all students (or filter by their classes)
CREATE POLICY "Teachers can view students"
ON students FOR SELECT TO authenticated
USING (auth.user_role() = 'TEACHER');

-- Students can only view their own record
CREATE POLICY "Students can view own record"
ON students FOR SELECT TO authenticated
USING (user_id = auth.uid());

-- Parents can view their children's records (assuming a parent_student table exists)
CREATE POLICY "Parents can view their children"
ON students FOR SELECT TO authenticated
USING (
    auth.user_role() = 'PARENT' AND
    id IN (SELECT student_id FROM parent_students WHERE parent_id = auth.uid())
);
*/

-- Trigger to automatically create a user_roles entry when a new user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.user_roles (user_id, role)
  VALUES (new.id, 'STUDENT'); -- Default to student, an admin can change this later
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
