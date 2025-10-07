import mysql from "mysql2/promise";

const pool = mysql.createPool({
  port: 3306,
  host: "localhost",
  user: "root",
  password: "123456",
  database: "websnack",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const getConnection = async () => {
  return await pool.getConnection();
};

export default getConnection;
export { pool };
