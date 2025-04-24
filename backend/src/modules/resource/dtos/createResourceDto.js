export const createResourceDto = (data) => {
  const resource_code = (data.resource_code || "").trim();
  const resource_name = (data.resource_name || "").trim();
  const resource_type = (data.resource_type || "").trim();
  const parent_id = data.parent_id ?? null;
  const module_conde = (data.module_conde || "").trim();
  const display_order = Number(data.display_order) || 0;
  const icon = (data.icon || "").trim();
  const path = (data.path || "").trim();
  const description = (data.description || "").trim();

  const errors = [];

  if (!resource_code) errors.push("resource_code is required");
  if (!resource_name) errors.push("resource_name is required");
  if (
    !["PAGE", "SIDEBAR_ITEM", "COMPONENT", "API_ENDPOINT"].includes(
      resource_type
    )
  )
    errors.push(
      "resource_type must be one of: PAGE, SIDEBAR_ITEM, COMPONENT, API_ENDPOINT"
    );

  return {
    isValid: errors.length === 0,
    errors,
    value: {
      resource_code,
      resource_name,
      resource_type,
      parent_id,
      module_conde,
      display_order,
      icon,
      path,
      description,
    },
  };
};
