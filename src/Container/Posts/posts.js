import axios from "axios";
import { useEffect, useState } from "react";
import Post from "../../Component/Post/post";

const Posts = (props) => {
  const [postData, setPostData] = useState([]);

  const fetchPosts = () => {
    axios
      .get("http://localhost:8080/posts")
      .then((response) => setPostData(response.data))
      .catch((error) => console.log(error.message));
  };

  useEffect(() => {
    fetchPosts();
  }, [props.updateFlag]);

  const postAsList = postData.map((data) => {
    return (
      <div className="col-lg-3 mt-4 float-left" key={data.id}>
        <Post post={data} loadDetail={props.loadDetail} />
      </div>
    );
  });
  return postAsList;
};

export default Posts;
