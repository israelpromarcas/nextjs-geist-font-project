import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import mysql from 'mysql2/promise';

const dbConfig = {
  host: process.env.MYSQL_HOST || '195.200.7.47',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || '@pROMARCAS147@2024@',
  database: process.env.MYSQL_DATABASE || 'vehicle_management',
  port: 3306,
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method not allowed' });
    return;
  }

  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    res.status(400).json({ message: 'Email, password, and role are required' });
    return;
  }

  try {
    const connection = await mysql.createConnection(dbConfig);

    // Check if user already exists
    const [existingUsers] = await connection.execute('SELECT * FROM users WHERE email = ?', [email]);
    if ((existingUsers as any[]).length > 0) {
      await connection.end();
      res.status(409).json({ message: 'User already exists' });
      return;
    }

    const passwordHash = await bcrypt.hash(password, 10);
    await connection.execute(
      'INSERT INTO users (email, password_hash, role) VALUES (?, ?, ?)',
      [email, passwordHash, role]
    );

    await connection.end();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
}
