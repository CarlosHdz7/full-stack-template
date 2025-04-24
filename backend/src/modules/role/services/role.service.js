import { connection } from "../../../database/connection.js";
import { RoleModel } from "../models/role.model.js";

export const getAllRoles = async () => {
  const [rows] = await connection.query(`SELECT * FROM ${RoleModel.table}`);
  return rows;
};

export const createRole = async ({ role_name, description }) => {
  await connection.query(
    `CALL ${RoleModel.procedures.create}(?, ?)`,
    [role_name, description]
  );
};

export const assignRoleToUser = async ({ user_id, role_id }) => {
  await connection.query(`CALL sp_assign_role(?, ?)`, [user_id, role_id]);
};
