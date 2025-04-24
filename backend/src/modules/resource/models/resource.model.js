export const ResourceModel = {
  table: "resources",
  fields: [
    "resource_id",
    "resource_code",
    "resource_name",
    "resource_type",
    "parent_id",
    "module_conde",
    "display_order",
    "icon",
    "path",
    "description",
    "is_active",
  ],
  procedures: {
    create: "sp_create_resource",
  },
};
