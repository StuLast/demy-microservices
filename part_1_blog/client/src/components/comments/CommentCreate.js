import { useState, useRef } from 'react';
import axios from 'axios';

const CommentCreate = (props) => {
  const [comment, setComment] = useState('');
  const commentField = useRef();
  const { postId } = props;

  const handleCommentChange = (event) => {
    setComment(() => {
      return event.target.value;
    });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios.post(`http://localhost:4001/posts/${postId}/comments`, {
      content: comment
    });
    setComment(() => '');
    commentField.current.focus();
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Add Comment</label>
          <input className="form-control" type="text" value={comment} onChange={handleCommentChange} ref={commentField} />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default CommentCreate;