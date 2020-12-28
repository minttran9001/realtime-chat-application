import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/index";
import Mint from "../../images/mint.jpg";
import Button from "../../components/Layout/UI/Button/index";
import "./style.scss";
import {
  AiOutlinePlusCircle,
  AiOutlineFileGif,
  AiOutlinePicture,
  AiOutlineHeart,
  AiOutlinePhone,
  AiOutlineInfoCircle,
  AiOutlineSend,
} from "react-icons/ai";
import { BsCameraVideo } from "react-icons/bs";
import { MdTagFaces } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  getRealTimeConversations,
  getRealTimeUser,
  updateMessage,
} from "../../actions";
const Home = () => {
  const [isSelected, setIsSelected] = useState("");
  const [userSelected, setUserSelected] = useState("");
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  const { users, conversations, loadingUser, loadingChat } = useSelector(
    (state) => state.user
  );
  const auth = useSelector((state) => state.auth);

  const viewUser = () => {
    dispatch(getRealTimeUser(auth.uid));
  };
  const selectItem = (index) => {
    if (isSelected !== "") {
      const prevItem = document.querySelectorAll(".friend")[isSelected];
      prevItem.classList.remove("isSelected");
      const curItem = document.querySelectorAll(".friend")[index];
      curItem.classList.add("isSelected");
      setIsSelected(index);
    } else {
      const curItem = document.querySelectorAll(".friend")[index];
      curItem.classList.add("isSelected");
      setIsSelected(index);
    }
  };
  const initChat = (user) => {
  
    const users = { uid_1: auth.uid, uid_2: user.uid };
    dispatch(getRealTimeConversations(users));
    setTimeout(() => {
      setUserSelected(user);
    }, 2000);
  };
  const submitMessage = (e) => {
    const msgObj = {
      user_uid_1: auth.uid,
      user_uid_2: userSelected.uid,
      message,
    };
    if (message !== "") {
      dispatch(updateMessage(msgObj));
    }
  };
  return (
    <Layout>
      <div className="homePage">
        <div className="friendList">
          {users.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                initChat(item);
                selectItem(index);
              }}
              className="friend"
            >
              <div className="avatar">
                <img src={Mint} alt="avatar" />
                <span
                  className={item.isOnline ? "isOnline" : "isOffline"}
                ></span>
              </div>
              <div className="friendState">
                <p className="friendName">{item.firstName + item.lastName}</p>
                <div className="friendLastText">
                  <p className="lastText">See you again </p>
                  <span></span>
                  <p>4 hours ago</p>
                </div>
              </div>
              <div className="friendButton">
                <button>
                  <div className="circle"></div>
                  <div className="circle"></div>
                  <div className="circle"></div>
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="chatBox">
          <div className="headBox">
            <div className="headUser">
              <img alt="avatar" src={Mint} />
              <p>{userSelected.firstName}</p>
            </div>
            <div className="headCall">
              <AiOutlinePhone onClick={viewUser} className="icon" />
              <BsCameraVideo className="icon" />

              <AiOutlineInfoCircle className="icon" />
            </div>
          </div>
          <div className="chatArea">
            {conversations.map((item, index) => (
              <p key={index}>{item.message}</p>
            ))}
          </div>
          <div className="typeArea">
            <div className="action">
              <AiOutlinePlusCircle className="icon" />
              <AiOutlinePicture className="icon" />
              <MdTagFaces className="icon" />
              <AiOutlineFileGif className="icon" />
            </div>
            <div className="input">
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                type="text"
                placeholder="Aa"
              />
              <MdTagFaces className="icon" />
            </div>
            <div className="likeButton">
              {message === "" ? (
                <AiOutlineHeart className="icon" />
              ) : (
                <AiOutlineSend onClick={submitMessage} className="icon" />
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default Home;
