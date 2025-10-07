import getConnection from "../config/database";

const handleGetAllUser = async () => {
  const connection = await getConnection();
  try {
    const [results] = await connection.query("SELECT * FROM `users`");
    return results;
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    connection.release(); // ĐÂY LÀ QUAN TRỌNG
  }
};

const registerNewUser = async (
  name: string,
  email: string,
  password: string,
  phone: string
) => {
  const connection = await getConnection();
  try {
    const sql =
      "INSERT INTO `users`(`name`,`email`,`password`,`phone`) VALUES (?,?,?,?)";
    const values = [name, email, password, phone];
    const [results] = await connection.execute(sql, values);
    return results;
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    connection.release(); // ĐÂY LÀ QUAN TRỌNG
  }
};

export { registerNewUser, handleGetAllUser };
