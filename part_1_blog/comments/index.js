import express from 'express';
import { v4 as uuid } from 'uuid';
import bodyParser from 'body-parser';
import cors from 'cors';
import axios from 'axios';

const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', async (req, res) => {

  const commentId = uuid();
  const { content } = req.body;
  const status = 'pending'
  const comments = commentsByPostId[req.params.id] || [];

  comments.push({ id: commentId, content, status });

  commentsByPostId[req.params.id] = comments;

  await axios.post('http://localhost:4005/events', {
    type: 'CommentCreated',
    data: {
      id: commentId,
      content,
      postId: req.params.id,
      status
    }
  }).catch(e => { console.log(e); });
  res.status(201).send(comments);
});

app.post('/events', async (req, res) => {
  const { type, data } = req.body;
  if (type === 'CommentModerated') {
    const { id, postId, status, content } = data;
    const comments = commentsByPostId[postId];
    const comment = comments.find(comment => comment.id === id);
    comment.status = status;

    await axios.post('http://localhost:4005/events',
      {
        type: "CommentUpdated",
        data: {
          ...comment,
          postId,
        }
      }).catch(e => console.log(e));
  }

  res.send({});
});

app.listen(4001, () => {
  console.log('Comments service up on port 4001');
})