import express from 'express';
import { connectDb } from './db/helpers.js';
import Router from './config/router.js';

const app = express();

app.use(express.json());
app.use('/api', Router);

async function startServer() {
  try {
    await connectDb();
    console.log('connected to mongodb');
    app.listen(3000, () => console.log('🤖 App is listening on port 3000'));
  } catch (err) {
    console.log('ERROR', err);
  }
}

startServer();
