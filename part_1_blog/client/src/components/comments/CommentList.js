const CommentList = (props) => {
  const { comments } = props;

  const renderCommentContent = (comment) => {
    switch (comment.status) {
      case "pending":
        return "Comment awaiting moderation";
      case "rejected":
        return "Comment rejected by moderators";
      case "approved":
        return comment.content
      default: return "Comment awaiting moderation";
    }
  }

  const renderComments = comments.map(comment => {
    return (
      <li key={comment.id} className="">
        {renderCommentContent(comment)}
      </li>
    );
  });

  return (
    <ul className="">
      {renderComments}
    </ul>
  )

}

export default CommentList;