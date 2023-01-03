import express from 'express';

const app = express()

app.use((req, res) => {
  console.log(`incoming request${req}`)
})

app.listen(3000, () => console.log('🤖 App is listening on port 3000'));

