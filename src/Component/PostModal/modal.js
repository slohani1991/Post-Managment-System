import { useEffect, useRef, useState } from "react";

import TextField from "@mui/material/TextField";

import axios from "axios";
import { SERVER } from "../../Constant/constants";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";


const Modal = () => {

  const postFormRef = useRef();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const onSave = (e) => {
    e.preventDefault();
    setLoading(true);
    const post = {
      title: postFormRef.current["title"].value,
      content: postFormRef.current["content"].value,
      author: postFormRef.current["author"].value,
    };

    axios
      .post(SERVER + "posts/1", post)
      .then((response) => {
        console.log(response);
        Swal.fire("Post Saved", "Your data is successfully saved!", "success");
        setLoading(false);
        navigate("/posts");
      })
      .catch((error) => {
        setLoading(false);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message,
        });
      });
  };

  useEffect(() => {
    postFormRef.current["title"].focus();
  }, [])

  return (
    <>
      <div style={{ "margin": 50 }}>
        <div className="col-lg-6">
          <h3>Add New Post</h3>
          <p>
            To save the new Post, please enter post title , full content and
            author name. Click on Save button to save the data.
          </p>
          <form ref={postFormRef}>
            <TextField
              autoFocus
              margin="dense"
              id="title"
              label="Post Title"
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              margin="dense"
              id="content"
              label="Post Content"
              type="text"
              fullWidth
              multiline
              variant="standard"
            />

            <TextField
              autoFocus
              margin="dense"
              id="author"
              label="Post Author Name"
              type="text"
              fullWidth
              variant="standard"
            />
            {loading === true ?
              <button class="btn btn-success mt-5" disabled>
                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                Saving...
              </button>
              :
              <button onClick={(e) => onSave(e)} className="btn btn-success mt-5">Save</button>
            }
            <button className="btn btn-danger ml-2 mt-5" type="reset">Reset</button>
          </form>

        </div>
      </div>
    </>
  );
};
export default Modal;
