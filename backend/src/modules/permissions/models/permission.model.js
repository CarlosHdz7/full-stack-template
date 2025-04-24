export const PermissionModel = {
  table: "permissions",
  fields: [
    "permission_id",
    "permission_code",
    "permission_name",
    "description",
  ],
  procedures: {
    create: "sp_create_permission",
    assignToRole: "sp_assign_permission_to_role",
  },
};
