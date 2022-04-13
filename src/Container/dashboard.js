import React, { useState } from "react";
import Modal from "../Component/PostModal/modal";
import Posts from "./Posts/posts";
import PostDetail from "../Component/PostDetail/postDetails";

const Dashboard = () => {
  const [updateFlag, setUpdateFlag] = useState(true);
  const [postDetail, setPostDetail] = useState(1);

  const updateFlagHandler = () => {
    setUpdateFlag(!updateFlag);
  };

  const updateSelectedPostHandler = (id) => {
    setPostDetail(id);
  };

  return (
    <div className="col-md-12">
      <Modal updateFlagHandler={updateFlagHandler}></Modal>
      <h1>Welcome to Posts</h1>
      <Posts updateFlag={updateFlag} loadDetail={updateSelectedPostHandler} />
      <PostDetail
        id={postDetail}
        updateFlagHandler={updateFlagHandler}
      ></PostDetail>
    </div>
  );
};
export default Dashboard;
