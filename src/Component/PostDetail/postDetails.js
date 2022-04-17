import axios from "axios";
import React, { useState, useEffect } from "react";
import { SERVER } from "../../Constant/constants";
import Swal from "sweetalert2";
import Comments from "../../Container/Comments/comments";
import TextField from "@mui/material/TextField";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";



const PostDetail = () => {

  const [detail, setDetail] = useState({});
  const [flagComment, setFlagComment] = useState(false);
  const params = useParams();
  const postId = params.postId;
  const navigate = useNavigate();

  const headers = {
    'Authorization': `Bearer ${Cookies.get("accessToken")}`,
    'Content-Type': "application/json"
  }

  const onCommentHandler = async (e) => {
    e.preventDefault();
    if (e.keyCode === 13) {
      if (e.target.value === "") {

        Swal.fire({
          icon: "error",
          title: "Oops...Comment field empty",
          text: "Comment field must not be empty!!!Comment required!!",
        });

      } else {
        const commentData = {
          name: e.target.value,
        };
        try {
          await axios
            .post(SERVER + "comments/post/" + postId, commentData, headers);
          setFlagComment(!flagComment);
          Swal.fire("Commented", "Your comment has been posted.", "success");
          e.target.value = "";
        }
        catch (error) {
          Swal.fire({
            icon: "error",
            title: "Oops...Problem Saving Comment!!!",
            text: error.message,
          });
        }
      }
    }
  };

  const onDeleteHandler = async () => {
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
          try {
            const response = axios.delete(SERVER + "posts/" + postId);
            if (response) {
              swalWithBootstrapButtons.fire(
                "Deleted!",
                "Your Post has been deleted.",
                "success"
              );
              navigate("/postRedirect")
            }
          }
          catch (error) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: error.message,
            });
          }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            "Your imaginary data is safe :)",
            "error"
          );
        }
      });
  };

  const fetchPostDetail = async () => {
    try {
      const response = await axios
        .get(SERVER + "posts/" + postId);
      setDetail(response.data);
    }
    catch (error) {
      console.log(error.message);
    };
  }

  useEffect(async () => {
    fetchPostDetail();
  }, [postId]);

  if (params.postId) {
    return (
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{detail.title}</h5>
          <h6 className="card-subtitle mb-2 text-muted">
            Author : {detail.author}
          </h6>
          <p className="card-text">{detail.content}</p>
          <Comments id={detail.id} flagComment={flagComment} />
          <div>

            <TextField
              id="comment"
              label="Enter Comment and enter to save"
              variant="standard"
              className="m-2"
              fullWidth
              onKeyUp={(e) => onCommentHandler(e)}
            />

          </div>
          <button className="btn btn-success">Edit</button>
          <button
            className="btn btn-danger m-2"
            onClick={() => onDeleteHandler(detail.id)}
          >
            Delete
          </button>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default PostDetail;
