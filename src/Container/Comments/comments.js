import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import Comment from "../../Component/Comment/comment";
import Swal from "sweetalert2";
import { SERVER } from "../../Constant/constants";

const Comments = (props) => {
  const [commentData, setCommentData] = useState([]);
  const [flagComment, setFlagComment] = useState(false);

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
            .delete(SERVER + "comments/" + id)
            .then((response) => {
              setFlagComment(!flagComment);
              swalWithBootstrapButtons.fire(
                "Deleted!",
                "Your commnet has been deleted.",
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
  const fetchComment = useCallback(() => {
    axios
      .get("http://localhost:8080/comments/post/" + props.id)
      .then((response) => {
        setCommentData(response.data);
      })
      .catch((error) => console.log(error.message));
  }, [props.id]);

  useEffect(() => {
    fetchComment();
  }, [fetchComment, props.flagComment, flagComment]);

  const returnData = commentData.map((data, index) => {
    return (
      <Comment data={data} key={index} onDeleteHandler={onDeleteHandler} />
    );
  });
  return returnData;
};

export default Comments;
