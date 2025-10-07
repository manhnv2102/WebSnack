// src/models/user.model.ts
import { pool } from "../config/database";

export type UserRow = {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  password: string; // plaintext (tạm thời để test)
};

export async function findUserByEmailAndPassword(
  email: string,
  password: string
): Promise<Omit<UserRow, "password"> | null> {
  const [rows] = await pool.query(
    "SELECT id, name, email, phone FROM users WHERE email = ? AND password = ? LIMIT 1",
    [email, password]
  );
  const arr = rows as any[];
  return arr.length ? arr[0] : null;
}
