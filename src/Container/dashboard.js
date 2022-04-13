import React, { useState } from "react";
import Modal from "../Component/PostModal/modal";
import Posts from "./Posts/posts";
import PostDetail from "../Component/PostDetail/postDetails";
import { SelectedPostContext } from "../store/Selected";

const Dashboard = () => {
  const [updateFlag, setUpdateFlag] = useState(true);
  const [postID, setPostID] = useState(1);

  const updateFlagHandler = () => {
    setUpdateFlag(!updateFlag);
  };

  const updateSelectedPostHandler = (id) => {
    setPostID(id);
  };

  return (
    <SelectedPostContext.Provider value={postID}>
      <div className="col-md-12">
        <Modal updateFlagHandler={updateFlagHandler}></Modal>
        <h1>Welcome to Posts</h1>
        <Posts updateFlag={updateFlag} loadDetail={updateSelectedPostHandler} />
        <PostDetail updateFlagHandler={updateFlagHandler}></PostDetail>
      </div>
    </SelectedPostContext.Provider>
  );
};
export default Dashboard;
