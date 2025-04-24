export const createPermissionDto = (data) => {
  const permission_code = (data.permission_code || "").trim();
  const permission_name = (data.permission_name || "").trim();
  const description = (data.description || "").trim();

  const errors = [];

  if (!permission_code) errors.push("permission_code is required");
  if (!permission_name) errors.push("permission_name is required");
  if (permission_name.length < 3) errors.push("permission_name must be at least 3 characters long");

  return {
    isValid: errors.length === 0,
    errors,
    value: {
      permission_code,
      permission_name,
      description,
    },
  };
};

