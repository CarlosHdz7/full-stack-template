import { connection } from "../../../database/connection.js";
import { ResourceModel } from "../models/resource.model.js";

export const createResource = async ({
  resource_code,
  resource_name,
  resource_type,
  parent_id,
  module_conde,
  display_order,
  icon,
  path,
  description,
}) => {
  await connection.query(
    `CALL ${ResourceModel.procedures.create}(?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      resource_code,
      resource_name,
      resource_type,
      parent_id,
      module_conde,
      display_order,
      icon,
      path,
      description,
    ]
  );
};

export const getAllResources = async () => {
  const [rows] = await connection.query(`SELECT * FROM ${ResourceModel.table}`);
  return rows;
};
