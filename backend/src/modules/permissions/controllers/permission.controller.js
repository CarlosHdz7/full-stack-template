import { assignPermissionToRoleDto } from "../dtos/assignPermissionToRoleDto.js";
import { createPermissionDto } from "../dtos/createPermissionDto.js";
import * as permissionService from "../services/permission.service.js";

export const listPermissions = async (_, res) => {
  try {
    const permissions = await permissionService.getAllPermissions();
    return res.json(permissions);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const addPermission = async (req, res) => {
  const { isValid, errors, value } = createPermissionDto(req.body);

  if (!isValid) {
    return res.status(400).json({
      message: "Validation error",
      errors,
    });
  }

  try {
    await permissionService.createPermission(value);
    return res.status(201).json({ ok: true });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const assignPermissionToRole = async (req, res) => {
  const { isValid, errors, value } = assignPermissionToRoleDto(req.body);

  if (!isValid) {
    return res.status(400).json({
      message: "Validation error",
      errors,
    });
  }

  try {
    await permissionService.assignPermissionToRole(value);
    return res.status(200).json({ message: "Permission assigned to role successfully." });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updatePermission = async (req, res) => {
  const { id } = req.params;
  const { permission_code, permission_name, description } = req.body;

  try {
    await permissionService.updatePermission(id, {
      permission_code,
      permission_name,
      description,
    });
    return res.status(200).json({ message: "Permission updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export const deletePermission = async (req, res) => {
  const { id } = req.params;

  try {
    await permissionService.deletePermission(id);
    return res.status(200).json({ message: "Permission deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}