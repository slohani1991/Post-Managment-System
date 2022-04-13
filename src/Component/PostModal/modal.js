import { useState } from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import { SERVER } from "../../Constant/constants";
import Swal from "sweetalert2";

const Modal = (props) => {
  const [open, setOpen] = useState(false);

  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [author, setAuthor] = useState();
  const [loading, setLoading] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const onSave = () => {
    const post = {
      title: title,
      content: content,
      author: author,
    };
    setLoading(true);
    axios
      .post(SERVER + "posts/1", post)
      .then((response) => {
        console.log(response);
        Swal.fire("Post Saved", "Your data is successfully saved!", "success");
        setLoading(false);
        handleClose();
        props.updateFlagHandler();
      })
      .catch((error) => {
        setLoading(false);
        handleClose();
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message,
        });
      });
  };

  return (
    <>
      <button
        className="btn btn-success float-right mt-3 mr-3"
        variant="outlined"
        onClick={handleClickOpen}
      >
        Add New Post[+]
      </button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Post</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To save the new Post, please enter post title , full content and
            author name. Click on Save button to save the data.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Post Title"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Post Content"
            type="text"
            fullWidth
            multiline
            variant="standard"
            onChange={(e) => setContent(e.target.value)}
          />

          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Post Author Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setAuthor(e.target.value)}
          />
        </DialogContent>
        {loading === true ? "Saving Data....." : ""}
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => onSave()}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default Modal;
