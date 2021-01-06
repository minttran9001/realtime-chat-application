import React from "react";
import Layout from "../../components/Layout";
import Button from "../../components/Layout/UI/Button/index";
import {
  AiOutlineSetting,
  AiOutlinePlusCircle,
  AiOutlineHeart,
} from "react-icons/ai";
import { BsChat } from "react-icons/bs";
import "./style.scss";
import Mint from "../../images/mint.jpg";
import PostDetail from "../../components/PostDetail/index";
import ModalPost from "../../components/ModalPost/index";
const ProfilePage = () => {
  const openPostDetail = () => {
    const postDetail = document.querySelector(".postDetail");
    postDetail.classList.add("open");
  };
  const openModalPost = ()=>{
    document.querySelector('.modalPost').classList.add('open')
  }
  return (
    <Layout>
      <ModalPost/>
      <PostDetail />
      <div className="profile">
        <div className="profileHead">
          <div className="avatar">
            <img src={Mint} />
            <AiOutlinePlusCircle className="icon" />
          </div>
          <div className="details">
            <div className="userName">
              <p>Mint</p>
              <Button>Edit Profile</Button>
              <AiOutlineSetting className="icon" />
            </div>
            <div className="userFollow">
              <p>
                282 <span>followers</span>
              </p>
              <p>
                1003 <span>following</span>
              </p>
            </div>
            <div className="madeUpName">
              <p>小さなホタル</p>
            </div>
          </div>
        </div>
        <div className="postButton">
          <Button onClick={openModalPost}  >Post something</Button>
        </div>
        <div className="allPosts">
          <div onClick={openPostDetail} className="post">
            <div className="postImage">
              <img src={Mint} />
            </div>
            <div className="postHover">
              <p>
                <AiOutlineHeart className="icon" /> 37{" "}
              </p>
              <p>
                <BsChat className="icon" /> 37{" "}
              </p>
            </div>
          </div>
          <div className="post">
            <div className="postImage">
              <img src={Mint} />
            </div>
            <div className="postHover">
              <p>
                <AiOutlineHeart className="icon" /> 37{" "}
              </p>
              <p>
                <BsChat className="icon" /> 37{" "}
              </p>
            </div>
          </div>
          <div className="post">
            <div className="postImage">
              <img src={Mint} />
            </div>
            <div className="postHover">
              <p>
                <AiOutlineHeart className="icon" /> 37{" "}
              </p>
              <p>
                <BsChat className="icon" /> 37{" "}
              </p>
            </div>
          </div>
          <div className="post">
            <div className="postImage">
              <img src={Mint} />
            </div>
            <div className="postHover">
              <p>
                <AiOutlineHeart className="icon" /> 37{" "}
              </p>
              <p>
                <BsChat className="icon" /> 37{" "}
              </p>
            </div>
          </div>
          <div className="post">
            <div className="postImage">
              <img src={Mint} />
            </div>
            <div className="postHover">
              <p>
                <AiOutlineHeart className="icon" /> 37{" "}
              </p>
              <p>
                <BsChat className="icon" /> 37{" "}
              </p>
            </div>
          </div>
          <div className="post">
            <div className="postImage">
              <img src={Mint} />
            </div>
            <div className="postHover">
              <p>
                <AiOutlineHeart className="icon" /> 37{" "}
              </p>
              <p>
                <BsChat className="icon" /> 37{" "}
              </p>
            </div>
          </div>
          <div className="post">
            <div className="postImage">
              <img src={Mint} />
            </div>
            <div className="postHover">
              <p>
                <AiOutlineHeart className="icon" /> 37{" "}
              </p>
              <p>
                <BsChat className="icon" /> 37{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default ProfilePage;
