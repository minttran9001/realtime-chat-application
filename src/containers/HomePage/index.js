import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/index";
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
  AiOutlineCheckCircle,
  AiOutlineArrowLeft,
  AiOutlineUser,
  AiOutlineDelete,
  AiOutlineBell,
  AiOutlineLock,
} from "react-icons/ai";
import { BiLoaderCircle } from "react-icons/bi";
import { RiSendPlaneFill } from "react-icons/ri";
import { BsCameraVideo } from "react-icons/bs";
import { MdTagFaces } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  getRealTimeConversations,
  getRealTimeUser,
  setSeenMessage,
  updateMessage,
} from "../../actions";
import noavt from "../../images/noavtar.png";
import Title from "../../components/Layout/UI/Title/index";
import { NavLink } from "react-router-dom";
const Home = () => {
  const [isSelected, setIsSelected] = useState("");
  const [userSelected, setUserSelected] = useState("");
  const [message, setMessage] = useState("");
  const [messageImg, setMessageImg] = useState("");
  const dispatch = useDispatch();
  const [menuSelected, setMenuSelected] = useState(-1);
  const {
    users,
    conversations,
    loadingUser,
    loadingChat,
    lastestDoc,
  } = useSelector((state) => state.user);
  const auth = useSelector((state) => state.auth);

  const viewUser = () => {
    dispatch(getRealTimeUser(auth.uid));
  };
  useEffect(() => {
    viewUser();
    const container = document.getElementById("homePage")
    window.addEventListener("resize", () => {
      if(container !==null)
      {
        if (window.innerWidth > 1200) {
          container.style.transform = "translateX(0%)";
        }
      }
    });
  }, []);
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
    setUserSelected(user);
    dispatch(getRealTimeConversations(users));
    if (window.innerWidth <= 1200) {
      document.getElementById("homePage").style.transform = "translateX(-100%)";
    }
  };
  useEffect(() => {
    if (userSelected != "") {
      dispatch(
        getRealTimeConversations({
          uid_1: auth.uid,
          uid_2: userSelected.uid,
          type: "afterSend",
        })
      );
    }
  }, [userSelected]);
  useEffect(() => {
    if (userSelected !== "" && !loadingChat) {
      let chatArea = document.getElementById("chatArea");
      chatArea.scrollTop = chatArea.scrollHeight;
    }
  }, [conversations]);
  useEffect(() => {
    if (messageImg != "") {
      img.addEventListener("change", viewFile);
    }
  }, [messageImg]);

  const img = document.getElementById("fileInput");
  const messImgElement = document.getElementById("messageImg");
  const openFile = (e) => {
    img.click();
    setMessageImg("advanced");
  };
  const viewFile = (e) => {
    const fileSend = document.querySelector(".fileSend");
    fileSend.classList.add("hasFile");
    messImgElement.src = URL.createObjectURL(img.files[0]);
  };

  const submitMessageFile = (e) => {
    e.preventDefault();
    const msgObj = {
      user_uid_1: auth.uid,
      user_uid_2: userSelected.uid,
      file: img.files[0],
    };

    dispatch(updateMessage({ msgObj: msgObj, type: "file" }));
    const fileSend = document.querySelector(".fileSend");
    fileSend.classList.remove("hasFile");
    messImgElement.src = "";
    dispatch(
      getRealTimeConversations({
        uid_1: auth.uid,
        uid_2: userSelected.uid,
        type: "afterSend",
      })
    );
  };
  const submitMessage = (e) => {
    e.preventDefault();
    const msgObj = {
      user_uid_1: auth.uid,
      user_uid_2: userSelected.uid,
      message,
    };
    if (message !== "") {
      dispatch(updateMessage({ msgObj: msgObj }));
      dispatch(
        getRealTimeConversations({
          uid_1: auth.uid,
          uid_2: userSelected.uid,
          type: "afterSend",
        })
      );

      // let chatArea = document.getElementById("chatArea");
      // chatArea.scrollTop = chatArea.scrollHeight;

      setMessage("");
    }
  };
  const handleScroll = () => {
    let body = document.body;
    let chatArea = document.querySelector(".chatArea");
    chatArea = chatArea.clientHeight ? chatArea : body;

    if (chatArea.scrollTop == 0) {
      // const users = { uid_1: auth.uid, uid_2: userSelected.uid,lastestDoc };
      // dispatch(getLoadMoreConversations(users))
      // console.log(users)
    }
  };
  const handleSeen = (e) => {
    dispatch(setSeenMessage({ uid_1: auth.uid, uid_2: userSelected.uid }));
  };
  const handleCloseFriendBox = (e) => {
    e.stopPropagation();
    if (menuSelected >= 0) {
      const myTarget = document.querySelectorAll(".userMenu")[menuSelected];
      const clicked = e.target.className;
      if (clicked !== myTarget) {
        myTarget.classList.remove("open");
        setMenuSelected(-1);
      }
    }
  };
  const handleOpenFriendBox = (e, index) => {
    e.stopPropagation();
    document.querySelectorAll(".userMenu")[index].classList.add("open");
    setMenuSelected(index);
    if (menuSelected >= 0) {
      document
        .querySelectorAll(".userMenu")
        [menuSelected].classList.remove("open");
    }
  };
  const toggleListFriend = () => {
    document.getElementById("homePage").style.transform = "translateX(0)";
  };
  return (
    <Layout>
     <div className="homepage-wrap">
     <div id="homePage" className="homePage">
        <div className="friendListWrap is-active">
          {!loadingUser ? (
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
                    <img
                      src={item.avatarUrl != null ? item.avatarUrl : noavt}
                      alt="avatar"
                    />
                    <span
                      className={item.isOnline ? "isOnline" : "isOffline"}
                    ></span>
                  </div>
                  <div className="friendState">
                    <p className="friendName">
                      {item.firstName + " " + item.lastName}
                    </p>
                    <div className="friendLastText">
                      <p className="lastText">See you again </p>
                      <span></span>
                      <p>4 hours ago</p>
                    </div>
                  </div>
                  <div
                    className="friendButton"
                    onClick={(e) => {
                      index !== menuSelected
                        ? handleOpenFriendBox(e, index)
                        : handleCloseFriendBox(e, index);
                    }}
                  >
                    <button>
                      <div className="circle"></div>
                      <div className="circle"></div>
                      <div className="circle"></div>
                    </button>
                  </div>
                  <div className="userMenu">
                    <div className="menuGroup">
                      <div className="menuItem">
                        <AiOutlineUser className="icon" />
                        <NavLink to={`/profile/${item.key}`}>
                          Go to profile page
                        </NavLink>
                      </div>
                      <div className="menuItem">
                        <AiOutlineBell className="icon" />
                        <span>Turn off notification</span>
                      </div>
                    </div>
                    <div className="menuGroup">
                      <div className="menuItem">
                        <AiOutlineDelete className="icon" />
                        <span>Delete conversation</span>
                      </div>
                      <div className="menuItem">
                        <AiOutlineLock className="icon" />
                        <span>Block</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className=" loading">
              <BiLoaderCircle className="icon" />
            </div>
          )}
        </div>
        {userSelected !== "" ? (
          <div className="chatBox">
            <div className="headBox">
              <AiOutlineArrowLeft
                onClick={toggleListFriend}
                className="icon closeChatbox"
              />
              <div className="headUser">
                <img
                  alt="avatar"
                  src={
                    userSelected.avatarUrl != null
                      ? userSelected.avatarUrl
                      : noavt
                  }
                />
                <NavLink to={`/profile/${userSelected.key}`}>
                  <p>{userSelected.firstName}</p>
                </NavLink>
              </div>
              <div className="headCall">
                <AiOutlinePhone className="icon" />
                <BsCameraVideo className="icon" />

                <AiOutlineInfoCircle className="icon" />
              </div>
            </div>
            {!loadingChat ? (
              <div onScroll={handleScroll} id="chatArea" className="chatArea">
                <div className="chatAreaWrap">
                  {conversations.map((item, index) => (
                    <div
                      key={index}
                      className={
                        auth.uid === item.user_uid_1
                          ? "chatWrapper right"
                          : "chatWrapper left"
                      }
                    >
                      {auth.uid !== item.user_uid_1 ? (
                        <img
                          alt={userSelected.avatarUrl}
                          className="avatar"
                          src={
                            userSelected.avatarUrl != null
                              ? userSelected.avatarUrl
                              : noavt
                          }
                        />
                      ) : (
                        <></>
                      )}
                      {item.type !== "file" ? (
                        <div className="messageWrap">
                          <p key={index}>{item.message}</p>
                        </div>
                      ) : (
                        <img
                          className="messageFile"
                          alt={index}
                          src={item.file}
                          key={index}
                        />
                      )}
                      <AiOutlineCheckCircle
                        className={
                          auth.uid === item.user_uid_1 && !item.isView
                            ? "icon"
                            : "icon gone"
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="chatArea loading">
                <BiLoaderCircle className="icon" />
              </div>
            )}
            <div className="typeArea">
              <div className="action">
                <div className="fileSend">
                  <img alt="messageImg" id="messageImg" />

                  <div className="before"></div>
                  <AiOutlineSend onClick={submitMessageFile} className="icon" />
                </div>
                <div className="actionWrap">
                  <input type="file" className="fileInput" />
                  <AiOutlinePlusCircle className="icon" />
                </div>
                <div className="actionWrap">
                  <input type="file" id="fileInput" className="fileInput" />
                  <AiOutlinePicture onClick={openFile} className="icon" />
                </div>
                <div className="actionWrap">
                  <input type="file" className="fileInput" />
                  <MdTagFaces className="icon" />
                </div>
                <div className="actionWrap">
                  <input type="file" className="fileInput" />
                  <AiOutlineFileGif className="icon" />
                </div>
              </div>
              <div className="input">
                <form onSubmit={submitMessage}>
                  <input
                    value={message}
                    onClick={() => handleSeen()}
                    onChange={(e) => setMessage(e.target.value)}
                    type="text"
                    placeholder="Aa"
                  />
                </form>
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
        ) : (
          <div className="chatBox unSelected">
            <RiSendPlaneFill className="bigIcon" />
            <Title>Your Message</Title>
            <p>Send private photos and messages to a friend or group.</p>
            <Button>Send a message</Button>
          </div>
        )}
      </div>
     </div>
    </Layout>
  );
};
export default Home;
