import { NextApiResponse, NextApiRequest } from "next";
import { PrismaClient } from '@prisma/client';
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const SECRET_KEY = process.env.JWT_SECRET;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  if (!SECRET_KEY) {
    // JWT_SECRET이 .env에서 제대로 안 불려올 경우
    return res.status(500).json({ message: 'JWT secret key is not configured' });
  }

  const user = await prisma.user.findUnique({ where: { username } });

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: '1d' });

  res.status(200).json({ token, username: user.username });
}
