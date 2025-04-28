export const RoleModel = {
  table: "roles",
  fields: ["id", "name"],
  procedures: {
    create: "sp_create_role",
    update: "sp_update_role",
    delete: "sp_delete_role",
  },
};
