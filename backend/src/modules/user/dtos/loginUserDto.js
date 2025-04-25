export const loginUserDto = (data = {}) => {
  const email = (data.email ?? "").trim().toLowerCase();
  const password = (data.password ?? "").trim();

  const errors = [];

  if (!email) {
    errors.push("Email is required.");
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push("Email format is invalid.");
  }

  if (!password) {
    errors.push("Password is required.");
  } else if (password.length < 6) {
    errors.push("Password must be at least 6 characters long.");
  }

  return {
    isValid: errors.length === 0,
    errors,
    value: {
      email,
      password,
    },
  };
};
