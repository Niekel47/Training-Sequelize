import { Pool } from "pg";

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  password: "123456",
  database: "trainning",
  port: "5432",
});

// const getAllUsers = async (req, res) => {
//   return res.render('./views/user.ejs');
// };

// const getUserById = async (req, res) => {
//   const id = parseInt(req.params.id);
//   const response = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
//   res.json(response.rows);
// };

// const createUser = async (req, res) => {
//   const { name, email } = req.body;
//   const response = await pool.query(
//     "INSERT INTO users (name, email) VALUES ($1, $2)",
//     [name, email]
//   );
//   res.json({
//     message: "User Added successfully",
//     body: {
//       user: { name, email },
//     },
//   });
// };

// const updateUser = async (req, res) => {
//   const id = parseInt(req.params.id);
//   const { name, email } = req.body;

//   const response = await pool.query(
//     "UPDATE users SET name = $1, email = $2 WHERE id = $3",
//     [name, email, id]
//   );
//   res.json("User Updated Successfully");
// };

// const deleteUser = async (req, res) => {
//   const id = parseInt(req.params.id);
//   await pool.query("DELETE FROM users where id = $1", [id]);
//   res.json(`User ${id} deleted Successfully`);
// };

export default {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
