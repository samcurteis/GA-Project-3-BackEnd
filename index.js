import express from 'express';
import { connectDb } from './db/helpers.js';

const app = express();

app.use((req, res) => {
  console.log(`incoming request${req}`);
  return res.send('you made a request to Adventure countires something');
});

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
