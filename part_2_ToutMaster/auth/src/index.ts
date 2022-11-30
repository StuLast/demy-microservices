import express from 'express';
import { json } from 'body-parser';

const app = express();
app.use(json());

app.get('/users/currentuser', (req, res) => {
  res.status(200).send('Hi there');
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
