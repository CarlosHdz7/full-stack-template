export const createRoleDto = (data) => {
  const role_name = (data.role_name || "").trim();
  const description = (data.description || "").trim();

  const errors = [];

  if (!role_name) errors.push("role_name is required");
  if (role_name.length < 3)
    errors.push("role_name must be at least 3 characters long");

  return {
    isValid: errors.length === 0,
    errors,
    value: {
      role_name,
      description,
    },
  };
};
