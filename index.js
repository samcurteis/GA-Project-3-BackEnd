import express from 'express';
import { connectDb } from './db/helpers.js';


const app = express()

app.use((req, res) => {
  console.log(`incoming request${req}`)
})

async function startServer(){
  try{
    await connectDb()
    app.listen(3000, () => console.log('🤖 App is listening on port 3000'));
  }catch(err){
    console.log('ERROR', err)
  }
}

