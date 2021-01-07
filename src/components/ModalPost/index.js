import React from "react";
import "./style.scss";
import { AiOutlineClose, AiOutlinePicture } from "react-icons/ai";
import Mint from "../../images/mint.jpg";
import { BiLock, BiMap } from "react-icons/bi";
import Title from "../../components/Layout/UI/Title/index";
import Button from "../Layout/UI/Button";
import { useDispatch, useSelector } from "react-redux";

import { pushPost } from "../../actions/post";
const ModalPost = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const [postImage, setPostImage] = React.useState("");

  const closeModalPost = () => {
    document.querySelector(".modalPost").classList.remove("open");
  };
  const filePost = document.getElementById("filePost");
  const postImageElement = document.getElementById("postImageElement");
  const openFileInput = () => {
    filePost.click();
    setPostImage("advanced");
  };
  const imageBox = document.querySelector(".imageBox");
  const viewFile = (e) => {
 
    imageBox.classList.add("hasFile");

    // console.log(filePost.files.length);
    if (filePost.files.length > 0) {
      postImageElement.src = URL.createObjectURL(filePost.files[0]);
    }
    setPostImage("");
  };
  React.useEffect(() => {
    if (postImage != "") {
      filePost.addEventListener("change", viewFile);
    }
  }, [postImage]);
  const handlePost = () => {
    var postText = document.getElementById("postText").value;
    if (filePost.files.length > 0) {
      const post = {
        file: filePost.files[0],
        status: postText,
        uid:auth.uid
      };
      dispatch(pushPost(post));
      imageBox.classList.remove("hasFile");
      postImageElement.src = "";
      postText = "";
    }
  };
  return (
    <div className="modalPost">
      <div className="modalWrapper">
        <div className="head">
          <div className="title">
            <Title>Make a post</Title>
          </div>
          <AiOutlineClose onClick={closeModalPost} className="icon" />
        </div>
        <div className="poster">
          <div className="posterImage">
            <img src={Mint} />
          </div>
          <div className="posterName">
            <p>Mint</p>
            <div className="securityMode">
              <BiLock className="icon" />
              <span>Private</span>
            </div>
          </div>
        </div>
        <div className="statusBox">
          <textarea
            id="postText"
            placeholder="What are you thinking ?"
          ></textarea>
          <div className="imageBox">
            <img id="postImageElement" />
          </div>
        </div>
        <div className="postButton">
          <Button onClick={handlePost}>Post</Button>
          <div className="postIcon">
            <input type="file" id="filePost" />
            <AiOutlinePicture onClick={openFileInput} className="icon" />
            <BiMap className="icon" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default ModalPost;
