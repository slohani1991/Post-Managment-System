import "./comment.css";

const Comment = (props) => {
  return (
    <div className="d-flex justify-content-center py-2">
      <div className="second py-2 px-2">
        <span className="text1">{props.data.name}</span>
        <div className="d-flex justify-content-between py-1 pt-2"></div>
      </div>
      <button
        className="btn btn-danger"
        onClick={() => props.onDeleteHandler(props.data.id)}
      >
        X
      </button>
    </div>
  );
};
export default Comment;
