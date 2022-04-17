import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Post from "../../Component/Post/post";
import PostDetail from "../../Component/PostDetail/postDetails";
import { SERVER } from "../../Constant/constants";
import Cookies from "js-cookie";

const Posts = () => {
  const [postData, setPostData] = useState([]);

  const fetchPosts = async () => {

    const headers = {
      'Authorization': `Bearer ${Cookies.get("accessToken")}`,
      'Content-Type': "application/json"
    }

    const userEmail = Cookies.get("userEmail");

    try {
      const response = await axios.get(SERVER + "users/posts/byUser/" + userEmail, headers);
      setPostData(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  const postAsList = postData.map((data) => {
    return (

      <Link to={`${data.id}`} key={data.id}>
        <div className="col-lg-3 mt-4 float-left" key={data.id}>
          <Post post={data} />
        </div>
      </Link>

    );
  });
  return (
    <React.Fragment>
      {postAsList}
      <PostDetail></PostDetail>
    </React.Fragment>
  );
};

export default Posts;
