import express from 'express';
import { v4 as uuid } from 'uuid';
import bodyParser from 'body-parser';
import cors from 'cors';
import axios from 'axios';

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
app.post('/posts', async (req, res) => {
  const id = uuid();
  const { title } = req.body;
  posts[id] = {
    id,
    title
  }
  await axios.post('http://event-bus-srv:4005/events', {
    type: 'PostCreated',
    data: {
      id,
      title
    }
  }).catch(e => {
    console.log(e);
  });

  return res.status(201).send(posts[id]);
});

app.post('/events', (req, res) => {
  res.send({});
});

/**
 * 
 */
app.listen(4000, () => {
  console.log('Posts is running on  port 4000');
})