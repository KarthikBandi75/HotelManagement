import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/Mongodb.js';
import userRoutes from './Routes/userRoutes.js';
import adminRoutes from './Routes/adminRoutes.js';
import { initializeFenwickTree } from './Controllers/userController.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5776;

app.use(cors({ origin: 'http://localhost:5173', methods: ['GET', 'POST', 'PUT', 'DELETE'], credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);

app.listen(port, async () => {
  await connectDB();
  await initializeFenwickTree();
  console.log(`App is listening on port ${port}`);
});