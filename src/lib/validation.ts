export interface PasswordValidationResult 
{
  valid: boolean;
  message?: string;
}

// email regex validation
export function validateEmail(email: string): boolean 
{
  if (!email) return false;
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\\.,;:\s@\"]+\.)+[^<>()[\]\\.,;:\s@\"]{2,})$/i;
  return re.test(String(email).toLowerCase());
}

// min 8 chars, at least 1 lowercase, 1 uppercase and 1 num
export function validatePassword(password: string): PasswordValidationResult {
  if (!password) {
    return { valid: false, message: "Password is required!" };
  }

  if (password.length < 8) 
  {
    return { valid: false, message: "Password must be at least 8 characters long!" };
  }

  if (!/[a-z]/.test(password)) 
  {
    return { valid: false, message: "Password must include at least one lowercase letter!" };
  }

  if (!/[A-Z]/.test(password)) 
  {
    return { valid: false, message: "Password must include at least one uppercase letter!" };
  }

  if (!/[0-9]/.test(password)) 
  {
    return { valid: false, message: "Password must include at least one number!" };
  }

  return { valid: true };
}

const validationUtils = {
  validateEmail,
  validatePassword,
};

export default validationUtils;
