import express from 'express';
import { v4 as uuid } from 'uuid';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
app.use(bodyParser.json());
app.use(cors())
const posts = {};

/**
 * 
 */
app.get('/posts', (req, res) => {
  res.send(posts);
})

/**
 * 
 */
app.post('/posts', (req, res) => {
  const id = uuid();
  const { title } = req.body;
  posts[id] = {
    id,
    title
  }
  return res.status(201).send(posts[id]);
});

/**
 * 
 */
app.listen(4000, () => {
  console.log('Posts is running on  port 4000');
})