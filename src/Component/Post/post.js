const Post = (props) => {
  return (
    <div
      className="col-xs-1-12"
      onClick={() => props.loadDetail(props.post.id)}
    >
      <div className="card">
        <div className="card-body">
          <h6 className="card-title">ID : {props.post.id}</h6>
          <h3 className="card-title">Title : {props.post.title}</h3>
          <p className="card-text">Author : {props.post.author}</p>
        </div>
      </div>
      <div></div>
    </div>
  );
};
export default Post;
