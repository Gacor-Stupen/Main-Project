import pkg from "pg";
const { Pool } = pkg;
import dotenv from "dotenv";
dotenv.config();

// Konfigurasi koneksi menggunakan URL dari .env
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const connectDB = async () => {
  try {
    // Mencoba melakukan koneksi
    const client = await pool.connect();
    console.log(`PostgreSQL connected: ${client.host}`);

    // Langsung lepaskan kembali ke pool setelah sukses tes koneksi
    client.release();
  } catch (error) {
    console.error("PostgreSQL connection error:", error.message);
    process.exit(1); // Keluar dari aplikasi jika gagal koneksi
  }
};

// Fungsi bantuan untuk menjalankan query SQL
export const query = (text, params) => pool.query(text, params);
