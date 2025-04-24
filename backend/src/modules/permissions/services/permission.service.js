import { connection } from "../../../database/connection.js";
import { PermissionModel } from "../models/permission.model.js";

export const getAllPermissions = async () => {
  const [rows] = await connection.query(`SELECT * FROM ${PermissionModel.table}`);
  return rows;
};

export const createPermission = async ({ permission_code, permission_name, description }) => {
  await connection.query(
    `CALL ${PermissionModel.procedures.create}(?, ?, ?)`,
    [permission_code, permission_name, description]
  );
};

export const assignPermissionToRole = async ({ role_id, resource_id, permission_id }) => {
  await connection.query(
    `CALL ${PermissionModel.procedures.assignToRole}(?, ?, ?)`,
    [role_id, resource_id, permission_id]
  );
};
