import { Pool } from "pg";
import { nanoid } from "nanoid";
import bcrypt from "bcrypt";

class UserRepositories {
  constructor() {
    this.pool = new Pool();
  }

  async createUser({ email, name, password }) {
    const id = `user-${nanoid(16)}`;
    const hashedPassword = await bcrypt.hash(password, 10);
    const created_at = new Date().toISOString();
    const updated_at = created_at;

    const query = {
      text: "INSERT INTO users VALUES($1, $2, $3, $4, $5, $6) RETURNING id",
      values: [id, name, email, hashedPassword, created_at, updated_at],
    };

    const result = await this.pool.query(query);
    return result.rows[0];
  }

  async verifyNewEmail(email) {
    const query = {
      text: "SELECT email FROM users WHERE email = $1",
      values: [email],
    };

    const result = await this.pool.query(query);
    return result.rows.length > 0;
  }

  async verifyUserCredential(email, password) {
    const query = {
      text: "SELECT id, password FROM users WHERE email = $1",
      values: [email],
    };

    const user = await this.pool.query(query);
    if (user.rows.length === 0) {
      return null;
    }

    const { id, password: hashedPassword } = user.rows[0];
    const isPasswordNatch = await bcrypt.compare(password, hashedPassword);

    if (!isPasswordNatch) {
      return null;
    }

    return id;
  }

  async getUserById(id) {
    const query = {
      text: "SELECT * FROM users WHERE id = $1",
      values: [id],
    };

    const result = await this.pool.query(query);

    return result.rows[0];
  }
}

const userRepositoriesInstance = new UserRepositories();
export default userRepositoriesInstance;
