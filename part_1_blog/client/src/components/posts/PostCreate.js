import { useState, useRef } from 'react';
import axios from 'axios';

const PostCreate = () => {
  const [title, setTitle] = useState('');
  const inputField = useRef(null);

  const handleOnChange = (event) => {
    setTitle(() => {
      return event.target.value;
    });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!title) {
      return
    };

    await axios.post('http://localhost:4000/posts', {
      title
    });

    setTitle(() => {
      return '';
    });
    inputField.current.focus();
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label >Title</label>
          <input type="text" className="form-control" onChange={handleOnChange} value={title} ref={inputField} />
        </div>
        <button className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default PostCreate;