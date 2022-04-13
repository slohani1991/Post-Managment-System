import axios from "axios";
import React, { useState, useEffect } from "react";
import { SERVER } from "../../Constant/constants";
import Swal from "sweetalert2";
import Comments from "../../Container/Comments/comments";
import TextField from "@mui/material/TextField";

const PostDetail = (props) => {
  const [detail, setDetail] = useState([]);
  const [comment, setComment] = useState();
  const [flagComment, setFlagComment] = useState(false);

  const fetchPostDetail = (id) => {
    axios
      .get(SERVER + "posts/detail/" + id)
      .then((response) => {
        setDetail(response.data);
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message,
        });
      });
  };

  const onCommentHandler = (e, id) => {
    if (e.keyCode === 13) {
      const commentData = {
        name: comment,
      };
      axios
        .post(SERVER + "comments/post/" + id, commentData)
        .then((response) => {
          setFlagComment(!flagComment);
          Swal.fire("Commented", "Your comment has been posted.", "success");
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.message,
          });
        });
    }
  };

  const onDeleteHandler = (id) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(SERVER + "posts/" + id)
            .then((response) => {
              props.updateFlagHandler();
              swalWithBootstrapButtons.fire(
                "Deleted!",
                "Your Post has been deleted.",
                "success"
              );
            })
            .catch((error) => {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.message,
              });
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            "Your imaginary data is safe :)",
            "error"
          );
        }
      });
  };

  useEffect(() => {
    fetchPostDetail(props.id);
  }, [props.id, flagComment]);

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{detail.title}</h5>
        <h6 className="card-subtitle mb-2 text-muted">
          Author : {detail.author}
        </h6>
        <p className="card-text">{detail.content}</p>
        <Comments id={props.id} flagComment={flagComment} />
        <div>
          <TextField
            id="comment"
            label="Enter Comment and enter to save"
            variant="standard"
            className="m-2"
            fullWidth
            onKeyUp={(e) => onCommentHandler(e, props.id)}
            onKeyDown={(e) => setComment(e.target.value)}
          />
        </div>
        <button className="btn btn-success">Edit</button>
        <button
          className="btn btn-danger m-2"
          onClick={() => onDeleteHandler(props.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default PostDetail;
