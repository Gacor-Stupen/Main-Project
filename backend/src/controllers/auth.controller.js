import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    // 1. Cek email (Ganti findOne dengan findByEmail)
    const user = await User.findByEmail(email);
    if (user) return res.status(400).json({ message: "Email already exists" });

    // 2. Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Simpan ke PostgreSQL (Ganti "new User" & ".save()" menjadi satu fungsi .create)
    const newUser = await User.create(email, username, hashedPassword);

    if (newUser) {
      // Di PostgreSQL, primary key biasanya bernama 'id', bukan '_id'
      generateToken(newUser.id, res);

      res.status(201).json({
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        profilePic: newUser.profile_pic,
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.error("Error in signup controller:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields required" });
  }

  try {
    // 1. Cari user berdasarkan email
    const user = await User.findByEmail(email);

    if (!user) {
      return res.status(400).json({ message: "Email or password incorrect" });
    }

    // 2. Cek password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Email or password incorrect" });
    }

    // 3. Generate Token menggunakan user.id
    generateToken(user.id, res);

    res.status(200).json({
      id: user.id,
      username: user.username,
      email: user.email,
      profilePic: user.profile_pic,
    });
  } catch (error) {
    console.error("Error in login controller:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logout success" });
  } catch (error) {
    console.error("Error in logout controller:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
