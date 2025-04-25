import * as userService from "../services/user.service.js";
import { createUserDto } from "../dtos/createUserDto.js";
import { BcryptAdapter } from "../../../helpers/bcrypt.helper.js";
import { JwtAdapter } from "../../../helpers/jwt.helper.js";
import { loginUserDto } from "../dtos/loginUserDto.js";
import { parseJsonArray } from "../../../utils/parseJsonArray.utils.js";

export const listUsers = async (_, res) => {
  try {
    const users = await userService.getAllUsers();
    return res.json(users);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const addUser = async (req, res) => {
  const { isValid, errors, value } = createUserDto(req.body);

  if (!isValid) {
    return res.status(400).json({ message: "Validation error", errors });
  }

  try {
    const hashedPassword = BcryptAdapter.hash(value.password_hash);
    const userWithEncryptedPassword = {
      ...value,
      password_hash: hashedPassword,
    };
    await userService.createUser(userWithEncryptedPassword);
    return res.status(201).json({ ok: true });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const testJest = (_, res) => {
  return res.status(200).json({ message: "pong!" });
};

export const login = async (req, res) => {
  const { isValid, errors, value } = loginUserDto(req.body);

  if (!isValid) {
    return res.status(400).json({ message: "Validation error", errors });
  }
  const { email, password } = value;

  try {
    const user = await userService.loginUser(email);

    if (!user) {
      return res.status(404).json({ message: "User not found or inactive" });
    }

    const isMatch = await BcryptAdapter.compare(password, user.password_hash);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const roles = parseJsonArray(user.roles);
    const access = parseJsonArray(user.user_access_json);

    const payload = {
      uid: user.user_id,
      username: user.username,
      roles: roles.map((r) => r.role_name),
      access: access.map((a) => a.access_name),
      email: user.email,
    };

    const token = await JwtAdapter.generateToken(payload);

    return res.status(200).json({
      user: {
        user_id: user.user_id,
        username: user.username,
        email: user.email,
        roles,
      },
      token,
      access,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
