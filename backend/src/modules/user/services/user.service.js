import { connection } from "../../../database/connection.js";
import { UserModel } from "../models/user.model.js";

export const getAllUsers = async () => {
  const [rows] = await connection.query(`SELECT * FROM ${UserModel.table}`);
  return rows;
};

export const createUser = async ({ username, email, password_hash }) => {
  await connection.query(`CALL ${UserModel.procedures.create}(?, ?, ?)`, [
    username,
    email,
    password_hash,
  ]);
};

export const loginUser = async (email) => {
  const [rows] = await connection.query(`CALL ${UserModel.procedures.login}(?)`, [email]);
  return rows[0][0];
};

export const deletedUser = async (id) => {
  const [rows] = await connection.query(`CALL ${UserModel.procedures.delete}(?)`, [id]);
  return rows[0][0];
}

export const updateUser = async (id, { username, email, password_hash }) => {
  const [rows] = await connection.query(`CALL ${UserModel.procedures.update}(?, ?, ?, ?)`, [
    id,
    username,
    email,
    password_hash,
  ]);
  return rows[0][0];
}
