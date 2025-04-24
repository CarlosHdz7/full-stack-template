export const createUserDto = (data) => {
  const username = (data.username || "").trim();
  const email = (data.email || "").trim().toLowerCase();
  const password_hash = (data.password_hash || "").trim();
  const first_name = (data.first_name || "").trim();
  const last_name = (data.last_name || "").trim();

  const errors = [];

  if (!username) errors.push("username is required");
  if (username.length < 3)
    errors.push("username must be at least 3 characters long");

  if (!email) errors.push("email is required");
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errors.push("email is invalid");

  if (!password_hash) errors.push("password_hash is required");
  if (password_hash.length < 6)
    errors.push("password_hash must be at least 6 characters long");

  return {
    isValid: errors.length === 0,
    errors,
    value: { username, email, password_hash, first_name, last_name },
  };
};
