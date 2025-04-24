export const assignPermissionToRoleDto = (data) => {
    const role_id = Number(data.role_id);
    const resource_id = Number(data.resource_id);
    const permission_id = Number(data.permission_id);
  
    const errors = [];
  
    if (!role_id || isNaN(role_id)) errors.push("role_id is required and must be a valid number");
    if (!resource_id || isNaN(resource_id)) errors.push("resource_id is required and must be a valid number");
    if (!permission_id || isNaN(permission_id)) errors.push("permission_id is required and must be a valid number");
  
    return {
      isValid: errors.length === 0,
      errors,
      value: {
        role_id,
        resource_id,
        permission_id,
      },
    };
  };
  