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

  try {
    const connection = await mysql.createConnection(dbConfig);

    // Check if default user exists
    const [rows] = await connection.execute('SELECT * FROM users WHERE email = ?', ['goes95@gmail.com']);
    if ((rows as any[]).length > 0) {
      await connection.end();
      res.status(200).json({ message: 'Default user already exists' });
      return;
    }

    // Create default user with password 654321 hashed
    const passwordHash = await bcrypt.hash('654321', 10);
    await connection.execute(
      'INSERT INTO users (email, password_hash, role) VALUES (?, ?, ?)',
      ['goes95@gmail.com', passwordHash, 'manager']
    );

    await connection.end();
    res.status(201).json({ message: 'Default user created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating default user', error });
  }
}
