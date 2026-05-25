import { query } from "../lib/db.js"; // Import fungsi query dari file koneksi kamu

const User = {
  // Fungsi untuk membuat user baru (Create)
  create: async (email, username, password) => {
    const sql = `
      INSERT INTO users (email, username, password)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const values = [email, username, password];
    const res = await query(sql, values);
    return res.rows[0]; // Mengembalikan data user yang baru dibuat
  },

  // Fungsi untuk mencari user berdasarkan email (FindOne)
  findByEmail: async (email) => {
    const sql = "SELECT * FROM users WHERE email = $1";
    const res = await query(sql, [email]);
    return res.rows[0];
  },

  // Fungsi untuk mencari berdasarkan ID
  findById: async (id) => {
    const sql = "SELECT * FROM users WHERE id = $1";
    const res = await query(sql, [id]);
    return res.rows[0];
  },
};

export default User;
