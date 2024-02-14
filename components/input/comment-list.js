import classes from "./comment-list.module.css";

function CommentList({ comments }) {
  return (
    <ul className={classes.comments}>
      {/* Render list of comments - fetched from API */}
      {comments.map((com) => {
        return (
          <li key={com._id}>
            <p>{com.text}</p>
            <div>
              By <address>{com.name}</address>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default CommentList;
