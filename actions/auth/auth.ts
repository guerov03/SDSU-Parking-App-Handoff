import { createClient } from "@/lib/supabase/browser-client";
import { validateEmail, validatePassword } from "@/lib/validation";

interface FormData {
  email: string;
  password: string;
}

// addded a sign up user validation function
export async function signup(data: FormData) 
{
  if (!validateEmail(data.email)) 
    {
    return {
      status: 422,
      data: null,
      error: "Invalid Email Address!",
    };
  }

  const passwordCheck = validatePassword(data.password);
  if (!passwordCheck.valid) 
    {
    return {
      status: 422,
      data: null,
      error: passwordCheck.message,
    };
  }

  const supabase = await createClient();
  const { data: user, error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
  });

  if (user) {
    return {
      status: 200,
      data: user,
    };
  }
  return {
    status: 400,
    data: null,
    error: error?.message,
  };
}

// Sign in user
export async function signin(data: FormData) {
  // Validate input
  if (!validateEmail(data.email)) {
    return {
      status: 422,
      data: null,
      error: "Invalid email address.",
    };
  }

  const passwordCheck = validatePassword(data.password);
  if (!passwordCheck.valid) {
    return {
      status: 422,
      data: null,
      error: passwordCheck.message,
    };
  }

  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  });
  if (user) {
    return {
      status: 200,
      data: user,
    };
  }

  return {
    status: 400,
    data: null,
    error: error?.message,
  };
}
