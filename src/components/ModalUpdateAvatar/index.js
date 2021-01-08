import React, { useEffect, useRef, useState } from "react";
import "./style.scss";
import Button from "../Layout/UI/Button";
import Mint from "../../images/mint.jpg";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { updateUserAvatar } from "../../actions/auth";
const ModalUpdateAvatar = () => {
    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)
  const [temp, setTemp] = useState("");

  const closeModalPost = () => {
    modal.classList.remove('open')
  };
  let fileInput = useRef(null);
  let imgSrc = useRef(null);
  let modal = useRef(null)
  const openFileInput = () => {
    fileInput.click();
    setTemp("advanced");
  };
  const viewPhoto = () => {
    if (fileInput.files.length > 0) {
      imgSrc.src = URL.createObjectURL(fileInput.files[0]);
    }
  };
  const handleUpdateAvatar = ()=>{
      dispatch(updateUserAvatar(auth.uid,fileInput.files[0]))
  }
  useEffect(() => {
    if (temp == "advanced") {
      fileInput.addEventListener("change", viewPhoto);
    }
  }, [temp]);
  return (
    <div ref={el=>modal=el} className="modalUpdateAvatar">
      <div className="modalWrapper">
        <AiOutlineClose onClick={closeModalPost} className="icon" />
        <div className="modalTitle">
          <p>Update Avatar</p>
        </div>
        <div className="openFile">
          <button onClick={openFileInput}>Choose a file</button>
          <input
            type="file"
            className="input"
            ref={(el) => {
              fileInput = el;
            }}
          />
        </div>
        <div className="avatarBox">
          <div className="avatarWrap">
            <img
              id="image"
              ref={(el) => {
                imgSrc = el;
              }}
            />
          </div>
        </div>
        <div className="updateBtn">
          <Button onClick={handleUpdateAvatar}>Save</Button>
          <Button onClick={closeModalPost}>Cancel</Button>
        </div>
      </div>
    </div>
  );
};
export default ModalUpdateAvatar;
