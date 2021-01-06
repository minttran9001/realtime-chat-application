import React from "react";
import "./style.scss";
import Mint from "../../images/mint.jpg";
import {
  AiOutlineSend,
  AiOutlineHeart,
  AiOutlineClose
} from "react-icons/ai";
import { VscBookmark } from "react-icons/vsc";
import { BsChat } from "react-icons/bs";
import Button from "../Layout/UI/Button";
const PostDetail = () => {
    const closePostDetail = ()=>{
        const postDetail = document.querySelector('.postDetail')
        postDetail.classList.remove('open')
    }
  return (
    <div className="postDetail">
        <AiOutlineClose className='exit' onClick={closePostDetail}/>
      <div className="postWrapper">
        <div className="postImage">
          <img src={Mint} />
        </div>
        <div className="postStatus">
          <div className="postOwner">
            <div className="ownerAvatar">
              <img src={Mint} />
              <p>mint_stillwalks</p>
            </div>
            <div className="more">
              <div className="circle"></div>
              <div className="circle"></div>
              <div className="circle"></div>
            </div>
          </div>
          <div className="postDescription">
            <div className="ownerAvatar">
              <img src={Mint} />
              <p className="name">mint_stillwalks</p>
              <p className="status">comely</p>
            </div>
            <div className="postedDate">
              <p>6d</p>
            </div>
            <div className="commentBox"></div>
            <div className="postLiked">
              <div className="iconBox">
                <div className="likeIcon">
                  <AiOutlineHeart className="icon" />
                  <BsChat className="icon" />
                  <AiOutlineSend className="icon" />
                </div>
                <div className="saveIcon">
                  <VscBookmark className="icon" />
                </div>
              </div>
              <div className="likedBy">
                <p>Liked by 36 peoples</p>
              </div>
            </div>
            <div className="commentInput">
              <div className="input">
                <input placeholder="Add comment here" />
              </div>
              <div className="button">
                <Button>Post</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PostDetail;
