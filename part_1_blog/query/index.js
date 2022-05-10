import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import axios from 'axios'

const posts = {};

const app = express();
app.use(bodyParser.json());
app.use(cors());

// EVENT HANDLERS
// ==============

const handlePostCreated = (data) => {
  const { id, title } = data;
  posts[id] = { id, title, comments: [] };
}

const handleCommentCreated = (data) => {
  const { id, content, postId, status } = data;
  const post = posts[postId];
  post.comments.push({ id, content, status });
}

const handleCommentUpdated = (data) => {
  const { id, content, postId, status } = data;
  const post = posts[postId];
  let comment = post.comments.find(comment => comment.id === id);
  comment.content = content;
  comment.status = status;
}


app.get('/posts', (req, res) => {
  res.send(posts);
});

// EVENT DIRECTOR
//===============

const eventsDirector = (type, data) => {
  switch (type) {
    case 'PostCreated':
      handlePostCreated(data);
      break;
    case 'CommentCreated':
      handleCommentCreated(data);
      break;
    case 'CommentUpdated':
      handleCommentUpdated(data);
      break;
    default:
      break;
  }
}

// EVENT LISTENER
//===============

app.post('/events', (req, res) => {
  const { type, data } = req.body;
  eventsDirector(type, data);
  res.send({});
});


// BootUp Actions
// ==============
const boot = async () => {
  try {
    const { data } = await axios.get('http://event-bus-srv:4005/events');
    if (data) {
      data.forEach(event => {
        eventsDirector(event.type, event.data);
      })
    }

  } catch (error) {
    console.log(error);
  }
};

app.listen(4002, async () => {
  console.log('Query service listening on port 4002');
  boot();
});