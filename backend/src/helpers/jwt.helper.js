import jwt from "jsonwebtoken";

import { envs } from "../config/envs.config.js";

const JWT_SECRET = envs.jwt.secret;
const DEFAULT_EXPIRES_IN = envs.jwt.expiresIn;

export class JwtAdapter {
  static generateToken(payload, duration = DEFAULT_EXPIRES_IN) {
    return new Promise((resolve) => {
      jwt.sign(payload, JWT_SECRET, { expiresIn: duration }, (err, token) => {
        if (err) return resolve(null);
        resolve(token);
      });
    });
  }

  static validateToken(token) {
    return new Promise((resolve) => {
      jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) return resolve(null);
        resolve(decoded);
      });
    });
  }
}
