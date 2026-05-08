import jwt from "jsonwebtoken";
import User from "../models/user.model.js"; // Pastikan pakai .js jika menggunakan ES Modules

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized - please login first" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ message: "Token invalid" });
    }

    // 1. Ganti cara pemanggilan. findById sekarang adalah fungsi di user.model.js kita.
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // 2. Karena SQL manual (SELECT *) mengambil semua kolom,
    // kita hapus password secara manual sebelum dimasukkan ke req.user.
    delete user.password;

    // 3. Masukkan ke request object
    req.user = user;

    next();
  } catch (error) {
    console.log("Error in auth middleware", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
