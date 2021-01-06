import React from "react";
import "./style.scss";
import { AiOutlineClose, AiOutlinePicture } from "react-icons/ai";
import Mint from "../../images/mint.jpg";
import { BiLock, BiMap } from "react-icons/bi";
import Title from "../../components/Layout/UI/Title/index";
import Button from "../Layout/UI/Button";
const ModalPost = () => {
  const [postImage, setPostImage] = React.useState("");
  const fileInput = document.getElementById("filePost");
  const postImageElement = document.getElementById("postImageElement");
  const closeModalPost = () => {
    document.querySelector(".modalPost").classList.remove("open");
  };
  const openFileInput = () => {
    fileInput.click();
    setPostImage("advanced");

  };
  const viewFile = (e) => {
    const imageBox = document.querySelector(".imageBox");
    imageBox.classList.add("hasFile");

    console.log(fileInput.files[0]);
   if(fileInput.files!='')
   {
    postImageElement.src = URL.createObjectURL(fileInput.files[0]);
   }
    setPostImage("");
  };
  React.useEffect(() => {

    if (postImage != "") {
      fileInput.addEventListener("change", viewFile);
    }
  }, [postImage]);
  const handlePost = ()=>{
    
  }
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
          <textarea placeholder="What are you thinking ?"></textarea>
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
