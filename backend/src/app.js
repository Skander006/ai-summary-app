import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import summaryRoutes from './routes/summary.js';
import {ConnectDB} from "./config/db.js";

dotenv.config();
ConnectDB();
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/summary', summaryRoutes);

app.get('/health', (req,res)=>{
    res.status(200).json({status : 'ok'});
});

const PORT = process.env.PORT || 2525;
app.listen(PORT, ()=>{
    console.log(`Serveur ecoute sur le port ${PORT}...`);
});